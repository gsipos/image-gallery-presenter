import { Box } from '@mui/joy'

interface Props {
  width: number
  height: number
}

export const BentoSizeIcon = (props: Props) => {
  const { width, height } = props
  const blocks = width * height
  const blockArray = Array(blocks).fill(0)
  return (
    <Box
      sx={{
        display: 'grid',
        gap: '2px',
        height: '1em',
        margin: '2px',
        gridTemplateColumns: `repeat(${width}, 3px)`,
        gridTemplateRows: `repeat(${height}, 3px)`,
        aspectRatio: `${width}/${height}`,
      }}
    >
      {blockArray.map((_, index) => (
        <Box
          key={index}
          sx={{
            aspectRatio: '1',
            width: '100%',
            height: '100%',
            backgroundColor: 'currentColor',
          }}
        />
      ))}
    </Box>
  )
}
