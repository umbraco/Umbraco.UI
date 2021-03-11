import { html } from 'lit-html';
import './index';

export default {
  title: 'Basics/Card',
  component: 'uui-card',
};

export const Basic = () => html` <uui-card title="The card"></uui-card> `;

export const Selectable = () =>
  html`
    <uui-card selectable title="Card 1"></uui-card>
    <uui-card selectable selected title="Card 2"></uui-card>
  `;

export const WithImage = () =>
  html`
    <uui-card selectable title="Doggo 1"
      ><img slot="img" src="https://placedog.net/1447/?random"
    /></uui-card>
    <uui-card selectable title="Doggo 2"
      ><img slot="img" src="https://placedog.net/240/?random"
    /></uui-card>
    <uui-card selectable title="Doggo 3"
      ><img slot="img" src="https://placedog.net/110/?random"
    /></uui-card>
  `;

const callback = () => {
  alert('You clicked on doggo!');
};
export const WithCallbackOnTitleClick = () =>
  html`
    <uui-card selectable title="Doggo 1" .clickCallback=${callback}
      ><img slot="img" src="https://placedog.net/1447/?random"
    /></uui-card>
  `;
