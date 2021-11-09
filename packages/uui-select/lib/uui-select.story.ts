import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-select/lib/index';

const options: Array<Option> = [
  { name: 'Carrot', value: 'orange' },
  { name: 'Cucumber', value: 'green' },
  { name: 'Aubergine', value: 'purple' },
  { name: 'Blueberry', value: 'Blue' },
  { name: 'Banana', value: 'yellow' },
  { name: 'Strawberry', value: 'red' },
];

const preselectedOptions: Array<Option> = [
  { name: 'Carrot', value: 'orange', group: 'vegetables' },
  { name: 'Cucumber', value: 'green', group: 'vegetables' },
  { name: 'Aubergine', value: 'purple', group: 'vegetables', selected: true },
  { name: 'Blueberry', value: 'Blue', group: 'fruits' },
  { name: 'Banana', value: 'yellow', group: 'fruits' },
  { name: 'Strawberry', value: 'red', group: 'fruits' },
];

const groupedOptions: Array<Option> = [
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
    label: 'Favorite green',
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

export const AAAOverview: Story = props =>
  html`<uui-select
    .options=${options}
    .placeholder=${props.placeholder}
    .label=${props.label}></uui-select>`;
AAAOverview.storyName = 'Overview';

export const Preselected: Story = () =>
  html`<uui-select
    .options=${preselectedOptions}
    label="Preselected"></uui-select>`;

export const Groups: Story = () =>
  html`<uui-select .options=${groupedOptions} label="Grouped"></uui-select>`;

export const NoLabel: Story = () =>
  html`<uui-select .options=${preselectedOptions}> </uui-select>`;
