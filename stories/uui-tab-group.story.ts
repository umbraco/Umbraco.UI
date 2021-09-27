import { html } from 'lit-html';
import '@umbraco-ui/uui-tab-group/index';
import '@umbraco-ui/uui-tab/index';

export default {
  title: 'Buttons/Tab Group',
  component: 'uui-tab-group',
};

export const Basic = () => html` <uui-tab-group>
  <uui-tab> Tab A </uui-tab>
  <uui-tab> Tab B </uui-tab>
  <uui-tab> Tab C </uui-tab>
</uui-tab-group>`;
