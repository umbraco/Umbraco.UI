import { Story } from '@storybook/web-components';
import { html } from 'lit';

import '../auth-layout.example.ts';
import './login.example.ts';

export default {
  id: 'login-example',
  title: 'Examples/Auth/Login',
  component: 'uui-login-example',
};

export const Login: Story = () => html`
  <uui-login-example></uui-login-example>
`;

export const OnAPage: Story = () => html`
  <uui-auth-layout-example>
    <uui-login-example></uui-login-example>
  </uui-auth-layout-example>
`;

OnAPage.parameters = {
  layout: 'fullscreen',
};
