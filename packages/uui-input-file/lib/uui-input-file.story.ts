import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  id: 'uui-input-file',
  title: 'Input File',
  component: 'uui-input-file',
  parameters: {
    docs: {
      source: {
        code: `<uui-input-file></uui-input-file>`,
      },
    },
  },
};

export const Overview: Story = () => html`<uui-input-file></uui-input-file>`;

export const Form: Story = () => {
  const submit = (e: SubmitEvent) => {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);

    const data = formData.getAll('input-file');
    console.log('Files', data);
  };

  return html`
    <form @submit=${submit} enctype="multipart/form-data">
      <h2>This is a form</h2>
      <div style="display: grid; grid-template-columns: 2fr 1fr">
        <uui-input-file
          style="height: min-content; max-heigh: 300px"
          name="input-file"
          multiple></uui-input-file>
        <div></div>
      </div>
      <uui-button style="margin-top: 16px" type="submit" look="primary">
        Upload
      </uui-button>
    </form>
  `;
};
