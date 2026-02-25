import { StoryFn } from '@storybook/web-components-vite';
import { html } from 'lit';

import '../../../src/components/box/box.js';
import '../../../src/components/button/button.js';
import '../../../src/components/form/form.js';
import '../../../src/components/form-layout-item/form-layout-item.js';
import '../../../src/components/input/input.js';
import '../../../src/components/label/label.js';

import '../auth-layout.example';
import './reset-password.example';

export default {
  id: 'reset-password-example',
  title: 'Examples/Auth/Reset Password',
  component: 'uui-reset-password-example',
};

export const ResetPassword: StoryFn = () => html`
  <uui-reset-password-example></uui-reset-password-example>
`;

export const OnAPage: StoryFn = () => html`
  <uui-auth-layout-example>
    <uui-reset-password-example></uui-reset-password-example>
  </uui-auth-layout-example>
`;

OnAPage.parameters = {
  layout: 'fullscreen',
};
