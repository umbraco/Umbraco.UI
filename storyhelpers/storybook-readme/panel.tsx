/* eslint-disable @typescript-eslint/no-unused-vars */
import 'github-markdown-css/github-markdown.css';

import { useParameter } from 'storybook/manager-api';
import { AddonPanel } from 'storybook/internal/components';
import React, { createContext, useContext, useEffect, useState } from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  vs as lightTheme,
  vscDarkPlus as darkTheme,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { PARAM_KEY } from './constants';

interface PanelProps {
  active: boolean;
}

interface ReadmeParameters {
  markdown: string;
}

const DarkModeContext = createContext(false);

// Defined at module scope (not inside ReadmePanel) so it is a stable component;
// the active theme is provided through context rather than a closure.
const CodeBlock: Components['code'] = ({
  className,
  children,
  node,
  ...rest
}) => {
  const useDarkMode = useContext(DarkModeContext);
  const match = /language-(\w+)/.exec(className || '');
  return match ? (
    <SyntaxHighlighter
      {...rest}
      PreTag="div"
      children={String(children).replace(/\n$/, '')}
      language={match[1]}
      style={useDarkMode ? darkTheme : lightTheme}
      useInlineStyles={true}
      customStyle={{
        background: 'none',
        border: 0,
        padding: 0,
        margin: 0,
        fontSize: 'inherit',
        lineHeight: 'inherit',
      }}
    />
  ) : (
    <code {...rest} className={className}>
      {children}
    </code>
  );
};

const markdownComponents: Components = { code: CodeBlock };

export const ReadmePanel: React.FC<PanelProps> = props => {
  const [useDarkMode, setUseDarkMode] = useState<boolean>();

  const readmeParameters = useParameter<ReadmeParameters | null>(
    PARAM_KEY,
    null,
  );
  const markdown = readmeParameters?.markdown;

  const updateUseDarkMode = (event: MediaQueryListEvent) => {
    setUseDarkMode(event.matches);
  };

  useEffect(() => {
    setUseDarkMode(
      globalThis.matchMedia('(prefers-color-scheme: dark)').matches,
    );
    globalThis
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', updateUseDarkMode);

    return function cleanup() {
      globalThis
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', updateUseDarkMode);
    };
  }, []);

  const renderReadme = () => (
    <DarkModeContext.Provider value={!!useDarkMode}>
      <ReactMarkdown
        children={markdown}
        remarkPlugins={[remarkGfm]}
        components={markdownComponents}
      />
    </DarkModeContext.Provider>
  );

  const renderNoReadme = () => (
    <div>
      <h3>There's no readme for this component</h3>
    </div>
  );

  return (
    <AddonPanel {...props}>
      <div className="markdown-body" style={{ padding: '32px' }}>
        {markdown ? renderReadme() : renderNoReadme()}
      </div>
    </AddonPanel>
  );
};
