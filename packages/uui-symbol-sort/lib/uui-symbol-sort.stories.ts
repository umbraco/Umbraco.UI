import '.';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { spread } from '../../../storyhelpers';

const meta: Meta = {
  id: 'uui-symbol-sort',
  component: 'uui-symbol-sort',
  title: 'Symbols/Sort',
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: args =>
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
          const sortArrowEl = (e.target as any).querySelector(
            'uui-symbol-sort',
          );
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
        <uui-symbol-sort ${spread(args)}></uui-symbol-sort>
      </button>`,
};
