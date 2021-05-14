import { html } from 'lit-html';
import './index';

export default {
  title: 'Displays/Avatar Group',
  component: 'uui-avatar-group',
};

export const Basic = () => html`
  <uui-avatar-group>
    <uui-avatar title="First Last"></uui-avatar>
    <uui-avatar title="First Last"></uui-avatar>
    <uui-avatar title="First Last"></uui-avatar>
    <uui-avatar title="First Last"></uui-avatar>
  </uui-avatar-group>
`;

export const Limit = () => html`
  <uui-avatar-group .limit="${2}">
    <uui-avatar title="First Last"></uui-avatar>
    <uui-avatar title="First Last"></uui-avatar>
    <uui-avatar title="First Last"></uui-avatar>
    <uui-avatar title="First Last"></uui-avatar>
  </uui-avatar-group>
`;
