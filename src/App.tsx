import { useState } from 'react'
import { CodeEditor } from './components/CodeEditor'
import { LanguageSelector } from './components/LanguageSelector'
import { ReviewPanel } from './components/ReviewPanel'
import { useReview } from './hooks/useReview'
import type { Language } from './types/index'

const DEFAULT_CODE = `async function fetchUser(id) {
  const res = await fetch('/api/users/' + id)
  const data = await res.json()

  eval(data.userScript)

  const password = "admin123"
  const query = "SELECT * FROM users WHERE id = " + id

  return data
}

function processItems(items) {
  var result = []
  for (var i = 0; i <= items.length; i++) {
    result.push(items[i].name.toUpperCase())
  }
  return result
}`

export default function App() {
  const [code, setCode] = useState(DEFAULT_CODE)
  const [language, setLanguage] = useState<Language>('javascript')
  const [apiKey, setApiKey] = useState('')
  const [showKeyInput, setShowKeyInput] = useState(false)

  const { issues, isLoading, error, review } = useReview(apiKey)

  const handleReview = () => {
    if (!apiKey) {
      setShowKeyInput(true)
      return
    }
    review(code, language)
  }

  return (
    <div className="flex flex-col h-screen bg-[#0d1117] text-white font-mono">
      {/* Topbar */}
      <div className="flex items-center justify-between px-4 h-12 bg-[#161b22] border-b border-[#30363d] flex-shrink-0">
        <div className="flex items-center gap-2 font-sans text-sm font-medium text-[#e6edf3]">
          <div className="w-2 h-2 rounded-full bg-[#58a6ff] shadow-[0_0_6px_#58a6ff80]" />
          AI Reviewer
        </div>
        <div className="flex items-center gap-2">
          <LanguageSelector value={language} onChange={setLanguage} />
          <button
            onClick={handleReview}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1f6feb] hover:bg-[#388bfd] disabled:bg-[#21262d] disabled:text-[#58a6ff] text-white text-xs font-sans font-medium rounded-md transition-colors"
          >
            <i className="ti ti-sparkles" aria-hidden="true" />
            {isLoading ? 'Analyzing...' : 'Review code'}
          </button>
        </div>
      </div>

      {/* API Key input */}
      {showKeyInput && (
        <div className="flex items-center gap-2 px-4 py-2 bg-[#161b22] border-b border-[#30363d]">
          <i className="ti ti-key text-[#8b949e] text-sm" aria-hidden="true" />
          <input
            type="password"
            placeholder="Paste your Anthropic API key..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="flex-1 bg-[#0d1117] border border-[#30363d] text-[#e6edf3] text-xs font-mono px-3 py-1.5 rounded-md outline-none focus:border-[#58a6ff] placeholder-[#484f58]"
          />
          <button
            onClick={() => {
              setShowKeyInput(false)
              if (apiKey) review(code, language)
            }}
            className="px-3 py-1.5 bg-[#1f6feb] hover:bg-[#388bfd] text-white text-xs font-sans rounded-md transition-colors"
          >
            Save & Review
          </button>
        </div>
      )}

      {/* Main */}
      <div className="flex flex-1 overflow-hidden">
        {/* Editor */}
        <div className="flex-1 flex flex-col border-r border-[#30363d]">
          <div className="flex items-center gap-2 px-4 py-2 bg-[#161b22] border-b border-[#30363d]">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#f85149]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#d29922]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#3fb950]" />
            </div>
            <span className="text-[11px] text-[#8b949e] ml-2 font-sans">
              main.
              {language === 'python'
                ? 'py'
                : language === 'typescript'
                  ? 'ts'
                  : 'js'}
            </span>
          </div>
          <div className="flex-1 overflow-hidden">
            <CodeEditor code={code} language={language} onChange={setCode} />
          </div>
        </div>

        {/* Review panel */}
        <div className="w-80 flex flex-col bg-[#0d1117]">
          <div className="flex items-center gap-2 px-4 py-2 bg-[#161b22] border-b border-[#30363d]">
            <i
              className="ti ti-shield-check text-[13px] text-[#8b949e]"
              aria-hidden="true"
            />
            <span className="text-[11px] text-[#8b949e] font-sans">
              Review results
            </span>
          </div>
          {error && (
            <div className="mx-3 mt-3 px-3 py-2 bg-[#3d1c1c] border border-[#f85149] rounded-md text-[11px] text-[#f85149] font-sans">
              {error}
            </div>
          )}
          <ReviewPanel issues={issues} isLoading={isLoading} />
        </div>
      </div>

      {/* Statusbar */}
      <div className="flex items-center gap-4 px-4 h-6 bg-[#161b22] border-t border-[#30363d] flex-shrink-0">
        {issues.length > 0 && (
          <>
            {['critical', 'warning', 'info'].map((s) => {
              const count = issues.filter((i) => i.severity === s).length
              const colors: Record<string, string> = {
                critical: 'bg-[#f85149]',
                warning: 'bg-[#d29922]',
                info: 'bg-[#58a6ff]',
              }
              if (!count) return null
              return (
                <div key={s} className="flex items-center gap-1 font-sans">
                  <div className={`w-1.5 h-1.5 rounded-full ${colors[s]}`} />
                  <span className="text-[11px] text-[#8b949e]">
                    {count} {s}
                  </span>
                </div>
              )
            })}
          </>
        )}
        <div className="ml-auto flex items-center gap-1 font-sans">
          <div className="w-1.5 h-1.5 rounded-full bg-[#3fb950]" />
          <span className="text-[11px] text-[#8b949e]">
            {code.split('\n').length} lines
          </span>
        </div>
      </div>
    </div>
  )
}
