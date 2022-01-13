import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-symbol-sort/lib/index';

export default {
  id: 'uui-symbol-sort',
  title: 'Symbols/Sort',
  component: 'uui-symbol-sort',
  parameters: {
    docs: {
      source: {
        code: `<uui-symbol-sort></uui-symbol-sort>`,
      },
    },
  },
  args: {
    active: false,
    descending: false,
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
      uui-symbol-sort {
        margin-left: 20px;
      }
      button:hover {
        --uui-symbol-sort-hover: 1;
        /* We want to provide the hover indication on the sorting arrow for the full interactive element. */
      }
    </style>

    <button
      @click=${(e: MouseEvent) => {
        const sortArrowEl = (e.target as any).querySelector('uui-symbol-sort');
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
      <uui-symbol-sort
        ?active=${props.active}
        ?descending=${props.descending}></uui-symbol-sort>
    </button>`;
