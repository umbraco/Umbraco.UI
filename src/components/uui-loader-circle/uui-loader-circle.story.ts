import { html } from 'lit-html';
import {
  InterfaceLookNames,
  InterfaceLookType,
} from '../../type/InterfaceLook';
import './index';

export default {
  title: 'Symbols/Loader Circle',
  component: 'uui-loader-circle',
};

export const Overview = () => html`
  <div style="width: 24px">
    <uui-loader-circle></uui-loader-circle>
  </div>
`;

export const Styles = () => html`
  <uui-button>Default style</uui-button>
  <uui-button .look=${''} style="margin-left:12px;">Empty look</uui-button>
  ${InterfaceLookNames.map(
    (lookName: InterfaceLookType) =>
      html`<uui-button .look=${lookName} style="margin-left:12px;">
        ${lookName} look <uui-loader-circle></uui-loader-circle>
      </uui-button>`
  )}
`;
