import { SITE_NAME } from '@/utils/constants';
import { Box } from '@mui/material';
import { DiscussionEmbed } from 'disqus-react';
import Image from 'next/image';
import { PageData, PayloadMedia } from '../utils/payload-types';
import { PayloadBlock } from '../utils/payload-types-block';
import { RichTextNode } from '../utils/types';
import ContentRichText from './ContentRichText';
import PostTile from './PostTile';

type Props = {
  block: PayloadBlock;
}

function ContentBlock({ block }: Props) {
  switch (block.blockType) {
    case 'rich-text':
      return (
        <div key={block.id} className='rich-text-block'>
         <ContentRichText content={block.content} />
        </div>);
    case 'tile-sheet':
      return (
        <Box key={block.id} sx={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', mt: '1.5rem' }}>
          {block.tiles && block.tiles.map((tile, index) => (
            <PostTile 
              key={tile.id || index}
              title={tile.title}
              description={tile.description}
              url={(tile.link as PageData).breadcrumbs?.at(-1)?.url ?? '/'}
              image={tile.image as PayloadMedia}
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
                src={(block.image as PayloadMedia).url ?? ''}
                width={250}
                height={250}
                alt={(block.image as PayloadMedia).altText ?? ''}
              />
            </Box>}
            <ContentRichText content={block.content as RichTextNode[]} />
        </Box>);
    case 'disqus-comments':
      return (
        <DiscussionEmbed
          shortname={SITE_NAME}
          config={{
            url: block.url,
            identifier: block.identifier
          }} />
        );
    default:
      console.error(`[ContentBlock] blockType ${block.blockType} not currently supported`);
      return (<div></div>);
  }
}
export default ContentBlock;