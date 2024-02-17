import { useEffect, useState } from 'react'
import { PresentableMedia, PresentableMediaChange } from '../atoms/types'
import { get, set } from 'idb-keyval'

const updateChannel = new BroadcastChannel('image-updates')

const defaultScreenshare: PresentableMedia = {
  type: 'screenshare',
  src: '',
  name: 'Screenshare',
  enabled: false,
  size: 's1x1',
}

export const useSavedImages = () => {
  const [images, setImagesRaw] = useState<PresentableMedia[]>([])

  const loadImages = () => {
    get('images').then((images) => {
      setImagesRaw(images ?? [])
    })
  }

  useEffect(() => {
    if (images.find((i) => i.type === 'screenshare')) return
    setImagesRaw([{ ...defaultScreenshare }, ...images])
  }, [images])

  useEffect(() => {
    loadImages()
    updateChannel.onmessage = () => loadImages()
  }, [])

  const setImages = async (images: PresentableMedia[]) => {
    await set('images', images)
    setImagesRaw(images ?? [])
    updateChannel.postMessage('images updated')
  }

  const updateImage = (image: PresentableMedia, change: PresentableMediaChange) => {
    const newImage = { ...image, ...change }
    setImages(images.map((i) => (i === image ? newImage : i)))
  }

  const deleteImage = (image: PresentableMedia) => {
    setImages(images.filter((i) => i !== image))
  }

  return { images, setImages, updateImage, deleteImage }
}
