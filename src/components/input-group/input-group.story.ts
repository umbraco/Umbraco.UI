import './input-group.js';
import readme from './README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { renderSlots, spread } from '../../../storyhelpers';
import { useState } from 'storybook/preview-api';
import type { UUISelectOption } from '../select/select.element.js';

import './input-group-select.example.js';
import '../select/select.element.js';

const meta: Meta = {
  id: 'uui-input-group',
  component: 'uui-input-group',
  title: 'Inputs/Input Group',
  render: args => html`<uui-input-group ${spread(args)}></uui-input-group>`,
  parameters: {
    readme: { markdown: readme },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const WithInput: Story = {
  render: args =>
    html`<uui-input-group ${spread(args)}
      >${renderSlots(args)}</uui-input-group
    >`,
  args: {
    'default slot': html`<uui-input
      type="text"
      placeholder="Enter text..."></uui-input>`,
  },
};

export const WithSelect: Story = {
  render: () =>
    html`<uui-input-group-select-example></uui-input-group-select-example>`,
  parameters: {
    docs: {
      source: {
        code: `
  <uui-input-group>
    <uui-input-group-addon slot="prepend">
      🦄
    </uui-input-group-addon>
    <uui-select></uui-select>
  </uui-input-group>
          `,
      },
    },
  },
};

export const WithButton: Story = {
  render: args => html`
    <uui-input-group ${spread(args)}>
      <uui-input type="search" placeholder="Enter search term..."></uui-input>
      <uui-button look="primary">Search</uui-button>
    </uui-input-group>
  `,
};

export const WithSwatch: Story = {
  render: args => html`
    <uui-input-group ${spread(args)}>
      <uui-color-swatch color="#ff0000"></uui-color-swatch>
      <uui-input type="text"></uui-input>
    </uui-input-group>
  `,
};

export const PrependAndAppend: Story = {
  render: args =>
    html`<uui-input-group ${spread(args)}>
      <uui-input-group-addon>https://</uui-input-group-addon>
      <uui-input></uui-input>
      <uui-input-group-addon>.com</uui-input-group-addon>
    </uui-input-group>`,
};

export const DateAndTime: Story = {
  render: args =>
    html`<uui-input-group ${spread(args)}>
      <uui-input-group-addon>
        <uui-icon name="icon-calendar"></uui-icon>
      </uui-input-group-addon>
      <uui-input type="date"></uui-input>
      <uui-input-group-addon>
        <uui-icon name="icon-clock"></uui-icon>
      </uui-input-group-addon>
      <uui-input type="time"></uui-input>
    </uui-input-group>`,
};

export const URLBuilder: Story = {
  render: args =>
    html`<uui-input-group ${spread(args)}>
      <uui-input-group-addon>https://</uui-input-group-addon>
      <uui-input placeholder="your-domain"></uui-input>
      <uui-input-group-addon>.com</uui-input-group-addon>
      <uui-input-group-addon>
        <uui-icon name="icon-globe"></uui-icon>
      </uui-input-group-addon>
    </uui-input-group>`,
};

export const PhoneInputWithCountryCode = {
  render: () => {
    const countries: Array<UUISelectOption> = [
      { name: '+45 (Denmark)', value: 'dk' },
      { name: '+46 (Sweden)', value: 'se' },
      { name: '+47 (Norway)', value: 'no' },
      { name: '+49 (Germany)', value: 'de' },
      { name: '+1 (United States)', value: 'us' },
    ];

    const countryMeta: Record<string, { code: string; flag: string }> = {
      dk: { code: '+45', flag: '🇩🇰' },
      se: { code: '+46', flag: '🇸🇪' },
      no: { code: '+47', flag: '🇳🇴' },
      de: { code: '+49', flag: '🇩🇪' },
      us: { code: '+1', flag: '🇺🇸' },
    };

    const [selectedValue, setSelectedValue] = useState('dk');

    const selectedCountry =
      countries.find(c => c.value === selectedValue) ?? countries[0];

    const meta = countryMeta[selectedCountry.value as string];

    return html`
      <uui-input-group>
        <uui-input-group-addon>
          <span>${meta.flag}</span>
        </uui-input-group-addon>

        <uui-select
          .options=${countries}
          .value=${selectedValue}
          @change=${(e: CustomEvent) => {
            setSelectedValue(e.detail.value);
          }}></uui-select>
        <uui-input placeholder="Phone number"></uui-input>
      </uui-input-group>
    `;
  },
};
