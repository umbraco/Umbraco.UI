import { html } from 'lit-html';
import './index';

export default {
  title: 'Basics/Card/Node Card',
  component: 'uui-node-card',
};

export const ContentNode = () => html`
  <div style="width: 300px">
    <uui-card title="The card" type="node" selectable
      ><uui-icon slot="icon" name="bug"></uui-icon
      ><uui-tag size="s" slot="tag" look="positive">Published</uui-tag>
      <ul style="list-style: none; padding-inline-start: 0px; margin: 0;">
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

export const File = () =>
  html`
    <div style="width: 200px">
      <uui-card selectable title="Card 1" type="file"
        ><uui-file-icon type="txt" slot="asset"></uui-file-icon
      ></uui-card>
    </div>
  `;

export const Picture = () =>
  html`
    <div style="width: 50vw">
      <uui-card selectable title="Doggo 1" type="image"
        ><img slot="asset" src="https://placedog.net/1447/?random"
      /></uui-card>
      <uui-card selectable title="Doggo 2" type="image"
        ><img slot="asset" src="https://placedog.net/240/?random"
      /></uui-card>
      <uui-card selectable title="Doggo 3" type="image"
        ><img slot="asset" src="https://placedog.net/110/?random"
      /></uui-card>
    </div>
  `;

export const Error = () =>
  html`
    <div style="width: 50vw">
      <uui-card selectable title="Doggo 1" type="image" error
        ><img slot="asset" src="https://placedog.net/1447/?random"
      /></uui-card>
    </div>
  `;
