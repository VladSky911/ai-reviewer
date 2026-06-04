import { useState } from 'react'
import type { Issue, Language } from '../types/index'
import { reviewCode } from '../services/claude.service'

export const useReview = (apiKey: string) => {
  const [issues, setIssues] = useState<Issue[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [streamText, setStreamText] = useState('')

  const review = async (code: string, language: Language) => {
    if (!code.trim()) return
    setIsLoading(true)
    setError(null)
    setIssues([])
    setStreamText('')

    try {
      const result = await reviewCode(code, language, apiKey, (chunk) => {
        setStreamText(chunk)
      })
      setIssues(result.issues)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
      setStreamText('')
    }
  }

  return { issues, isLoading, error, streamText, review }
}
