export type BentoSizeTemplate = `s${number}x${number}`
export const bentoSizes = [
  's1x1',
  's2x1',
  's1x2',
  's2x2',
  's2x3',
  's3x3',
  's4x3',
  's5x3',
] as const satisfies BentoSizeTemplate[]
export type BentoSize = (typeof bentoSizes)[number]

export interface PresentableMedia {
  type: 'image' | 'screenshare'
  src: string
  name: string

  enabled: boolean
  size: BentoSize
}

export type PresentableMediaChange = Partial<Pick<PresentableMedia, 'size' | 'enabled'>>
