import React from 'react';
import ReactMarkdown from 'react-markdown';

export const Readme = () => {
  const markdown = require('!raw-loader!./README.md').default;
  console.log('TEST', markdown);

  return (
    <div>
      <ReactMarkdown children={markdown} />
    </div>
  );
};
