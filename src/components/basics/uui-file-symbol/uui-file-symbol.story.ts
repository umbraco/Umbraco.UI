import { html } from 'lit-html';
import './index';
export default {
  title: 'Basics/File Symbol',
  component: 'uui-file-symbol',
};

export const Default = () =>
  html`<div style="width: 240px">
    <uui-file-symbol type="pdf"></uui-file-symbol>
  </div>`;
