import { Box, ImageList, ImageListItem, Stack } from '@mui/material';
import { PayloadMedia } from '../utils/payload-types';
import { useState } from 'react';

type Props = {
  images: PayloadMedia[];
}

function MediaStack({ images }: Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const selectedImage = images[currentImageIndex];
  return <>
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '1rem'
    }}>
      <Box
        component="img"
        sx={{
          height: '100%',
          maxHeight: '500px',
          maxWidth: '100%'
        }}
        alt={selectedImage?.altText}
        src={selectedImage?.url}
      />
    </Box>
    <Stack direction="row" spacing={2} sx={{
      marginLeft: 'auto',
      marginRight: 'auto',
      width: 'max-content'
    }}>
      {images.map((item, index) => (
        <ImageListItem key={item.url}>
          <Box
            component="img"
            sx={{
              borderRadius: '0.5rem',
              height: '60px',
              maxHeight: '100%',
              maxWidth: '100%',
              border: index === currentImageIndex ? '2px solid white' : ''
            }}
            alt={item?.altText}
            src={item?.url}
            onClick={() => setCurrentImageIndex(index)}
          />
        </ImageListItem>
      ))}
    </Stack>
  </>
}
export default MediaStack;