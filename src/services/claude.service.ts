import type { ReviewResult } from '../types/index'
import { buildReviewPrompt } from '../prompts/review.prompt'

const ANTHROPIC_API = 'https://api.anthropic.com/v1/messages'

export const reviewCode = async (
  code: string,
  language: string,
  apiKey: string,
  onChunk: (text: string) => void
): Promise<ReviewResult> => {
  const response = await fetch(ANTHROPIC_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1500,
      stream: true,
      messages: [
        {
          role: 'user',
          content: buildReviewPrompt(code, language),
        },
      ],
    }),
  })

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.error?.message || 'API request failed')
  }

  const reader = response.body!.getReader()
  const decoder = new TextDecoder()
  let fullText = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    const chunk = decoder.decode(value)
    const lines = chunk.split('\n').filter((l) => l.startsWith('data: '))

    for (const line of lines) {
      const data = line.replace('data: ', '')
      if (data === '[DONE]') continue

      try {
        const parsed = JSON.parse(data)
        const text = parsed.delta?.text || ''
        if (text) {
          fullText += text
          onChunk(fullText)
        }
      } catch {
        // skip malformed chunks
      }
    }
  }

  const json = fullText.replace(/```json|```/g, '').trim()
  return JSON.parse(json) as ReviewResult
}
