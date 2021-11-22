import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-sort-symbol/lib/index';

export default {
  id: 'uui-sort-symbol',
  title: 'Symbols/Sort Symbol',
  component: 'uui-sort-symbol',
  parameters: {
    docs: {
      source: {
        code: `<uui-sort-symbol></uui-sort-symbol>`,
      },
    },
  },
  args: {
    active: false,
    descending: false,
  },
  argTypes: {
    value: {
      active: { type: 'boolean' },
      descending: { type: 'boolean' },
    },
  },
};

export const Overview: Story = props =>
  html`<style>
      button {
        padding: 6px 6px 6px 12px;
        background-color: transparent;
        color: inherit;
        border: none;
        border-bottom: 1px solid currentColor;
        cursor: pointer;
      }
      uui-sort-symbol {
        margin-left: 20px;
      }
      button:hover {
        --uui-sort-symbol-hover: 1;
        /* We want to provide the hover indication on the sorting arrow for the full interactive element. */
      }
    </style>

    <button
      @click=${(e: MouseEvent) => {
        const sortArrowEl = (e.target as any).querySelector('uui-sort-symbol');
        // sorting algorithm/behaviour is not part of the symbol, therefor we need to do something like this in our implementation.
        if (sortArrowEl.active !== true) {
          sortArrowEl.active = true;
          return;
        }
        if (sortArrowEl.descending !== true) {
          sortArrowEl.descending = true;
        } else {
          sortArrowEl.descending = false;
          sortArrowEl.active = false;
        }
      }}>
      Header example
      <uui-sort-symbol ?active=${props.active} ?descending=${props.descending}>
      </uui-sort-symbol>
    </button>`;
