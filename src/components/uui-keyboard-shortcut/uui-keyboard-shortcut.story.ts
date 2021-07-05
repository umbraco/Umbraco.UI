import { html } from 'lit-html';
import './index';

export default {
  title: 'Displays/Keyboard Shortcut',
  component: 'uui-keyboard-shortcut',
};

export const Basic = () => html`
  <uui-keyboard-shortcut>
    <uui-key>alt</uui-key>+<uui-key>shift</uui-key>+<uui-key>Z</uui-key>
  </uui-keyboard-shortcut>
`;
