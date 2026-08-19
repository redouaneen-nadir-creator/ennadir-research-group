export interface FilterOption {
  value: string
  label: string
}

export default function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: FilterOption[]
}) {
  return (
    <label className="flex flex-col gap-1.5 text-xs font-medium text-ink-700/70">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-w-[9rem] rounded border border-ink-900/15 bg-white px-3 py-2 text-sm text-ink-900 focus:border-brand-400"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  )
}
