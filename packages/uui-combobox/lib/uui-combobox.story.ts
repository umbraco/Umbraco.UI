import '.';
import './uui-combobox-async-example';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import { useArgs } from '@storybook/client-api';
import { repeat } from 'lit/directives/repeat.js';
import RegionsAndCountries from '../../../storyhelpers/RegionsAndCountries';

export default {
  id: 'uui-combobox',
  title: 'Inputs/Combobox',
  component: 'uui-combobox',
  args: {
    search: '',
  },
  parameters: {
    docs: {
      source: {
        code: `<uui-combobox style="width: 250px"></uui-combobox>`,
      },
    },
  },
};

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

const basicFilter = (options: string[], search: string) =>
  options.filter(option => option.includes(search));

const renderAvatar = (option: any) => html` <uui-combobox-list-option
  .displayValue=${option.name}
  style="display: flex; gap: 9px; align-items: center; padding: var(--uui-size-3)"
  .value=${option.id}>
  <uui-avatar
    style="background-color: #c8d1dd"
    .name=${option.name}></uui-avatar>
  <div style="display: flex; flex-direction: column">
    <b>${option.name}</b>
    <div style="font-size: 0.8rem">${option.title}</div>
  </div>
</uui-combobox-list-option>`;

const Template: Story = props => {
  const [, updateSearch] = useArgs();
  const [, updateSelected] = useArgs();

  const {
    options,
    selected,
    search,
    filter,
    displayValueMod,
    valueMod,
    renderMod,
  } = props;

  const handleSearch = (e: any) => {
    props.search = e.target.search;
    updateSearch(props);
  };

  const handleSelect = (e: any) => {
    props.selected = e.target.value;
    updateSelected(props);
  };

  return html`<uui-combobox
      @change=${handleSelect}
      @search=${handleSearch}
      style="width: 250px">
      <uui-combobox-list>
        ${repeat(filter(options, search), (option: any, index: number) =>
          renderMod
            ? renderMod(option, index)
            : html`<uui-combobox-list-option
                .value=${valueMod ? valueMod(option) : option}
                .displayValue=${displayValueMod
                  ? displayValueMod(option)
                  : option}
                style="padding: 8px">
                ${option}
              </uui-combobox-list-option>`
        )}
      </uui-combobox-list>
    </uui-combobox>

    <span style="margin-left: 16px">Selected value: ${selected}</span> `;
};

export const AAAOverview: Story = Template.bind({});
AAAOverview.args = {
  options: fruits,
  filter: basicFilter,
};
AAAOverview.storyName = 'Overview';
AAAOverview.parameters = {
  docs: {
    source: {
      code: `
<uui-combobox style="width: 250px">
  <uui-combobox-list>
    <uui-combobox-list-option style="padding: 8px">
      apple
    </uui-combobox-list-option>
    <uui-combobox-list-option style="padding: 8px">
      orange
    </uui-combobox-list-option>
    <uui-combobox-list-option style="padding: 8px">
      lemon
    </uui-combobox-list-option>
    ...
  </uui-combobox-list>
</uui-combobox>
  `,
    },
  },
};

export const CustomValue: Story = Template.bind({});
CustomValue.args = {
  options: fruits,
  valueMod: (fruit: string) => 'FRUIT_' + fruit.toUpperCase(),
  filter: basicFilter,
};
CustomValue.parameters = {
  docs: {
    source: {
      code: `
<uui-combobox style="width: 250px">
  <uui-combobox-list>
    <uui-combobox-list-option value="FRUIT_APPLE" style="padding: 8px">
      apple
    </uui-combobox-list-option>
    <uui-combobox-list-option value="FRUIT_ORANGE" style="padding: 8px">
      orange
    </uui-combobox-list-option>
    <uui-combobox-list-option value="LEMON" style="padding: 8px">
      lemon
    </uui-combobox-list-option>
    ...
  </uui-combobox-list>
</uui-combobox>
  `,
    },
  },
};

export const CustomDisplayValue: Story = Template.bind({});
CustomDisplayValue.args = {
  options: fruits,
  displayValueMod: (fruit: string) =>
    fruit.charAt(0).toUpperCase() + fruit.slice(1),
  filter: basicFilter,
};
CustomDisplayValue.parameters = {
  docs: {
    source: {
      code: `
<uui-combobox style="width: 250px">
  <uui-combobox-list>
    <uui-combobox-list-option displayValue="Apple" style="padding: 8px">
      apple
    </uui-combobox-list-option>
    <uui-combobox-list-option displayValue="Orange" style="padding: 8px">
      orange
    </uui-combobox-list-option>
    <uui-combobox-list-option displayValue="Lemon" style="padding: 8px">
      lemon
    </uui-combobox-list-option>
    ...
  </uui-combobox-list>
</uui-combobox>
  `,
    },
  },
};

export const Avatars: Story = Template.bind({});
Avatars.args = {
  options: avatars,
  renderMod: (avatar: any) => renderAvatar(avatar),
  filter: (options: any[], search: string) =>
    options.filter(option => option.name.includes(search)),
};

export const CountrySelect: Story = props => {
  const [, updateSearch] = useArgs();
  const [, updateSelected] = useArgs();

  const handleSearch = (e: any) => {
    props.search = e.target.search;
    updateSearch(props);
  };

  const handleSelect = (e: any) => {
    props.selected = e.target.value;
    updateSelected(props);
  };

  const renderCountry = (country: any) => html`<uui-combobox-list-option
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
      }; position: sticky; top: 0; text-align: center; padding: 8px; margin-bottom: 6px; font-weight: bold; color: #333333; background: #eeeeee; z-index: 1; outline: 1px solid var(--uui-interface-border,#c4c4c4);`}>
      ${region.name}
    </span>
    ${repeat(
      region.countries,
      (item: any) => item.ISOAlpha3Code,
      item => renderCountry(item)
    )}
  `;

  const filterOptions = (regions: any, search: string): any[] => {
    const filteredRegions = regions.filter((region: any) =>
      region.countries.some((country: any) =>
        country.countryName.toLowerCase().includes(search.toLowerCase())
      )
    );

    const filterFinal = filteredRegions.map((region: any) => ({
      name: region.name,
      countries: region.countries.filter((country: any) =>
        country.countryName.toLowerCase().includes(search.toLowerCase())
      ),
    }));

    return filterFinal;
  };

  const renderFilteredOptions = () => {
    const options = filterOptions(props.regions, props.search).map(
      (region: any, i: number) => renderRegion(region, i)
    );

    return options.length > 0
      ? options
      : html`<div style="text-align: center; padding: var(--uui-size-4);">
          No countries found
        </div>`;
  };

  const renderSelectedFlag = () => {
    const country = props.regions
      .flatMap((region: any) => region.countries)
      .find((country: any) => country.ISOAlpha3Code === props.selected);

    return props.selected
      ? html`<img
          style="width: 24px; display: flex; padding-left: var(--uui-size-3);"
          src=${country.flag}
          alt="" />`
      : '';
  };
  return html`<uui-combobox
      .value=${props.selected}
      style="--uui-combobox-popover-max-height: 300px; width: 250px;"
      @search=${handleSearch}
      @change=${handleSelect}>
      <span slot="input-prepend">${renderSelectedFlag()}</span>
      <uui-combobox-list>${renderFilteredOptions()}</uui-combobox-list>
    </uui-combobox>

    <span style="margin-left: 16px">Selected value: ${props.selected}</span> `;
};

Avatars.parameters = {
  docs: {
    source: {
      code: `
<uui-combobox style="width: 250px">
  <uui-combobox-list>
    <uui-combobox-list-option display-value="Superman" value="SM" style="display: flex; gap: 9px; align-items: center; padding: var(--uui-size-3)">
      <uui-avatar style="background-color: #c8d1dd"></uui-avatar>
      <div style="display: flex; flex-direction: column">
        <b>Superman</b>
        <div style="font-size: 0.8rem">A pretty strong guy</div>
      </div>
    </uui-combobox-list-option> 
    <uui-combobox-list-option display-value="R2-D2" value="RD" style="display: flex; gap: 9px; align-items: center; padding: var(--uui-size-3)">
      <uui-avatar style="background-color: #c8d1dd"></uui-avatar>
      <div style="display: flex; flex-direction: column">
        <b>R2-D2</b>
        <div style="font-size: 0.8rem">Bip Bub</div>
      </div>
    </uui-combobox-list-option> 
    <uui-combobox-list-option display-value="Luke Skywalker" value="LS" style="display: flex; gap: 9px; align-items: center; padding: var(--uui-size-3)">
      <uui-avatar style="background-color: #c8d1dd"></uui-avatar>
      <div style="display: flex; flex-direction: column">
        <b>Luke Skywalker</b>
        <div style="font-size: 0.8rem">Guy with a funky sword</div>
      </div>
    </uui-combobox-list-option> 
    <uui-combobox-list-option display-value="Batman" value="BM" style="display: flex; gap: 9px; align-items: center; padding: var(--uui-size-3)">
      <uui-avatar style="background-color: #c8d1dd"></uui-avatar>
      <div style="display: flex; flex-direction: column">
        <b>Batman</b>
        <div style="font-size: 0.8rem">I'M BATMAN!</div>
      </div>
    </uui-combobox-list-option>
  </uui-combobox-list>
</uui-combobox>
  `,
    },
  },
};

CountrySelect.parameters = {
  docs: {
    source: {
      code: `
<uui-combobox style="width: 250px">
  <uui-combobox-list>
    <span style="; position: sticky; top: 0; text-align: center; padding: 8px; margin-bottom: 6px; font-weight: bold; color: #333333; background: #eeeeee; z-index: 1; outline: 1px solid var(--uui-interface-border,#c4c4c4);">
      Africa
    </span>
    <uui-combobox-list-option style="scroll-margin-top: 40px; display: flex; align-items: center; gap: 8px; padding: 8px 8px;" tabindex="0">
     <img style="height: 24px" src="https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DZ.svg" alt="Algeria">
     Algeria
    </uui-combobox-list-option>
    <uui-combobox-list-option style="scroll-margin-top: 40px; display: flex; align-items: center; gap: 8px; padding: 8px 8px;" tabindex="0">
      <img style="height: 24px" src="https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/EG.svg" alt="Egypt">
      Egypt
    </uui-combobox-list-option>
    <uui-combobox-list-option style="scroll-margin-top: 40px; display: flex; align-items: center; gap: 8px; padding: 8px 8px;" tabindex="0">
      <img style="height: 24px" src="https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LY.svg" alt="Libya">
      Libya
    </uui-combobox-list-option>
    ...
  </uui-combobox-list>
</uui-combobox>
  `,
    },
  },
};

CountrySelect.args = {
  search: '',
  selected: 'DK',
  regions: RegionsAndCountries,
};

/*
export const AsyncData: Story = () =>
  html`<uui-combobox-async-example></uui-combobox-async-example>`;
*/
