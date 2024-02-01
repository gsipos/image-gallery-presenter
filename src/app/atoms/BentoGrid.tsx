import { DetailedHTMLProps, PropsWithChildren } from 'react'
import './BentoGrid.css'

export const BentoGrid = (
  props: PropsWithChildren<DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>>,
) => (
  <div {...props} className={`bento-grid ${props.className ?? ''}`}>
    {props.children}
  </div>
)
