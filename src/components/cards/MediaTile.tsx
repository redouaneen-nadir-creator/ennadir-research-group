import type { MediaItem } from '@/types'
import PlaceholderImage from '@/components/ui/PlaceholderImage'
import Badge from '@/components/ui/Badge'

export default function MediaTile({ item, onOpen }: { item: MediaItem; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex flex-col overflow-hidden rounded border border-ink-900/15 bg-white text-start transition-colors hover:border-brand-400"
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
