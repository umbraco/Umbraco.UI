import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import { useArgs } from '@storybook/client-api';
import { repeat } from 'lit/directives/repeat.js';

export default {
  id: 'uui-combobox',
  title: 'Combobox',
  component: 'uui-combobox',
  parameters: {
    docs: {
      source: {
        code: `<uui-combobox></uui-combobox>`,
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

const filter = (options, search) =>
  options.filter((option: any) => option.includes(search));

const Template: Story = props => {
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

  return html`<uui-combobox
      @change=${handleSelect}
      @input=${handleSearch}
      style="width: 200px">
      ${props
        .filter(props.options, props.search)
        .map(
          (option: any) =>
            html`<uui-combobox-list-option style="padding: 8px">
              ${option}
            </uui-combobox-list-option>`
        )}
    </uui-combobox>

    <span style="margin-left: 16px">Selected value: ${props.selected}</span> `;
};

export const AAAOverview: Story = Template.bind({});
AAAOverview.args = { search: '', options: fruits, filter: filter };
AAAOverview.storyName = 'Overview';

export const CustomValue: Story = props => {
  const [, updateSelected] = useArgs();
  const handleSelect = (e: any) => {
    props.selected = e.target.value;
    updateSelected(props);
  };

  return html`<uui-combobox @change=${handleSelect} style="width: 200px">
      ${fruits.map(
        fruit =>
          html`<uui-combobox-list-option .value=${fruit} style="padding: 8px">
            ${fruit.toUpperCase()}
          </uui-combobox-list-option>`
      )}
    </uui-combobox>

    <span style="margin-left: 16px">Selected value: ${props.selected}</span> `;
};

export const CustomDisplayValue: Story = props => {
  const [, updateSelected] = useArgs();
  const handleSelect = (e: any) => {
    props.selected = e.target.value;
    updateSelected(props);
  };

  return html`<uui-combobox @change=${handleSelect} style="width: 200px">
      ${fruits.map(
        fruit =>
          html`<uui-combobox-list-option
            .displayValue=${'you selected ' + fruit}
            style="padding: 8px">
            ${fruit}
          </uui-combobox-list-option>`
      )}
    </uui-combobox>

    <span style="margin-left: 16px">Selected value: ${props.selected}</span> `;
};

export const Avatars: Story = props => {
  const [, updateSearch] = useArgs();
  const [, updateSelected] = useArgs();

  const handleSelect = (e: any) => {
    props.selected = e.target.value;
    updateSelected(props);
  };

  const handleSearch = (e: any) => {
    props.search = e.target.search;
    updateSearch(props);
  };

  const renderAvatar = (
    value: string,
    name: any,
    label: string
  ) => html` <uui-combobox-list-option
    .displayValue=${name}
    style="display: flex; gap: 9px; align-items: center; padding: var(--uui-size-3)"
    .value=${value}>
    <uui-avatar style="background-color: #c8d1dd" .name=${name}></uui-avatar>
    <div style="display: flex; flex-direction: column">
      <b>${name}</b>
      <div style="font-size: 0.8rem">${label}</div>
    </div>
  </uui-combobox-list-option>`;

  const filteredAvatars = props.avatars.filter((avatar: any) =>
    avatar.name.includes(props.search)
  );

  return html`<uui-combobox
      style="width: 200px"
      @input=${handleSearch}
      @change=${handleSelect}>
      ${filteredAvatars.map((avatar: any) =>
        renderAvatar(avatar.id, avatar.name, avatar.title)
      )}
    </uui-combobox>

    <span style="margin-left: 16px">Selected value: ${props.selected}</span> `;
};

Avatars.args = {
  search: '',
  avatars: [
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
  ],
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
      style="--uui-combobox-popover-max-height: 300px; max-width: 300px;"
      @input=${handleSearch}
      @change=${handleSelect}>
      <span slot="input-prepend">${renderSelectedFlag()}</span>
      ${renderFilteredOptions()}
    </uui-combobox>

    <span style="margin-left: 16px">Selected value: ${props.selected}</span> `;
};

CountrySelect.args = {
  search: '',
  selected: 'DK',
  regions: [
    {
      name: 'Africa',
      countries: [
        {
          regionName: 'Africa',
          subRegionName: 'Northern Africa',
          countryName: 'Algeria',
          ISOAlpha3Code: 'DZ',
          ISOAlpha2Code: 'DZA',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DZ.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Northern Africa',
          countryName: 'Egypt',
          ISOAlpha3Code: 'EG',
          ISOAlpha2Code: 'EGY',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/EG.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Northern Africa',
          countryName: 'Libya',
          ISOAlpha3Code: 'LY',
          ISOAlpha2Code: 'LBY',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LY.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Northern Africa',
          countryName: 'Morocco',
          ISOAlpha3Code: 'MA',
          ISOAlpha2Code: 'MAR',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MA.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Northern Africa',
          countryName: 'Sudan',
          ISOAlpha3Code: 'SD',
          ISOAlpha2Code: 'SDN',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SD.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Northern Africa',
          countryName: 'Tunisia',
          ISOAlpha3Code: 'TN',
          ISOAlpha2Code: 'TUN',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TN.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Northern Africa',
          countryName: 'Western Sahara',
          ISOAlpha3Code: 'EH',
          ISOAlpha2Code: 'ESH',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/EH.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Sub-Saharan Africa',
          countryName: 'British Indian Ocean Territory',
          ISOAlpha3Code: 'IO',
          ISOAlpha2Code: 'IOT',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IO.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Sub-Saharan Africa',
          countryName: 'Burundi',
          ISOAlpha3Code: 'BI',
          ISOAlpha2Code: 'BDI',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BI.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Sub-Saharan Africa',
          countryName: 'Comoros',
          ISOAlpha3Code: 'KM',
          ISOAlpha2Code: 'COM',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KM.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Sub-Saharan Africa',
          countryName: 'Djibouti',
          ISOAlpha3Code: 'DJ',
          ISOAlpha2Code: 'DJI',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DJ.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Sub-Saharan Africa',
          countryName: 'Eritrea',
          ISOAlpha3Code: 'ER',
          ISOAlpha2Code: 'ERI',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ER.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Sub-Saharan Africa',
          countryName: 'Ethiopia',
          ISOAlpha3Code: 'ET',
          ISOAlpha2Code: 'ETH',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ET.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Sub-Saharan Africa',
          countryName: 'French Southern Territories',
          ISOAlpha3Code: 'TF',
          ISOAlpha2Code: 'ATF',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TF.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Sub-Saharan Africa',
          countryName: 'Kenya',
          ISOAlpha3Code: 'KE',
          ISOAlpha2Code: 'KEN',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KE.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Sub-Saharan Africa',
          countryName: 'Madagascar',
          ISOAlpha3Code: 'MG',
          ISOAlpha2Code: 'MDG',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MG.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Sub-Saharan Africa',
          countryName: 'Malawi',
          ISOAlpha3Code: 'MW',
          ISOAlpha2Code: 'MWI',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MW.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Sub-Saharan Africa',
          countryName: 'Mauritius',
          ISOAlpha3Code: 'MU',
          ISOAlpha2Code: 'MUS',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MU.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Sub-Saharan Africa',
          countryName: 'Mayotte',
          ISOAlpha3Code: 'YT',
          ISOAlpha2Code: 'MYT',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/YT.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Sub-Saharan Africa',
          countryName: 'Mozambique',
          ISOAlpha3Code: 'MZ',
          ISOAlpha2Code: 'MOZ',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MZ.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Sub-Saharan Africa',
          countryName: 'Réunion',
          ISOAlpha3Code: 'RE',
          ISOAlpha2Code: 'REU',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/RE.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Sub-Saharan Africa',
          countryName: 'Rwanda',
          ISOAlpha3Code: 'RW',
          ISOAlpha2Code: 'RWA',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/RW.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Sub-Saharan Africa',
          countryName: 'Seychelles',
          ISOAlpha3Code: 'SC',
          ISOAlpha2Code: 'SYC',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SC.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Sub-Saharan Africa',
          countryName: 'Somalia',
          ISOAlpha3Code: 'SO',
          ISOAlpha2Code: 'SOM',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SO.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Sub-Saharan Africa',
          countryName: 'South Sudan',
          ISOAlpha3Code: 'SS',
          ISOAlpha2Code: 'SSD',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SS.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Sub-Saharan Africa',
          countryName: 'Uganda',
          ISOAlpha3Code: 'UG',
          ISOAlpha2Code: 'UGA',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/UG.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Sub-Saharan Africa',
          countryName: 'United Republic of Tanzania',
          ISOAlpha3Code: 'TZ',
          ISOAlpha2Code: 'TZA',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TZ.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Sub-Saharan Africa',
          countryName: 'Zambia',
          ISOAlpha3Code: 'ZM',
          ISOAlpha2Code: 'ZMB',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ZM.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Sub-Saharan Africa',
          countryName: 'Zimbabwe',
          ISOAlpha3Code: 'ZW',
          ISOAlpha2Code: 'ZWE',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ZW.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Sub-Saharan Africa',
          countryName: 'Angola',
          ISOAlpha3Code: 'AO',
          ISOAlpha2Code: 'AGO',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AO.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Sub-Saharan Africa',
          countryName: 'Cameroon',
          ISOAlpha3Code: 'CM',
          ISOAlpha2Code: 'CMR',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CM.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Sub-Saharan Africa',
          countryName: 'Central African Republic',
          ISOAlpha3Code: 'CF',
          ISOAlpha2Code: 'CAF',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CF.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Sub-Saharan Africa',
          countryName: 'Chad',
          ISOAlpha3Code: 'TD',
          ISOAlpha2Code: 'TCD',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TD.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Sub-Saharan Africa',
          countryName: 'Congo',
          ISOAlpha3Code: 'CG',
          ISOAlpha2Code: 'COG',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CG.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Sub-Saharan Africa',
          countryName: 'Democratic Republic of the Congo',
          ISOAlpha3Code: 'CD',
          ISOAlpha2Code: 'COD',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CD.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Sub-Saharan Africa',
          countryName: 'Equatorial Guinea',
          ISOAlpha3Code: 'GQ',
          ISOAlpha2Code: 'GNQ',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GQ.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Sub-Saharan Africa',
          countryName: 'Gabon',
          ISOAlpha3Code: 'GA',
          ISOAlpha2Code: 'GAB',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GA.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Sub-Saharan Africa',
          countryName: 'Sao Tome and Principe',
          ISOAlpha3Code: 'ST',
          ISOAlpha2Code: 'STP',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ST.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Sub-Saharan Africa',
          countryName: 'Botswana',
          ISOAlpha3Code: 'BW',
          ISOAlpha2Code: 'BWA',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BW.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Sub-Saharan Africa',
          countryName: 'Eswatini',
          ISOAlpha3Code: 'SZ',
          ISOAlpha2Code: 'SWZ',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SZ.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Sub-Saharan Africa',
          countryName: 'Lesotho',
          ISOAlpha3Code: 'LS',
          ISOAlpha2Code: 'LSO',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LS.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Sub-Saharan Africa',
          countryName: 'Namibia',
          ISOAlpha3Code: 'NA',
          ISOAlpha2Code: 'NAM',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NA.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Sub-Saharan Africa',
          countryName: 'South Africa',
          ISOAlpha3Code: 'ZA',
          ISOAlpha2Code: 'ZAF',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ZA.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Sub-Saharan Africa',
          countryName: 'Benin',
          ISOAlpha3Code: 'BJ',
          ISOAlpha2Code: 'BEN',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BJ.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Sub-Saharan Africa',
          countryName: 'Burkina Faso',
          ISOAlpha3Code: 'BF',
          ISOAlpha2Code: 'BFA',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BF.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Sub-Saharan Africa',
          countryName: 'Cabo Verde',
          ISOAlpha3Code: 'CV',
          ISOAlpha2Code: 'CPV',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CV.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Sub-Saharan Africa',
          countryName: 'Côte d’Ivoire',
          ISOAlpha3Code: 'CI',
          ISOAlpha2Code: 'CIV',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CI.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Sub-Saharan Africa',
          countryName: 'Gambia',
          ISOAlpha3Code: 'GM',
          ISOAlpha2Code: 'GMB',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GM.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Sub-Saharan Africa',
          countryName: 'Ghana',
          ISOAlpha3Code: 'GH',
          ISOAlpha2Code: 'GHA',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GH.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Sub-Saharan Africa',
          countryName: 'Guinea',
          ISOAlpha3Code: 'GN',
          ISOAlpha2Code: 'GIN',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GN.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Sub-Saharan Africa',
          countryName: 'Guinea-Bissau',
          ISOAlpha3Code: 'GW',
          ISOAlpha2Code: 'GNB',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GW.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Sub-Saharan Africa',
          countryName: 'Liberia',
          ISOAlpha3Code: 'LR',
          ISOAlpha2Code: 'LBR',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LR.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Sub-Saharan Africa',
          countryName: 'Mali',
          ISOAlpha3Code: 'ML',
          ISOAlpha2Code: 'MLI',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ML.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Sub-Saharan Africa',
          countryName: 'Mauritania',
          ISOAlpha3Code: 'MR',
          ISOAlpha2Code: 'MRT',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MR.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Sub-Saharan Africa',
          countryName: 'Niger',
          ISOAlpha3Code: 'NE',
          ISOAlpha2Code: 'NER',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NE.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Sub-Saharan Africa',
          countryName: 'Nigeria',
          ISOAlpha3Code: 'NG',
          ISOAlpha2Code: 'NGA',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NG.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Sub-Saharan Africa',
          countryName: 'Saint Helena',
          ISOAlpha3Code: 'SH',
          ISOAlpha2Code: 'SHN',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SH.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Sub-Saharan Africa',
          countryName: 'Senegal',
          ISOAlpha3Code: 'SN',
          ISOAlpha2Code: 'SEN',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SN.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Sub-Saharan Africa',
          countryName: 'Sierra Leone',
          ISOAlpha3Code: 'SL',
          ISOAlpha2Code: 'SLE',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SL.svg',
        },
        {
          regionName: 'Africa',
          subRegionName: 'Sub-Saharan Africa',
          countryName: 'Togo',
          ISOAlpha3Code: 'TG',
          ISOAlpha2Code: 'TGO',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TG.svg',
        },
      ],
    },
    {
      name: 'Americas',
      countries: [
        {
          regionName: 'Americas',
          subRegionName: 'Latin America and the Caribbean',
          countryName: 'Anguilla',
          ISOAlpha3Code: 'AI',
          ISOAlpha2Code: 'AIA',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AI.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Latin America and the Caribbean',
          countryName: 'Antigua and Barbuda',
          ISOAlpha3Code: 'AG',
          ISOAlpha2Code: 'ATG',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AG.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Latin America and the Caribbean',
          countryName: 'Aruba',
          ISOAlpha3Code: 'AW',
          ISOAlpha2Code: 'ABW',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AW.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Latin America and the Caribbean',
          countryName: 'Bahamas',
          ISOAlpha3Code: 'BS',
          ISOAlpha2Code: 'BHS',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BS.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Latin America and the Caribbean',
          countryName: 'Barbados',
          ISOAlpha3Code: 'BB',
          ISOAlpha2Code: 'BRB',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BB.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Latin America and the Caribbean',
          countryName: 'Bonaire',
          ISOAlpha3Code: 535,
          ISOAlpha2Code: 'BQ',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Latin America and the Caribbean',
          countryName: 'British Virgin Islands',
          ISOAlpha3Code: 'VG',
          ISOAlpha2Code: 'VGB',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VG.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Latin America and the Caribbean',
          countryName: 'Cayman Islands',
          ISOAlpha3Code: 'KY',
          ISOAlpha2Code: 'CYM',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KY.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Latin America and the Caribbean',
          countryName: 'Cuba',
          ISOAlpha3Code: 'CU',
          ISOAlpha2Code: 'CUB',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CU.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Latin America and the Caribbean',
          countryName: 'Curaçao',
          ISOAlpha3Code: 'CW',
          ISOAlpha2Code: 'CUW',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CW.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Latin America and the Caribbean',
          countryName: 'Dominica',
          ISOAlpha3Code: 'DM',
          ISOAlpha2Code: 'DMA',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DM.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Latin America and the Caribbean',
          countryName: 'Dominican Republic',
          ISOAlpha3Code: 'DO',
          ISOAlpha2Code: 'DOM',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DO.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Latin America and the Caribbean',
          countryName: 'Grenada',
          ISOAlpha3Code: 'GD',
          ISOAlpha2Code: 'GRD',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GD.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Latin America and the Caribbean',
          countryName: 'Guadeloupe',
          ISOAlpha3Code: 'GP',
          ISOAlpha2Code: 'GLP',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GP.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Latin America and the Caribbean',
          countryName: 'Haiti',
          ISOAlpha3Code: 'HT',
          ISOAlpha2Code: 'HTI',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/HT.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Latin America and the Caribbean',
          countryName: 'Jamaica',
          ISOAlpha3Code: 'JM',
          ISOAlpha2Code: 'JAM',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/JM.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Latin America and the Caribbean',
          countryName: 'Martinique',
          ISOAlpha3Code: 'MQ',
          ISOAlpha2Code: 'MTQ',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MQ.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Latin America and the Caribbean',
          countryName: 'Montserrat',
          ISOAlpha3Code: 'MS',
          ISOAlpha2Code: 'MSR',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MS.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Latin America and the Caribbean',
          countryName: 'Puerto Rico',
          ISOAlpha3Code: 'PR',
          ISOAlpha2Code: 'PRI',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PR.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Latin America and the Caribbean',
          countryName: 'Saint Barthélemy',
          ISOAlpha3Code: 'BL',
          ISOAlpha2Code: 'BLM',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BL.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Latin America and the Caribbean',
          countryName: 'Saint Kitts and Nevis',
          ISOAlpha3Code: 'KN',
          ISOAlpha2Code: 'KNA',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KN.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Latin America and the Caribbean',
          countryName: 'Saint Lucia',
          ISOAlpha3Code: 'LC',
          ISOAlpha2Code: 'LCA',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LC.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Latin America and the Caribbean',
          countryName: 'Saint Martin (French Part)',
          ISOAlpha3Code: 'MF',
          ISOAlpha2Code: 'MAF',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MF.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Latin America and the Caribbean',
          countryName: 'Saint Vincent and the Grenadines',
          ISOAlpha3Code: 'VC',
          ISOAlpha2Code: 'VCT',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VC.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Latin America and the Caribbean',
          countryName: 'Sint Maarten (Dutch part)',
          ISOAlpha3Code: 'SX',
          ISOAlpha2Code: 'SXM',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SX.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Latin America and the Caribbean',
          countryName: 'Trinidad and Tobago',
          ISOAlpha3Code: 'TT',
          ISOAlpha2Code: 'TTO',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TT.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Latin America and the Caribbean',
          countryName: 'Turks and Caicos Islands',
          ISOAlpha3Code: 'TC',
          ISOAlpha2Code: 'TCA',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TC.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Latin America and the Caribbean',
          countryName: 'United States Virgin Islands',
          ISOAlpha3Code: 'VI',
          ISOAlpha2Code: 'VIR',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VI.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Latin America and the Caribbean',
          countryName: 'Belize',
          ISOAlpha3Code: 'BZ',
          ISOAlpha2Code: 'BLZ',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BZ.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Latin America and the Caribbean',
          countryName: 'Costa Rica',
          ISOAlpha3Code: 'CR',
          ISOAlpha2Code: 'CRI',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CR.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Latin America and the Caribbean',
          countryName: 'El Salvador',
          ISOAlpha3Code: 'SV',
          ISOAlpha2Code: 'SLV',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SV.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Latin America and the Caribbean',
          countryName: 'Guatemala',
          ISOAlpha3Code: 'GT',
          ISOAlpha2Code: 'GTM',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GT.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Latin America and the Caribbean',
          countryName: 'Honduras',
          ISOAlpha3Code: 'HN',
          ISOAlpha2Code: 'HND',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/HN.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Latin America and the Caribbean',
          countryName: 'Mexico',
          ISOAlpha3Code: 'MX',
          ISOAlpha2Code: 'MEX',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MX.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Latin America and the Caribbean',
          countryName: 'Nicaragua',
          ISOAlpha3Code: 'NI',
          ISOAlpha2Code: 'NIC',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NI.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Latin America and the Caribbean',
          countryName: 'Panama',
          ISOAlpha3Code: 'PA',
          ISOAlpha2Code: 'PAN',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PA.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Latin America and the Caribbean',
          countryName: 'Argentina',
          ISOAlpha3Code: 'AR',
          ISOAlpha2Code: 'ARG',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AR.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Latin America and the Caribbean',
          countryName: 'Bolivia (Plurinational State of)',
          ISOAlpha3Code: 'BO',
          ISOAlpha2Code: 'BOL',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BO.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Latin America and the Caribbean',
          countryName: 'Bouvet Island',
          ISOAlpha3Code: 'BV',
          ISOAlpha2Code: 'BVT',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BV.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Latin America and the Caribbean',
          countryName: 'Brazil',
          ISOAlpha3Code: 'BR',
          ISOAlpha2Code: 'BRA',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BR.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Latin America and the Caribbean',
          countryName: 'Chile',
          ISOAlpha3Code: 'CL',
          ISOAlpha2Code: 'CHL',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CL.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Latin America and the Caribbean',
          countryName: 'Colombia',
          ISOAlpha3Code: 'CO',
          ISOAlpha2Code: 'COL',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CO.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Latin America and the Caribbean',
          countryName: 'Ecuador',
          ISOAlpha3Code: 'EC',
          ISOAlpha2Code: 'ECU',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/EC.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Latin America and the Caribbean',
          countryName: 'Falkland Islands (Malvinas)',
          ISOAlpha3Code: 'FK',
          ISOAlpha2Code: 'FLK',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/FK.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Latin America and the Caribbean',
          countryName: 'French Guiana',
          ISOAlpha3Code: 'GF',
          ISOAlpha2Code: 'GUF',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GF.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Latin America and the Caribbean',
          countryName: 'Guyana',
          ISOAlpha3Code: 'GY',
          ISOAlpha2Code: 'GUY',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GY.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Latin America and the Caribbean',
          countryName: 'Paraguay',
          ISOAlpha3Code: 'PY',
          ISOAlpha2Code: 'PRY',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PY.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Latin America and the Caribbean',
          countryName: 'Peru',
          ISOAlpha3Code: 'PE',
          ISOAlpha2Code: 'PER',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PE.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Latin America and the Caribbean',
          countryName: 'South Georgia and the South Sandwich Islands',
          ISOAlpha3Code: 'GS',
          ISOAlpha2Code: 'SGS',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GS.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Latin America and the Caribbean',
          countryName: 'Suriname',
          ISOAlpha3Code: 'SR',
          ISOAlpha2Code: 'SUR',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SR.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Latin America and the Caribbean',
          countryName: 'Uruguay',
          ISOAlpha3Code: 'UY',
          ISOAlpha2Code: 'URY',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/UY.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Latin America and the Caribbean',
          countryName: 'Venezuela (Bolivarian Republic of)',
          ISOAlpha3Code: 'VE',
          ISOAlpha2Code: 'VEN',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VE.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Northern America',
          countryName: 'Bermuda',
          ISOAlpha3Code: 'BM',
          ISOAlpha2Code: 'BMU',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BM.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Northern America',
          countryName: 'Canada',
          ISOAlpha3Code: 'CA',
          ISOAlpha2Code: 'CAN',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CA.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Northern America',
          countryName: 'Greenland',
          ISOAlpha3Code: 'GL',
          ISOAlpha2Code: 'GRL',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GL.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Northern America',
          countryName: 'Saint Pierre and Miquelon',
          ISOAlpha3Code: 'PM',
          ISOAlpha2Code: 'SPM',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PM.svg',
        },
        {
          regionName: 'Americas',
          subRegionName: 'Northern America',
          countryName: 'United States of America',
          ISOAlpha3Code: 'US',
          ISOAlpha2Code: 'USA',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/US.svg',
        },
      ],
    },
    {
      name: 'Asia',
      countries: [
        {
          regionName: 'Asia',
          subRegionName: 'Central Asia',
          countryName: 'Kazakhstan',
          ISOAlpha3Code: 'KZ',
          ISOAlpha2Code: 'KAZ',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KZ.svg',
        },
        {
          regionName: 'Asia',
          subRegionName: 'Central Asia',
          countryName: 'Kyrgyzstan',
          ISOAlpha3Code: 'KG',
          ISOAlpha2Code: 'KGZ',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KG.svg',
        },
        {
          regionName: 'Asia',
          subRegionName: 'Central Asia',
          countryName: 'Tajikistan',
          ISOAlpha3Code: 'TJ',
          ISOAlpha2Code: 'TJK',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TJ.svg',
        },
        {
          regionName: 'Asia',
          subRegionName: 'Central Asia',
          countryName: 'Turkmenistan',
          ISOAlpha3Code: 'TM',
          ISOAlpha2Code: 'TKM',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TM.svg',
        },
        {
          regionName: 'Asia',
          subRegionName: 'Central Asia',
          countryName: 'Uzbekistan',
          ISOAlpha3Code: 'UZ',
          ISOAlpha2Code: 'UZB',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/UZ.svg',
        },
        {
          regionName: 'Asia',
          subRegionName: 'Eastern Asia',
          countryName: 'China',
          ISOAlpha3Code: 'CN',
          ISOAlpha2Code: 'CHN',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CN.svg',
        },
        {
          regionName: 'Asia',
          subRegionName: 'Eastern Asia',
          countryName: "Democratic People's Republic of Korea",
          ISOAlpha3Code: 'KP',
          ISOAlpha2Code: 'PRK',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KP.svg',
        },
        {
          regionName: 'Asia',
          subRegionName: 'Eastern Asia',
          countryName: 'Japan',
          ISOAlpha3Code: 'JP',
          ISOAlpha2Code: 'JPN',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/JP.svg',
        },
        {
          regionName: 'Asia',
          subRegionName: 'Eastern Asia',
          countryName: 'Mongolia',
          ISOAlpha3Code: 'MN',
          ISOAlpha2Code: 'MNG',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MN.svg',
        },
        {
          regionName: 'Asia',
          subRegionName: 'Eastern Asia',
          countryName: 'Republic of Korea',
          ISOAlpha3Code: 'KR',
          ISOAlpha2Code: 'KOR',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KR.svg',
        },
        {
          regionName: 'Asia',
          subRegionName: 'South-eastern Asia',
          countryName: 'Brunei Darussalam',
          ISOAlpha3Code: 'BN',
          ISOAlpha2Code: 'BRN',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BN.svg',
        },
        {
          regionName: 'Asia',
          subRegionName: 'South-eastern Asia',
          countryName: 'Cambodia',
          ISOAlpha3Code: 'KH',
          ISOAlpha2Code: 'KHM',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KH.svg',
        },
        {
          regionName: 'Asia',
          subRegionName: 'South-eastern Asia',
          countryName: 'Indonesia',
          ISOAlpha3Code: 'ID',
          ISOAlpha2Code: 'IDN',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ID.svg',
        },
        {
          regionName: 'Asia',
          subRegionName: 'South-eastern Asia',
          countryName: "Lao People's Democratic Republic",
          ISOAlpha3Code: 'LA',
          ISOAlpha2Code: 'LAO',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LA.svg',
        },
        {
          regionName: 'Asia',
          subRegionName: 'South-eastern Asia',
          countryName: 'Malaysia',
          ISOAlpha3Code: 'MY',
          ISOAlpha2Code: 'MYS',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MY.svg',
        },
        {
          regionName: 'Asia',
          subRegionName: 'South-eastern Asia',
          countryName: 'Myanmar',
          ISOAlpha3Code: 'MM',
          ISOAlpha2Code: 'MMR',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MM.svg',
        },
        {
          regionName: 'Asia',
          subRegionName: 'South-eastern Asia',
          countryName: 'Philippines',
          ISOAlpha3Code: 'PH',
          ISOAlpha2Code: 'PHL',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PH.svg',
        },
        {
          regionName: 'Asia',
          subRegionName: 'South-eastern Asia',
          countryName: 'Singapore',
          ISOAlpha3Code: 'SG',
          ISOAlpha2Code: 'SGP',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SG.svg',
        },
        {
          regionName: 'Asia',
          subRegionName: 'South-eastern Asia',
          countryName: 'Thailand',
          ISOAlpha3Code: 'TH',
          ISOAlpha2Code: 'THA',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TH.svg',
        },
        {
          regionName: 'Asia',
          subRegionName: 'South-eastern Asia',
          countryName: 'Timor-Leste',
          ISOAlpha3Code: 'TL',
          ISOAlpha2Code: 'TLS',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TL.svg',
        },
        {
          regionName: 'Asia',
          subRegionName: 'South-eastern Asia',
          countryName: 'Viet Nam',
          ISOAlpha3Code: 'VN',
          ISOAlpha2Code: 'VNM',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VN.svg',
        },
        {
          regionName: 'Asia',
          subRegionName: 'Southern Asia',
          countryName: 'Afghanistan',
          ISOAlpha3Code: 'AF',
          ISOAlpha2Code: 'AFG',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AF.svg',
        },
        {
          regionName: 'Asia',
          subRegionName: 'Southern Asia',
          countryName: 'Bangladesh',
          ISOAlpha3Code: 'BD',
          ISOAlpha2Code: 'BGD',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BD.svg',
        },
        {
          regionName: 'Asia',
          subRegionName: 'Southern Asia',
          countryName: 'Bhutan',
          ISOAlpha3Code: 'BT',
          ISOAlpha2Code: 'BTN',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BT.svg',
        },
        {
          regionName: 'Asia',
          subRegionName: 'Southern Asia',
          countryName: 'India',
          ISOAlpha3Code: 'IN',
          ISOAlpha2Code: 'IND',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IN.svg',
        },
        {
          regionName: 'Asia',
          subRegionName: 'Southern Asia',
          countryName: 'Iran (Islamic Republic of)',
          ISOAlpha3Code: 'IR',
          ISOAlpha2Code: 'IRN',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IR.svg',
        },
        {
          regionName: 'Asia',
          subRegionName: 'Southern Asia',
          countryName: 'Maldives',
          ISOAlpha3Code: 'MV',
          ISOAlpha2Code: 'MDV',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MV.svg',
        },
        {
          regionName: 'Asia',
          subRegionName: 'Southern Asia',
          countryName: 'Nepal',
          ISOAlpha3Code: 'NP',
          ISOAlpha2Code: 'NPL',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NP.svg',
        },
        {
          regionName: 'Asia',
          subRegionName: 'Southern Asia',
          countryName: 'Pakistan',
          ISOAlpha3Code: 'PK',
          ISOAlpha2Code: 'PAK',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PK.svg',
        },
        {
          regionName: 'Asia',
          subRegionName: 'Southern Asia',
          countryName: 'Sri Lanka',
          ISOAlpha3Code: 'LK',
          ISOAlpha2Code: 'LKA',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LK.svg',
        },
        {
          regionName: 'Asia',
          subRegionName: 'Western Asia',
          countryName: 'Armenia',
          ISOAlpha3Code: 'AM',
          ISOAlpha2Code: 'ARM',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AM.svg',
        },
        {
          regionName: 'Asia',
          subRegionName: 'Western Asia',
          countryName: 'Azerbaijan',
          ISOAlpha3Code: 'AZ',
          ISOAlpha2Code: 'AZE',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AZ.svg',
        },
        {
          regionName: 'Asia',
          subRegionName: 'Western Asia',
          countryName: 'Bahrain',
          ISOAlpha3Code: 'BH',
          ISOAlpha2Code: 'BHR',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BH.svg',
        },
        {
          regionName: 'Asia',
          subRegionName: 'Western Asia',
          countryName: 'Cyprus',
          ISOAlpha3Code: 'CY',
          ISOAlpha2Code: 'CYP',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CY.svg',
        },
        {
          regionName: 'Asia',
          subRegionName: 'Western Asia',
          countryName: 'Georgia',
          ISOAlpha3Code: 'GE',
          ISOAlpha2Code: 'GEO',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GE.svg',
        },
        {
          regionName: 'Asia',
          subRegionName: 'Western Asia',
          countryName: 'Iraq',
          ISOAlpha3Code: 'IQ',
          ISOAlpha2Code: 'IRQ',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IQ.svg',
        },
        {
          regionName: 'Asia',
          subRegionName: 'Western Asia',
          countryName: 'Israel',
          ISOAlpha3Code: 'IL',
          ISOAlpha2Code: 'ISR',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IL.svg',
        },
        {
          regionName: 'Asia',
          subRegionName: 'Western Asia',
          countryName: 'Jordan',
          ISOAlpha3Code: 'JO',
          ISOAlpha2Code: 'JOR',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/JO.svg',
        },
        {
          regionName: 'Asia',
          subRegionName: 'Western Asia',
          countryName: 'Kuwait',
          ISOAlpha3Code: 'KW',
          ISOAlpha2Code: 'KWT',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KW.svg',
        },
        {
          regionName: 'Asia',
          subRegionName: 'Western Asia',
          countryName: 'Lebanon',
          ISOAlpha3Code: 'LB',
          ISOAlpha2Code: 'LBN',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LB.svg',
        },
        {
          regionName: 'Asia',
          subRegionName: 'Western Asia',
          countryName: 'Oman',
          ISOAlpha3Code: 'OM',
          ISOAlpha2Code: 'OMN',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/OM.svg',
        },
        {
          regionName: 'Asia',
          subRegionName: 'Western Asia',
          countryName: 'Qatar',
          ISOAlpha3Code: 'QA',
          ISOAlpha2Code: 'QAT',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/QA.svg',
        },
        {
          regionName: 'Asia',
          subRegionName: 'Western Asia',
          countryName: 'Saudi Arabia',
          ISOAlpha3Code: 'SA',
          ISOAlpha2Code: 'SAU',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SA.svg',
        },
        {
          regionName: 'Asia',
          subRegionName: 'Western Asia',
          countryName: 'State of Palestine',
          ISOAlpha3Code: 'PS',
          ISOAlpha2Code: 'PSE',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PS.svg',
        },
        {
          regionName: 'Asia',
          subRegionName: 'Western Asia',
          countryName: 'Syrian Arab Republic',
          ISOAlpha3Code: 'SY',
          ISOAlpha2Code: 'SYR',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SY.svg',
        },
        {
          regionName: 'Asia',
          subRegionName: 'Western Asia',
          countryName: 'Turkey',
          ISOAlpha3Code: 'TR',
          ISOAlpha2Code: 'TUR',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TR.svg',
        },
        {
          regionName: 'Asia',
          subRegionName: 'Western Asia',
          countryName: 'United Arab Emirates',
          ISOAlpha3Code: 'AE',
          ISOAlpha2Code: 'ARE',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AE.svg',
        },
        {
          regionName: 'Asia',
          subRegionName: 'Western Asia',
          countryName: 'Yemen',
          ISOAlpha3Code: 'YE',
          ISOAlpha2Code: 'YEM',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/YE.svg',
        },
      ],
    },
    {
      name: 'Europe',
      countries: [
        {
          regionName: 'Europe',
          subRegionName: 'Eastern Europe',
          countryName: 'Belarus',
          ISOAlpha3Code: 'BY',
          ISOAlpha2Code: 'BLR',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BY.svg',
        },
        {
          regionName: 'Europe',
          subRegionName: 'Eastern Europe',
          countryName: 'Bulgaria',
          ISOAlpha3Code: 'BG',
          ISOAlpha2Code: 'BGR',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BG.svg',
        },
        {
          regionName: 'Europe',
          subRegionName: 'Eastern Europe',
          countryName: 'Czechia',
          ISOAlpha3Code: 'CZ',
          ISOAlpha2Code: 'CZE',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CZ.svg',
        },
        {
          regionName: 'Europe',
          subRegionName: 'Eastern Europe',
          countryName: 'Hungary',
          ISOAlpha3Code: 'HU',
          ISOAlpha2Code: 'HUN',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/HU.svg',
        },
        {
          regionName: 'Europe',
          subRegionName: 'Eastern Europe',
          countryName: 'Poland',
          ISOAlpha3Code: 'PL',
          ISOAlpha2Code: 'POL',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PL.svg',
        },
        {
          regionName: 'Europe',
          subRegionName: 'Eastern Europe',
          countryName: 'Republic of Moldova',
          ISOAlpha3Code: 'MD',
          ISOAlpha2Code: 'MDA',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MD.svg',
        },
        {
          regionName: 'Europe',
          subRegionName: 'Eastern Europe',
          countryName: 'Romania',
          ISOAlpha3Code: 'RO',
          ISOAlpha2Code: 'ROU',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/RO.svg',
        },
        {
          regionName: 'Europe',
          subRegionName: 'Eastern Europe',
          countryName: 'Russian Federation',
          ISOAlpha3Code: 'RU',
          ISOAlpha2Code: 'RUS',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/RU.svg',
        },
        {
          regionName: 'Europe',
          subRegionName: 'Eastern Europe',
          countryName: 'Slovakia',
          ISOAlpha3Code: 'SK',
          ISOAlpha2Code: 'SVK',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SK.svg',
        },
        {
          regionName: 'Europe',
          subRegionName: 'Eastern Europe',
          countryName: 'Ukraine',
          ISOAlpha3Code: 'UA',
          ISOAlpha2Code: 'UKR',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/UA.svg',
        },
        {
          regionName: 'Europe',
          subRegionName: 'Northern Europe',
          countryName: 'Åland Islands',
          ISOAlpha3Code: 'AX',
          ISOAlpha2Code: 'ALA',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AX.svg',
        },
        {
          regionName: 'Europe',
          subRegionName: 'Northern Europe',
          countryName: 'Guernsey',
          ISOAlpha3Code: 'GG',
          ISOAlpha2Code: 'GGY',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GG.svg',
        },
        {
          regionName: 'Europe',
          subRegionName: 'Northern Europe',
          countryName: 'Jersey',
          ISOAlpha3Code: 'JE',
          ISOAlpha2Code: 'JEY',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/JE.svg',
        },
        {
          regionName: 'Europe',
          subRegionName: 'Northern Europe',
          countryName: 'Sark',
          ISOAlpha3Code: '',
          ISOAlpha2Code: '',
        },
        {
          regionName: 'Europe',
          subRegionName: 'Northern Europe',
          countryName: 'Denmark',
          ISOAlpha3Code: 'DK',
          ISOAlpha2Code: 'DNK',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DK.svg',
        },
        {
          regionName: 'Europe',
          subRegionName: 'Northern Europe',
          countryName: 'Estonia',
          ISOAlpha3Code: 'EE',
          ISOAlpha2Code: 'EST',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/EE.svg',
        },
        {
          regionName: 'Europe',
          subRegionName: 'Northern Europe',
          countryName: 'Faroe Islands',
          ISOAlpha3Code: 'FO',
          ISOAlpha2Code: 'FRO',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/FO.svg',
        },
        {
          regionName: 'Europe',
          subRegionName: 'Northern Europe',
          countryName: 'Finland',
          ISOAlpha3Code: 'FI',
          ISOAlpha2Code: 'FIN',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/FI.svg',
        },
        {
          regionName: 'Europe',
          subRegionName: 'Northern Europe',
          countryName: 'Iceland',
          ISOAlpha3Code: 'IS',
          ISOAlpha2Code: 'ISL',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IS.svg',
        },
        {
          regionName: 'Europe',
          subRegionName: 'Northern Europe',
          countryName: 'Ireland',
          ISOAlpha3Code: 'IE',
          ISOAlpha2Code: 'IRL',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IE.svg',
        },
        {
          regionName: 'Europe',
          subRegionName: 'Northern Europe',
          countryName: 'Isle of Man',
          ISOAlpha3Code: 'IM',
          ISOAlpha2Code: 'IMN',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IM.svg',
        },
        {
          regionName: 'Europe',
          subRegionName: 'Northern Europe',
          countryName: 'Latvia',
          ISOAlpha3Code: 'LV',
          ISOAlpha2Code: 'LVA',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LV.svg',
        },
        {
          regionName: 'Europe',
          subRegionName: 'Northern Europe',
          countryName: 'Lithuania',
          ISOAlpha3Code: 'LT',
          ISOAlpha2Code: 'LTU',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LT.svg',
        },
        {
          regionName: 'Europe',
          subRegionName: 'Northern Europe',
          countryName: 'Norway',
          ISOAlpha3Code: 'NO',
          ISOAlpha2Code: 'NOR',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NO.svg',
        },
        {
          regionName: 'Europe',
          subRegionName: 'Northern Europe',
          countryName: 'Svalbard and Jan Mayen Islands',
          ISOAlpha3Code: 'SJ',
          ISOAlpha2Code: 'SJM',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SJ.svg',
        },
        {
          regionName: 'Europe',
          subRegionName: 'Northern Europe',
          countryName: 'Sweden',
          ISOAlpha3Code: 'SE',
          ISOAlpha2Code: 'SWE',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SE.svg',
        },
        {
          regionName: 'Europe',
          subRegionName: 'Northern Europe',
          countryName: 'United Kingdom of Great Britain and Northern Ireland',
          ISOAlpha3Code: 'GB',
          ISOAlpha2Code: 'GBR',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GB.svg',
        },
        {
          regionName: 'Europe',
          subRegionName: 'Southern Europe',
          countryName: 'Albania',
          ISOAlpha3Code: 'AL',
          ISOAlpha2Code: 'ALB',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AL.svg',
        },
        {
          regionName: 'Europe',
          subRegionName: 'Southern Europe',
          countryName: 'Andorra',
          ISOAlpha3Code: 'AD',
          ISOAlpha2Code: 'AND',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AD.svg',
        },
        {
          regionName: 'Europe',
          subRegionName: 'Southern Europe',
          countryName: 'Bosnia and Herzegovina',
          ISOAlpha3Code: 'BA',
          ISOAlpha2Code: 'BIH',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BA.svg',
        },
        {
          regionName: 'Europe',
          subRegionName: 'Southern Europe',
          countryName: 'Croatia',
          ISOAlpha3Code: 'HR',
          ISOAlpha2Code: 'HRV',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/HR.svg',
        },
        {
          regionName: 'Europe',
          subRegionName: 'Southern Europe',
          countryName: 'Gibraltar',
          ISOAlpha3Code: 'GI',
          ISOAlpha2Code: 'GIB',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GI.svg',
        },
        {
          regionName: 'Europe',
          subRegionName: 'Southern Europe',
          countryName: 'Greece',
          ISOAlpha3Code: 'GR',
          ISOAlpha2Code: 'GRC',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GR.svg',
        },
        {
          regionName: 'Europe',
          subRegionName: 'Southern Europe',
          countryName: 'Holy See',
          ISOAlpha3Code: 'VA',
          ISOAlpha2Code: 'VAT',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VA.svg',
        },
        {
          regionName: 'Europe',
          subRegionName: 'Southern Europe',
          countryName: 'Italy',
          ISOAlpha3Code: 'IT',
          ISOAlpha2Code: 'ITA',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IT.svg',
        },
        {
          regionName: 'Europe',
          subRegionName: 'Southern Europe',
          countryName: 'Malta',
          ISOAlpha3Code: 'MT',
          ISOAlpha2Code: 'MLT',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MT.svg',
        },
        {
          regionName: 'Europe',
          subRegionName: 'Southern Europe',
          countryName: 'Montenegro',
          ISOAlpha3Code: 'ME',
          ISOAlpha2Code: 'MNE',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ME.svg',
        },
        {
          regionName: 'Europe',
          subRegionName: 'Southern Europe',
          countryName: 'North Macedonia',
          ISOAlpha3Code: 'MK',
          ISOAlpha2Code: 'MKD',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MK.svg',
        },
        {
          regionName: 'Europe',
          subRegionName: 'Southern Europe',
          countryName: 'Portugal',
          ISOAlpha3Code: 'PT',
          ISOAlpha2Code: 'PRT',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PT.svg',
        },
        {
          regionName: 'Europe',
          subRegionName: 'Southern Europe',
          countryName: 'San Marino',
          ISOAlpha3Code: 'SM',
          ISOAlpha2Code: 'SMR',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SM.svg',
        },
        {
          regionName: 'Europe',
          subRegionName: 'Southern Europe',
          countryName: 'Serbia',
          ISOAlpha3Code: 'RS',
          ISOAlpha2Code: 'SRB',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/RS.svg',
        },
        {
          regionName: 'Europe',
          subRegionName: 'Southern Europe',
          countryName: 'Slovenia',
          ISOAlpha3Code: 'SI',
          ISOAlpha2Code: 'SVN',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SI.svg',
        },
        {
          regionName: 'Europe',
          subRegionName: 'Southern Europe',
          countryName: 'Spain',
          ISOAlpha3Code: 'ES',
          ISOAlpha2Code: 'ESP',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ES.svg',
        },
        {
          regionName: 'Europe',
          subRegionName: 'Western Europe',
          countryName: 'Austria',
          ISOAlpha3Code: 'AT',
          ISOAlpha2Code: 'AUT',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AT.svg',
        },
        {
          regionName: 'Europe',
          subRegionName: 'Western Europe',
          countryName: 'Belgium',
          ISOAlpha3Code: 'BE',
          ISOAlpha2Code: 'BEL',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BE.svg',
        },
        {
          regionName: 'Europe',
          subRegionName: 'Western Europe',
          countryName: 'France',
          ISOAlpha3Code: 'FR',
          ISOAlpha2Code: 'FRA',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/FR.svg',
        },
        {
          regionName: 'Europe',
          subRegionName: 'Western Europe',
          countryName: 'Germany',
          ISOAlpha3Code: 'DE',
          ISOAlpha2Code: 'DEU',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DE.svg',
        },
        {
          regionName: 'Europe',
          subRegionName: 'Western Europe',
          countryName: 'Liechtenstein',
          ISOAlpha3Code: 'LI',
          ISOAlpha2Code: 'LIE',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LI.svg',
        },
        {
          regionName: 'Europe',
          subRegionName: 'Western Europe',
          countryName: 'Luxembourg',
          ISOAlpha3Code: 'LU',
          ISOAlpha2Code: 'LUX',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LU.svg',
        },
        {
          regionName: 'Europe',
          subRegionName: 'Western Europe',
          countryName: 'Monaco',
          ISOAlpha3Code: 'MC',
          ISOAlpha2Code: 'MCO',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MC.svg',
        },
        {
          regionName: 'Europe',
          subRegionName: 'Western Europe',
          countryName: 'Netherlands',
          ISOAlpha3Code: 'NL',
          ISOAlpha2Code: 'NLD',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NL.svg',
        },
        {
          regionName: 'Europe',
          subRegionName: 'Western Europe',
          countryName: 'Switzerland',
          ISOAlpha3Code: 'CH',
          ISOAlpha2Code: 'CHE',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CH.svg',
        },
      ],
    },
    {
      name: 'Oceania',
      countries: [
        {
          regionName: 'Oceania',
          subRegionName: 'Australia and New Zealand',
          countryName: 'Australia',
          ISOAlpha3Code: 'AU',
          ISOAlpha2Code: 'AUS',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AU.svg',
        },
        {
          regionName: 'Oceania',
          subRegionName: 'Australia and New Zealand',
          countryName: 'Christmas Island',
          ISOAlpha3Code: 'CX',
          ISOAlpha2Code: 'CXR',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CX.svg',
        },
        {
          regionName: 'Oceania',
          subRegionName: 'Australia and New Zealand',
          countryName: 'Cocos (Keeling) Islands',
          ISOAlpha3Code: 'CC',
          ISOAlpha2Code: 'CCK',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CC.svg',
        },
        {
          regionName: 'Oceania',
          subRegionName: 'Australia and New Zealand',
          countryName: 'Heard Island and McDonald Islands',
          ISOAlpha3Code: 'HM',
          ISOAlpha2Code: 'HMD',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/HM.svg',
        },
        {
          regionName: 'Oceania',
          subRegionName: 'Australia and New Zealand',
          countryName: 'New Zealand',
          ISOAlpha3Code: 'NZ',
          ISOAlpha2Code: 'NZL',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NZ.svg',
        },
        {
          regionName: 'Oceania',
          subRegionName: 'Australia and New Zealand',
          countryName: 'Norfolk Island',
          ISOAlpha3Code: 'NF',
          ISOAlpha2Code: 'NFK',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NF.svg',
        },
        {
          regionName: 'Oceania',
          subRegionName: 'Melanesia',
          countryName: 'Fiji',
          ISOAlpha3Code: 'FJ',
          ISOAlpha2Code: 'FJI',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/FJ.svg',
        },
        {
          regionName: 'Oceania',
          subRegionName: 'Melanesia',
          countryName: 'New Caledonia',
          ISOAlpha3Code: 'NC',
          ISOAlpha2Code: 'NCL',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NC.svg',
        },
        {
          regionName: 'Oceania',
          subRegionName: 'Melanesia',
          countryName: 'Papua New Guinea',
          ISOAlpha3Code: 'PG',
          ISOAlpha2Code: 'PNG',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PG.svg',
        },
        {
          regionName: 'Oceania',
          subRegionName: 'Melanesia',
          countryName: 'Solomon Islands',
          ISOAlpha3Code: 'SB',
          ISOAlpha2Code: 'SLB',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SB.svg',
        },
        {
          regionName: 'Oceania',
          subRegionName: 'Melanesia',
          countryName: 'Vanuatu',
          ISOAlpha3Code: 'VU',
          ISOAlpha2Code: 'VUT',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VU.svg',
        },
        {
          regionName: 'Oceania',
          subRegionName: 'Micronesia',
          countryName: 'Guam',
          ISOAlpha3Code: 'GU',
          ISOAlpha2Code: 'GUM',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GU.svg',
        },
        {
          regionName: 'Oceania',
          subRegionName: 'Micronesia',
          countryName: 'Kiribati',
          ISOAlpha3Code: 'KI',
          ISOAlpha2Code: 'KIR',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KI.svg',
        },
        {
          regionName: 'Oceania',
          subRegionName: 'Micronesia',
          countryName: 'Marshall Islands',
          ISOAlpha3Code: 'MH',
          ISOAlpha2Code: 'MHL',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MH.svg',
        },
        {
          regionName: 'Oceania',
          subRegionName: 'Micronesia',
          countryName: 'Micronesia (Federated States of)',
          ISOAlpha3Code: 'FM',
          ISOAlpha2Code: 'FSM',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/FM.svg',
        },
        {
          regionName: 'Oceania',
          subRegionName: 'Micronesia',
          countryName: 'Nauru',
          ISOAlpha3Code: 'NR',
          ISOAlpha2Code: 'NRU',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NR.svg',
        },
        {
          regionName: 'Oceania',
          subRegionName: 'Micronesia',
          countryName: 'Northern Mariana Islands',
          ISOAlpha3Code: 'MP',
          ISOAlpha2Code: 'MNP',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MP.svg',
        },
        {
          regionName: 'Oceania',
          subRegionName: 'Micronesia',
          countryName: 'Palau',
          ISOAlpha3Code: 'PW',
          ISOAlpha2Code: 'PLW',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PW.svg',
        },
        {
          regionName: 'Oceania',
          subRegionName: 'Micronesia',
          countryName: 'United States Minor Outlying Islands',
          ISOAlpha3Code: 'UM',
          ISOAlpha2Code: 'UMI',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/UM.svg',
        },
        {
          regionName: 'Oceania',
          subRegionName: 'Polynesia',
          countryName: 'American Samoa',
          ISOAlpha3Code: 'AS',
          ISOAlpha2Code: 'ASM',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AS.svg',
        },
        {
          regionName: 'Oceania',
          subRegionName: 'Polynesia',
          countryName: 'Cook Islands',
          ISOAlpha3Code: 'CK',
          ISOAlpha2Code: 'COK',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CK.svg',
        },
        {
          regionName: 'Oceania',
          subRegionName: 'Polynesia',
          countryName: 'French Polynesia',
          ISOAlpha3Code: 'PF',
          ISOAlpha2Code: 'PYF',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PF.svg',
        },
        {
          regionName: 'Oceania',
          subRegionName: 'Polynesia',
          countryName: 'Niue',
          ISOAlpha3Code: 'NU',
          ISOAlpha2Code: 'NIU',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NU.svg',
        },
        {
          regionName: 'Oceania',
          subRegionName: 'Polynesia',
          countryName: 'Pitcairn',
          ISOAlpha3Code: 'PN',
          ISOAlpha2Code: 'PCN',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PN.svg',
        },
        {
          regionName: 'Oceania',
          subRegionName: 'Polynesia',
          countryName: 'Samoa',
          ISOAlpha3Code: 'WS',
          ISOAlpha2Code: 'WSM',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/WS.svg',
        },
        {
          regionName: 'Oceania',
          subRegionName: 'Polynesia',
          countryName: 'Tokelau',
          ISOAlpha3Code: 'TK',
          ISOAlpha2Code: 'TKL',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TK.svg',
        },
        {
          regionName: 'Oceania',
          subRegionName: 'Polynesia',
          countryName: 'Tonga',
          ISOAlpha3Code: 'TO',
          ISOAlpha2Code: 'TON',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TO.svg',
        },
        {
          regionName: 'Oceania',
          subRegionName: 'Polynesia',
          countryName: 'Tuvalu',
          ISOAlpha3Code: 'TV',
          ISOAlpha2Code: 'TUV',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TV.svg',
        },
        {
          regionName: 'Oceania',
          subRegionName: 'Polynesia',
          countryName: 'Wallis and Futuna Islands',
          ISOAlpha3Code: 'WF',
          ISOAlpha2Code: 'WLF',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/WF.svg',
        },
      ],
    },
    {
      name: 'Other',
      countries: [
        {
          regionName: '',
          subRegionName: '',
          countryName: 'Antarctica',
          ISOAlpha3Code: 'AQ',
          ISOAlpha2Code: 'ATA',
          flag: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AQ.svg',
        },
      ],
    },
  ],
};
