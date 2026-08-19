import type { Visibility } from '@/types'

/**
 * Keep only items marked `public`. Apply this to every dataset before it
 * reaches a page or the search index. Since GitHub Pages has no server,
 * this is an app-level gate only — `group`/`private` records must not be
 * committed to a public repository in the first place.
 */
export function publicOnly<T extends { visibility: Visibility }>(items: T[]): T[] {
  return items.filter((item) => item.visibility === 'public')
}
