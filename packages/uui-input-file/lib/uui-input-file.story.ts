import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  id: 'uui-input-file',
  title: 'Inputs/Files/Input File',
  component: 'uui-input-file',
};

export const AAAOverview: Story = () => html`<uui-input-file></uui-input-file>`;
AAAOverview.storyName = 'Overview';

export const Multiple: Story = () =>
  html`<uui-input-file multiple></uui-input-file>`;

Multiple.parameters = {
  docs: {
    storyDescription:
      'When the multiple attribute is specified, the file input allows the user to select more than one file.',
  },
};

export const Accept: Story = () =>
  html`<uui-input-file accept="image/*"></uui-input-file>`;

Accept.parameters = {
  docs: {
    storyDescription:
      'The accept attribute takes as its value a comma-separated list of one or more file types, or unique file type specifiers, describing which file types to allow. See the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept) for more information.',
  },
};

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
      <uui-input-file name="input-file" multiple> </uui-input-file>
      <uui-button
        style="margin-top: 16px"
        type="submit"
        look="primary"
        label="Submit"></uui-button>
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
    <uui-input-file
      name="input-file"
      multiple>
    </uui-input-file>
  <uui-button style="margin-top: 16px" type="submit" look="primary">
    Submit
  </uui-button>
</form>
`,
    },
  },
};
