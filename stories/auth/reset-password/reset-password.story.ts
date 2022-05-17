import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

import '../auth-layout.example.ts';
import './reset-password.example.ts';

export default {
  id: 'reset-password-example',
  title: 'Examples/Auth/Reset Password',
  component: 'uui-reset-password-example',
};

export const ResetPassword: Story = () => html`
  <uui-reset-password-example></uui-reset-password-example>
`;

export const OnAPage: Story = () => html`
  <uui-auth-layout-example>
    <uui-reset-password-example></uui-reset-password-example>
  </uui-auth-layout-example>
`;

OnAPage.parameters = {
  layout: 'fullscreen',
};
