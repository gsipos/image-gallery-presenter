import { useEffect, useRef, useState } from 'react'
import { PresentableMedia } from '../atoms/types'

const displayMediaOptions: DisplayMediaStreamOptions = {
  video: {
    displaySurface: 'window',
    frameRate: { ideal: 30, max: 60 },
  },
  audio: false,
}

export const Screenshare = (props: { media: PresentableMedia }) => {
  const ref = useRef<HTMLVideoElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)

  const stopCurrentStream = () => {
    stream?.getTracks().forEach((track) => track.stop())
    setStream(null)
    if (ref.current) {
      ref.current.srcObject = null
    }
  }

  useEffect(() => {
    if (!ref.current) return
    if (!props.media.enabled) {
      stopCurrentStream()
      ref.current.srcObject = null
    } else {
      navigator.mediaDevices.getDisplayMedia(displayMediaOptions).then((stream) => {
        stopCurrentStream()
        setStream(stream)
        ref.current!.srcObject = stream
      })
    }
    return stopCurrentStream
  }, [props.media.enabled])

  if (!props.media.enabled) return null

  return <video ref={ref} className={props.media.size} autoPlay />
}
