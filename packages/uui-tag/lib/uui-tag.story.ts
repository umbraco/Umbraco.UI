import '.';

import { Story } from '@storybook/web-components';
import { InterfaceLookNames } from '@umbraco-ui/uui-base/lib/types';
import { html } from 'lit-html';

export default {
  title: 'Displays/Tag',
  component: 'uui-tag',
  id: 'uui-tag',
  args: {
    look: '',
    fontSize: 12,
    slot: 'Hello',
  },
  argTypes: {
    slot: { control: { type: 'text' } },
    look: {
      options: [
        'primary',
        'secondary',
        'outline',
        'placeholder',
        'positive',
        'warning',
        'danger',
      ],
    },
    '--uui-tag-font-size': { control: { type: 'text' } },
    fontSize: { table: { category: 'Styles' } },
  },
};

const Template: Story = props => html`
  <uui-tag look=${props.look} style="font-size: ${props.fontSize}px;"
    >${props.slot}</uui-tag
  >
`;

export const AAAOverview = Template.bind({});
AAAOverview.storyName = 'Overview';

export const Looks: Story = () =>
  html`
    ${InterfaceLookNames.map(
      look => html`<uui-tag look="${look}">${look}</uui-tag>`
    )}
  `;

Looks.parameters = {
  docs: {
    source: {
      code: `
<uui-tag look="primary">primary</uui-tag>
<uui-tag look="secondary">secondary</uui-tag>
<uui-tag look="outline">outline</uui-tag>
<uui-tag look="placeholder">placeholder</uui-tag>
<uui-tag look="positive">positive</uui-tag>
<uui-tag look="warning">warning</uui-tag>
<uui-tag look="danger">danger</uui-tag>
      `,
    },
  },
};

export const Sizing: Story = props =>
  html`
    <uui-tag style="font-size:${props.fontSize}px;" look="primary"
      >${props.slot}</uui-tag
    >
  `;

Sizing.parameters = {
  controls: { include: ['fontSize', 'slot'] },
};

// - Would you ever put a button inside a tag? - asked Jesper.
// - Yes, when the tag has to have an action on it, if for example user needs to remove it. - I replied.

// export const WithButton: Story = () =>
//   html`
//     <uui-tag look="primary" size="xl">
//       <span>Hello</span>
//       <uui-button
//         label="delete this"
//         look="primary"
//         compact
//         style="margin-right:-10px; --uui-button-height:2em;">
//         <uui-icon svg=${svg}></uui-icon>
//       </uui-button>
//     </uui-tag>
//     <br />
//     <uui-tag look="danger" size="m">
//       <span>Hello</span>
//       <uui-button
//         label="delete this"
//         look="danger"
//         compact
//         style="margin-right:-10px; --uui-button-height:1em;">
//         <uui-icon svg=${svg}></uui-icon>
//       </uui-button>
//     </uui-tag>
//   `;
