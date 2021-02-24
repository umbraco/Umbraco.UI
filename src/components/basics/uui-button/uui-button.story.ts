import { html } from 'lit-html';
import '.';
import '../uui-icon/index';
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

export const SlotButton = () => html`
  <uui-button look="slot" style="width:480px;">Add content</uui-button>
`;

export const Disabled = () => html`
  <uui-button disabled>Disabled button</uui-button>
`;

export const Loading = () => html`
  <uui-button loading>Button waiting for something</uui-button>
`;

export const WithIcon = () => html`
  <uui-button>
    <uui-icon .name=${'bug'}></uui-icon>
    Button waiting for something
  </uui-button>
`;

function uppercaseFirstLetter(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export const Styles = () => html`
  <uui-button>Default style</uui-button>
  <uui-button .look=${''} style="margin-left:12px;">Empty look</uui-button>
  ${InterfaceLookNames.map(
    (lookName: InterfaceLookType) =>
      html`<uui-button .look=${lookName} style="margin-left:12px;"
        >${uppercaseFirstLetter(lookName)} look</uui-button
      >`
  )}
`;
