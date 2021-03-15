import { html } from 'lit-html';
import './index';

export default {
  title: 'Basics/Card Grid',
  component: 'uui-card-grid',
};

const randomArray = (length: number, min: number, max: number) =>
  [...new Array(length)].map(() =>
    Math.round(Math.random() * (max - min) + min)
  );

export const Basic = () =>
  html`
    <uui-card-grid>
      ${randomArray(40, 100, 800).map(
        el => html`<uui-card selectable title="Doggo ${el}"
          ><img slot="asset" src="https://placedog.net/${el}/?random"
        /></uui-card>`
      )}
    </uui-card-grid>
  `;

export const Files = () =>
  html`
    <uui-card-grid>
      ${randomArray(40, 100, 800).map(
        el => html`<uui-card selectable title="File ${el}" type="file"
          ><uui-icon slot="asset" name="bug"></uui-icon
        ></uui-card>`
      )}
    </uui-card-grid>
  `;

export const Nodes = () =>
  html`
    <uui-card-grid type="node">
      ${randomArray(40, 100, 800).map(
        el => html`<uui-card selectable title="File ${el}" type="node"
          ><uui-icon slot="icon" name="bug"></uui-icon
          ><uui-badge slot="badge" look="positive">Published</uui-badge>
          <ul style="list-style: none; padding-inline-start: 0px">
            <li><span style="font-weight: 700">Created:</span> Yesterday</li>
            <li>
              <span style="font-weight: 700">Last Edited: </span> 2021-03-15
              09:29
            </li>
            <li>
              <span style="font-weight: 700">Some property:</span> Some value
            </li>
            <li>
              <span style="font-weight: 700">Another property:</span> Another
              value
            </li>
          </ul></uui-card
        >`
      )}
    </uui-card-grid>
  `;
