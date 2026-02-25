import { StoryFn } from '@storybook/web-components-vite';
import { html } from 'lit';

import '../../../src/components/box/box.js';
import '../../../src/components/button/button.js';
import '../../../src/components/form/form.js';
import '../../../src/components/form-layout-item/form-layout-item.js';
import '../../../src/components/input-password/input-password.js';
import '../../../src/components/label/label.js';

import '../auth-layout.example.js';
import './new-user-password.example.js';

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
