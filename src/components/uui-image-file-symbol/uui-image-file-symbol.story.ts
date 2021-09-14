import { html } from 'lit-html';
import './index';

export default {
  title: 'Symbols/Image File Symbol',
  component: 'uui-image-file-symbol',
};

let imgFile: string;
let fileType: string;
(() =>
  fetch('https://placekitten.com/300/300')
    .then(response => response.blob())
    .then(blob => new File([blob], 'myFile', { type: 'image/jpeg' }))
    .then(file => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (reader.result) {
          imgFile = reader.result as string;
          fileType = imgFile.slice(
            imgFile.indexOf('/') + 1,
            imgFile.indexOf(';')
          );
        }
      };
    }))();

export const Default = () =>
  html`
    <div style="width:300px;">
      <uui-image-file-symbol
        .type=${fileType}
        .source=${imgFile}></uui-image-file-symbol>
    </div>
  `;
