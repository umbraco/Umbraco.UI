import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import { useArgs } from '@storybook/client-api';

export default {
  id: 'uui-select-custom',
  title: 'Select Custom',
  component: 'uui-select-custom',
  parameters: {
    docs: {
      source: {
        code: `<uui-select-custom></uui-select-custom>`,
      },
    },
  },
};

const renderAvatar = (
  value: string,
  display: string,
  label: string
) => html` <uui-select-option
  .displayValue=${label}
  style="display: flex; gap: 9px; align-items: center; padding: var(--uui-size-3)"
  .value=${value}>
  <uui-avatar
    style="background-color: #c8d1dd"
    name="General Dryptud"></uui-avatar>
  <div style="display: flex; flex-direction: column">
    <b>${display}</b>
    <div style="font-size: 0.8rem">${label}</div>
  </div>
</uui-select-option>`;

const fruits = ['apple', 'orange', 'banana'];

export const Overview: Story = props =>
  html`<uui-select-custom
    @change=${(e: any) => console.log('CHANGE', e)}
    @input=${e => console.log('INPUT', e)}>
    <uui-select-option display-value="Banana" value="bannana"
      ><b>bananana</b></uui-select-option
    >
    <uui-select-option value="apple">i am apple</uui-select-option>
    <uui-select-option value="orange">i am orange, the fruit</uui-select-option>
    <uui-select-option value="pineapple">i am pineapple</uui-select-option>
    <uui-select-option value="kiwi">i am kiwi</uui-select-option>
  </uui-select-custom>`;

export const Avatars: Story = props =>
  html`<uui-select-custom @change=${(e: any) => console.log('CHANGE', e)}>
    ${renderAvatar('fruit0', 'apple', 'this is an apple')}
    ${renderAvatar('fruit1', 'orange', 'this is an orange')}
    ${renderAvatar('fruit2', 'pineapple', 'this is a pineapple')}
    ${renderAvatar('fruit3', 'kiwi', 'this is a kiwi')}
  </uui-select-custom>`;

export const Fruits: Story = props => {
  const [search, updateSearch] = useArgs();

  const handle = (e: any) => {
    console.log('HALLO', e.target.search);

    updateSearch({ ...props, search: e.target.search });
  };

  return html`
    <uui-select-custom @input=${handle}>
      ${props.fruits
        .filter((f: string) => f.includes(props.search))
        .map(
          (fruit: any) => html`<uui-select-option>${fruit}</uui-select-option>`
        )}
    </uui-select-custom>
  `;
};

Fruits.args = {
  fruits: ['apple', 'orange', 'banana'],
};
