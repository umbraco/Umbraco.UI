import '.';
import readme from '../README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { renderSlots, spread } from '../../../storyhelpers';

/**
 * uui-input-password extends uui-input. See [uui-input](/docs/uui-input--docs) for more details.
 */
const meta: Meta = {
  id: 'uui-input-password',
  component: 'uui-input-password',
  title: 'Inputs/Input Password',
  args: {
    label: 'Label',
  },
  render: args =>
    html`<uui-input-password ${spread(args)}
      >${renderSlots(args)}</uui-input-password
    >`,
  parameters: {
    readme: {
      markdown: readme,
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
