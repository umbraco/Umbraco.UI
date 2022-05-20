import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  title: 'Displays/Tag',
  component: 'uui-tag',
  id: 'uui-tag',
  args: {
    color: 'primary',
    fontSize: 12,
    slot: 'Hello',
  },
  argTypes: {
    slot: { control: { type: 'text' } },
    color: {
      options: ['primary', 'positive', 'warning', 'danger'],
      control: { type: 'select' },
    },
    '--uui-tag-font-size': { control: { type: 'text' } },
    fontSize: { table: { category: 'Styles' } },
  },
};

const Template: Story = props => html`
  <uui-tag color=${props.color} style="font-size: ${props.fontSize}px;"
    >${props.slot}</uui-tag
  >
`;

export const AAAOverview = Template.bind({});
AAAOverview.storyName = 'Overview';

export const Colors: Story = () =>
  html`
    <uui-tag color="primary">primary</uui-tag>
    <uui-tag color="positive">positive</uui-tag>
    <uui-tag color="warning">warning</uui-tag>
    <uui-tag color="danger">danger</uui-tag>
  `;

Colors.parameters = {
  controls: { disable: true },
  docs: {
    source: {
      code: `
<uui-tag color="primary">primary</uui-tag>
<uui-tag color="positive">positive</uui-tag>
<uui-tag color="warning">warning</uui-tag>
<uui-tag color="danger">danger</uui-tag>
      `,
    },
  },
};

export const Sizing: Story = props =>
  html`
    <uui-tag style="font-size:${props.fontSize}px;" color="primary"
      >${props.slot}</uui-tag
    >
  `;

Sizing.parameters = {
  controls: { include: ['fontSize', 'slot'] },
};
