import '.';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { renderSlots, spread } from '../../../storyhelpers';

import '@umbraco-ui/uui-toast-notification-layout/lib';

const meta: Meta = {
  id: 'uui-toast-notification',
  component: 'uui-toast-notification',
  title: 'Displays/Toast Notification/Toast Notification',
  args: {
    open: true,
  },
  argTypes: {
    color: {
      options: ['', 'default', 'positive', 'warning', 'danger'],
    },
    headline: { control: { type: 'text' } },
  },
  render: args =>
    html`<uui-toast-notification ${spread(args)}
      ><uui-toast-notification-layout .headline=${args.headline}
        >${renderSlots(args)}</uui-toast-notification-layout
      ></uui-toast-notification
    >`,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    headline: 'Toast notification layout headline',
    slot: 'Message to be displayed, shown by toast notification layout.',
  },
};

export const ErrorStyle: Story = {
  args: {
    headline: 'Document could not be published!',
    slot: html`An error occurred while attempting to contact the server. Please
      check your internet connection.
      <uui-button slot="actions" look="primary" color="danger"
        >Retry</uui-button
      >`,
    color: 'danger',
  },
};

export const PositiveStyle: Story = {
  args: {
    headline: 'Document published!',
    slot: html`This document is now saved and published.
      <uui-button slot="actions" look="primary" color="positive"
        >View in browser</uui-button
      >`,
    color: 'positive',
  },
};

export const CustomLayout: Story = {
  args: {
    slot: "It's recommended to use the 'uui-toast-notification-layout' component as the layout for your toasts. This will ensure consistency in toast appearances, and help achieve the best user experience. If 'uui-toast-notification-layout' does not provide the options to solve your needs, it is possible to append anything within the toast-notification component. But please consider this very carefully.",
    color: 'danger',
  },
  render: args => html`
    <uui-toast-notification ${spread(args)}
      >${renderSlots(args)}</uui-toast-notification
    >
  `,
};
