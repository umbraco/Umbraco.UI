import '.';
import readme from '../README.md?raw';
import '@umbraco-ui/uui-tag/lib/index';
import '@umbraco-ui/uui-button/lib/index';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { spread, renderSlots } from '../../../storyhelpers';

/**
 * For more styling options see the [base card](/docs/uui-card--docs) component.
 */
const meta: Meta = {
  id: 'uui-card-block-type',
  component: 'uui-card-block-type',
  title: 'Displays/Cards/Block Type',
  args: {
    name: 'Name',
    description: 'Description',
    slot: html`<uui-icon name="wand"></uui-icon>`,
  },
  argTypes: {
    background: { control: { type: 'color' } },
  },
  render: args =>
    html`<uui-card-block-type ${spread(args)}
      >${renderSlots(args)}</uui-card-block-type
    >`,
  decorators: [
    (Story: any) =>
      html`<div
        style="display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 300px));">
        ${Story()}
      </div>`,
  ],
  parameters: {
    readme: {
      markdown: readme,
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Tag: Story = {
  args: {
    'tag slot': html`<uui-tag slot="tag">Tag</uui-tag>`,
  },
};

export const Actions: Story = {
  args: {
    'actions slot': html`<uui-button
      slot="actions"
      look="secondary"
      label="Remove"
      >Remove</uui-button
    > `,
  },
};

export const Background: Story = {
  args: {
    background: '#a8dbff',
  },
};

export const Image: Story = {
  args: {
    slot: html`<img src="https://placedog.net/1447/?random" alt="" />`,
  },
};

export const Selectable: Story = {
  args: {
    selectable: true,
  },
};

export const OnlySelectable: Story = {
  args: {
    selectable: true,
    selectOnly: true,
  },
};
