import { StoryFn } from '@storybook/web-components-vite';
import { html } from 'lit';

import '../../../src/components/box/index.js';
import '../../../src/components/button/index.js';
import '../../../src/components/checkbox/index.js';
import '../../../src/components/form/index.js';
import '../../../src/components/form-layout-item/index.js';
import '../../../src/components/input/index.js';
import '../../../src/components/input-password/index.js';
import '../../../src/components/label/index.js';

import '../auth-layout.example.ts';
import './login.example.ts';

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
