import { html } from 'lit-html';
import { InterfaceLookNames } from '@umbraco-ui/uui-base/lib/types';
import { Story } from '@storybook/web-components';
import '@umbraco-ui/uui-tag/lib/index';

export default {
  title: 'Misc/Tag',
  component: 'uui-tag',
  id: 'uui-tag',
  args: {
    size: 'm',
    look: '',
    slot: 'Hello',
  },
  argTypes: {
    size: {
      options: ['xs', 's', 'm', 'l', 'xl'],
    },
    slot: { table: { category: 'slots' }, control: { type: 'text' } },
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
  },
};

const Template: Story = props =>
  html`
    <uui-tag .look=${props.look} .size=${props.size}>${props.slot}</uui-tag>
  `;

export const AAAOverview = Template.bind({});
AAAOverview.storyName = 'Overview';
AAAOverview.parameters = {
  docs: {
    source: {
      code: `<uui-tag>Hello</uui-tag>`,
    },
  },
};

export const Looks: Story = props =>
  html`
    <uui-tag .look=${props.look} .size=${props.size}>${props.slot}</uui-tag>
    <h5>Looks</h5>
    ${InterfaceLookNames.map(
      look => html`<uui-tag size="m" look="${look}">${look}</uui-tag>`
    )}
  `;

Looks.parameters = {
  docs: {
    source: {
      code: `
      <uui-tag size="m" look="primary">primary</uui-tag>
      <uui-tag size="m" look="secondary">secondary</uui-tag>
      <uui-tag size="m" look="outline">outline</uui-tag>
      <uui-tag size="m" look="placeholder">placeholder</uui-tag>
      <uui-tag size="m" look="positive">positive</uui-tag>
      <uui-tag size="m" look="warning">warning</uui-tag>
      <uui-tag size="m" look="danger">danger</uui-tag>
      `,
    },
  },
};

export const Sizes: Story = props =>
  html`
    <uui-tag .look=${props.look} .size=${props.size}>${props.slot}</uui-tag>
    <h5>Sizes</h5>
    <uui-tag size="xs" look="primary">extra small</uui-tag>
    <uui-tag size="s" look="primary">small</uui-tag>
    <uui-tag size="m" look="primary">medium</uui-tag>
    <uui-tag size="l" look="primary">large</uui-tag>
    <uui-tag size="xl" look="primary">extra large</uui-tag>
  `;

Sizes.parameters = {
  docs: {
    source: {
      code: `
      <uui-tag size="xs">extra small</uui-tag>
      <uui-tag size="s">small</uui-tag>
      <uui-tag size="m">medium</uui-tag>
      <uui-tag size="l">large</uui-tag>
      <uui-tag size="xl">extra large</uui-tag>
      `,
    },
  },
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
