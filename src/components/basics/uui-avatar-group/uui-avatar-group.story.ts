import { html } from 'lit-html';
import './index';
import { UUIAvatarGroupExampleElement } from './uui-avatar-group-example.element';

customElements.define('uui-avatar-group-example', UUIAvatarGroupExampleElement);

export default {
  title: 'Basics/Avatar Group',
  component: 'uui-avatar-group',
};

export const Overview = () => html`
  <uui-avatar-group-example></uui-avatar-group-example>
`;
