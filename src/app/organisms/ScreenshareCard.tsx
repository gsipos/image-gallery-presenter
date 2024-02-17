import { BentoSizeIcon } from '../atoms/BentoSizeIcon'
import { Switch } from '../atoms/Switch'
import { BentoSizeTemplate, PresentableMedia, PresentableMediaChange, bentoSizes } from '../atoms/types'
import './ScreenshareCard.css'

interface Props {
  media: PresentableMedia
  onChange: (image: PresentableMedia, change: PresentableMediaChange) => void
}

export const ScreenshareCard = (props: Props) => {
  const getDimensions = (size: BentoSizeTemplate) => {
    const [width, height] = size.replace('s', '').split('x').map(Number)
    return { width, height }
  }
  return (
    <div className="screenshare-card">
      <div>Screenshare</div>
      <div>You'll be able to choose what to share on the presenter tab.</div>
      <Switch
        label="Enabled"
        checked={props.media.enabled}
        onChange={(enabled) => props.onChange(props.media, { enabled })}
        className="span-2"
      />
      <div className="size-container">
        {bentoSizes.map((size) => (
          <button
            className={`${props.media.size === size ? 'contained' : ''} center-icon`}
            onClick={() => props.onChange(props.media, { size })}
          >
            <BentoSizeIcon {...getDimensions(size)} />
          </button>
        ))}
      </div>
    </div>
  )
}
