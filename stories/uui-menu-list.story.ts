import { html } from 'lit-html';
import '@umbraco-ui/uui-menu-list/lib/index';

export default {
  title: 'Buttons/Menu List',
  component: 'uui-menu-list',
};

export const Basic = () => html`
  <uui-menu-list style="width: 200px">
    <uui-menu-item label="I am a label HELLO" has-children>
      <uui-menu-item label="I am a label HELLO" has-children>
        <uui-menu-item label="I am a label HELLO"></uui-menu-item>
        <uui-menu-item label="I am a label HELLO"></uui-menu-item>
        <uui-menu-item label="I am a label HELLO"></uui-menu-item>
      </uui-menu-item>
      <uui-menu-item label="I am a label HELLO"></uui-menu-item>
    </uui-menu-item>
    <uui-menu-item label="I am a label HELLO"></uui-menu-item>
    <uui-menu-item label="I am a label HELLO"></uui-menu-item>
  </uui-menu-list>
`;

// export const nonInteractive = () => html`
//   <uui-menu-list non-interactive>
//     <uui-menu-item>One</uui-menu-item>
//     <uui-menu-item>Two</uui-menu-item>
//     <uui-menu-item>Three</uui-menu-item>
//   </uui-menu-list>
//   <div>You can still add selected attribute</div>
//   <uui-menu-list non-interactive>
//     <uui-menu-item>One</uui-menu-item>
//     <uui-menu-item selected>Two</uui-menu-item>
//     <uui-menu-item>Three</uui-menu-item>
//   </uui-menu-list>
// `;
