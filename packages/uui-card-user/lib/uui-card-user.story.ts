import '.';
import readme from '../README.md?raw';
import '@umbraco-ui/uui-tag/lib/index';
import '@umbraco-ui/uui-button/lib/index';
import '@umbraco-ui/uui-avatar/lib/index';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { spread, renderSlots } from '../../../storyhelpers';

const cardContent = html`<div style="margin-bottom: 12px">Editors</div>
  <div>Has not logged in yet</div>`;

/**
 * For more styling options see the [base card](/docs/uui-card--docs) component.
 */
const meta: Meta = {
  id: 'uui-card-user',
  component: 'uui-card-user',
  title: 'Displays/Cards/User',
  args: {
    name: 'John Rabbit',
    slot: cardContent,
  },
  render: args =>
    html`<uui-card-user ${spread(args)}>${renderSlots(args)}</uui-card-user>`,
  decorators: [
    (Story: any) =>
      html`<div
        style="display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 200px));">
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

export const Avatar: Story = {
  // prettier-ignore
  render: args => html`
<uui-card-user ${spread(args)}>
  <uui-avatar
    slot="avatar"
    size="m"
    name=${args.name}
    img-src="https://placedog.net/120/?random"></uui-avatar>
  ${cardContent}
</uui-card-user>
  `,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

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
    >`,
  },
};
