import '.';

import { Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';

import { GetRandomUmbracoWord } from '../../../storyhelpers/UmbracoWordGenerator';
import readme from '../README.md?raw';

export default {
  id: 'uui-button-inline-create',
  title: 'Buttons/Button Inline Create',
  component: 'uui-button-inline-create',
  parameters: {
    readme: {
      markdown: readme,
    },
    docs: {
      source: {
        code: `<uui-button-inline-create></uui-button-inline-create>`,
      },
    },
  },
};

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

export const AAAOverview: Story = () =>
  html` <h3>Hover between list items to show the button.</h3>
    <div id="container" style="max-width: 500px; border: 1px solid grey">
      ${createBoxes(5)}
    </div>`;
AAAOverview.storyName = 'Overview';
AAAOverview.parameters = {
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
};

export const Vertical: Story = () =>
  html`<div id="container" style="max-width: 500px; border: 1px solid grey">
    ${createBoxes(5)}
  </div>`;

Vertical.parameters = {
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
};

export const Horizontal: Story = () =>
  html`<div id="container-vertical" style="display: flex">
    ${createBoxes(5, true)}
  </div>`;

Horizontal.parameters = {
  docs: {
    source: {
      code: `
<div style="'display: grid; grid-template-columns: 1fr auto;">
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
};

export const Href: Story = () =>
  html` <h3>Using HREF</h3>
    <div id="container" style="max-width: 500px; border: 1px solid grey">
      <uui-button-inline-create
        href="#0"
        label="Create Item"></uui-button-inline-create>
      <div style="padding: 10px;">Item 1</div>
      <uui-button-inline-create
        href="#1"
        label="Create Item"></uui-button-inline-create>
      <div style="padding: 10px;">Item 2</div>
      <uui-button-inline-create
        href="#2"
        label="Create Item"></uui-button-inline-create>
      <div style="padding: 10px;">Item 3</div>
      <uui-button-inline-create
        href="#3"
        label="Create Item"></uui-button-inline-create>
    </div>`;
AAAOverview.storyName = 'Overview';
AAAOverview.parameters = {
  docs: {
    source: {
      code: `
<div>
  <uui-button-inline-create href="#0" label="Create Item"></uui-button-inline-create>
  <div style="padding: 10px;">Item 1</div>
  <uui-button-inline-create href="#1" label="Create Item"></uui-button-inline-create>
  <div style="padding: 10px;">Item 2</div>
  <uui-button-inline-create href="#2" label="Create Item"></uui-button-inline-create>
  <div style="padding: 10px;">Item 3</div>
  <uui-button-inline-create href="#3" label="Create Item"></uui-button-inline-create>
</div>
      `,
    },
  },
};
