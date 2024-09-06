import '.';
import readme from '../README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { useState } from '@storybook/preview-api';

import '@umbraco-ui/uui-icon/lib';
import '@umbraco-ui/uui-icon-registry-essential/lib';
import '@umbraco-ui/uui-button/lib';
import '@umbraco-ui/uui-popover-container/lib';
import '@umbraco-ui/uui-symbol-more/lib';
import '@umbraco-ui/uui-input/lib';

const meta: Meta = {
  id: 'uui-tab-group',
  component: 'uui-tab-group',
  subcomponents: {
    UUITab: 'uui-tab',
  },
  title: 'Buttons/Tabs',
  argTypes: {
    '--uui-tab-text': { control: { type: 'color' } },
    '--uui-tab-text-hover': { control: { type: 'color' } },
    '--uui-tab-text-active': { control: { type: 'color' } },
    '--uui-tab-divider': { control: { type: 'color' } },
    '--uui-tab-padding-horizontal': { control: { type: 'text' } },
    inlineStyles: { control: { type: 'text' } },
  },
};

export default meta;
type Story = StoryObj;

const filterStyles = args => {
  const styles = Object.keys(args)
    .filter(key => key.startsWith('--uui-tab'))
    .map(key => `${key}: ${args[key]};`)
    .join('\n');
  return styles;
};

export const Default: Story = {
  render: args => {
    return html`
      <div style="display: flex;">
        <uui-tab-group style="${filterStyles(args)}${args.inlineStyles}">
          <uui-tab label="content" active> Content </uui-tab>
          <uui-tab label="Packages" ?disabled=${args.disabled}>
            Packages
          </uui-tab>
          <uui-tab label="Media"> Media </uui-tab>
          <uui-tab label="Settings"> Settings </uui-tab>
          <uui-tab label="Translations"> Translations </uui-tab>
          <uui-tab label="Users"> Users </uui-tab>
        </uui-tab-group>
      </div>
    `;
  },
};

export const WithBorders: Story = {
  ...Default,
  args: {
    '--uui-tab-divider': 'var(--uui-color-divider-standalone)',
  },
};

export const UsingHref: Story = {
  render: args => html`
    <div style="display: flex;">
      <uui-tab-group style="${filterStyles(args)}${args.inlineStyles}">
        <uui-tab label="content" href="http://www.umbraco.com/#content">
          Content
        </uui-tab>
        <uui-tab label="Packages" href="http://www.umbraco.com/#package" active>
          Packages
        </uui-tab>
        <uui-tab label="Media" href="http://www.umbraco.com/#media">
          Media
        </uui-tab>
        <uui-tab label="Settings" href="http://www.umbraco.com/#settings">
          Settings
        </uui-tab>
        <uui-tab
          label="Translations"
          href="http://www.umbraco.com/#translations">
          Translations
        </uui-tab>
        <uui-tab label="Users" href="http://www.umbraco.com/#users">
          Users
        </uui-tab>
      </uui-tab-group>
    </div>
  `,
};

export const WithIcons: Story = {
  render: args => html`
    <div style="display: flex;">
      <uui-tab-group style="${filterStyles(args)}${args.inlineStyles}">
        <uui-tab label="content">
          <uui-icon slot="icon" name="document"></uui-icon>
          Content
        </uui-tab>
        <uui-tab active label="packages">
          <uui-icon slot="icon" name="settings"></uui-icon>
          Packages
        </uui-tab>
        <uui-tab label="media">
          <uui-icon slot="icon" name="picture"></uui-icon>
          Media
        </uui-tab>
      </uui-tab-group>
    </div>
  `,
};

export const WithGap: Story = {
  ...Default,
  args: {
    inlineStyles: '--uui-tab-group-gap: 32px;',
  },
};

export const Async: Story = {
  render: () => {
    setTimeout(() => {
      const tabs = document.querySelector('uui-tab-group');

      if (!tabs) return;

      // Because of storybook rendering twice, we need to check if the tab already exists
      const existingTab = document.getElementById('asyncTab');
      if (existingTab) return;

      const tab = document.createElement('uui-tab');
      tab.id = 'asyncTab';
      tab.label = 'Async';
      tab.innerHTML = 'Async';
      tabs.appendChild(tab);

      setTimeout(() => {
        tab.innerHTML = 'Async more text';
      }, 1000);
    }, 1000);

    return html`
      <div style="display: flex">
        <uui-tab-group>
          <uui-tab label="content">
            <uui-icon slot="icon" name="document"></uui-icon>
            Content
          </uui-tab>
          <uui-tab active label="packages">
            <uui-icon slot="icon" name="settings"></uui-icon>
            Packages
          </uui-tab>
          <uui-tab label="media">
            <uui-icon slot="icon" name="picture"></uui-icon>
            Media
          </uui-tab>
        </uui-tab-group>
      </div>
    `;
  },
};

export const Dynamic: Story = {
  render: () => {
    const addTab = () => {
      const tabGroup = document.querySelector('uui-tab-group');
      if (!tabGroup) return;

      const tab = document.createElement('uui-tab');
      const nameWithRandomLength = Math.random().toString(36).substring(7);
      tab.label = nameWithRandomLength;
      tab.innerHTML = nameWithRandomLength;
      tabGroup.appendChild(tab);
    };

    const removeRandomTab = () => {
      const tabGroup = document.querySelector('uui-tab-group');
      if (!tabGroup) return;

      const tabs = tabGroup.querySelectorAll('uui-tab');
      if (tabs.length > 0) {
        const randomIndex = Math.floor(Math.random() * tabs.length);
        tabGroup.removeChild(tabs[randomIndex]);
      }
    };

    return html`
      <div style="display: flex">
        <uui-tab-group></uui-tab-group>
      </div>
      <uui-button @click=${addTab}>Add tab</uui-button>
      <uui-button @click=${removeRandomTab}>Remove tab</uui-button>
    `;
  },
};

export const FlexLayout: Story = {
  render: () => html`
    <div style="display: flex;">
      <uui-input style="min-width: 200px; flex-grow: 1"></uui-input>
      <uui-tab-group>
        <uui-tab label="content">Content</uui-tab>
        <uui-tab active label="packages">Packages</uui-tab>
        <uui-tab label="media">Media</uui-tab>
        <uui-tab label="settings">Settings</uui-tab>
        <uui-tab label="translations">Translations</uui-tab>
      </uui-tab-group>
    </div>
  `,
};

export const CenterAlign: Story = {
  render: () => html`
    <div style="display: flex; justify-content: center">
      <uui-tab-group>
        <uui-tab label="content">Content</uui-tab>
        <uui-tab active label="packages">Packages</uui-tab>
        <uui-tab label="media">Media</uui-tab>
        <uui-tab label="settings">Settings</uui-tab>
        <uui-tab label="translations">Translations</uui-tab>
      </uui-tab-group>
    </div>
  `,
};

export const RightAline: Story = {
  render: () => html`
    <div style="display: flex; justify-content: right">
      <uui-tab-group>
        <uui-tab label="content">Content</uui-tab>
        <uui-tab active label="packages">Packages</uui-tab>
        <uui-tab label="media">Media</uui-tab>
        <uui-tab label="settings">Settings</uui-tab>
        <uui-tab label="translations">Translations</uui-tab>
      </uui-tab-group>
    </div>
  `,
};
