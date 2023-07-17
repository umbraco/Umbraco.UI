import '@umbraco-ui/uui-symbol-file-dropzone/lib';
import '@umbraco-ui/uui-file-dropzone/lib';
import '@umbraco-ui/uui-action-bar/lib';
import '@umbraco-ui/uui-file-preview/lib';
import '@umbraco-ui/uui-icon/lib';
import '@umbraco-ui/uui-symbol-file-thumbnail/lib';
import '@umbraco-ui/uui-symbol-file/lib';
import '@umbraco-ui/uui-symbol-folder/lib';
import '@umbraco-ui/uui-button/lib';

import '.';

import { StoryFn } from '@storybook/web-components';
import { html } from 'lit';
import readme from '../README.md?raw';

export default {
  id: 'uui-input-file',
  title: 'Inputs/Files/Input File',
  component: 'uui-input-file',
  parameters: {
    readme: {
      markdown: readme,
    },
  },
};

export const AAAOverview: StoryFn = () =>
  html`<uui-input-file name="input-file"></uui-input-file>`;
AAAOverview.storyName = 'Overview';

export const Multiple: StoryFn = () =>
  html`<uui-input-file name="input-file" multiple></uui-input-file>`;

Multiple.parameters = {
  docs: {
    description: {
      story:
        'When the multiple attribute is specified, the file input allows the user to select more than one file.',
    },
  },
};

export const Accept: StoryFn = () =>
  html`<uui-input-file name="input-file" accept="image/*"></uui-input-file>`;

Accept.parameters = {
  docs: {
    description: {
      story:
        'The accept attribute takes as its value a comma-separated list of one or more file types, or unique file type specifiers, describing which file types to allow. See the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept) for more information.',
    },
  },
};

const submit = (e: SubmitEvent) => {
  e.preventDefault();
  const formElement = e.target as HTMLFormElement;
  const formData = new FormData(formElement);
  const isValid = formElement.checkValidity();

  if (!isValid) {
    console.log('Form not valid');
    return;
  }

  const data = formData.getAll('input-file');
  console.log('Files', data);
};

export const Form: StoryFn = () => {
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
const submit = (e) => {
  e.preventDefault();
  const formElement = e.target;
  const formData = new FormData(formElement);
  const data = formData.getAll('input-file');
  console.log('Files', data);
};

<form @submit="submit">
  <uui-input-file name="input-file" multiple></uui-input-file>
  <uui-button style="margin-top: 16px" type="submit" look="primary" label="Submit"></uui-button>
</form>
`,
    },
  },
};

export const FormValidation: StoryFn = () => {
  return html`
    <uui-form>
      <form @submit=${submit}>
        <uui-form-layout-item>
          <uui-label slot="label" required="">File</uui-label>
          <uui-input-file name="input-file" required></uui-input-file>
        </uui-form-layout-item>

        <uui-button type="submit" look="primary" label="Submit"></uui-button>
      </form>
    </uui-form>
  `;
};

Form.parameters = {
  docs: {
    source: {
      code: `
const submit = (e) => {
  e.preventDefault();
  const formElement = e.target;
  const isValid = formElement.checkValidity();

  if (!isValid) {
    console.log('Form not valid');
    return;
  }

  const formData = new FormData(formElement);
  const data = formData.getAll('input-file');
  console.log('Files', data);
};

<uui-form>
  <form @submit="submit">
    <uui-form-layout-item>
      <uui-label slot="label" required="">File</uui-label>
      <uui-input-file name="input-file" required></uui-input-file>
    </uui-form-layout-item>
    <uui-button type="submit" look="primary" label="Submit"></uui-button>
  </form>
<uui-form>
`,
    },
  },
};

export const MultiplePrevalues: StoryFn = () => {
  const init = async () => {
    const imageUrl =
      'https://images.unsplash.com/photo-1650346910623-3a0d9ee1f2ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2371&q=80';

    const response = await fetch(imageUrl);
    const imageBlob = await response.blob();

    const file1 = new File([imageBlob], 'File 1', { type: 'image/jpeg' });
    const file2 = new File([imageBlob], 'File 2', { type: 'image/jpeg' });

    const fileInput = document.getElementById(
      'inputFileMultiplePreValues',
    ) as any;

    const formData = new FormData();
    formData.append('input-file', file1);
    formData.append('input-file', file2);
    fileInput.value = formData;
  };

  init();

  return html`<uui-input-file
    id="inputFileMultiplePreValues"
    name="input-file"
    multiple></uui-input-file>`;
};

MultiplePrevalues.parameters = {
  docs: {
    source: {
      code: `
const init = async () => {
  const imageUrl =
    'https://images.unsplash.com/photo-1650346910623-3a0d9ee1f2ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2371&q=80';

  const response = await fetch(imageUrl);
  const imageBlob = await response.blob();

  const file1 = new File([imageBlob], 'File 1', { type: 'image/jpeg' });
  const file2 = new File([imageBlob], 'File 2', { type: 'image/jpeg' });

  const fileInput = document.getElementById(
    'inputFileMultiplePreValues'
  ) as any;

  const formData = new FormData();
  formData.append('input-file', file1);
  formData.append('input-file', file2);
  fileInput.value = formData;
};

init();

<uui-input-file id="inputFileMultiplePreValues" name="input-file" multiple></uui-input-file>
`,
    },
  },
};

export const SinglePrevalue: StoryFn = () => {
  const init = async () => {
    const imageUrl =
      'https://images.unsplash.com/photo-1650346910623-3a0d9ee1f2ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2371&q=80';

    const response = await fetch(imageUrl);
    const imageBlob = await response.blob();

    const file = new File([imageBlob], 'File 1', { type: 'image/jpeg' });

    const fileInput = document.getElementById('inputFileSinglePrevalue') as any;
    fileInput.value = file;
  };

  init();

  return html`
    <uui-input-file
      id="inputFileSinglePrevalue"
      name="input-file"></uui-input-file>
  `;
};

SinglePrevalue.parameters = {
  docs: {
    source: {
      code: `
const init = async () => {
  const imageUrl =
    'https://images.unsplash.com/photo-1650346910623-3a0d9ee1f2ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2371&q=80';

  const response = await fetch(imageUrl);
  const imageBlob = await response.blob();

  const file = new File([imageBlob], 'File 1', { type: 'image/jpeg' });

  const fileInput = document.getElementById('inputFileSinglePrevalue') as any;
  fileInput.value = file;
};

init();

<uui-input-file id="inputFileSinglePrevalue" name="input-file"></uui-input-file>
`,
    },
  },
};
