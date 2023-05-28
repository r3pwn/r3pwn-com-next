import { Box } from '@mui/material';
import Image from 'next/image';
import PostTile from '../components/PostTile';
import { serializeRichText } from './payload-richtext';
import { PayloadBlock } from './payload-types-block';
import { RichTextNode } from './types';

export const renderPageBlocks = (content: PayloadBlock[]) => content.map((block) => {
  switch (block.blockType) {
    case 'rich-text':
      return (<div key={block.id} className='rich-text-block'>{serializeRichText(block.content)}</div>);
    case 'tile-sheet':
      return (
        <Box key={block.id} sx={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', mt: '1.5rem' }}>
          {block.tiles && block.tiles.map((tile, index) => (
            <PostTile 
              key={tile.id || index}
              title={tile.title}
              description={tile.description}
              url={tile.link.breadcrumbs?.at(-1)?.url ?? '/'}
              image={tile.image}
              sx={{ ml: { xs: 'auto', md: '0'}, mr: { xs: 'auto', md: '0'} }}
            />
          ))}
        </Box>);
    case 'biography':
      return (
        <Box component="div" key={block.id} sx={{ display: { xs: 'flex', md: 'block' }, flexDirection: 'column'}}>
          {block.image && <Box
            component="div"
            sx={{
              overflow: 'hidden',
              borderRadius: '50%',
              maxWidth: '250px',
              float: 'left',
              marginLeft: { xs: 'auto', md: '0' },
              marginRight: { xs: 'auto', md: '3rem' },
              marginBottom: { xs: '0', md: '2rem' }
            }}>
              <Image
                src={block.image.url ?? ''}
                width={250}
                height={250}
                alt={block.image.altText ?? ''}
              />
            </Box>}
          {serializeRichText(block.content as RichTextNode[])}
        </Box>);
    default:
      console.error(`blockType ${block.blockType} not currently supported`);
      return (<div></div>);
  }
});
