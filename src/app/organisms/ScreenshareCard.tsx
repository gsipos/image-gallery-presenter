import { ButtonGroup, Card, CardActions, CardContent, Divider, IconButton, Switch, Typography } from '@mui/joy'
import { BentoSizeIcon } from '../atoms/BentoSizeIcon'
import { BentoSizeTemplate, PresentableMedia, PresentableMediaChange, bentoSizes } from '../atoms/types'

interface Props {
  media: PresentableMedia
  onChange: (image: PresentableMedia, change: PresentableMediaChange) => void
}

export const ScreenshareCard = (props: Props) => {
  const getDimensions = (size: BentoSizeTemplate) => {
    const [width, height] = size.replace('s', '').split('x').map(Number)
    return { width, height }
  }
  return (
    <Card sx={{ '--Card-radius': '2rem' }} variant="outlined">
      <Typography level="title-md">Screenshare</Typography>
      <Divider />
      <CardContent>
        <Typography level="body-md">You'll be able to choose what to share on the presenter tab.</Typography>
        <Switch
          endDecorator="Enabled"
          checked={props.media.enabled}
          onChange={(e) => props.onChange(props.media, { enabled: e.target.checked })}
        />
      </CardContent>
      <CardActions>
        <ButtonGroup>
          {bentoSizes.map((size) => (
            <IconButton
              size="sm"
              color="primary"
              variant={props.media.size === size ? 'solid' : 'outlined'}
              onClick={() => props.onChange(props.media, { size })}
            >
              <BentoSizeIcon {...getDimensions(size)} />
            </IconButton>
          ))}
        </ButtonGroup>
      </CardActions>
    </Card>
  )
}
