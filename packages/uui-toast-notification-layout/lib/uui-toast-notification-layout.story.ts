import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-toast-notification-layout/lib/index';

export default {
  id: 'uui-toast-notification-layout',
  title: 'Displays/Toast Notification/Toast Notification Layout',
  component: 'uui-toast-notification-layout',
};

export const Overview: Story = () =>
  html`<uui-toast-notification-layout headline="Headline">
    Use this component within your dialog-element.
    <uui-button slot="actions" look="primary" label="button"></uui-button>
  </uui-toast-notification-layout>`;
