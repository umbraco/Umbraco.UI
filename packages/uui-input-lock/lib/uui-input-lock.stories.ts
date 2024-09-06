import '.';
import readme from '../README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { renderSlots, spread } from '../../../storyhelpers';

/**
 * uui-input-lock extends uui-input. See [uui-input](/docs/uui-input--docs) for more details.
 */
const meta: Meta = {
  id: 'uui-input-lock',
  component: 'uui-input-lock',
  title: 'Inputs/Input Lock',
  args: {
    label: 'Label',
  },
  render: args =>
    html`<uui-input-lock ${spread(args)}>${renderSlots(args)}</uui-input-lock>`,
  parameters: {
    readme: {
      markdown: readme,
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
