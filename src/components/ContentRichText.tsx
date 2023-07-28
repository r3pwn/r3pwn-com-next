import { Box, Link, Typography } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
import escapeHTML from 'escape-html';
import { Fragment } from 'react';
import { Text } from 'slate';
import { RichTextNode } from '../utils/types';

type Props = {
  content: RichTextNode[];
}

function replaceEscapes(input: string) {
  return input.replaceAll('\n', '<br>');
}

function ContentRichText({ content }: Props) {
  return (
    <>
      {content.map((node, i) => {
        if (Text.isText(node)) {
          let classNames = `${node.strikethrough ? 'richtext-strikethrough' : ''}`;
          let text = !!classNames ? 
            (<span key={i} className={classNames} dangerouslySetInnerHTML={{__html: replaceEscapes(node.text)}} />) :
            node.text;

          if (node.bold) {
            text = (
              <strong key={i}>
                {text}
              </strong>
            );
          }

          if (node.code) {
            text = (
              <code key={i}>
                {text}
              </code>
            );
          }

          if (node.italic) {
            text = (
              <em key={i}>
                {text}
              </em>
            );
          }
          
          return (
            <Fragment key={i}>
              {text}
            </Fragment>
          );
        }

        switch (node.type) {
          case 'h1':
          case 'h2':
          case 'h3':
          case 'h4':
          case 'h5':
          case 'h6':
            return (
              <Typography key={i} variant={node.type as Variant}>
                <ContentRichText content={node.children} />
              </Typography>
            );
          case 'blockquote':
            return (
              <blockquote key={i}>
                <ContentRichText content={node.children} />
              </blockquote>
            );
          case 'ul':
            return (
              <ul key={i}>
                <ContentRichText content={node.children} />
              </ul>
            );
          case 'ol':
            return (
              <ol key={i}>
                <ContentRichText content={node.children} />
              </ol>
            );
          case 'li':
            return (
              <li key={i}>
                <Typography key={i} variant='body1' component='span'>
                  <ContentRichText content={node.children} />
                </Typography>
              </li>
            );
          case 'link':
            return (
              <Link href={escapeHTML(node.url)} key={i}>
                <ContentRichText content={node.children} />
              </Link>
            );
          case 'upload':
            return (
              <Box
                key={i}
                component="img"
                sx={{
                  height: '100%',
                  width: '80%',
                  marginLeft: '10%'
                }}
                alt={node.value?.altText}
                src={node.value?.url}
              />
            )
          default:
            return (
              <Typography key={i} variant='body1'>
                <ContentRichText content={node.children} />
              </Typography>
            );
        }}
      )}
    </>
  )
}
export default ContentRichText;