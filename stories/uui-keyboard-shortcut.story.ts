import { html } from 'lit-html';
import '@umbraco-ui/uui-keyboard-shortcut/lib/index';

export default {
  title: 'Displays/Keyboard Shortcut',
  component: 'uui-keyboard-shortcut',
};

export const Overview = () => html`
  <uui-keyboard-shortcut>
    <uui-key>ALT</uui-key>
    +
    <uui-key>shift</uui-key>
    +
    <uui-key>&#8593;</uui-key>
    +
    <uui-key>z</uui-key>
  </uui-keyboard-shortcut>
`;
