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

// const fruits = ['apple', 'orange', 'banana'];

// export const Overview: Story = props =>
//   html`<uui-select-custom
//     @change=${(e: any) => console.log('CHANGE', e)}
//     @input=${e => console.log('INPUT', e)}>
//     <uui-select-option display-value="Banana" value="bannana"
//       ><b>bananana</b></uui-select-option
//     >
//     <uui-select-option value="apple">i am apple</uui-select-option>
//     <uui-select-option value="orange">i am orange, the fruit</uui-select-option>
//     <uui-select-option value="pineapple">i am pineapple</uui-select-option>
//     <uui-select-option value="kiwi">i am kiwi</uui-select-option>
//   </uui-select-custom>`;

const renderAvatar = (
  value: string,
  name: any,
  label: string
) => html` <uui-select-option
  .displayValue=${name}
  style="display: flex; gap: 9px; align-items: center; padding: var(--uui-size-3)"
  .value=${value}>
  <uui-avatar style="background-color: #c8d1dd" .name=${name}></uui-avatar>
  <div style="display: flex; flex-direction: column">
    <b>${name}</b>
    <div style="font-size: 0.8rem">${label}</div>
  </div>
</uui-select-option>`;

export const Avatars: Story = props => {
  const [search, updateSearch] = useArgs();

  const handle = (e: any) => {
    updateSearch({ ...props, search: e.target.search });
  };

  return html`<uui-select-custom
    @input=${handle}
    @change=${(e: any) => console.log('CHANGE', e.target.value)}>
    ${props.avatars
      .filter((f: any) => f.name.includes(props.search))
      .map((avatar: any) => renderAvatar(avatar.id, avatar.name, avatar.title))}
  </uui-select-custom>`;
};

Avatars.args = {
  search: '',
  avatars: [
    {
      id: 'H14',
      name: 'Bubber Badekar',
      title: 'Superstjerne',
    },
    {
      id: 'B21',
      name: 'Jens Jensen',
      title: 'Ham med det fede navn',
    },
    {
      id: 'A55',
      name: 'Luke Skywalker',
      title: 'Guy with a funky sword',
    },
    {
      id: 'O24',
      name: 'Giga Chad',
      title: 'Meme star',
    },
  ],
};

// export const Fruits: Story = props => {
//   const [search, updateSearch] = useArgs();

//   const handle = (e: any) => {
//     console.log('HALLO', e.target.search);

//     updateSearch({ ...props, search: e.target.search });
//   };

//   return html`
//     <uui-select-custom @input=${handle}>
//       ${props.fruits
//         .filter((f: string) => f.includes(props.search))
//         .map(
//           (fruit: any) => html`<uui-select-option>${fruit}</uui-select-option>`
//         )}
//     </uui-select-custom>
//   `;
// };

// Fruits.args = {
//   fruits: ['apple', 'orange', 'banana'],
// };
