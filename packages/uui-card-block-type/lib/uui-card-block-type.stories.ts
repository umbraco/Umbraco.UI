import '.';
import '@umbraco-ui/uui-tag/lib/index';
import '@umbraco-ui/uui-button/lib/index';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { spread } from '../../../storyhelpers/spread-directive';

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
  // prettier-ignore
  render: args => html`
<uui-card-block-type ${spread(args, ['slot', 'tag', 'actions'])}>
  ${args.slot}
  ${args.tag}
  ${args.actions}
</uui-card-block-type>
  `,
  decorators: [
    (Story: any) =>
      html`<div
        style="display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 300px));">
        ${Story()}
      </div>`,
  ],
  argTypes: {
    background: { control: { type: 'color' } },
    slot: { control: { disable: true } },
    tag: { control: { disable: true } },
    actions: { control: { disable: true } },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Tag: Story = {
  args: {
    tag: html`<uui-tag slot="tag">Tag</uui-tag>`,
  },
};

export const Actions: Story = {
  args: {
    actions: html`<uui-button slot="actions" look="secondary" label="Remove"
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
    slot: html`<img
      src="https://umbraco.com/media/v5gf3w2a/umbraco-toolkit-wide.svg"
      alt="" />`,
  },
};
