import { html } from 'lit-html';
import '.';

export default {
  title: 'Basics/File Input',
  component: 'uui-file-input',
};

export const Default = () => html`
  <div style="width: 300px;">
    <uui-file-input label="Upload some files"></uui-file-input>
  </div>
`;

export const Multiple = () => html`
  <div style="width: 300px;">
    <uui-file-input multiple label="Upload some files"></uui-file-input>
  </div>
`;
