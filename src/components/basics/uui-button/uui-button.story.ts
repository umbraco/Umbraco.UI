import { html } from 'lit-html';
import '.';
import '../uui-icon/index';
import '../uui-badge/index';
import {
  InterfaceLookNames,
  InterfaceLookType,
} from '../../../type/InterfaceLook';

export default {
  title: 'Basics/Button',
  component: 'uui-button',
};

export const Default = () => html` <uui-button>Basic button</uui-button> `;

export const PrimaryButton = () => html`
  <uui-button look="primary">Basic button</uui-button>
`;

export const PlaceholderButton = () => html`
  <uui-button look="placeholder" style="width:480px;">Add content</uui-button>
`;

export const Disabled = () => html`
  <uui-button disabled>Disabled button</uui-button>
`;

export const WithIcon = () => html`
  <uui-button look="danger">
    <uui-icon .name=${'bug'}></uui-icon>
  </uui-button>
`;

export const Compact = () => html`
  <uui-button look="danger" compact>
    <uui-icon .name=${'bug'}></uui-icon>
  </uui-button>
  <uui-button look="danger" compact>
    I have less padding on the x axis
  </uui-button>
`;

export const WithBadge = () => html` <uui-button look="primary">
  Button label
  <uui-badge>!</uui-badge>
</uui-button>`;

function uppercaseFirstLetter(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export const Styles = () => html`
  <uui-button>Default style</uui-button>
  <uui-button .look=${''} style="margin-left:12px;">Empty look</uui-button>
  ${InterfaceLookNames.map(
    (lookName: InterfaceLookType) =>
      html`<uui-button .look=${lookName} style="margin-left:12px;">
        ${uppercaseFirstLetter(lookName)} look
      </uui-button>`
  )}
`;
