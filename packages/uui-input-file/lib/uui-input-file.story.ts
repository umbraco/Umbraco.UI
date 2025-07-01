import '.';
import readme from '../README.md?raw';
import { html } from 'lit';
import { action } from 'storybook/actions';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { spread } from '../../../storyhelpers';

// TODO: Figure out why we now need to import everything that every component uses
import '@umbraco-ui/uui-action-bar/lib';
import '@umbraco-ui/uui-file-preview/lib';
import '@umbraco-ui/uui-file-dropzone/lib';
import '@umbraco-ui/uui-button/lib';
import '@umbraco-ui/uui-symbol-file/lib';
import '@umbraco-ui/uui-symbol-file-thumbnail/lib';
import '@umbraco-ui/uui-symbol-folder/lib';

const meta: Meta = {
  id: 'uui-input-file',
  component: 'uui-input-file',
  title: 'Inputs/Files/Input File',
  render: args => html`<uui-input-file ${spread(args)}></uui-input-file>`,
  parameters: {
    readme: {
      markdown: readme,
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Multiple: Story = {
  args: {
    multiple: true,
  },
};

export const Accept: Story = {
  args: {
    accept: 'image/*',
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
  action('submit')(data);
};

export const Form: Story = {
  render: () => {
    return html`
      <form @submit=${submit}>
        Submitted files will be logged to the console and shown in the actions
        tab.
        <uui-input-file name="input-file" multiple> </uui-input-file>
        <uui-button
          style="margin-top: 16px"
          type="submit"
          look="primary"
          label="Submit"></uui-button>
      </form>
    `;
  },
  parameters: {
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
  },
};

export const FormValidation: Story = {
  render: () => {
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
  },
  parameters: {
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
  },
};

export const MultiplePrevalues: Story = {
  render: () => {
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
  },
  parameters: {
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
  },
};

export const SinglePrevalue: Story = {
  render: () => {
    const init = async () => {
      const imageUrl =
        'https://images.unsplash.com/photo-1650346910623-3a0d9ee1f2ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2371&q=80';

      const response = await fetch(imageUrl);
      const imageBlob = await response.blob();

      const file = new File([imageBlob], 'File 1', { type: 'image/jpeg' });

      const fileInput = document.getElementById(
        'inputFileSinglePrevalue',
      ) as any;
      fileInput.value = file;
    };

    init();

    return html`
      <uui-input-file
        id="inputFileSinglePrevalue"
        name="input-file"></uui-input-file>
    `;
  },
  parameters: {
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
  },
};
