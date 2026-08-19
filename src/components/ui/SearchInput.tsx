import { SearchIcon } from '@/components/icons'

export default function SearchInput({
  value,
  onChange,
  placeholder,
  label,
}: {
  value: string
  onChange: (value: string) => void
  placeholder: string
  label: string
}) {
  return (
    <label className="flex min-w-[16rem] flex-1 flex-col gap-1.5 text-xs font-medium text-ink-700/70">
      {label}
      <span className="relative">
        <SearchIcon className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-700/40" />
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded border border-ink-900/15 bg-white py-2 ps-9 pe-3 text-sm text-ink-900 placeholder:text-ink-700/40 focus:border-brand-400"
        />
      </span>
    </label>
  )
}
