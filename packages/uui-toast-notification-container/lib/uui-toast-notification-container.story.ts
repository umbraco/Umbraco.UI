import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-toast-notification-container/lib/index';
import '@umbraco-ui/uui-toast-notification/lib/index';
import { UUIToastNotificationElement } from '@umbraco-ui/uui-toast-notification/lib/uui-toast-notification.element';

export default {
  id: 'uui-toast-notification-container',
  title: 'Displays/Toast Notification Container',
  component: 'uui-toast-notification-container',
};

function addToast() {
  const con = document.querySelector('uui-toast-notification-container');
  const toast = document.createElement(
    'uui-toast-notification'
  ) as unknown as UUIToastNotificationElement;
  toast.look = ['', 'positive', 'danger'][Math.floor(Math.random() * 3)] as any;
  toast.headline = 'Demo toast';

  const pEl = document.createElement('span');
  pEl.innerHTML = 'Hello world message';
  toast.appendChild(pEl);

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
      auto-close="8000"
      bottom-up
      style="top:0; left:0; right:0; height: 100vh; padding: var(--uui-size-layout-1);"></uui-toast-notification-container>
  `;
