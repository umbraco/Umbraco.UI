import { html } from 'lit-html';
import './index';
import { UUIAvatarGroupExampleElement } from './uui-avatar-group-example.element';

customElements.define('uui-avatar-group-example', UUIAvatarGroupExampleElement);

export default {
  title: 'Basics/Avatar Group',
  component: 'uui-avatar-group',
};

export const Basic = () => html`
  <uui-avatar-group size="m" look="primary">
    <uui-avatar text="First Last" size="m" look="primary"></uui-avatar>
    <uui-avatar text="First Last" size="m" look="primary"></uui-avatar>
    <uui-avatar text="First Last" size="m" look="primary"></uui-avatar>
    <uui-avatar text="First Last" size="m" look="primary"></uui-avatar>
  </uui-avatar-group>
`;

export const Limit = () => html`
  <uui-avatar-group limit="2" size="m" look="primary">
    <uui-avatar text="First Last" size="m" look="primary"></uui-avatar>
    <uui-avatar text="First Last" size="m" look="primary"></uui-avatar>
    <uui-avatar text="First Last" size="m" look="primary"></uui-avatar>
    <uui-avatar text="First Last" size="m" look="primary"></uui-avatar>
  </uui-avatar-group>
`;
