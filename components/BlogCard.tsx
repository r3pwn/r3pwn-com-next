import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { PayloadMedia } from '../utils/types';

type Props = {
  title: string;
  description: string;
  image?: PayloadMedia;
  url: string;
}

export default function BlogCard({ title, description, image, url }: Props) {
  return (
    <Card sx={{ maxWidth: 345, borderRadius: '0.5rem' }}>
      <CardActionArea component='a' href={url} sx={{ display: 'flex', flexDirection: 'column', height: '100%'}}>
        {image && <CardMedia
          component="img"
          alt={image.altText}
          height="140"
          image={image.url}
        />}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions sx={{ mt: 'auto', ml: 'auto' }}>
          <IconButton>
            <ArrowForwardIcon />
          </IconButton>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}