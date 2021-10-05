import { html } from 'lit-html';
import { InterfaceLookNames } from '@umbraco-ui/uui-base/types';
import { Story } from '@storybook/web-components';
import '@umbraco-ui/uui-tag/index';

export default {
  title: 'Misc/Tag',
  component: 'uui-tag',
  args: {
    size: 'm',
    look: 'primary',
  },
  argTypes: {
    size: {
      options: ['xs', 's', 'm', 'l', 'xl'],
    },
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
  html` <uui-tag .look=${props.look} .size=${props.size}>Hello</uui-tag> `;

export const Overview = Template.bind({});

export const Looks: Story = props =>
  html`
    <uui-tag .look=${props.look} .size=${props.size}>Hello</uui-tag>
    <h5>Looks</h5>
    ${InterfaceLookNames.map(
      look => html`<uui-tag size="m" look="${look}">${look}</uui-tag>`
    )}
  `;

export const Sizes: Story = props =>
  html`
    <uui-tag .look=${props.look} .size=${props.size}>Hello</uui-tag>
    <h5>Sizes</h5>
    <uui-tag size="xs" look="primary">extra small</uui-tag>
    <uui-tag size="s" look="primary">small</uui-tag>
    <uui-tag size="m" look="primary">medium</uui-tag>
    <uui-tag size="l" look="primary">large</uui-tag>
    <uui-tag size="xl" look="primary">extra large</uui-tag>
  `;

// Would you ever put a button inside a tag?
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
