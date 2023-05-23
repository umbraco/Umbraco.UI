/* eslint-disable import/default */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
import 'github-markdown-css/github-markdown.css';

import {
  addons,
  types,
  useStorybookApi,
  useChannel,
} from '@storybook/manager-api';
import { AddonPanel } from '@storybook/components';
import { STORY_RENDERED } from '@storybook/core-events';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  vs,
  vscDarkPlus,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';

const ADDON_ID = 'readme';
const PANEL_ID = `${ADDON_ID}/panel`;

const Readme = () => {
  const api = useStorybookApi();
  const [markdown, setMarkdown] = useState();
  const [useDarkMode, setUseDarkMode] = useState();

  useChannel({
    [STORY_RENDERED]: async () => {
      setMarkdown('');
      const componentPath = api.getCurrentStoryData().importPath.split('/');
      const component = componentPath[componentPath.length - 1].split('.')[0];
      if (component) {
        try {
          const readmeUrl = `../../packages/${component}/README.md`;
          const readme = await fetch(readmeUrl, {
            headers: { 'Content-Type': 'text/plain' },
          }).then(res => res.text());

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
        } catch (e) {
          console.warn('No README file found for', component);
        }
      }
    },
  });

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
              className="storybook-readme-syntax-highlighter"
              children={String(children).replace(/\n$/, '')}
              style={{
                ...(useDarkMode ? vscDarkPlus : vs),
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
      <h3>There's no readme wgr for this component</h3>
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
        <Readme />
      </AddonPanel>
    ),
  });
});
