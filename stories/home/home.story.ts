import type { StoryFn } from '@storybook/web-components-vite';
import { html } from 'lit';

import '@umbraco-ui/uui-symbol-expand/lib';
import '@umbraco-ui/uui-loader-bar/lib';
import '@umbraco-ui/uui-button/lib';
import '@umbraco-ui/uui-input/lib';
import '@umbraco-ui/uui-scroll-container/lib';
import '@umbraco-ui/uui-box/lib';
import '@umbraco-ui/uui-textarea/lib';
import '@umbraco-ui/uui-combobox-list/lib';
import '@umbraco-ui/uui-combobox/lib';
import './home.story.element.ts';

export default {
  id: 'composite-home',
  title: 'A-Composite/Home',
  component: '',
};

export const Overview: StoryFn = () => html`<story-home></story-home>`;
