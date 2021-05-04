import { html } from 'lit-html';
export default {
  title: 'Basics/File Preview',
  component: 'uui-file-preview',
};

let imgFile: File;
(() =>
  fetch('https://placekitten.com/300/300')
    .then(response => response.blob())
    .then(blob => {
      imgFile = new File([blob], 'myFile', { type: 'image/jpeg' });
    }))();

export const Default = () => html` <uui-file-preview></uui-file-preview> `;
export const Image = () =>
  html` <uui-file-preview .file=${imgFile}></uui-file-preview> `;
