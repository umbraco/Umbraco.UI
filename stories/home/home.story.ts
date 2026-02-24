import type { StoryFn } from '@storybook/web-components-vite';
import { html } from 'lit';

import '../../src/components/symbol-expand/index.js';
import '../../src/components/loader-bar/index.js';
import '../../src/components/button/index.js';
import '../../src/components/input/index.js';
import '../../src/components/scroll-container/index.js';
import '../../src/components/box/index.js';
import '../../src/components/textarea/index.js';
import '../../src/components/combobox-list/index.js';
import '../../src/components/combobox/index.js';
import './home.story.element.ts';

export default {
  id: 'composite-home',
  title: 'Examples/Home',
  component: '',
};

export const Overview: StoryFn = () => html`<story-home></story-home>`;
