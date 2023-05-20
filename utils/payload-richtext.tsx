import { Box, Link, Typography } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
import escapeHTML from 'escape-html';
import { Fragment } from 'react';
import { Text } from 'slate';
import { RichTextNode } from './types';

function replaceEscapes(input: string) {
  return input.replaceAll('\n', '<br>');
}

export const serializeRichText = (children: RichTextNode[]) => children.map((node, i) => {
  if (Text.isText(node)) {
    let classNames = `${node.strikethrough ? 'richtext-strikethrough' : ''}`;
    let text = (<span className={classNames} dangerouslySetInnerHTML={{__html: replaceEscapes(node.text)}} />);

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

    // Handle other leaf types here...

    return (
      <Fragment key={i}>
        {text}
      </Fragment>
    );
  }

  if (!node) {
    return null;
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
          {serializeRichText(node.children)}
        </Typography>
      );
    case 'blockquote':
      return (
        <blockquote key={i}>
          {serializeRichText(node.children)}
        </blockquote>
      );
    case 'ul':
      return (
        <ul key={i}>
          {serializeRichText(node.children)}
        </ul>
      );
    case 'ol':
      return (
        <ol key={i}>
          {serializeRichText(node.children)}
        </ol>
      );
    case 'li':
      return (
        <li key={i}>
          <Typography key={i} variant='body1' component='span'>
            {serializeRichText(node.children)}
          </Typography>
        </li>
      );
    case 'link':
      return (
        <Link href={escapeHTML(node.url)} key={i}>
          {serializeRichText(node.children)}
        </Link>
      );
    case 'upload':
      return (
        <Box
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
          {serializeRichText(node.children)}
        </Typography>
      );
  }
});
