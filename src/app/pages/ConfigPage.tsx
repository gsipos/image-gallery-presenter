import { Link } from 'react-router-dom'
import { BentoGrid } from '../atoms/BentoGrid'
import { DragEventHandler, useState } from 'react'
import { useSavedImages } from '../hooks/use-saved-images'
import { PresentableMedia } from '../atoms/types'
import { ImageCard } from '../organisms/ImageCard'
import './ConfigPage.css'
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
    <div className="config-root" onDrop={handleImageDrop} onDragOver={allowDrop}>
      <BentoGrid>
        <div className="title-card s2x1">
          <h2>Image gallery Presenter</h2>
          <Link to="/present" target="_blank">
            <h2>Presentation view</h2>
          </Link>
          <p>Drag and drop images to the page.</p>
        </div>

        {images.map((image) =>
          image.type === 'screenshare' ? (
            <ScreenshareCard media={image} onChange={updateImage} />
          ) : (
            <ImageCard image={image} onChange={updateImage} onDelete={deleteImage} />
          ),
        )}
      </BentoGrid>
    </div>
  )
}
