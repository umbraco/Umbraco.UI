import { html } from 'lit-html';
import { InterfaceLookNames } from '@umbraco-ui/uui-base/types/InterfaceLook';
import { spreadProps } from './helper/SpreadPropsDirective';
import { Story } from '@storybook/web-components';
import '@umbraco-ui/uui-tag/src/index';

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

export const Overview: Story = props =>
  html` <uui-tag ${spreadProps(props)}>Hello</uui-tag> `;

export const Looks: Story = () =>
  html`${InterfaceLookNames.map(
    look => html`<uui-tag size="m" look="${look}">${look}</uui-tag>`
  )} `;

export const Sizes: Story = () =>
  html`
    <uui-tag size="xs" look="primary">extra small</uui-tag>
    <uui-tag size="s" look="primary">small</uui-tag>
    <uui-tag size="m" look="primary">medium</uui-tag>
    <uui-tag size="l" look="primary">large</uui-tag>
    <uui-tag size="xl" look="primary">extra large</uui-tag>
  `;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M401.431 167.814l-58.757-58.76-88.029 88.026-88.028-88.026-58.76 58.76 88.026 88.027-88.026 88.024 58.76 58.768 88.028-88.031 88.029 88.031 58.757-58.768-88.027-88.024z"/></svg>`;

export const WithButton: Story = () =>
  html`
    <uui-tag look="primary" size="xl">
      <span>Hello</span>
      <uui-button
        label="delete this"
        look="primary"
        compact
        style="margin-right:-10px; --uui-button-height:2em;">
        <uui-icon svg=${svg}></uui-icon>
      </uui-button>
    </uui-tag>
    <br />
    <uui-tag look="danger" size="m">
      <span>Hello</span>
      <uui-button
        label="delete this"
        look="danger"
        compact
        style="margin-right:-10px; --uui-button-height:1em;">
        <uui-icon svg=${svg}></uui-icon>
      </uui-button>
    </uui-tag>
  `;
