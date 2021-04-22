import { html } from 'lit-html';
import {
  InterfaceLookNames,
  InterfaceLookType,
} from '../../../type/InterfaceLook';

import './index';

export default {
  title: 'Basics/Action Group',
  component: 'uui-action-group',
};

const buttons = ['bug', 'info', 'delete'];

export const Basic = () =>
  html`<uui-action-group
    >${buttons.map(
      el =>
        html`<uui-button look="secondary"
          ><uui-icon name="${el}"></uui-icon
        ></uui-button>`
    )}</uui-action-group
  >`;

export const AllStyles = () => html`
  ${InterfaceLookNames.map(
    (lookName: InterfaceLookType) =>
      html` <uui-action-group>
          ${buttons.map(
            button => html`<uui-button .look=${lookName}>
              <uui-icon name="${button}"></uui-icon>
            </uui-button>`
          )} </uui-action-group
        ><br /><br /><br />`
  )}
`;
