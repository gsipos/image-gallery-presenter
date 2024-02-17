import { BentoSizeIcon } from '../atoms/BentoSizeIcon'
import { Switch } from '../atoms/Switch'
import { BentoSizeTemplate, PresentableImage, PresentableImageChange, bentoSizes } from '../atoms/types'
import './ImageCard.css'

interface Props {
  image: PresentableImage
  onChange: (image: PresentableImage, change: PresentableImageChange) => void
  onDelete?: (image: PresentableImage) => void
}

export const ImageCard = (props: Props) => {
  const getDimensions = (size: BentoSizeTemplate) => {
    const [width, height] = size.replace('s', '').split('x').map(Number)
    return { width, height }
  }

  return (
    <div className="image-card">
      <img
        className="image-preview"
        src={props.image.src}
        onClick={() => props.onChange(props.image, { enabled: !props.image.enabled })}
      />

      <div className="settings-container">
        <div className="image-name">{props.image.name}</div>
        <Switch
          label="Enabled"
          checked={props.image.enabled}
          onChange={(enabled) => props.onChange(props.image, { enabled })}
          className="span-2"
        />
        <button disabled={props.image.enabled} onClick={() => props.onDelete?.(props.image)}>
          remove
        </button>
        {bentoSizes.map((size) => (
          <button
            className={`${props.image.size === size ? 'contained' : ''} center-icon`}
            onClick={() => props.onChange(props.image, { size })}
          >
            <BentoSizeIcon {...getDimensions(size)} />
          </button>
        ))}
      </div>
    </div>
  )
}
