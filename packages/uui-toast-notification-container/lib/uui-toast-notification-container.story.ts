import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-toast-notification-container/lib/index';
import '@umbraco-ui/uui-toast-notification/lib/index';
import { UUIToastNotificationElement } from '@umbraco-ui/uui-toast-notification/lib/uui-toast-notification.element';
import '@umbraco-ui/uui-toast-notification-layout/lib/index';
import { UUIToastNotificationLayoutElement } from '@umbraco-ui/uui-toast-notification-layout/lib/uui-toast-notification-layout.element';

export default {
  id: 'uui-toast-notification-container',
  title: 'Displays/Toast Notification/Toast Notification Container',
  component: 'uui-toast-notification-container',
};

function addToast() {
  const con = document.querySelector('uui-toast-notification-container');
  const toast = document.createElement(
    'uui-toast-notification'
  ) as unknown as UUIToastNotificationElement;
  toast.look = ['', 'positive', 'danger'][Math.floor(Math.random() * 3)] as any;
  const toastLayout = document.createElement(
    'uui-toast-notification-layout'
  ) as unknown as UUIToastNotificationLayoutElement;
  toastLayout.headline = 'Demo toast';
  toast.appendChild(toastLayout);

  const messageEl = document.createElement('span');
  messageEl.innerHTML = 'Hello world message';
  toastLayout.appendChild(messageEl);

  if (con) {
    con.appendChild(toast);
  }
}
function removeToast() {
  const con = document.querySelector('uui-toast-notification-container');
  if (con) {
    const last = con.querySelector(
      'uui-toast-notification:first-of-type'
    ) as unknown as UUIToastNotificationElement;
    if (last) {
      con.removeChild(last);
    }
  }
}
function closeToast() {
  const con = document.querySelector('uui-toast-notification-container');
  if (con) {
    const last = con.querySelector(
      'uui-toast-notification:first-of-type'
    ) as unknown as UUIToastNotificationElement;
    if (last) {
      last.open = false;
    }
  }
}

export const Overview: Story = () =>
  html`
    <button @click=${addToast}>Open</button>
    <button @click=${removeToast}>Remove one</button>
    <button @click=${closeToast}>Close one</button>

    <uui-toast-notification-container
      auto-close="7000"
      bottom-up
      style="top:0; left:0; right:0; height: 100vh; padding: var(--uui-size-layout-1);"></uui-toast-notification-container>
  `;
