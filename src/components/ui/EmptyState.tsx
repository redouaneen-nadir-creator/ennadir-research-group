export default function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-ink-900/15 bg-ink-900/[0.02] px-6 py-14 text-center">
      <p className="text-sm text-ink-700/70">{message}</p>
    </div>
  )
}
