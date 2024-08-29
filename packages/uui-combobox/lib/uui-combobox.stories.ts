import '.';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { spread } from '../../../storyhelpers';

import '@umbraco-ui/uui-scroll-container/lib';
import '@umbraco-ui/uui-icon/lib';
import '@umbraco-ui/uui-input/lib';
import '@umbraco-ui/uui-button/lib';
import '@umbraco-ui/uui-popover-container/lib';
import '@umbraco-ui/uui-symbol-expand';

import { repeat } from 'lit/directives/repeat.js';
import { useState, useArgs } from '@storybook/preview-api';

/**
 * Combobox does not have built in filtering, so you need to provide a list of options and filter them before adding them to the list.
 *
 * You can use the `@search` event to get the search input and filter the list of options.
 *
 * The following stories have a basic filter function that filters the list of fruits based on the search input.
 *
 * The search can be a little buggy in storybook, so you might need to click outside the combobox to get the search to work.
 */
const meta: Meta = {
  id: 'uui-combobox',
  component: 'uui-combobox',
  title: 'Inputs/Combobox',
  parameters: {
    docs: {
      source: { format: 'json' },
    },
  },
  render: args => {
    const [, setSearch] = useArgs();
    const [, setValue] = useArgs();

    const onSearch = (e: any) => {
      args.search = e.target.search;
      setSearch(args);
    };

    const onSelect = (e: any) => {
      args.value = e.target.value;
      setValue(args);
    };

    return html`<uui-combobox
        ${spread(args)}
        @search=${onSearch}
        @change=${onSelect}>
        <uui-combobox-list
          >${repeat(
            basicFilter(fruits, args.search ?? ''),
            fruit =>
              html` <uui-combobox-list-option value="${fruit}"
                >${fruit}</uui-combobox-list-option
              >`,
          )}
        </uui-combobox-list>
      </uui-combobox>

      <span style="margin-left: 16px">Selected value: ${args.value}</span> `;
  },
};

export default meta;
type Story = StoryObj;

const fruits = [
  'apple',
  'orange',
  'lemon',
  'melon',
  'banana',
  'pear',
  'mango',
  'plum',
  'raspberry',
  'kiwi',
  'avocado',
  'coconut',
  'grape',
];

const basicFilter = (options: string[], search: string) =>
  options.filter(option => option.toLowerCase().includes(search.toLowerCase()));

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Readonly: Story = {
  args: {
    readonly: true,
  },
};
