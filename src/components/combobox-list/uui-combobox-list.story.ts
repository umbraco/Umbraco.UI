import '.';
import readme from './README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { spread } from '../../../storyhelpers';

const meta: Meta = {
  id: 'uui-combobox-list',
  component: 'uui-combobox-list',
  title: 'Inputs/Combobox/Combobox List',
  render: args =>
    html`<uui-combobox-list ${spread(args)}>
      <uui-combobox-list-option>apple</uui-combobox-list-option>
      <uui-combobox-list-option>orange</uui-combobox-list-option>
      <uui-combobox-list-option>lemon</uui-combobox-list-option>
    </uui-combobox-list>`,
  parameters: {
    readme: {
      markdown: readme,
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Disabled: Story = {
  render: args =>
    html`<uui-combobox-list ${spread(args)}>
      <uui-combobox-list-option>apple</uui-combobox-list-option>
      <uui-combobox-list-option disabled>orange</uui-combobox-list-option>
      <uui-combobox-list-option>lemon</uui-combobox-list-option>
    </uui-combobox-list>`,
};
