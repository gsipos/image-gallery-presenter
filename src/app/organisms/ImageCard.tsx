import {
  ButtonGroup,
  Card,
  CardContent,
  CardCover,
  CardOverflow,
  IconButton,
  Stack,
  Switch,
  Typography,
} from '@mui/joy'
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
      <CardOverflow
        variant="soft"
        sx={{ backgroundColor: 'rgb(from var(--joy-palette-primary-50) r g b / 0.8)', backdropFilter: 'blur(10px)' }}
      >
        <CardContent sx={{}}>
          <Stack direction="row" gap={1}>
            <Typography
              color="neutral"
              level="body-xs"
              noWrap
              sx={{ textWrap: 'balance', wordWrap: 'break-word', height: 'max-content' }}
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
            >
              {props.image.name}
            </Typography>
            <IconButton
              size="sm"
              variant="outlined"
              color="neutral"
              disabled={props.image.enabled}
              onClick={() => props.onDelete?.(props.image)}
            >
              <TrashIcon />
            </IconButton>
          </Stack>

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
