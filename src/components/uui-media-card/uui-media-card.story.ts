import { html } from 'lit-html';
import './index';

export default {
  title: 'Displays/Card/Media Card',
  component: 'uui-media-card',
};

export const File = () =>
  html`
    <div style="width: 200px">
      <uui-media-card selectable name="File 1" file-ext="txt"></uui-media-card>
    </div>
  `;

export const NotSelectable = () =>
  html`
    <div style="width: 200px">
      <uui-media-card name="File 1" file-ext="txt"></uui-media-card>
      <uui-media-card name="File 1" file-ext="txt"></uui-media-card>
    </div>
  `;

export const Folder = () =>
  html`
    <div style="width: 200px">
      <uui-media-card selectable name="File 1"></uui-media-card>
    </div>
  `;

export const Picture = () =>
  html`
    <div style="width: 50vw; max-width: 450px;">
      <uui-media-card selectable name="Doggo 1" file-ext="jpg"
        ><img src="https://placedog.net/1447/?random" alt=""
      /></uui-media-card>
      <uui-media-card selectable name="Doggo 1" file-ext="jpg"
        ><img src="https://placedog.net/240/?random" alt=""
      /></uui-media-card>
      <uui-media-card selectable name="Doggo 1" file-ext="jpg"
        ><img src="https://placedog.net/110/?random" alt=""
      /></uui-media-card>
    </div>
  `;

export const Error = () =>
  html`
    <div style="width: 50vw; max-width: 450px;">
      <uui-media-card error name="Doggo 1" file-ext="image"
        ><img src="https://placedog.net/1447/?random" alt=""
      /></uui-media-card>
    </div>
  `;

export const ErrorAndSelectable = () =>
  html`
    <div style="width: 50vw; max-width: 450px;">
      <uui-media-card selectable error name="Doggo 1" file-ext="image"
        ><img src="https://placedog.net/1447/?random" alt=""
      /></uui-media-card>
    </div>
  `;
