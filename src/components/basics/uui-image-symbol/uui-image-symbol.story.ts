import { html } from 'lit-html';
import './index';

export default {
  title: 'Basics/Image Symbol',
  component: 'uui-image-symbol',
};

let imgFile: string;
(() =>
  fetch('https://placekitten.com/300/300')
    .then(response => response.blob())
    .then(blob => new File([blob], 'myFile', { type: 'image/jpeg' }))
    .then(file => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (reader.result) imgFile = reader.result as string;
      };
    }))();

export const Default = () =>
  html` <div width="300px">
    <uui-image-symbol type="pdf" .source=${imgFile}></uui-image-symbol></uui-image-symbol>
  </div> `;
