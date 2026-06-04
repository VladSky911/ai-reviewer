import { Language } from '../types'

interface Props {
  value: Language
  onChange: (lang: Language) => void
}

const languages: { value: Language; label: string }[] = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
]

export const LanguageSelector = ({ value, onChange }: Props) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as Language)}
      className="bg-[#21262d] border border-[#30363d] text-[#8b949e] text-xs font-mono px-2 py-1 rounded-md outline-none hover:border-[#58a6ff] hover:text-white transition-colors"
    >
      {languages.map((lang) => (
        <option key={lang.value} value={lang.value}>
          {lang.label}
        </option>
      ))}
    </select>
  )
}
