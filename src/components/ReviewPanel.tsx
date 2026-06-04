import { Issue, Severity } from '../types'
import { IssueCard } from './IssueCard'

interface Props {
  issues: Issue[]
  isLoading: boolean
}

const severityOrder: Severity[] = ['critical', 'warning', 'info', 'good']

const countBySeverity = (issues: Issue[], severity: Severity) =>
  issues.filter((i) => i.severity === severity).length

const summaryConfig: Record<Severity, string> = {
  critical: 'bg-[#3d1c1c] text-[#f85149]',
  warning: 'bg-[#2e2009] text-[#d29922]',
  info: 'bg-[#0d2040] text-[#58a6ff]',
  good: 'bg-[#0d2818] text-[#3fb950]',
}

export const ReviewPanel = ({ issues, isLoading }: Props) => {
  const sorted = [...issues].sort(
    (a, b) =>
      severityOrder.indexOf(a.severity) - severityOrder.indexOf(b.severity)
  )

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 p-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-20 rounded-lg bg-[#161b22] animate-pulse"
            style={{ opacity: 1 - i * 0.2 }}
          />
        ))}
      </div>
    )
  }

  if (issues.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3 text-center p-8">
        <i
          className="ti ti-code text-[28px] text-[#30363d]"
          aria-hidden="true"
        />
        <p className="text-[13px] text-[#8b949e]">
          Paste your code and click{' '}
          <span className="text-[#e6edf3] font-medium">Review code</span>
        </p>
        <p className="text-[11px] text-[#484f58]">
          Analyzes for bugs, security issues, and best practices
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex gap-1.5 px-3 py-2 border-b border-[#30363d] flex-shrink-0">
        {severityOrder.map((severity) => {
          const count = countBySeverity(issues, severity)
          if (count === 0) return null
          return (
            <span
              key={severity}
              className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full ${summaryConfig[severity]}`}
            >
              {count} {severity}
            </span>
          )
        })}
      </div>

      <div className="flex flex-col gap-2 p-3 overflow-y-auto flex-1">
        {sorted.map((issue, idx) => (
          <IssueCard key={idx} issue={issue} />
        ))}
      </div>
    </div>
  )
}
