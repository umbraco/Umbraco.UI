import { html } from 'lit-html';
import './index';

export default {
  title: 'Displays/Avatar Group',
  component: 'uui-avatar-group',
};

export const Basic = () => html`
  <uui-avatar-group style="font-size: 2rem">
    <uui-avatar title="First Last"></uui-avatar>
    <uui-avatar title="First Last"></uui-avatar>
    <uui-avatar title="First Last"></uui-avatar>
    <uui-avatar title="First Last"></uui-avatar>
  </uui-avatar-group>
`;

export const Limit = () => html`
  <uui-avatar-group style="font-size: 2rem" .limit="${2}">
    <uui-avatar title="First Last"></uui-avatar>
    <uui-avatar title="First Last"></uui-avatar>
    <uui-avatar title="First Last"></uui-avatar>
    <uui-avatar title="First Last"></uui-avatar>
  </uui-avatar-group>
`;

export const Sizes = () => html`
  <uui-avatar-group style="font-size: 1rem">
    <uui-avatar title="First Last"></uui-avatar>
    <uui-avatar title="First Last"></uui-avatar>
    <uui-avatar title="First Last"></uui-avatar>
    <uui-avatar title="First Last"></uui-avatar>
  </uui-avatar-group>
  <br />
  <uui-avatar-group style="font-size: 2rem">
    <uui-avatar title="First Last"></uui-avatar>
    <uui-avatar title="First Last"></uui-avatar>
    <uui-avatar title="First Last"></uui-avatar>
    <uui-avatar title="First Last"></uui-avatar>
  </uui-avatar-group>
  <br />
  <uui-avatar-group style="font-size: 3rem">
    <uui-avatar title="First Last"></uui-avatar>
    <uui-avatar title="First Last"></uui-avatar>
    <uui-avatar title="First Last"></uui-avatar>
    <uui-avatar title="First Last"></uui-avatar>
  </uui-avatar-group>
`;
