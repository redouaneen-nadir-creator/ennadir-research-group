import type { ReactNode, ElementType } from 'react'

export default function Container({
  children,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  as?: ElementType
}) {
  return <Tag className={`container ${className}`}>{children}</Tag>
}
