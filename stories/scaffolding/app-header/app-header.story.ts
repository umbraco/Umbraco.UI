import { StoryFn } from '@storybook/web-components-vite';
import { html } from 'lit';

import '../../../src/components/tabs/index.js';
import '../../../src/components/icon-registry-essential/index.js';
import '../../../src/components/symbol-more/index.js';
import '../../../src/components/menu-item/index.js';
import '../../../src/components/avatar/index.js';

import './app-header.example.ts';

export default {
  id: 'app-header-example',
  title: 'Examples/Scaffolding/App Header',
  component: 'uui-app-header-example',
};

export const AppHeader: StoryFn = () => html`
  <uui-app-header-example></uui-app-header-example>
`;
