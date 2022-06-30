import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

import { GetRandomUmbracoWord } from '../../../storyhelpers/UmbracoWordGenerator';
import { TemplateResult } from 'lit';

export default {
  id: 'uui-button-inline-create',
  title: 'Buttons/Button Inline Create',
  component: 'uui-button-inline-create',
  parameters: {
    docs: {
      source: {
        code: `<uui-button-inline-create></uui-button-inline-create>`,
      },
    },
  },
};

const insertBox = (e: any) => {
  const div = document.createElement('div');
  const label = document.createElement('div');
  const buttonInline = document.createElement('uui-button-inline-create');
  buttonInline.addEventListener('click', insertBox);
  label.innerHTML = GetRandomUmbracoWord();
  label.style.padding = '10px';
  label.style.whiteSpace = 'nowrap';

  if (e.target.vertical) {
    buttonInline.setAttribute('vertical', 'true');
    div.style.display = 'grid';
    div.style.gridTemplateColumns = '1fr auto';
  }

  div.appendChild(label);
  div.appendChild(buttonInline);

  e.target.parentElement.insertAdjacentElement('afterend', div);
};

const createBox = (vertical: boolean, index: number) => html` <div
  style="position:relative;">
  <div
    style="
      ${vertical
      ? 'display: grid; grid-template-columns: 1fr auto'
      : 'display:block;'}
      ${index % 2 === 0 ? 'background-color:lightgrey;' : ''}
      ">
    <div style="padding: 10px; white-space: nowrap;">
      ${GetRandomUmbracoWord()}
    </div>
  </div>
  <uui-button-inline-create
    style="${vertical ? 'position: absolute; right: 0; top:0;' : ''}"
    ?vertical=${vertical}
    @click=${insertBox}></uui-button-inline-create>
</div>`;

const createBoxes = (count: Number, vertical = false) => {
  const boxes: TemplateResult<1>[] = [];
  for (let index = 0; index < count; index++) {
    boxes.push(createBox(vertical, index));
  }
  return boxes;
};

export const AAAOverview: Story = () =>
  html`<uui-button-inline-create
    label="Create Item"></uui-button-inline-create>`;
AAAOverview.storyName = 'Overview';

export const Vertical: Story = () =>
  html`<div id="container" style="max-width: 500px">${createBoxes(5)}</div>`;

Vertical.parameters = {
  docs: {
    source: {
      code: `
<div>
  <div style="padding: 10px;">Item 1</div>
  <uui-button-inline-create label="Create Item"></uui-button-inline-create>
  <div style="padding: 10px;">Item 2</div>
  <uui-button-inline-create label="Create Item"></uui-button-inline-create>
  <div style="padding: 10px;">Item 3</div>
  <uui-button-inline-create label="Create Item"></uui-button-inline-create>
</div>
      `,
    },
  },
};

export const Horizontal: Story = () =>
  html`<div id="container-vertical" style="display: flex;">
    ${createBoxes(5, true)}
  </div>`;

Horizontal.parameters = {
  docs: {
    source: {
      code: `
<div style="'display: grid; grid-template-columns: 1fr auto;">
  <div style="padding: 10px;">Item 1</div>
  <uui-button-inline-create label="Create Item"></uui-button-inline-create>
  <div style="padding: 10px;">Item 2</div>
  <uui-button-inline-create label="Create Item"></uui-button-inline-create>
  <div style="padding: 10px;">Item 3</div>
  <uui-button-inline-create label="Create Item"></uui-button-inline-create>
</div>
      `,
    },
  },
};
