/* eslint-disable import/default */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
import 'github-markdown-css/github-markdown.css';

import { addons, types } from '@storybook/addons';
import { AddonPanel } from '@storybook/components';
import { STORY_RENDERED } from '@storybook/core-events';
import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';

const ADDON_ID = 'readme';
const PANEL_ID = `${ADDON_ID}/panel`;

const Readme = props => {
  const [markdown, setMarkdown] = useState();
  useEffect(() => {
    const api = props.api;
    api.on(STORY_RENDERED, () => {
      setMarkdown('');
      const component = api.getCurrentStoryData().component;
      if (component) {
        const readme =
          require(`!raw-loader!../../packages/${component}/README.md`).default;

        setMarkdown(readme);

        const syntaxHighlighters = document.querySelectorAll(
          '.storybook-readme-syntax-highlighter'
        );

        if (syntaxHighlighters.length > 0) {
          for (const item of syntaxHighlighters) {
            const children = item.children;
            const parent = item.parentElement;

            parent.append(...children);
          }
        }
      }
    });
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
              className="storybook-readme-syntax-highlighter"
              children={String(children).replace(/\n$/, '')}
              style={{
                ...vs,
                'pre[class*="language-"]': { display: 'none' },
              }}
              language={match[1]}
              PreTag={'div'}
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
