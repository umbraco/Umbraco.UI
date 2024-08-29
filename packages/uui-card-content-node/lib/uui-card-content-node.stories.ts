import '.';
import '@umbraco-ui/uui-tag/lib/index';
import '@umbraco-ui/uui-button/lib/index';
import { html, nothing, TemplateResult } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { spread, renderSlots } from '../../../storyhelpers';

/* TODO: we should make some kind of component for this data layout */
// prettier-ignore
const cardContent = html`<ul style="list-style: none; padding-inline-start: 0px; margin: 0;">
    <li><span style="font-weight: 700">Created:</span> Yesterday</li>
    <li>
      <span style="font-weight: 700">Last Edited: </span> 2021-03-15 09:29
    </li>
    <li><span style="font-weight: 700">Some property:</span> Some value</li>
    <li>
      <span style="font-weight: 700">Another property:</span> Another value
    </li>
  </ul>`;

/**
 * For more styling options see the [base card](/docs/uui-card--docs) component.
 */
const meta: Meta = {
  id: 'uui-card-content-node',
  component: 'uui-card-content-node',
  title: 'Displays/Cards/Content Node',
  args: {
    name: 'Name',
    slot: cardContent,
  },
  // prettier-ignore
  render: args => html`
<uui-card-content-node ${spread(args)}>
${renderSlots([args.slot, args.tag, args.actions, args.icon])}
</uui-card-content-node>
  `,
  decorators: [
    (Story: any) =>
      html`<div
        style="display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 300px));">
        ${Story()}
      </div>`,
  ],
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
    >`,
  },
};

export const CustomIcon: Story = {
  args: {
    icon: html`<uui-icon slot="icon" name="wand"></uui-icon>`,
  },
};
