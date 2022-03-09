import { html } from 'lit-html';
import './index';

export default {
  title: 'Displays/Card Grid',
  component: 'uui-card-grid',
};

const randomArray = (length: number, min: number, max: number) =>
  [...new Array(length)].map(() =>
    Math.round(Math.random() * (max - min) + min)
  );

export const Media = () =>
  html`
    <uui-card-grid>
      ${randomArray(40, 100, 800).map(el => {
        if (el % 2 === 0)
          return html`<uui-media-card
            selectable
            name="Doggo ${el}"
            file-ext="jpg"
            ><img src="https://placedog.net/${el}/?random" alt=""
          /></uui-media-card>`;
        else
          return html`<uui-media-card
            selectable
            name="File ${el}"
            file-ext="txt"></uui-media-card>`;
      })}
    </uui-card-grid>
  `;

export const FewCards = () =>
  html`
    <uui-card-grid>
      ${randomArray(2, 100, 800).map(
        el => html` <uui-content-node-card
          selectable
          name="Doggo ${el}"
          icon="bug">
          <uui-badge slot="badge" look="positive">Published</uui-badge>
          <ul
            style="list-style: none; padding-inline-start: 0px; margin-block-start: 0px; margin-block-end: 0px;">
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
          </ul>
        </uui-content-node-card>`
      )}
    </uui-card-grid>
  `;

export const Files = () =>
  html`
    <uui-card-grid>
      ${randomArray(40, 100, 800).map(
        el =>
          html`<uui-media-card
            selectable
            name="File ${el}"
            file-ext="txt"></uui-media-card>`
      )}
    </uui-card-grid>
  `;

export const WithCreateButton = () =>
  html`
    <uui-card-grid>
      ${randomArray(40, 100, 800).map(
        () => html`<div style="display: flex; height:100%">
          <uui-inline-create-button
            vertical
            style="width:0;"></uui-inline-create-button>

          <uui-media-card
            selectable
            name="File "
            file-ext="txt"></uui-media-card>
        </div>`
      )}
    </uui-card-grid>
  `;

export const Nodes = () =>
  html`
    <uui-card-grid>
      ${randomArray(40, 100, 800).map(
        el => html` <uui-content-node-card
          selectable
          name="Blog post ${el}"
          icon="bug">
          <uui-badge slot="badge" look="positive">Published</uui-badge>
          <ul
            style="list-style: none; padding-inline-start: 0px; margin-block-start: 0px; margin-block-end: 0px;">
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
          </ul>
        </uui-content-node-card>`
      )}
    </uui-card-grid>
  `;
