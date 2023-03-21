import { Story } from '@storybook/web-components';
import { html } from 'lit';

import '../auth-layout.example.ts';
import './new-user-password.example.ts';

export default {
  id: 'new-user-password-example',
  title: 'Examples/Auth/New User/Create Password',
  component: 'uui-new-user-password-example',
};

export const CreatePassword: Story = () => html`
  <uui-new-user-password-example></uui-new-user-password-example>
`;

export const OnAPage: Story = () => html`
  <uui-auth-layout-example>
    <uui-new-user-password-example></uui-new-user-password-example>
  </uui-auth-layout-example>
`;

OnAPage.parameters = {
  layout: 'fullscreen',
};
