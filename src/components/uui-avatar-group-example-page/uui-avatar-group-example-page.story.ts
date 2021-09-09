import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import './index';

export default {
  title: 'Displays/Avatar Group/Example Page',
  component: 'uui-avatar-group-example-page',
};

export const Basic: Story = () => html`
  <uui-avatar-group-example-page></uui-avatar-group-example-page>
`;
