import '.';
import readme from '../README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { renderSlots, spread } from '../../../storyhelpers';

const meta: Meta = {
  id: 'uui-ref-node-form',
  component: 'uui-ref-node-form',
  title: 'Displays/References/Form',
  args: {
    name: 'Newsletter Signup',
    detail: 'Accept and signup for newsletter',
  },
  render: args =>
    html`<uui-ref-node-form ${spread(args)}
      >${renderSlots(args)}</uui-ref-node-form
    >`,
  decorators: [
    (Story: any) => html`<div style="max-width: 420px;">${Story()}</div>`,
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
