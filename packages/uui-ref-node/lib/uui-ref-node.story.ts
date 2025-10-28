import '.';
import readme from '../README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { renderSlots, spread } from '../../../storyhelpers';

import '@umbraco-ui/uui-tag/lib';
import '@umbraco-ui/uui-action-bar/lib';
import '@umbraco-ui/uui-button/lib';
import '@umbraco-ui/uui-icon/lib';

const setFocus = () => {
  const refElement = document.querySelectorAll('#refNode');
  console.log(refElement[0]);
  refElement[0].focus();
};

const meta: Meta = {
  id: 'uui-ref-node',
  component: 'uui-ref-node',
  title: 'Displays/References/Node',
  args: {
    name: 'Rabbit Suit Product Page',
    detail: 'path/to/nowhere',
  },
  render: args =>
    html`<uui-ref-node ${spread(args)}>${renderSlots(args)}</uui-ref-node>`,
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

export const Href: Story = {
  args: {
    href: 'https://umbraco.com',
    target: '_blank',
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

export const Focus: Story = {
  render: args =>
    html`<uui-ref-node id="refNode" ${spread(args)}
      >${renderSlots(args)}</uui-ref-node-package
    >
      <button @click=${() => setFocus()}>Set focus</button>
    `,
};
