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
  <uui-inline-create-button></uui-inline-create-button>
`;
