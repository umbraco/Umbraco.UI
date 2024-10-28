import '.';
import readme from '../README.md?raw';
import { html, TemplateResult } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { GetRandomUmbracoWord } from '../../../storyhelpers/UmbracoWordGenerator';

const meta: Meta = {
  id: 'uui-button-inline-create',
  component: 'uui-button-inline-create',
  title: 'Buttons/Button Inline Create',
  parameters: {
    readme: {
      markdown: readme,
    },
  },
};

export default meta;
type Story = StoryObj;

const insertBox = (e: any) => {
  const div = document.createElement('div');
  const labelDiv = document.createElement('div');
  const label = document.createElement('div');
  const buttonInline = document.createElement('uui-button-inline-create');
  buttonInline.addEventListener('click', insertBox);
  label.innerHTML = GetRandomUmbracoWord();
  label.style.padding = '10px';
  label.style.whiteSpace = 'nowrap';

  if (e.target.vertical) {
    buttonInline.setAttribute('vertical', 'true');
    labelDiv.style.display = 'grid';
    labelDiv.style.gridTemplateColumns = '1fr auto';
    buttonInline.style.position = 'absolute';
    buttonInline.style.right = '0';
    buttonInline.style.top = '0';
  } else {
    labelDiv.style.display = 'block';
  }

  div.appendChild(buttonInline);
  labelDiv.appendChild(label);
  div.appendChild(labelDiv);

  e.target.parentElement.parentElement.insertBefore(
    div,
    e.target.parentElement,
  );
};

const createBox = (vertical: boolean) =>
  html` <div style="position:relative;">
    <uui-button-inline-create
      style="${vertical ? 'position: absolute; right: 0; top:0;' : ''}"
      ?vertical=${vertical}
      @click=${insertBox}></uui-button-inline-create>
    <div
      style="
      ${vertical
        ? 'display: grid; grid-template-columns: 1fr auto'
        : 'display:block;'}
      ">
      <div style="padding: 10px; white-space: nowrap;">
        ${GetRandomUmbracoWord()}
      </div>
    </div>
  </div>`;

const createBoxes = (count: number, vertical = false) => {
  const boxes: TemplateResult<1>[] = [];
  for (let index = 0; index < count; index++) {
    boxes.push(createBox(vertical));
  }
  boxes.push(html`
    <div style="position:relative;">
      <uui-button-inline-create
        style="${vertical ? 'position: absolute; right: 0; top:0;' : ''}"
        ?vertical=${vertical}
        @click=${insertBox}></uui-button-inline-create>
    </div>
  `);
  return boxes;
};

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<div>
  <uui-button-inline-create label="Create Item"></uui-button-inline-create>
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
  },
  render: () => html`
    <div>Hover between list items to show the button</div>
    <div style="max-width: 500px; border: 1px solid grey">
      ${createBoxes(5)}
    </div>
  `,
};

export const Horizontal: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<div>
  <uui-button-inline-create label="Create Item"></uui-button-inline-create>
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
  },
  render: () => html`
    <div>Hover between list items to show the button</div>
    <div style="display:flex; border: 1px solid grey; width: fit-content">
      ${createBoxes(5, true)}
    </div>
  `,
};
