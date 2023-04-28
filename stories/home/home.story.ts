import type { StoryFn } from '@storybook/web-components';
import { html } from 'lit';

import '@umbraco-ui/uui-symbol-expand/lib';
import '@umbraco-ui/uui-loader-bar/lib';
import './home.story.element.ts';

export default {
  id: 'composite-home',
  title: 'A-Composite/Home',
  component: '',
};

export const Overview: StoryFn = () => html`<story-home></story-home>`;
