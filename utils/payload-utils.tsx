import escapeHTML from 'escape-html';
import { Fragment } from 'react';
import { Text } from 'slate';
import { RichTextNode } from './types';

export const serializeRichText = (children: RichTextNode[]) => children.map((node, i) => {
  if (Text.isText(node)) {
    let text = <span dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} />;

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
      return (
        <h1 key={i}>
          {serializeRichText(node.children)}
        </h1>
      );
    // Iterate through all headings here...
    case 'h6':
      return (
        <h6 key={i}>
          {serializeRichText(node.children)}
        </h6>
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
          {serializeRichText(node.children)}
        </li>
      );
    case 'link':
      return (
        <a
          href={escapeHTML(node.url)}
          key={i}
        >
          {serializeRichText(node.children)}
        </a>
      );

    default:
      return (
        <p key={i}>
          {serializeRichText(node.children)}
        </p>
      );
  }
});
