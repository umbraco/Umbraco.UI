import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-select/lib/index';

const options: Array<Option> = [
  { name: 'Carrot', value: 'orange', group: 'vegetables' },
  { name: 'Cucumber', value: 'green', group: 'vegetables' },
  { name: 'Aubergine', value: 'purple', group: 'vegetables' },
  { name: 'Blueberry', value: 'Blue', group: 'fruits' },
  { name: 'Banana', value: 'yellow', group: 'fruits' },
  { name: 'Strawberry', value: 'red', group: 'fruits' },
];

const preselectedOptions: Array<Option> = [
  { name: 'Carrot', value: 'orange', group: 'vegetables' },
  { name: 'Cucumber', value: 'green', group: 'vegetables' },
  { name: 'Aubergine', value: 'purple', group: 'vegetables', selected: true },
  { name: 'Blueberry', value: 'Blue', group: 'fruits' },
  { name: 'Banana', value: 'yellow', group: 'fruits' },
  { name: 'Strawberry', value: 'red', group: 'fruits' },
];

export default {
  id: 'uui-select',
  title: 'Inputs/Select',
  component: 'uui-select',
  args: {
    label: 'Slider label',
    placeholder: 'Select an option',
  },
  parameters: {
    docs: {
      source: {
        code: `<uui-select placeholder="Select an option"></uui-select>`,
      },
    },
  },
};

export const Overview: Story = props =>
  html`<uui-select
    .options=${options}
    placeholder="${props.placeholder}"></uui-select>`;

export const Preselected: Story = props =>
  html`<uui-select .options=${preselectedOptions}></uui-select>`;
