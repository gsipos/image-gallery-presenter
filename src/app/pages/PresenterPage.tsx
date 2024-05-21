import { Box } from '@mui/joy'
import { BentoGrid } from '../atoms/BentoGrid'
import { bentoSizes } from '../atoms/types'
import { useSavedImages } from '../hooks/use-saved-images'
import { Screenshare } from '../organisms/Screenshare'

export const PresenterPage = () => {
  const { images } = useSavedImages()
  const enabledImages = images.filter((image) => image.enabled)
  enabledImages.sort((a, b) => bentoSizes.indexOf(b.size) - bentoSizes.indexOf(a.size))
  return (
    <Box
      sx={{
        backgroundColor: (t) => t.palette.common.black,
        margin: 0,
        width: '100%',
        minHeight: '100vh',
      }}
    >
      <BentoGrid>
        {enabledImages.map((image) =>
          image.type === 'screenshare' ? (
            <Screenshare media={image} key="screenshare" />
          ) : (
            <img className={image.size} src={image.src} key={image.name + image.type + image.src} />
          ),
        )}
      </BentoGrid>
    </Box>
  )
}
