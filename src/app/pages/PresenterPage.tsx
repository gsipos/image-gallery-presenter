import { BentoGrid } from '../atoms/BentoGrid'
import { useSavedImages } from '../hooks/use-saved-images'
import './PresenterPage.css'

export const PresenterPage = () => {
  const { images } = useSavedImages()
  const enabledImages = images.filter((image) => image.enabled)
  return (
    <div className="presenter-root">
      <BentoGrid>
        {enabledImages.map((image) => (
          <img className={image.size} src={image.src} />
        ))}
      </BentoGrid>
    </div>
  )
}
