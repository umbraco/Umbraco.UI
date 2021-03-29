import { html } from 'lit-html';
import '.';
import '../uui-icon/index';
import {
  InterfaceLookNames,
  InterfaceLookType,
} from '../../../type/InterfaceLook';

export default {
  title: 'Basics/Badge',
  component: 'uui-badge',
};

export const Default = () => html` <div
  style="position:relative; width:10px; height:10px;"
>
  <uui-badge>!</uui-badge>
</div>`;

export const OnButton = () => html` <uui-button look="outline">
  Button label
  <uui-badge>!</uui-badge>
</uui-button>`;

export const Styles = () => html`
  ${InterfaceLookNames.map(
    (lookName: InterfaceLookType) =>
      html`<div
        style="position:relative; display:inline-block; width:10px; height:10px; margin:10px;"
      >
        <uui-badge .look=${lookName}> 1 </uui-badge>
      </div>`
  )}
`;
