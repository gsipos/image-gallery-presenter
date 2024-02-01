import { useEffect, useState } from 'react'
import { PresentableImage, PresentableImageChange } from '../atoms/types'
import { get, set } from 'idb-keyval'

const updateChannel = new BroadcastChannel('image-updates')

export const useSavedImages = () => {
  const [images, setImagesRaw] = useState<PresentableImage[]>([])

  const loadImages = () => {
    get('images').then((images) => {
      setImagesRaw(images ?? [])
    })
  }

  useEffect(() => {
    loadImages()
    updateChannel.onmessage = () => loadImages()
  }, [])

  const setImages = async (images: PresentableImage[]) => {
    await set('images', images)
    setImagesRaw(images ?? [])
    updateChannel.postMessage('images updated')
  }

  const updateImage = (image: PresentableImage, change: PresentableImageChange) => {
    const newImage = { ...image, ...change }
    setImages(images.map((i) => (i === image ? newImage : i)))
  }

  const deleteImage = (image: PresentableImage) => {
    setImages(images.filter((i) => i !== image))
  }

  return { images, setImages, updateImage, deleteImage }
}
