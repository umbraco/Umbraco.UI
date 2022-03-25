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

const submit = (e: SubmitEvent) => {
  e.preventDefault();
  const formElement = e.target as HTMLFormElement;
  const formData = new FormData(formElement);
  // @ts-ignore // TODO: Fix
  const formProps = Object.fromEntries(formData);

  for (const item of formData.values()) {
    // console.log('value', item);
  }
  console.log('CUSTOM: ', formData.getAll('custom'));
  console.log('NATIVE getAll: ', formData.getAll('native'));
  console.log('FormProps: ', formProps);
};

export const Overview: Story = () => html`<uui-input-file></uui-input-file>`;

export const Form: Story = () => html`
  <form @submit=${submit} enctype="multipart/form-data">
    <h2>This is a form</h2>
    <uui-input-file name="custom" multiple></uui-input-file>
    <input
      @change=${(e: any) => console.log('native event', e.target.value)}
      name="native"
      type="file"
      multiple />
    <button type="submit">DO IT</button>
  </form>
`;
