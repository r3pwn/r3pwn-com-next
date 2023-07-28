import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, SxProps, Theme, Typography } from '@mui/material';
import { PayloadMedia } from '@/payload/payload-types';

type Props = {
  title: string;
  description: string;
  image?: PayloadMedia;
  url: string;
  sx?: SxProps<Theme>;
}

export default function PostTile({ title, description, image, url, sx }: Props) {
  return (
    <Card sx={{ ...sx, maxWidth: 345, borderRadius: '0.5rem' }}>
      <CardActionArea component='a' href={url} sx={{ display: 'flex', flexDirection: 'column', height: '100%'}}>
        {image && <CardMedia
          component="img"
          alt={image.altText}
          height="140"
          image={image.url}
        />}
        <CardContent sx={{ mr: 'auto '}}>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions sx={{ mt: 'auto', ml: 'auto', mb: '0.5rem', mr: '0.5rem' }}>
          <ArrowForwardIcon />
        </CardActions>
      </CardActionArea>
    </Card>
  );
}