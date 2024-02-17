import { BentoGrid } from '../atoms/BentoGrid'
import { bentoSizes } from '../atoms/types'
import { useSavedImages } from '../hooks/use-saved-images'
import { Screenshare } from '../organisms/Screenshare'
import './PresenterPage.css'

export const PresenterPage = () => {
  const { images } = useSavedImages()
  const enabledImages = images.filter((image) => image.enabled)
  enabledImages.sort((a, b) => bentoSizes.indexOf(b.size) - bentoSizes.indexOf(a.size))
  return (
    <div className="presenter-root">
      <BentoGrid>
        {enabledImages.map((image) =>
          image.type === 'screenshare' ? (
            <Screenshare media={image} key="screenshare" />
          ) : (
            <img className={image.size} src={image.src} key={image.name + image.type + image.src} />
          ),
        )}
      </BentoGrid>
    </div>
  )
}
