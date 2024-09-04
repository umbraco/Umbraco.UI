import '.';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { renderSlots, spread } from '../../../storyhelpers';

import '@umbraco-ui/uui-button';

/**
 * Default dialog layout, used with the [uui-dialog](/docs/uui-dialog--docs) component
 */
const meta: Meta = {
  id: 'uui-dialog-layout',
  component: 'uui-dialog-layout',
  title: 'Displays/Dialog/Dialog Layout',
  render: args =>
    html`<uui-dialog-layout ${spread(args)}
      >${renderSlots(args)}</uui-dialog-layout
    >`,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    headline: 'Headline',
    slot: html`<p>
      The dialog layout component provides a default layout to the dialog
      component. This is used as a direct child of the dialog element component.
      Please view Dialog stories for examples.
    </p>`,
    'actions slot': html`<uui-button slot="actions">Cancel</uui-button>
      <uui-button slot="actions" look="primary" color="positive"
        >Action</uui-button
      >`,
  },
};

export const HeadlineSlot: Story = {
  args: {
    ...Default.args,
    headline: '',
    'headline slot': html`<span style="color: blue" slot="headline"
      >My custom headline <uui-icon name="favorite"></uui-icon
    ></span>`,
  },
};
