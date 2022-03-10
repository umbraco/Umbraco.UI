/* eslint-disable import/default */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState, useEffect } from 'react';
import { addons, types } from '@storybook/addons';
import { AddonPanel } from '@storybook/components';
import ReactMarkdown from 'react-markdown';
import { STORY_RENDERED } from '@storybook/core-events';
import 'github-markdown-css/github-markdown.css';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ADDON_ID = 'readme';
const PANEL_ID = `${ADDON_ID}/panel`;

const Readme = props => {
  const [markdown, setMarkdown] = useState();

  useEffect(() => {
    const api = props.api;
    api.on(STORY_RENDERED, eventData => {
      const component = api.getCurrentStoryData().component;

      const readme =
        require(`!raw-loader!../../packages/${component}/README.md`).default;

      setMarkdown(readme);
    });
    return () => {
      //TODO: find out how to remove the api event listener
    };
  }, []);

  return (
    <div className="markdown-body" style={{ padding: '32px' }}>
      <ReactMarkdown
        children={markdown}
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            console.log('HERE', props);
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                style={vs}
                language={match[1]}
                PreTag={React.Fragment}
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      />
    </div>
  );
};

addons.register(ADDON_ID, api => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Readme',
    render: ({ active, key }) => (
      <AddonPanel active={active} key={key}>
        <Readme api={api} />
      </AddonPanel>
    ),
  });
});
