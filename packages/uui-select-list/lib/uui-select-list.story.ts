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

const options = [
  { value: 'banana', display: '🍌 Banana 🍌', code: 'OEI' },
  { value: 'apple', display: '🍎 Apple 🍎', code: 'GTS' },
  { value: 'grapes', display: '🍇 Grapes 🍇', code: 'LDK' },
  { value: 'lemon', display: '🍋 Lemon 🍋', code: 'IEJ' },
];

const styles = {
  select: 'border: 2px solid black; border-radius: 8px; overflow: hidden;',
  option:
    'width: 100%; height: 32px; display: grid; grid-template-columns: 42px 1fr; align-items: center; border-bottom: 1px solid;',
  code: 'border-right: 1px solid black; display: flex; justify-content: center; height: 100%; align-items: center;',
  display: 'padding: 0 8px',
};

const onChange = (e: any) => {
  console.log('Received event with data: ', e.detail.selected);
};

export const Overview: Story = () =>
  html`<uui-select-list style=${styles.select} multiple @change=${onChange}>
    ${options.map(
      option =>
        html`<uui-select-option style=${styles.option} .value=${option.value}>
          <span style=${styles.code}>${option.code}</span>
          <span style=${styles.display}>${option.display}</span>
        </uui-select-option>`
    )}
  </uui-select-list>`;
