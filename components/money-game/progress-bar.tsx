export function ProgressBar({ current, total }: { current: number; total: number }) {
  const progress = (current / total) * 100
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div
        className="bg-gameGreen-500 h-2.5 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={total}
      ></div>
    </div>
  )
}
