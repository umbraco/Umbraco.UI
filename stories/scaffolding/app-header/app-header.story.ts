import { StoryFn } from '@storybook/web-components-vite';
import { html } from 'lit';

import '../../../src/components/tabs/tabs.js';
import '../../../src/components/icon-registry-essential/icon-registry-essential.js';
import '../../../src/components/symbol-more/symbol-more.js';
import '../../../src/components/menu-item/menu-item.js';
import '../../../src/components/avatar/avatar.js';

import './app-header.example.js';

export default {
  id: 'app-header-example',
  title: 'Examples/Scaffolding/App Header',
  component: 'uui-app-header-example',
};

export const AppHeader: StoryFn = () => html`
  <uui-app-header-example></uui-app-header-example>
`;
