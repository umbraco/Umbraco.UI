import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  id: 'uui-select-list',
  title: 'Select List',
  component: 'uui-select-list',
  parameters: {
    docs: {
      source: {
        code: `<uui-select-list></uui-select-list>`,
      },
    },
  },
};

const styles = {
  select:
    'border: 2px solid black; border-radius: 8px; overflow: hidden; max-width: 300px',
  option:
    'width: 100%; height: 32px; display: grid; grid-template-columns: 42px 1fr 60px; align-items: center; border-bottom: 1px solid;',
  code: 'border-right: 1px solid black; display: flex; justify-content: center; height: 100%; align-items: center;',
  display: 'padding: 0 8px',
};

const onChange = (e: any) => {
  // console.log('Received event with data: ', e.detail.selected);
};

const removeOption = index => {
  Overview.args.options.splice(index, 1);
  console.log(Overview.args.options);
};

export const Overview: Story = ({ options }) =>
  html`<uui-select-list multiple style=${styles.select} @change=${onChange}>
    <div>Whasl</div>
    ${options.map(
      (option, index) =>
        html`<uui-select-option style=${styles.option} .value=${option.value}>
          <span style=${styles.code}>${option.code}</span>
          <span style=${styles.display}>${option.display}</span>
          <button @click=${() => removeOption(index)}>delete</button>
        </uui-select-option>`
    )}
  </uui-select-list>`;

Overview.args = {
  options: [
    { value: 'banana', display: '🍌 Banana 🍌', code: 'OEI' },
    { value: 5, display: '🍎 Apple 🍎', code: 'GTS' },
    {
      value: { fruit: 'Grapes', count: 4 },
      display: '🍇 Grapes 🍇',
      code: 'LDK',
    },
    { value: 'lemon', display: '🍋 Lemon 🍋', code: 'IEJ' },
  ],
};
