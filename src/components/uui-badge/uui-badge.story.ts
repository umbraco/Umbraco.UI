import { html } from 'lit-element';
import '../uui-icon/index';
import {
  InterfaceLookNames,
  InterfaceLookType,
} from '@umbraco-ui/uui-base/lib/types';

export default {
  title: 'Misc/Badge',
  component: 'uui-badge',
};

export const Default = () => html` <div
  style="position:relative; width:10px; height:10px;">
  <uui-badge>!</uui-badge>
</div>`;

export const WithText = () => html` <div
  style="position:relative; width:50px; height:10px;">
  <uui-badge>Published</uui-badge>
</div>`;

export const WithIcon = () => html` <div
  style="position:relative; width:20px; height:10px;">
  <uui-badge look="secondary"><uui-icon name="info"></uui-icon></uui-badge>
</div>`;

export const OnButton = () => html` <uui-button look="outline">
  Button label
  <uui-badge>!</uui-badge>
</uui-button>`;

export const Styles = () => html`
  ${InterfaceLookNames.map(
    (lookName: InterfaceLookType) =>
      html`<div
        style="position:relative; display:inline-block; width:10px; height:10px; margin:10px;">
        <uui-badge .look=${lookName}> 1 </uui-badge>
      </div>`
  )}
`;
