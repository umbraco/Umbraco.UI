import { html } from 'lit-html';
import './index';

export default {
  title: 'Basics/Card/Node Card',
  component: 'uui-node-card',
};

export const Default = () => html`
  <div style="width: 300px">
    <uui-node-card selectable name="The card" icon="bug">
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
    </uui-node-card>
  </div>
`;
