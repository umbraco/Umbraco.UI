/* eslint-disable import/default */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
import 'github-markdown-css/github-markdown.css';

import { addons, types, useParameter } from 'storybook/manager-api';
import { AddonPanel } from 'storybook/internal/components';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  vs as lightTheme,
  vscDarkPlus as darkTheme,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';

const ADDON_ID = 'readme';
const PANEL_ID = `${ADDON_ID}/panel`;
const PARAM_KEY = 'readme';

const Readme = () => {
  const [useDarkMode, setUseDarkMode] = useState();

  const readmeParameters = useParameter(PARAM_KEY, null);
  const markdown = readmeParameters ? readmeParameters.markdown : null;

  const updateUseDarkMode = event => {
    setUseDarkMode(event.matches);
  };

  useEffect(() => {
    setUseDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', updateUseDarkMode);

    return function cleanup() {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', updateUseDarkMode);
    };
  }, []);

  const renderReadme = () => (
    <ReactMarkdown
      children={markdown}
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              {...props}
              children={String(children).replace(/\n$/, '')}
              style={useDarkMode ? darkTheme : lightTheme}
              customStyle={{
                background: 'none',
                border: 0,
                padding: 0,
                margin: 0,
                fontSize: 'inherit',
                lineHeight: 'inherit',
              }}
              language={match[1]}
              PreTag={'div'}
              useInlineStyles={true}
            />
          ) : (
            <code {...props} className={className}>
              {children}
            </code>
          );
        },
      }}
    />
  );

  const renderNoReadme = () => (
    <div>
      <h3>There's no readme for this component</h3>
    </div>
  );

  return (
    <div className="markdown-body" style={{ padding: '32px' }}>
      {markdown ? renderReadme() : renderNoReadme()}
    </div>
  );
};

addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Readme',
    render: ({ active, key }) => (
      <AddonPanel active={active} key={key}>
        <Readme />
      </AddonPanel>
    ),
  });
});
