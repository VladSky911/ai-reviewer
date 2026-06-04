import type { Issue, Severity } from '../types/index'
interface Props {
  issue: Issue
}

const severityConfig: Record<
  Severity,
  { label: string; border: string; badge: string }
> = {
  critical: {
    label: 'Critical',
    border: 'border-l-[#f85149]',
    badge: 'bg-[#3d1c1c] text-[#f85149]',
  },
  warning: {
    label: 'Warning',
    border: 'border-l-[#d29922]',
    badge: 'bg-[#2e2009] text-[#d29922]',
  },
  info: {
    label: 'Info',
    border: 'border-l-[#58a6ff]',
    badge: 'bg-[#0d2040] text-[#58a6ff]',
  },
  good: {
    label: 'Good',
    border: 'border-l-[#3fb950]',
    badge: 'bg-[#0d2818] text-[#3fb950]',
  },
}

export const IssueCard = ({ issue }: Props) => {
  const config = severityConfig[issue.severity]

  return (
    <div
      className={`bg-[#161b22] rounded-lg p-3 border-l-2 ${config.border} animate-fadeIn`}
    >
      <div className="flex items-center justify-between mb-1.5">
        <span
          className={`text-[10px] font-medium px-2 py-0.5 rounded uppercase tracking-wide ${config.badge}`}
        >
          {config.label}
        </span>
        <span className="text-[11px] text-[#484f58]">line {issue.line}</span>
      </div>

      <p className="text-[12.5px] font-medium text-[#c9d1d9] mb-1">
        {issue.title}
      </p>
      <p className="text-[11.5px] text-[#8b949e] leading-relaxed">
        {issue.description}
      </p>

      {issue.fix && (
        <div className="mt-2 px-2 py-1.5 bg-[#0d1117] rounded text-[11px] text-[#58a6ff] font-mono">
          → {issue.fix}
        </div>
      )}
    </div>
  )
}
