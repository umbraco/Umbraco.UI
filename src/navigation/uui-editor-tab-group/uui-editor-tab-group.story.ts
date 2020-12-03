import { html } from 'lit-html';
import './index';
import '../uui-editor-tab/index';

export default {
  title: 'Navigation/Editor Tab Group',
  component: 'uui-editor-tab-group',
};

export const Basic = () => html` <uui-editor-tab-group>
  <uui-editor-tab> Tab A </uui-editor-tab>
  <uui-editor-tab> Tab B </uui-editor-tab>
  <uui-editor-tab> Tab C </uui-editor-tab>
</uui-editor-tab-group>`;
