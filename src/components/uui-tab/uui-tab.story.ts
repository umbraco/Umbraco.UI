import { html } from 'lit-html';
import './index';

export default {
  title: 'Buttons/Tab',
  component: 'uui-tab',
};

export const Basic = () => html` <uui-tab label="Tab A"></uui-tab>`;

export const IconWithText = () =>
  html` <uui-tab><uui-icon name="bug"></uui-icon>Tab A</uui-tab>`;

export const JustIcon = () =>
  html` <uui-tab><uui-icon name="bug"></uui-icon></uui-tab>`;
