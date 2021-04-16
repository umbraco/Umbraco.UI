import { html } from 'lit-html';
import '.';
import '../uui-icon/index';
import {
  InterfaceLookNames,
  InterfaceLookType,
} from '../../../type/InterfaceLook';

export default {
  title: 'Basics/Inline Create Button',
  component: 'uui-inline-create-button',
};

export const Default = () => html`
  <div style="width: 50vw">
    <uui-inline-create-button
      @click=${(e: Event) => console.log(e)}
    ></uui-inline-create-button>
  </div>
`;
