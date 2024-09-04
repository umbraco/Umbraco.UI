import '.';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { renderSlots, spread } from '../../../storyhelpers';
import { ArrayOfUmbracoWords } from '../../../storyhelpers/UmbracoWordGenerator';

import '@umbraco-ui/uui-tag/lib';
import '@umbraco-ui/uui-action-bar/lib';
import '@umbraco-ui/uui-button/lib';
import '@umbraco-ui/uui-icon/lib';

const meta: Meta = {
  id: 'uui-ref-node',
  component: 'uui-ref-node',
  title: 'Displays/References/Node',
  args: {
    name: 'Rabbit Suit Product Page',
    detail: 'path/to/nowhere',
    href: 'umbraco.com',
  },
  render: args =>
    html`<uui-ref-node ${spread(args)}>${renderSlots(args)}</uui-ref-node>`,
  decorators: [
    (Story: any) => html`<div style="max-width: 420px;">${Story()}</div>`,
  ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    'tag slot': html`<uui-tag size="s" slot="tag" color="positive"
      >Published</uui-tag
    >`,
    'actions slot': html`<uui-action-bar slot="actions"
      ><uui-button label="delete"
        ><uui-icon name="delete"></uui-icon></uui-button
    ></uui-action-bar>`,
  },
};
export const CustomIcon: Story = {
  args: {
    'icon slot': html`<uui-icon slot="icon" name="colorpicker"></uui-icon>`,
  },
};

export const Standalone: Story = {
  args: {
    standalone: true,
  },
};

export const Selectable: Story = {
  args: {
    selectable: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Readonly: Story = {
  args: {
    readonly: true,
  },
};
