import { ButtonGroup, Card, CardContent, CardCover, CardOverflow, IconButton, Switch, Typography } from '@mui/joy'
import { EyeIcon, EyeOffIcon, TrashIcon } from 'lucide-react'
import { BentoSizeIcon } from '../atoms/BentoSizeIcon'
import { BentoSizeTemplate, PresentableMedia, PresentableMediaChange, bentoSizes } from '../atoms/types'

interface Props {
  image: PresentableMedia
  onChange: (image: PresentableMedia, change: PresentableMediaChange) => void
  onDelete?: (image: PresentableMedia) => void
}

export const ImageCard = (props: Props) => {
  const getDimensions = (size: BentoSizeTemplate) => {
    const [width, height] = size.replace('s', '').split('x').map(Number)
    return { width, height }
  }

  return (
    <Card sx={{ '--Card-radius': '2rem' }}>
      <CardCover>
        <img src={props.image.src} />
      </CardCover>
      <CardContent
        sx={{ cursor: 'pointer' }}
        onClick={() => props.onChange(props.image, { enabled: !props.image.enabled })}
      />
      <CardOverflow variant="soft">
        <CardContent>
          <Typography
            color="neutral"
            level="body-xs"
            startDecorator={
              <Switch
                size="md"
                checked={props.image.enabled}
                slotProps={{
                  thumb: { children: props.image.enabled ? <EyeIcon /> : <EyeOffIcon /> },
                }}
                onChange={(e) => props.onChange(props.image, { enabled: e.target.checked })}
              />
            }
            endDecorator={
              <IconButton
                size="sm"
                variant="outlined"
                color="neutral"
                disabled={props.image.enabled}
                onClick={() => props.onDelete?.(props.image)}
              >
                <TrashIcon />
              </IconButton>
            }
          >
            {props.image.name}
          </Typography>

          <ButtonGroup>
            {bentoSizes.map((size) => (
              <IconButton
                size="sm"
                color="primary"
                variant={props.image.size === size ? 'solid' : 'outlined'}
                onClick={() => props.onChange(props.image, { size })}
              >
                <BentoSizeIcon {...getDimensions(size)} />
              </IconButton>
            ))}
          </ButtonGroup>
        </CardContent>
      </CardOverflow>
    </Card>
  )
}
