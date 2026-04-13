import type { StoryFn } from '@storybook/web-components-vite';
import { html } from 'lit';

import '../../src/components/symbol-expand/symbol-expand.js';
import '../../src/components/loader-bar/loader-bar.js';
import '../../src/components/button/button.js';
import '../../src/components/input/input.js';
import '../../src/components/scroll-container/scroll-container.js';
import '../../src/components/box/box.js';
import '../../src/components/textarea/textarea.js';
import '../../src/components/combobox-list/combobox-list.js';
import '../../src/components/combobox/combobox.js';
import './home.story.element.js';

export default {
  id: 'composite-home',
  title: 'Examples/Home',
  component: '',
};

export const Overview: StoryFn = () => html`<story-home></story-home>`;
