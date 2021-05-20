import { html } from 'lit-html';
import '.';
import '../uui-icon/index';

export default {
  title: 'Buttons/Inline Create Button',
  component: 'uui-inline-create-button',
};

export const Default = () => html`
  <div style="width: 50vw">
    <uui-inline-create-button></uui-inline-create-button>
  </div>
`;
export const Vertical = () => html`
  <div style="height: 20vw">
    <uui-inline-create-button vertical></uui-inline-create-button>
  </div>
`;
