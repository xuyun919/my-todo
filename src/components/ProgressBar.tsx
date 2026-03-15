interface Props {
  total: number
  done: number
}

export default function ProgressBar({ total, done }: Props) {
  const pct = total ? Math.round(done / total * 100) : 0
  return (
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: `${pct}%` }} />
    </div>
  )
}
