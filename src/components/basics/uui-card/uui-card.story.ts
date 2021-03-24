import { html } from 'lit-html';
import './index';

export default {
  title: 'Basics/Card',
  component: 'uui-card',
};

export const Basic = () => html`
  <div style="width: 300px">
    <uui-card
      ><uui-button look="placeholder" style="width:100%;"
        >Main slot</uui-button
      ></uui-card
    >
  </div>
`;

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

export const Selectable = () =>
  html`
    <div style="width: 130px">
      <uui-card selectable title="Card 1"
        ><uui-button look="placeholder" style="width:100%;"
          >Main slot</uui-button
        ></uui-card
      >
      <uui-card selectable selected title="Card 2"
        ><uui-button look="placeholder" style="width:100%;"
          >Main slot</uui-button
        ></uui-card
      >
    </div>
  `;

export const User = () =>
  html`
    <div style="width: 130px">
      <uui-card selectable title="Sherlock Holmes" type="user">
        <uui-tag size="s" slot="tag" look="positive">Invited</uui-tag
        ><uui-avatar slot="avatar" text="Sherlock Holmes" size="m"></uui-avatar>
        <div style="margin-bottom: 12px">Editors</div>
        <div>Last login</div>
        <div>March 19, 2021 9:14 AM</div></uui-card
      >
      <uui-card selectable selected title="John Watson" type="user"
        ><uui-avatar slot="avatar" text="John Watson" size="m"> </uui-avatar>
        <div style="margin-bottom: 12px">Editors</div>

        <div>Has not logegd in yet</div></uui-card
      >
    </div>
  `;

export const File = () =>
  html`
    <div style="width: 130px">
      <uui-card selectable title="Card 1" type="file"
        ><uui-icon name="bug" slot="asset"></uui-icon
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
