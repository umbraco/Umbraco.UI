import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

import './app-header.example.ts';

export default {
  id: 'app-header-example',
  title: 'Examples/Scaffolding/App Header',
  component: 'uui-app-header-example',
};

export const AppHeader: Story = () => html`
  <uui-app-header-example></uui-app-header-example>
`;
