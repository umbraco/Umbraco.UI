import { StoryFn } from '@storybook/web-components-vite';
import { html } from 'lit';

import '../../../src/components/box/box.js';
import '../../../src/components/button/button.js';
import '../../../src/components/checkbox/checkbox.js';
import '../../../src/components/form/form.js';
import '../../../src/components/form-layout-item/form-layout-item.js';
import '../../../src/components/input/input.js';
import '../../../src/components/input-password/input-password.js';
import '../../../src/components/label/label.js';

import '../auth-layout.example.js';
import './login.example.js';

export default {
  id: 'login-example',
  title: 'Examples/Auth/Login',
  component: 'uui-login-example',
};

export const Login: StoryFn = () => html`
  <uui-login-example></uui-login-example>
`;

export const OnAPage: StoryFn = () => html`
  <uui-auth-layout-example>
    <uui-login-example></uui-login-example>
  </uui-auth-layout-example>
`;

OnAPage.parameters = {
  layout: 'fullscreen',
};
