import { html } from 'lit-html';
import '../uui-content-node-card/index';
import '../uui-media-card/index';
import '../uui-user-card/index';

export default {
  title: 'Displays/Card',
};

export const Overview = () => html`
  <div style="width: 300px">
    <uui-content-node-card selectable name="The card" icon="bug">
      <uui-tag size="s" slot="tag" look="positive">Published</uui-tag>
      <!-- TODO: we should make some kind of component for this data layout: -->
      <ul style="list-style: none; padding-inline-start: 0px; margin: 0;">
        <li><span style="font-weight: 700">Created:</span> Yesterday</li>
        <li>
          <span style="font-weight: 700">Last Edited: </span> 2021-03-15 09:29
        </li>
        <li><span style="font-weight: 700">Some property:</span> Some value</li>
        <li>
          <span style="font-weight: 700">Another property:</span> Another value
        </li>
      </ul>
    </uui-content-node-card>
    <br />
    <uui-media-card selectable name="Doggo 1" file-ext="image"
      ><img src="https://placedog.net/1447/?random" alt=""
    /></uui-media-card>
    <br />
    <uui-media-card selectable name="File 1"></uui-media-card>
    <br />
    <uui-media-card selectable name="File 1" file-ext="txt"></uui-media-card>
    <br />
    <uui-user-card selectable name="Sherlock Holmes" group-name="Editors">
      <uui-tag size="s" slot="tag" look="positive">Invited</uui-tag>
      <div style="margin-bottom: 12px">Editors</div>
      <div>Last login</div>
      <div>March 19, 2021 9:14 AM</div>
    </uui-user-card>
  </div>
`;
