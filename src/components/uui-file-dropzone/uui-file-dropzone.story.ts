import { html } from 'lit-html';
import './index';

export default {
  title: 'Symbols/File dropzone',
  component: 'uui-file-dropzone',
};

export const Default = () => html` <uui-file-dropzone></uui-file-dropzone> `;

export const Multiple = () =>
  html` <uui-file-dropzone multiple></uui-file-dropzone> `;

export const AcceptsDirectories = () =>
  html` <uui-file-dropzone multiple directory></uui-file-dropzone> `;
