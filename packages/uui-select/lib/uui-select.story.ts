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

const preselectedOptions: Array<Option> = options.map(option => {
  if (option.name === 'Aubergine') return { ...option, selected: true };
  return option;
});

const groupedOptions: Array<Option> = options.map(option => {
  if (options.indexOf(option) <= 2) return { ...option, group: 'Vegetables' };
  return { ...option, group: 'Fruits' };
});

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

export const Groups: Story = props =>
  html`<uui-select
    .options=${groupedOptions}
    label="Grouped"
    .placeholder=${props.placeholder}></uui-select>`;

export const DisabledGroups: Story = props =>
  html`<uui-select
    .options=${groupedOptions}
    label="Disabled Group"
    disabledGroups="vegetables"
    .placeholder=${props.placeholder}></uui-select>`;

export const NoLabel: Story = () =>
  html`<uui-select .options=${preselectedOptions}> </uui-select>`;
