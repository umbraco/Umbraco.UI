import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  id: 'uui-input-file',
  title: 'Inputs/Files/Input File',
  component: 'uui-input-file',
  parameters: {
    docs: {
      source: {
        code: `<uui-input-file></uui-input-file>`,
      },
    },
  },
};

export const AAAOverview: Story = () => html`<uui-input-file></uui-input-file>`;
AAAOverview.storyName = 'Overview';

const submit = (e: SubmitEvent) => {
  e.preventDefault();
  const formElement = e.target as HTMLFormElement;
  const formData = new FormData(formElement);
  const data = formData.getAll('input-file');
  console.log('Files', data);
};

export const Form: Story = () => {
  return html`
    <form @submit=${submit}>
      <div style="display: grid; grid-template-columns: 2fr 1fr">
        <uui-input-file
          name="input-file"
          style="height: min-content; max-heigh: 300px"
          multiple></uui-input-file>
        <div></div>
      </div>
      <uui-button style="margin-top: 16px" type="submit" look="primary">
        Submit
      </uui-button>
    </form>
  `;
};

Form.parameters = {
  docs: {
    source: {
      code: `
const submit = (e: SubmitEvent) => {
  e.preventDefault();
  const formElement = e.target as HTMLFormElement;
  const formData = new FormData(formElement);
  const data = formData.getAll('input-file');
  console.log('Files', data);
};

<form @submit="submit">
  <div style="display: grid; grid-template-columns: 2fr 1fr">
    <uui-input-file
      name="input-file"
      style="height: min-content; max-heigh: 300px"
      multiple></uui-input-file>
    <div></div>
  </div>
  <uui-button style="margin-top: 16px" type="submit" look="primary">
    Submit
  </uui-button>
</form>
    `,
    },
  },
};