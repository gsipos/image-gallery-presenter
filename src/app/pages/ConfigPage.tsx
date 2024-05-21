import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/joy'
import { ProjectorIcon } from 'lucide-react'
import { DragEventHandler } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { BentoGrid } from '../atoms/BentoGrid'
import { PresentableMedia } from '../atoms/types'
import { useSavedImages } from '../hooks/use-saved-images'
import { ImageCard } from '../organisms/ImageCard'
import { ScreenshareCard } from '../organisms/ScreenshareCard'

const toBase64 = async (file: File) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  await new Promise((resolve) => (reader.onload = resolve))

  const presentableImage: PresentableMedia = {
    type: 'image',
    name: file.name,
    enabled: false,
    src: reader.result as string,
    size: 's1x1',
  }
  return presentableImage
}

export const ConfigPage = () => {
  const { images, setImages, updateImage, deleteImage } = useSavedImages()

  const handleImageDrop: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    const imageFiles = files.filter((file) => file.type.startsWith('image/'))
    imageFiles.forEach((file) => console.log(file.name, file.type, file))

    Promise.all(imageFiles.map(toBase64)).then((newImages) => setImages([...images, ...newImages]))
  }
  const allowDrop: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()
  }

  return (
    <Box sx={{ width: '100%', minHeight: '100vh' }} onDrop={handleImageDrop} onDragOver={allowDrop}>
      <BentoGrid>
        <Card className="s2x1" sx={{ '--Card-radius': '2rem' }} variant="soft">
          <CardContent sx={{ gap: 3 }}>
            <Typography level="h2">Image gallery Presenter</Typography>
            <Typography>Drag and drop images to the page.</Typography>
          </CardContent>
          <CardActions buttonFlex="0 1 320px">
            <Button
              component={RouterLink}
              to="/present"
              target="_blank"
              startDecorator={<ProjectorIcon />}
              variant="solid"
              color="primary"
            >
              Presentation view
            </Button>
          </CardActions>
        </Card>

        {images.map((image) =>
          image.type === 'screenshare' ? (
            <ScreenshareCard media={image} onChange={updateImage} />
          ) : (
            <ImageCard image={image} onChange={updateImage} onDelete={deleteImage} />
          ),
        )}
      </BentoGrid>
    </Box>
  )
}
