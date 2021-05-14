import { html } from 'lit-html';
import './index';
import '../uui-tab/index';

export default {
  title: 'Navigation/Tab Group',
  component: 'uui-tab-group',
};

export const Basic = () => html` <uui-tab-group>
  <uui-tab> Tab A </uui-tab>
  <uui-tab> Tab B </uui-tab>
  <uui-tab> Tab C </uui-tab>
</uui-tab-group>`;
