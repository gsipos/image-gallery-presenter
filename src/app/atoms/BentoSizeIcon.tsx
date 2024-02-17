import './BentoSizeIcon.css'

interface Props {
  width: number
  height: number
}

export const BentoSizeIcon = (props: Props) => {
  const { width, height } = props
  const blocks = width * height
  const blockArray = Array(blocks).fill(0)
  return (
    <div
      className="bento-size-icon-container"
      style={{
        gridTemplateColumns: `repeat(${width}, 4px)`,
        gridTemplateRows: `repeat(${height}, 4px)`,
        aspectRatio: `${width}/${height}`,
      }}
    >
      {blockArray.map((_, index) => (
        <div key={index} className="bento-size-icon-block"></div>
      ))}
    </div>
  )
}
