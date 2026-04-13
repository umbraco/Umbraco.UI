import './toast-notification-layout.js';
import readme from './README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { renderSlots, spread } from '../../../storyhelpers';

const meta: Meta = {
  id: 'uui-toast-notification-layout',
  component: 'uui-toast-notification-layout',
  title: 'Displays/Toast Notification/Toast Notification Layout',
  render: args =>
    html`<uui-toast-notification-layout ${spread(args)}
      >${renderSlots(args)}</uui-toast-notification-layout
    >`,
  decorators: [
    (Story: any) => html`<div style="max-width:200px;">${Story()}</div>`,
  ],
  parameters: {
    readme: {
      markdown: readme,
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    headline: 'Headline',
    slot: html`Use this component within your dialog-element.
      <uui-button slot="actions" look="primary" label="button"></uui-button>`,
  },
};

export const SlottedContent: Story = {
  args: {
    'headline slot': html` <h4 slot="headline">Slotted Headline</h4>`,
    slot: 'This is the default slot',
    'actions slot': html`<uui-action-bar slot="actions">
      <uui-button look="primary"><uui-icon name="add"></uui-icon></uui-button>
      <uui-button look="outline"
        ><uui-icon name="delete"></uui-icon
      ></uui-button>
    </uui-action-bar>`,
  },
};
