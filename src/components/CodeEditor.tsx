import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'
import { oneDark } from '@codemirror/theme-one-dark'
import type { Language } from './types/index'

interface Props {
  code: string
  language: Language
  onChange: (value: string) => void
}

const getExtensions = (language: Language) => {
  switch (language) {
    case 'python':
      return [python()]
    case 'javascript':
    case 'typescript':
      return [javascript({ typescript: language === 'typescript' })]
  }
}

export const CodeEditor = ({ code, language, onChange }: Props) => {
  return (
    <CodeMirror
      value={code}
      height="100%"
      theme={oneDark}
      extensions={getExtensions(language)}
      onChange={onChange}
      style={{ height: '100%', fontSize: '13px' }}
    />
  )
}
