import { html } from 'lit-html';
import './index';

export default {
  title: 'Compositions/Layer Container',
  component: 'uui-layer-container',
};

export const Default = () => html`
  <uui-layer-container>
    <uui-layer></uui-layer>
    <uui-layer></uui-layer>
  </uui-layer-container>
`;
