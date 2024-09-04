import '.';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { spread } from '../../../storyhelpers';

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
    html`<uui-input-password ${spread(args)}></uui-input-password>`,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
