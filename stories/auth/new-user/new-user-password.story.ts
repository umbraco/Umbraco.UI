import { StoryFn } from '@storybook/web-components';
import { html } from 'lit';

import '../auth-layout.example.ts';
import './new-user-password.example.ts';

export default {
  id: 'new-user-password-example',
  title: 'Examples/Auth/New User/Create Password',
  component: 'uui-new-user-password-example',
};

export const CreatePassword: StoryFn = () => html`
  <uui-new-user-password-example></uui-new-user-password-example>
`;

export const OnAPage: StoryFn = () => html`
  <uui-auth-layout-example>
    <uui-new-user-password-example></uui-new-user-password-example>
  </uui-auth-layout-example>
`;

OnAPage.parameters = {
  layout: 'fullscreen',
};
