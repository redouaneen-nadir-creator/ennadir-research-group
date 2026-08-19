import type { MediaItem } from '@/types'
import PlaceholderImage from '@/components/ui/PlaceholderImage'
import Badge from '@/components/ui/Badge'

export default function MediaTile({ item, onOpen }: { item: MediaItem; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex flex-col overflow-hidden rounded-2xl border border-ink-900/8 bg-white text-start transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-900/5"
    >
      {item.imageUrl ? (
        <img src={item.imageUrl} alt={item.title} className="aspect-[4/3] w-full object-cover" loading="lazy" />
      ) : (
        <PlaceholderImage label={item.technique} className="aspect-[4/3] w-full" />
      )}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <Badge tone="brand">{item.technique}</Badge>
        <h3 className="text-sm font-semibold leading-snug text-ink-900 group-hover:text-brand-700">
          {item.title}
        </h3>
      </div>
    </button>
  )
}
