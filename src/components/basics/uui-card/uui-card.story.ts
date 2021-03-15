import { html } from 'lit-html';
import './index';

export default {
  title: 'Basics/Card',
  component: 'uui-card',
};

export const Basic = () => html`
  <div style="width: 130px">
    <uui-card title="The card">Hello</uui-card>
  </div>
`;

export const ContentNode = () => html`
  <div>
    <uui-card title="The card" type="node"
      ><uui-icon slot="icon" name="bug"></uui-icon
      ><uui-badge slot="badge" look="positive">Published</uui-badge>
      <ul style="list-style: none; padding-inline-start: 0px">
        <li><span style="font-weight: 700">Created:</span> Yesterday</li>
        <li>
          <span style="font-weight: 700">Last Edited: </span> 2021-03-15 09:29
        </li>
        <li><span style="font-weight: 700">Some property:</span> Some value</li>
        <li>
          <span style="font-weight: 700">Another property:</span> Another value
        </li>
      </ul></uui-card
    >
  </div>
`;

export const Selectable = () =>
  html`
    <div style="width: 130px">
      <uui-card selectable title="Card 1"></uui-card>
      <uui-card selectable selected title="Card 2"></uui-card>
    </div>
  `;

export const WithIcon = () =>
  html`
    <div style="width: 130px">
      <uui-card selectable title="Card 1" type="file"
        ><uui-icon name="bug" slot="asset"></uui-icon
      ></uui-card>
    </div>
  `;

export const WithImage = () =>
  html`
    <div style="width: 50vw">
      <uui-card selectable title="Doggo 1"
        ><img slot="asset" src="https://placedog.net/1447/?random"
      /></uui-card>
      <uui-card selectable title="Doggo 2"
        ><img slot="asset" src="https://placedog.net/240/?random"
      /></uui-card>
      <uui-card selectable title="Doggo 3"
        ><img slot="asset" src="https://placedog.net/110/?random"
      /></uui-card>
    </div>
  `;

const callback = () => {
  alert('You clicked on doggo!');
};
export const WithCallbackOnTitleClick = () =>
  html`
    <div style="width: 50vw">
      <uui-card selectable title="Doggo 1" .clickCallback=${callback}
        ><img slot="asset" src="https://placedog.net/1447/?random"
      /></uui-card>
    </div>
  `;
