import { Switch } from '../atoms/Switch'
import { PresentableImage, PresentableImageChange, bentoSizes } from '../atoms/types'
import './ImageCard.css'

interface Props {
  image: PresentableImage
  onChange: (image: PresentableImage, change: PresentableImageChange) => void
  onDelete?: (image: PresentableImage) => void
}

export const ImageCard = (props: Props) => {
  return (
    <div className="image-card">
      <img
        className="image-preview"
        src={props.image.src}
        onClick={() => props.onChange(props.image, { enabled: !props.image.enabled })}
      />

      <div className="settings-container">
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
            className={`${props.image.size === size ? 'contained' : ''}`}
            onClick={() => props.onChange(props.image, { size })}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  )
}
