import '.';
import readme from '../README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { spread } from '../../../storyhelpers';

import '@umbraco-ui/uui-scroll-container/lib';
import '@umbraco-ui/uui-icon/lib';
import '@umbraco-ui/uui-input/lib';
import '@umbraco-ui/uui-button/lib';
import '@umbraco-ui/uui-popover-container/lib';
import '@umbraco-ui/uui-symbol-expand/lib';
import '@umbraco-ui/uui-avatar/lib';

import { repeat } from 'lit/directives/repeat.js';
import { useArgs } from 'storybook/preview-api';
import RegionsAndCountries from '../../../storyhelpers/RegionsAndCountries';
import { until } from 'lit/directives/until.js';

const fruits = [
  'apple',
  'apricot',
  'avocado',
  'banana',
  'blackberry',
  'blueberry',
  'clementine',
  'coconut',
  'fig',
  'grape',
  'kiwi',
  'lemon',
  'mango',
  'melon',
  'orange',
  'papaya',
  'peach',
  'pear',
  'pineapple',
  'plum',
  'pomegranate',
  'raspberry',
  'strawberry',
  'tangerine',
  'watermelon',
];
/**
 * Combobox does not have built in filtering, so you need to provide a list of options and filter them before adding them to the list.
 *
 * You can use the `@search` event to get the search input and filter the list of options.
 *
 * The following stories have a basic filter function that filters the list of fruits based on the search input.
 *
 * The search can be a little buggy in storybook. This is not an issue in real applications.
 */
const meta: Meta = {
  id: 'uui-combobox',
  component: 'uui-combobox',
  title: 'Inputs/Combobox',
  args: {
    options: fruits,
    listItemRenderer: (item: any) =>
      html`<uui-combobox-list-option value="${item}">
        ${item}
      </uui-combobox-list-option>`,
    filter: (options: string[], search: string) =>
      options.filter(option =>
        option.toLowerCase().includes(search.toLowerCase()),
      ),
  },
  parameters: {
    readme: {
      markdown: readme,
    },
    controls: {
      exclude: ['listItemRenderer', 'filter'],
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

    const renderFilteredOptions = async () => {
      const filteredOptions = await args.filter(
        args.options,
        args.search ?? '',
      );
      return repeat(filteredOptions, args.listItemRenderer);
    };

    return html`<uui-combobox
        ${spread(args, ['options', 'listItemRenderer', 'filter'])}
        @search=${onSearch}
        @change=${onSelect}>
        <uui-combobox-list>
          ${until(renderFilteredOptions(), html`Searching...`)}
        </uui-combobox-list>
      </uui-combobox>

      <span style="margin-left: 16px">Selected value: ${args.value}</span>`;
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  parameters: {
    docs: {
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};

export const Placeholder: Story = {
  args: {
    placeholder: 'Placeholder',
  },
};

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

const avatars = [
  {
    id: 'SM',
    name: 'Superman',
    title: 'A pretty strong guy',
  },
  {
    id: 'RD',
    name: 'R2-D2',
    title: 'Bip Bub',
  },
  {
    id: 'LS',
    name: 'Luke Skywalker',
    title: 'Guy with a funky sword',
  },
  {
    id: 'BM',
    name: 'Batman',
    title: "I'M BATMAN!",
  },
];

/**
 * Selecting values doesn't trigger an update on docs page, go to the component story to see it in action.
 */
export const Avatars: Story = {
  args: {
    options: avatars,
    listItemRenderer: (item: any) =>
      html`<uui-combobox-list-option
        .displayValue=${item.name}
        style="display: flex; gap: 9px; align-items: center; padding: var(--uui-size-3)"
        .value=${item.id}>
        <uui-avatar
          style="background-color: #c8d1dd"
          .name=${item.name}></uui-avatar>
        <div style="display: flex; flex-direction: column">
          <b>${item.name}</b>
          <div style="font-size: 0.8rem">${item.title}</div>
        </div>
      </uui-combobox-list-option>`,
    filter: (options: any[], search: string) =>
      options.filter(option =>
        option.name.toLowerCase().includes(search.toLowerCase()),
      ),
  },
};
/**
 * Selecting values doesn't trigger an update on docs page, go to the component story to see it in action.
 */
export const Countries: Story = {
  args: {
    value: 'DK',
    regions: RegionsAndCountries,
  },
  parameters: {
    controls: {
      exclude: ['options', 'listItemRenderer', 'filter'],
    },
  },
  render: args => {
    const [, updateSearch] = useArgs();
    const [, updateValue] = useArgs();

    const handleSearch = (e: any) => {
      args.search = e.target.search;
      updateSearch(args);
    };

    const handleSelect = (e: any) => {
      args.value = e.target.value;
      updateValue(args);
    };

    const renderCountry = (country: any) =>
      html`<uui-combobox-list-option
        style="scroll-margin-top: 40px; display: flex; align-items: center; gap: 8px; padding: 8px 8px;"
        .value=${country.ISOAlpha3Code}
        .displayValue=${country.countryName}>
        <img
          style="height: 24px"
          src=${country.flag}
          alt=${country.countryName} />${country.countryName}
      </uui-combobox-list-option>`;

    const renderRegion = (region: any, index: number) => html`
      <span
        style=${`${
          index > 0 ? 'margin-top: 6px' : ''
        }; position: sticky; top: 0; text-align: center; padding: 8px; margin-bottom: 6px; font-weight: bold; color: #333333; background: #eeeeee; z-index: 1; outline: 1px solid var(--uui-color-border,#c4c4c4);`}>
        ${region.name}
      </span>
      ${repeat(
        region.countries,
        (item: any) => item.ISOAlpha3Code,
        item => renderCountry(item),
      )}
    `;

    const filterOptions = (regions: any, search: string): any[] => {
      const filteredRegions = regions.filter((region: any) =>
        region.countries.some((country: any) =>
          country?.countryName
            ?.toLowerCase()
            .includes(search?.toLowerCase() ?? ''),
        ),
      );

      const filterFinal = filteredRegions.map((region: any) => ({
        name: region.name,
        countries: region.countries.filter((country: any) =>
          country?.countryName
            ?.toLowerCase()
            .includes(search?.toLowerCase() ?? ''),
        ),
      }));

      return filterFinal;
    };

    const renderFilteredOptions = () => {
      const options = filterOptions(args.regions, args.search).map(
        (region: any, i: number) => renderRegion(region, i),
      );

      return options.length > 0
        ? options
        : html`<div style="text-align: center; padding: var(--uui-size-4);">
            No countries found
          </div>`;
    };

    const renderValueFlag = () => {
      const country = args.regions
        .flatMap((region: any) => region.countries)
        .find((country: any) => country.ISOAlpha3Code === args.value);

      return args.value
        ? html`<img
            style="width: 24px; display: flex; padding-left: var(--uui-size-3);"
            src=${country.flag}
            alt="" />`
        : '';
    };
    return html`<uui-combobox
        .value=${args.value}
        style="--uui-combobox-popover-max-height: 300px; width: 250px;"
        @search=${handleSearch}
        @change=${handleSelect}>
        <span slot="input-prepend" style="display: flex; align-items: center;">
          ${renderValueFlag()}
        </span>
        <uui-combobox-list>${renderFilteredOptions()}</uui-combobox-list>
      </uui-combobox>

      <span style="margin-left: 16px">Selected value: ${args.value}</span> `;
  },
};

const fakeApi = (search: string) => {
  if (search === '') return [];

  return new Promise(resolve =>
    setTimeout(() => {
      const filteredData = fruits.filter(item =>
        item.toLowerCase().includes(search.toLowerCase()),
      );
      resolve(filteredData);
    }, 500),
  );
};

export const Async: Story = {
  args: {
    async: true,
    options: [],
    filter: async (_options: any, search: string) => {
      return await fakeApi(search);
    },
  },
};
