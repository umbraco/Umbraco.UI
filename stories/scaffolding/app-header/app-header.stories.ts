import { StoryFn } from '@storybook/web-components';
import { html } from 'lit';

import '@umbraco-ui/uui-tabs/lib';
import '@umbraco-ui/uui-icon-registry-essential/lib';
import '@umbraco-ui/uui-symbol-more/lib';
import '@umbraco-ui/uui-menu-item/lib';
import '@umbraco-ui/uui-avatar/lib';

import './app-header.example.ts';

export default {
  id: 'app-header-example',
  title: 'Examples/Scaffolding/App Header',
  component: 'uui-app-header-example',
};

export const AppHeader: StoryFn = () => html`
  <uui-app-header-example></uui-app-header-example>
`;
