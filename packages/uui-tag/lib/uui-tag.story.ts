import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit';
import readme from '../README.md?raw';

export default {
  title: 'Displays/Tag',
  component: 'uui-tag',
  id: 'uui-tag',
  args: {
    color: 'default',
    look: 'primary',
    fontSize: 12,
    slot: 'Hello',
  },
  argTypes: {
    slot: { control: { type: 'text' } },
    look: {
      control: {
        type: 'select',
      },
      options: ['default', 'primary', 'secondary', 'outline', 'placeholder'],
    },
    color: {
      control: {
        type: 'select',
      },
      options: ['default', 'positive', 'warning', 'danger'],
    },
    '--uui-tag-font-size': { control: { type: 'text' } },
    fontSize: { table: { category: 'Styles' } },
  },
  parameters: {
    readme: { markdown: readme },
  },
};

const Template: Story = props => html`
  <uui-tag
    color=${props.color}
    .look=${props.look}
    style="font-size: ${props.fontSize}px;"
    >${props.slot}</uui-tag
  >
`;

export const AAAOverview = Template.bind({});
AAAOverview.storyName = 'Overview';

export const Sizing: Story = props => html`
  <uui-tag style="font-size:${props.fontSize}px;">${props.slot}</uui-tag>
`;

Sizing.parameters = {
  controls: { include: ['fontSize', 'slot'] },
};

const looks = ['default', 'primary', 'secondary', 'outline', 'placeholder'];
const colors = ['default', 'positive', 'warning', 'danger'];

function uppercaseFirstLetter(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export const LooksAndColors: Story = () => html`
  ${colors.map(
    color => html`
      <h5>${uppercaseFirstLetter(color)}</h5>
      <div style="margin-bottom: 32px; display: flex; gap: 16px;">
        ${looks.map(
          look => html`
            <uui-tag
              .look=${look as any}
              .color=${color as any}
              style="margin-right:12px;"
              >${uppercaseFirstLetter(look)}</uui-tag
            >
          `,
        )}
      </div>
    `,
  )}
`;
