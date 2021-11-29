import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-button-inline-create/lib/index';

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

const words = ['Hello', 'World', 'Umbraco', 'Code', 'Cloud', 'Friendly'];

const getRandomWord = () => {
  const index = Math.floor(Math.random() * (words.length - 1));

  return words[index];
};

const insertBox = (e: any) => {
  const div = document.createElement('div');
  const button = document.createElement('uui-button');
  const buttonInline = document.createElement('uui-button-inline-create');
  buttonInline.addEventListener('click', insertBox);
  button.innerHTML = getRandomWord();
  button.setAttribute('look', 'outline');
  button.style.width = '100%';
  button.style.height = '50px';

  div.appendChild(button);
  div.appendChild(buttonInline);

  e.target.parentElement.insertAdjacentElement('afterend', div);
};

const createBox = () => html`<div>
  <uui-button look="outline" style="width: 100%; height: 50px;"
    >${getRandomWord()}</uui-button
  >
  <uui-button-inline-create @click=${insertBox}></uui-button-inline-create>
</div>`;

const createBoxes = (count: Number) => {
  const boxes = [];
  for (let index = 0; index < count; index++) {
    boxes.push(createBox());
  }
  return boxes;
};

export const Vertical: Story = () =>
  html`<div id="container" style="max-width: 500px">${createBoxes(5)}</div>`;

// export const Default = () => html`
//   <div style="width: 50vw">
//     <uui-button-inline-create></uui-button-inline-create>
//   </div>
// `;
// export const Vertical = () => html`
//   <div style="height: 20vw">
//     <uui-button-inline-create vertical></uui-button-inline-create>
//   </div>
// `;
