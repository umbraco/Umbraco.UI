import { html } from 'lit-html';
import './index';

export default {
  title: 'Symbols/File dropzone symbol',
  component: 'uui-file-dropzone-symbol',
};

export const Default = () =>
  html` <uui-file-dropzone-symbol></uui-file-dropzone-symbol> `;

export const Error = () =>
  html` <uui-file-dropzone-symbol error></uui-file-dropzone-symbol> `;
