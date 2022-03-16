import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

import './country-select-example';

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
    'border: 2px solid; border-radius: 8px; overflow: hidden; max-width: 300px; max-height: 500px; overflow-y: auto; box-sizing: border-box',
  option:
    'flex-shrink: 0; width: 100%; height: 32px; display: grid; grid-template-columns: 42px 1fr 80px; align-items: center; border-bottom: 1px solid;',
  code: 'border-right: 1px solid; display: flex; justify-content: center; height: 100%; align-items: center;',
  population:
    'border-left: 1px solid; display: flex; justify-content: center; height: 100%; align-items: center;',
  display: 'padding: 0 8px',
};

const onChange = (e: any) => {
  console.log('Received event with data: ', e.detail.selected);
};

const renderHeader = header => html`
  <b style="border-bottom: 1px solid; padding: 4px; text-align: center">
    ${header}
  </b>
`;

const renderOption = option => html`<uui-select-option
  style=${styles.option}
  .disabled=${option.disabled}
  .value=${option.countryCode}>
  <span style=${styles.code}>${option.countryCode}</span>
  <span style=${styles.display}>${option.country}</span>
  <span style=${styles.population}>${option.population}mil</span>
</uui-select-option>`;

export const CountrySelect: Story = () =>
  html` <country-select-example></country-select-example> `;

export const Overview: Story = ({ options }) =>
  html`<uui-select-list multiselect style=${styles.select} @change=${onChange}>
    ${options.map(option =>
      option.header ? renderHeader(option.header) : renderOption(option)
    )}
  </uui-select-list>`;

Overview.args = {
  options: [
    {
      countryCode: 'ID',
      country: 'Indonesia',
      population: 456.6,
      disabled: true,
    },
    {
      countryCode: 'VE',
      country: 'Venezuela',
      population: 157.3,
      disabled: true,
    },
    {
      countryCode: 'ID',
      country: 'Indonesia',
      population: 30.0,
      disabled: true,
    },
    {
      countryCode: 'ID',
      country: 'Indonesia',
      population: 140.8,
      disabled: false,
    },
    {
      countryCode: 'CN',
      country: 'China',
      population: 233.3,
      disabled: false,
    },
    {
      countryCode: 'RU',
      country: 'Russia',
      population: 148.5,
      disabled: false,
    },
    {
      countryCode: 'NG',
      country: 'Nigeria',
      population: 361.0,
      disabled: true,
    },
    {
      countryCode: 'AR',
      country: 'Argentina',
      population: 72.7,
      disabled: false,
    },
    {
      countryCode: 'MK',
      country: 'Macedonia',
      population: 367.8,
      disabled: false,
    },
    {
      countryCode: 'PE',
      country: 'Peru',
      population: 124.2,
      disabled: false,
    },
    {
      countryCode: 'CN',
      country: 'China',
      population: 280.1,
      disabled: false,
    },
    {
      countryCode: 'CN',
      country: 'China',
      population: 301.0,
      disabled: false,
    },
    {
      countryCode: 'RU',
      country: 'Russia',
      population: 400.2,
      disabled: true,
    },
    {
      countryCode: 'ID',
      country: 'Indonesia',
      population: 405.0,
      disabled: false,
    },
    {
      countryCode: 'RU',
      country: 'Russia',
      population: 192.8,
      disabled: false,
    },
    {
      countryCode: 'RU',
      country: 'Russia',
      population: 457.1,
      disabled: false,
    },
    {
      countryCode: 'UA',
      country: 'Ukraine',
      population: 366.8,
      disabled: false,
    },
    {
      countryCode: 'NG',
      country: 'Nigeria',
      population: 362.3,
      disabled: false,
    },
    {
      countryCode: 'RU',
      country: 'Russia',
      population: 381.9,
      disabled: false,
    },
    {
      countryCode: 'CN',
      country: 'China',
      population: 393.7,
      disabled: true,
    },
    {
      countryCode: 'PT',
      country: 'Portugal',
      population: 201.4,
      disabled: true,
    },
    {
      countryCode: 'NG',
      country: 'Nigeria',
      population: 472.9,
      disabled: false,
    },
    {
      countryCode: 'BO',
      country: 'Bolivia',
      population: 194.2,
      disabled: false,
    },
    {
      countryCode: 'PH',
      country: 'Philippines',
      population: 126.9,
      disabled: true,
    },
    {
      countryCode: 'CN',
      country: 'China',
      population: 428.7,
      disabled: true,
    },
    {
      countryCode: 'CN',
      country: 'China',
      population: 110.6,
      disabled: false,
    },
    {
      countryCode: 'VN',
      country: 'Vietnam',
      population: 374.0,
      disabled: false,
    },
    {
      countryCode: 'GR',
      country: 'Greece',
      population: 84.7,
      disabled: false,
    },
    {
      countryCode: 'ID',
      country: 'Indonesia',
      population: 195.8,
      disabled: true,
    },
    {
      countryCode: 'BY',
      country: 'Belarus',
      population: 7.0,
      disabled: true,
    },
    {
      countryCode: 'CN',
      country: 'China',
      population: 352.9,
      disabled: false,
    },
    {
      countryCode: 'PH',
      country: 'Philippines',
      population: 456.6,
      disabled: true,
    },
    {
      countryCode: 'ID',
      country: 'Indonesia',
      population: 222.0,
      disabled: false,
    },
    {
      countryCode: 'SA',
      country: 'Saudi Arabia',
      population: 95.9,
      disabled: false,
    },
    {
      countryCode: 'CN',
      country: 'China',
      population: 300.6,
      disabled: false,
    },
    {
      countryCode: 'JP',
      country: 'Japan',
      population: 413.8,
      disabled: false,
    },
    {
      countryCode: 'DK',
      country: 'Denmark',
      population: 116.8,
      disabled: false,
    },
    {
      countryCode: 'SE',
      country: 'Sweden',
      population: 179.9,
      disabled: true,
    },
    {
      countryCode: 'MA',
      country: 'Morocco',
      population: 426.7,
      disabled: true,
    },
    {
      countryCode: 'US',
      country: 'United States',
      population: 260.5,
      disabled: false,
    },
    {
      countryCode: 'ID',
      country: 'Indonesia',
      population: 161.8,
      disabled: false,
    },
    {
      countryCode: 'CZ',
      country: 'Czech Republic',
      population: 227.2,
      disabled: true,
    },
    {
      countryCode: 'VN',
      country: 'Vietnam',
      population: 26.6,
      disabled: true,
    },
    {
      countryCode: 'NI',
      country: 'Nicaragua',
      population: 186.0,
      disabled: false,
    },
    {
      countryCode: 'PT',
      country: 'Portugal',
      population: 164.1,
      disabled: false,
    },
    {
      countryCode: 'MU',
      country: 'Mauritius',
      population: 34.0,
      disabled: true,
    },
    {
      countryCode: 'RU',
      country: 'Russia',
      population: 118.5,
      disabled: true,
    },
    {
      countryCode: 'GR',
      country: 'Greece',
      population: 131.6,
      disabled: false,
    },
    {
      countryCode: 'BW',
      country: 'Botswana',
      population: 471.7,
      disabled: true,
    },
    {
      countryCode: 'MG',
      country: 'Madagascar',
      population: 81.0,
      disabled: true,
    },
    {
      countryCode: 'ID',
      country: 'Indonesia',
      population: 1.8,
      disabled: true,
    },
    {
      countryCode: 'IS',
      country: 'Iceland',
      population: 322.9,
      disabled: true,
    },
    {
      countryCode: 'US',
      country: 'United States',
      population: 111.2,
      disabled: true,
    },
    {
      countryCode: 'CZ',
      country: 'Czech Republic',
      population: 430.1,
      disabled: true,
    },
    {
      countryCode: 'BR',
      country: 'Brazil',
      population: 368.7,
      disabled: true,
    },
    {
      countryCode: 'ID',
      country: 'Indonesia',
      population: 139.3,
      disabled: false,
    },
    {
      countryCode: 'CN',
      country: 'China',
      population: 14.3,
      disabled: true,
    },
    {
      countryCode: 'LY',
      country: 'Libya',
      population: 300.3,
      disabled: true,
    },
    {
      countryCode: 'CZ',
      country: 'Czech Republic',
      population: 447.2,
      disabled: false,
    },
    {
      countryCode: 'FR',
      country: 'France',
      population: 156.4,
      disabled: false,
    },
    {
      countryCode: 'FR',
      country: 'France',
      population: 109.4,
      disabled: false,
    },
    {
      countryCode: 'DO',
      country: 'Dominican Republic',
      population: 312.8,
      disabled: false,
    },
    {
      countryCode: 'CN',
      country: 'China',
      population: 443.6,
      disabled: true,
    },
    {
      countryCode: 'MW',
      country: 'Malawi',
      population: 433.3,
      disabled: true,
    },
    {
      countryCode: 'TN',
      country: 'Tunisia',
      population: 403.9,
      disabled: false,
    },
    {
      countryCode: 'RU',
      country: 'Russia',
      population: 459.4,
      disabled: true,
    },
    {
      countryCode: 'BR',
      country: 'Brazil',
      population: 235.5,
      disabled: true,
    },
    {
      countryCode: 'PE',
      country: 'Peru',
      population: 291.7,
      disabled: true,
    },
    {
      countryCode: 'US',
      country: 'United States',
      population: 130.3,
      disabled: true,
    },
    {
      countryCode: 'PL',
      country: 'Poland',
      population: 425.6,
      disabled: false,
    },
    {
      countryCode: 'ZM',
      country: 'Zambia',
      population: 396.9,
      disabled: false,
    },
    {
      countryCode: 'GH',
      country: 'Ghana',
      population: 227.5,
      disabled: false,
    },
    {
      countryCode: 'PH',
      country: 'Philippines',
      population: 369.8,
      disabled: true,
    },
    {
      countryCode: 'MN',
      country: 'Mongolia',
      population: 316.9,
      disabled: true,
    },
    {
      countryCode: 'IE',
      country: 'Ireland',
      population: 384.7,
      disabled: true,
    },
    {
      countryCode: 'SY',
      country: 'Syria',
      population: 28.5,
      disabled: true,
    },
    {
      countryCode: 'AL',
      country: 'Albania',
      population: 117.3,
      disabled: true,
    },
    {
      countryCode: 'YE',
      country: 'Yemen',
      population: 62.1,
      disabled: true,
    },
    {
      countryCode: 'RU',
      country: 'Russia',
      population: 158.9,
      disabled: true,
    },
    {
      countryCode: 'VN',
      country: 'Vietnam',
      population: 398.6,
      disabled: true,
    },
    {
      countryCode: 'NG',
      country: 'Nigeria',
      population: 16.0,
      disabled: true,
    },
    {
      countryCode: 'MA',
      country: 'Morocco',
      population: 480.0,
      disabled: false,
    },
    {
      countryCode: 'CZ',
      country: 'Czech Republic',
      population: 25.9,
      disabled: true,
    },
    {
      countryCode: 'GM',
      country: 'Gambia',
      population: 35.7,
      disabled: false,
    },
    {
      countryCode: 'CO',
      country: 'Colombia',
      population: 342.4,
      disabled: false,
    },
    {
      countryCode: 'BR',
      country: 'Brazil',
      population: 356.9,
      disabled: true,
    },
    {
      countryCode: 'BR',
      country: 'Brazil',
      population: 12.0,
      disabled: false,
    },
    {
      countryCode: 'CN',
      country: 'China',
      population: 253.1,
      disabled: false,
    },
    {
      countryCode: 'FR',
      country: 'France',
      population: 7.0,
      disabled: true,
    },
    {
      countryCode: 'MX',
      country: 'Mexico',
      population: 375.6,
      disabled: false,
    },
    {
      countryCode: 'PH',
      country: 'Philippines',
      population: 140.2,
      disabled: true,
    },
    {
      countryCode: 'CN',
      country: 'China',
      population: 423.8,
      disabled: false,
    },
    {
      countryCode: 'VE',
      country: 'Venezuela',
      population: 366.3,
      disabled: true,
    },
    {
      countryCode: 'CM',
      country: 'Cameroon',
      population: 319.3,
      disabled: true,
    },
    {
      countryCode: 'RU',
      country: 'Russia',
      population: 338.5,
      disabled: false,
    },
    {
      countryCode: 'FI',
      country: 'Finland',
      population: 169.0,
      disabled: true,
    },
    {
      countryCode: 'GE',
      country: 'Georgia',
      population: 161.0,
      disabled: false,
    },
    {
      countryCode: 'SE',
      country: 'Sweden',
      population: 357.0,
      disabled: false,
    },
    {
      countryCode: 'PL',
      country: 'Poland',
      population: 126.3,
      disabled: false,
    },
    {
      countryCode: 'YE',
      country: 'Yemen',
      population: 315.0,
      disabled: false,
    },
  ],
};
