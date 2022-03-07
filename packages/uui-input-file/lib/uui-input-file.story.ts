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

  console.log('FORM: ', formProps);
};

export const Overview: Story = () => html`<uui-input-file></uui-input-file>`;

export const Form: Story = () => html`
  <form @submit=${submit}>
    <div>asd</div>
    <uui-input-file></uui-input-file>
    <input name="test-input" type="text" />
    <button type="submit">DO IT</button>
  </form>
`;
