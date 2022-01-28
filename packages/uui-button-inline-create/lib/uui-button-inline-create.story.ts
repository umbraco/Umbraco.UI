import '../define';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

import { GetRandomUmbracoWord } from '../../../storyhelpers/UmbracoWordGenerator';

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
  const button = document.createElement('uui-button');
  const buttonInline = document.createElement('uui-button-inline-create');
  buttonInline.addEventListener('click', insertBox);
  button.innerHTML = GetRandomUmbracoWord();
  button.setAttribute('look', 'outline');
  button.style.width = '100%';
  button.style.height = '50px';

  if (e.target.vertical) {
    console.log('YES');
    buttonInline.setAttribute('vertical', 'true');
    div.style.display = 'grid';
    div.style.gridTemplateColumns = '1fr auto';
  }

  div.appendChild(button);
  div.appendChild(buttonInline);

  e.target.parentElement.insertAdjacentElement('afterend', div);
};

const createBox = (vertical: Boolean) => html`<div
  style="${vertical ? 'display: grid; grid-template-columns: 1fr auto' : ''}">
  <uui-button look="outline" style="width: 100%; height: 50px;"
    >${GetRandomUmbracoWord()}</uui-button
  >
  <uui-button-inline-create
    ?vertical=${vertical}
    @click=${insertBox}></uui-button-inline-create>
</div>`;

const createBoxes = (count: Number, vertical = false) => {
  const boxes = [];
  for (let index = 0; index < count; index++) {
    boxes.push(createBox(vertical));
  }
  return boxes;
};

export const Vertical: Story = () =>
  html`<div id="container" style="max-width: 500px">${createBoxes(5)}</div>`;

export const Horizontal: Story = () =>
  html`<div id="container-vertical" style="display: flex;">
    ${createBoxes(5, true)}
  </div>`;
