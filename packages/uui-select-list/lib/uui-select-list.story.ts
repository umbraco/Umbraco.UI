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
  .value=${option.countryCode}>
  <span style=${styles.code}>${option.countryCode}</span>
  <span style=${styles.display}>${option.country}</span>
  <span style=${styles.population}>${option.population}mil</span>
</uui-select-option>`;

export const Overview: Story = ({ options }) =>
  html`<uui-select-list multiple style=${styles.select} @change=${onChange}>
    ${options.map(option =>
      option.header ? renderHeader(option.header) : renderOption(option)
    )}
  </uui-select-list>`;

Overview.args = {
  options: [
    { header: 'I am a header' },
    {
      countryCode: 'ID',
      country: 'Indonesia',
      population: 182.5,
    },
    {
      countryCode: 'NO',
      country: 'Norway',
      population: 151.6,
    },
    {
      countryCode: 'CN',
      country: 'China',
      population: 413.7,
    },
    {
      countryCode: 'CN',
      country: 'China',
      population: 270.1,
    },
    { header: 'I am another header!' },
    {
      countryCode: 'TZ',
      country: 'Tanzania',
      population: 145.9,
    },
    {
      countryCode: 'PE',
      country: 'Peru',
      population: 182.1,
    },
    {
      countryCode: 'CZ',
      country: 'Czech Republic',
      population: 303.2,
    },
    {
      countryCode: 'CN',
      country: 'China',
      population: 491.5,
    },
    {
      countryCode: 'MG',
      country: 'Madagascar',
      population: 78.0,
    },
    {
      countryCode: 'MX',
      country: 'Mexico',
      population: 316.1,
    },
    { header: 'This is actually a header' },
    {
      countryCode: 'VN',
      country: 'Vietnam',
      population: 326.4,
    },
    {
      countryCode: 'JO',
      country: 'Jordan',
      population: 443.3,
    },
    {
      countryCode: 'PL',
      country: 'Poland',
      population: 207.8,
    },
    {
      countryCode: 'NU',
      country: 'Niue',
      population: 76.3,
    },
    {
      countryCode: 'CN',
      country: 'China',
      population: 6.1,
    },
    {
      countryCode: 'PT',
      country: 'Portugal',
      population: 356.1,
    },
    {
      countryCode: 'ID',
      country: 'Indonesia',
      population: 452.2,
    },
    {
      countryCode: 'AZ',
      country: 'Azerbaijan',
      population: 461.1,
    },
    {
      countryCode: 'LV',
      country: 'Latvia',
      population: 313.1,
    },
    {
      countryCode: 'GT',
      country: 'Guatemala',
      population: 129.8,
    },
    {
      countryCode: 'CN',
      country: 'China',
      population: 168.9,
    },
    {
      countryCode: 'SD',
      country: 'Sudan',
      population: 66.4,
    },
    {
      countryCode: 'CN',
      country: 'China',
      population: 274.5,
    },
    {
      countryCode: 'KZ',
      country: 'Kazakhstan',
      population: 221.6,
    },
    {
      countryCode: 'CN',
      country: 'China',
      population: 346.6,
    },
    {
      countryCode: 'CN',
      country: 'China',
      population: 36.3,
    },
    {
      countryCode: 'PE',
      country: 'Peru',
      population: 355.9,
    },
    {
      countryCode: 'CN',
      country: 'China',
      population: 415.8,
    },
    {
      countryCode: 'SS',
      country: 'South Sudan',
      population: 488.8,
    },
    {
      countryCode: 'AR',
      country: 'Argentina',
      population: 327.1,
    },
    {
      countryCode: 'PE',
      country: 'Peru',
      population: 373.1,
    },
    {
      countryCode: 'PT',
      country: 'Portugal',
      population: 445.6,
    },
    {
      countryCode: 'CN',
      country: 'China',
      population: 471.2,
    },
    {
      countryCode: 'NP',
      country: 'Nepal',
      population: 95.5,
    },
    {
      countryCode: 'BR',
      country: 'Brazil',
      population: 286.8,
    },
    {
      countryCode: 'IR',
      country: 'Iran',
      population: 253.1,
    },
    {
      countryCode: 'KP',
      country: 'North Korea',
      population: 101.4,
    },
    {
      countryCode: 'IL',
      country: 'Israel',
      population: 348.0,
    },
    {
      countryCode: 'ID',
      country: 'Indonesia',
      population: 406.6,
    },
    {
      countryCode: 'AF',
      country: 'Afghanistan',
      population: 497.1,
    },
    {
      countryCode: 'PL',
      country: 'Poland',
      population: 111.9,
    },
    {
      countryCode: 'CO',
      country: 'Colombia',
      population: 354.7,
    },
    {
      countryCode: 'CN',
      country: 'China',
      population: 478.5,
    },
    {
      countryCode: 'PT',
      country: 'Portugal',
      population: 135.0,
    },
    {
      countryCode: 'ID',
      country: 'Indonesia',
      population: 255.6,
    },
    { header: 'I am another header' },
    {
      countryCode: 'CA',
      country: 'Canada',
      population: 379.4,
    },
    {
      countryCode: 'MN',
      country: 'Mongolia',
      population: 103.4,
    },
    {
      countryCode: 'PT',
      country: 'Portugal',
      population: 37.7,
    },
    { header: 'Here is a header' },
    {
      countryCode: 'RU',
      country: 'Russia',
      population: 240.5,
    },
    {
      countryCode: 'FI',
      country: 'Finland',
      population: 94.9,
    },
    {
      countryCode: 'BY',
      country: 'Belarus',
      population: 259.4,
    },
    {
      countryCode: 'VN',
      country: 'Vietnam',
      population: 215.0,
    },
    {
      countryCode: 'BR',
      country: 'Brazil',
      population: 377.0,
    },
    {
      countryCode: 'VN',
      country: 'Vietnam',
      population: 105.3,
    },
    {
      countryCode: 'UA',
      country: 'Ukraine',
      population: 118.4,
    },
    {
      countryCode: 'EG',
      country: 'Egypt',
      population: 334.9,
    },
    { header: 'Another one!' },
    {
      countryCode: 'MX',
      country: 'Mexico',
      population: 81.8,
    },
    {
      countryCode: 'RU',
      country: 'Russia',
      population: 103.7,
    },
    {
      countryCode: 'FR',
      country: 'France',
      population: 77.2,
    },
    {
      countryCode: 'CN',
      country: 'China',
      population: 127.3,
    },
    {
      countryCode: 'MY',
      country: 'Malaysia',
      population: 154.8,
    },
    {
      countryCode: 'RU',
      country: 'Russia',
      population: 61.9,
    },
    {
      countryCode: 'CN',
      country: 'China',
      population: 460.7,
    },
    {
      countryCode: 'US',
      country: 'United States',
      population: 385.4,
    },
    {
      countryCode: 'CN',
      country: 'China',
      population: 23.7,
    },
    {
      countryCode: 'US',
      country: 'United States',
      population: 255.2,
    },
    {
      countryCode: 'IE',
      country: 'Ireland',
      population: 392.8,
    },
    {
      countryCode: 'CN',
      country: 'China',
      population: 419.5,
    },
    {
      countryCode: 'BR',
      country: 'Brazil',
      population: 74.3,
    },
    {
      countryCode: 'ID',
      country: 'Indonesia',
      population: 288.0,
    },
    {
      countryCode: 'PH',
      country: 'Philippines',
      population: 274.1,
    },
    {
      countryCode: 'GR',
      country: 'Greece',
      population: 140.1,
    },
    {
      countryCode: 'BR',
      country: 'Brazil',
      population: 413.8,
    },
    {
      countryCode: 'HR',
      country: 'Croatia',
      population: 157.1,
    },
    {
      countryCode: 'ZM',
      country: 'Zambia',
      population: 22.3,
    },
    {
      countryCode: 'PH',
      country: 'Philippines',
      population: 127.6,
    },
    {
      countryCode: 'CN',
      country: 'China',
      population: 369.2,
    },
    {
      countryCode: 'AR',
      country: 'Argentina',
      population: 443.5,
    },
    {
      countryCode: 'PH',
      country: 'Philippines',
      population: 232.0,
    },
    {
      countryCode: 'PT',
      country: 'Portugal',
      population: 345.3,
    },
    {
      countryCode: 'IE',
      country: 'Ireland',
      population: 124.2,
    },
    {
      countryCode: 'LS',
      country: 'Lesotho',
      population: 225.5,
    },
    {
      countryCode: 'PT',
      country: 'Portugal',
      population: 130.9,
    },
    {
      countryCode: 'ID',
      country: 'Indonesia',
      population: 52.4,
    },
    {
      countryCode: 'ID',
      country: 'Indonesia',
      population: 225.3,
    },
    {
      countryCode: 'BB',
      country: 'Barbados',
      population: 139.1,
    },
    {
      countryCode: 'PH',
      country: 'Philippines',
      population: 380.7,
    },
    {
      countryCode: 'AU',
      country: 'Australia',
      population: 1.2,
    },
    {
      countryCode: 'PH',
      country: 'Philippines',
      population: 470.1,
    },
    {
      countryCode: 'ID',
      country: 'Indonesia',
      population: 238.0,
    },
    {
      countryCode: 'HN',
      country: 'Honduras',
      population: 285.9,
    },
    {
      countryCode: 'CN',
      country: 'China',
      population: 198.0,
    },
    {
      countryCode: 'ID',
      country: 'Indonesia',
      population: 99.5,
    },
    {
      countryCode: 'SE',
      country: 'Sweden',
      population: 59.2,
    },
    {
      countryCode: 'ID',
      country: 'Indonesia',
      population: 20.9,
    },
    {
      countryCode: 'CN',
      country: 'China',
      population: 208.1,
    },
    {
      countryCode: 'EE',
      country: 'Estonia',
      population: 223.4,
    },
    {
      countryCode: 'UA',
      country: 'Ukraine',
      population: 409.1,
    },
    {
      countryCode: 'IR',
      country: 'Iran',
      population: 178.2,
    },
    {
      countryCode: 'PH',
      country: 'Philippines',
      population: 38.1,
    },
  ],
};
