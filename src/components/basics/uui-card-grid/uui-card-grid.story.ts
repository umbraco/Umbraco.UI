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

export const Media = () =>
  html`
    <uui-card-grid>
      ${randomArray(40, 100, 800).map(el => {
        if (el % 2 === 0)
          return html`<uui-card selectable title="Doggo ${el}" type="image"
            ><img slot="asset" src="https://placedog.net/${el}/?random"
          /></uui-card>`;
        else
          return html`<uui-card selectable title="File ${el}" type="file"
            ><uui-file-symbol type="txt" slot="asset"></uui-file-symbol
          ></uui-card>`;
      })}
    </uui-card-grid>
  `;

export const FewCards = () =>
  html`
    <uui-card-grid type="node">
      ${randomArray(2, 100, 800).map(
        el => html`<uui-card selectable title="Doggo ${el}" type="node"
          ><uui-icon slot="icon" name="bug"></uui-icon
          ><uui-badge slot="badge" look="positive">Published</uui-badge>
          <ul
            style="list-style: none; padding-inline-start: 0px; margin-block-start: 0px; margin-block-end: 0px;"
          >
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

export const Files = () =>
  html`
    <uui-card-grid>
      ${randomArray(40, 100, 800).map(
        el => html`<uui-card selectable title="File ${el}" type="file"
          ><uui-file-symbol type="txt" slot="asset"></uui-file-symbol
        ></uui-card>`
      )}
    </uui-card-grid>
  `;

export const WithCreateButton = () =>
  html`
    <uui-card-grid>
      ${randomArray(40, 100, 800).map(
        el => html`<div style="display: flex;">
          <uui-inline-create-button
            vertical
            style="width:0;"
          ></uui-inline-create-button>

          <uui-card selectable title="File " type="file" style="width:100%;"
            ><uui-file-symbol type="txt" slot="asset"></uui-file-symbol
          ></uui-card>
        </div>`
      )}
    </uui-card-grid>
  `;

export const Nodes = () =>
  html`
    <uui-card-grid type="node">
      ${randomArray(40, 100, 800).map(
        el => html`<uui-card selectable title="Blog post ${el}" type="node"
          ><uui-icon slot="icon" name="bug"></uui-icon
          ><uui-badge slot="badge" look="positive">Published</uui-badge>
          <ul
            style="list-style: none; padding-inline-start: 0px; margin-block-start: 0px; margin-block-end: 0px;"
          >
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
