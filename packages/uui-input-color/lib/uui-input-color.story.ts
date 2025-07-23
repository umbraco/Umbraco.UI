import type { Meta, StoryObj } from '@storybook/web-components';

import './uui-input-color.element';
import type { UUIInputColorElement } from './uui-input-color.element';
import readme from '../README.md?raw';
import { html } from 'lit';
import { renderSlots, spread } from '../../../storyhelpers';

/**
 * uui-input-color extends uui-input. See [uui-input](/docs/uui-input--docs) for more details.
 */
const meta: Meta<UUIInputColorElement> = {
  id: 'uui-input-color',
  title: 'Inputs/Input Color',
  component: 'uui-input-color',
  args: {
    label: 'Label',
  },
  render: args =>
    html`<uui-input-color ${spread(args)}
      >${renderSlots(args)}</uui-input-color
    >`,
  parameters: {
    readme: {
      markdown: readme,
    },
  },
};

export default meta;
type Story = StoryObj<UUIInputColorElement>;

export const Overview: Story = {};

export const Empty: Story = {
  args: {
    value: '',
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
