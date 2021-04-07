import { html } from 'lit-html';
import '.';

export default {
  title: 'Basics/File Uploader',
  component: 'uui-file-uploader',
};

export const Default = () => html` <uui-file-uploader></uui-file-uploader> `;

export const Multiple = () =>
  html` <uui-file-uploader multiple></uui-file-uploader> `;

export const AcceptsDirectories = () =>
  html` <uui-file-uploader multiple directory></uui-file-uploader> `;
