import '.';
import readme from '../README.md?raw';
import '@umbraco-ui/uui-tag/lib/index';
import '@umbraco-ui/uui-button/lib/index';
import '@umbraco-ui/uui-symbol-file/lib/index';
import '@umbraco-ui/uui-symbol-folder/lib/index';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { spread, renderSlots } from '../../../storyhelpers';

/**
 * For more styling options see the [base card](/docs/uui-card--docs) component.
 */
const meta: Meta = {
  id: 'uui-card-media',
  component: 'uui-card-media',
  title: 'Displays/Cards/Media',
  args: {
    name: 'The card',
    fileExt: 'jpg',
  },
  render: args =>
    html`<uui-card-media ${spread(args)}>${renderSlots(args)}</uui-card-media>`,
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

export const WithDetail: Story = {
  args: {
    detail: 'The detail',
  },
};

export const Folder: Story = {
  args: {
    fileExt: '',
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

export const Href: Story = {
  args: {
    'actions slot': html`<uui-button
      slot="actions"
      look="secondary"
      label="Remove"
      >Remove</uui-button
    >`,
    selectable: true,
    href: 'https://umbraco.com',
    target: '_blank',
  },
};

export const Image: Story = {
  args: {
    slot: html`<img src="https://placedog.net/1447/?random" alt="" />`,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const Selectable: Story = {
  args: {
    selectable: true,
    selectOnly: true,
  },
};
