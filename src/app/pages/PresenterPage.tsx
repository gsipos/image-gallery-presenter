import { BentoGrid } from '../atoms/BentoGrid'
import { bentoSizes } from '../atoms/types'
import { useSavedImages } from '../hooks/use-saved-images'
import './PresenterPage.css'

export const PresenterPage = () => {
  const { images } = useSavedImages()
  const enabledImages = images.filter((image) => image.enabled)
  const reverseBensoSizes = bentoSizes.toReversed()
  enabledImages.sort((a, b) => bentoSizes.indexOf(b.size) - bentoSizes.indexOf(a.size))
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
