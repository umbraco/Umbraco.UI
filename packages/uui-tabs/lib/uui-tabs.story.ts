import '.';
import '@umbraco-ui/uui-icon/lib';
import '@umbraco-ui/uui-icon-registry-essential/lib';
import '@umbraco-ui/uui-button/lib';
import '@umbraco-ui/uui-popover-container/lib';
import '@umbraco-ui/uui-symbol-more/lib';

import { Story } from '@storybook/web-components';
import { html } from 'lit';
import readme from '../README.md?raw';

export default {
  title: 'Buttons/Tabs',
  component: 'uui-tabs',
  id: 'uui-tabs',
  args: {
    '--uui-tab-divider': 'rgba(0,0,0,0)',
  },
  argTypes: {
    '--uui-tab-text': { control: { type: 'color' } },
    '--uui-tab-text-hover': { control: { type: 'color' } },
    '--uui-tab-text-active': { control: { type: 'color' } },
    '--uui-tab-background': { control: { type: 'color' } },
    '--uui-tab-divider': { control: { type: 'color' } },
  },
  parameters: {
    readme: { markdown: readme },
    docs: {
      source: {
        code: html`<uui-tab-group>
          <uui-tab>Tab A</uui-tab>
          <uui-tab>Tab B</uui-tab>
          <uui-tab>Tab C</uui-tab>
        </uui-tab-group>`.strings,
      },
    },
  },
};

export const AAAOverview: Story = props => html`
  <div style="display: flex;">
    <uui-tab-group
      style="
    height: 60px;
    --uui-tab-text: ${props['--uui-tab-text']};
    --uui-tab-text-hover: ${props['--uui-tab-text-hover']};
    --uui-tab-text-active: ${props['--uui-tab-text-active']};
    --uui-tab-background: ${props['--uui-tab-background']};
    --uui-tab-divider: ${props['--uui-tab-divider']};
    ${props.inlineStyles}">
      <uui-tab label="content" active> Content </uui-tab>
      <uui-tab label="Packages" ?disabled=${props.disabled}> Packages </uui-tab>
      <uui-tab label="Media"> Media </uui-tab>
      <uui-tab label="Settings"> Settings </uui-tab>
      <uui-tab label="Translations"> Translations </uui-tab>
      <uui-tab label="Users"> Users </uui-tab>
    </uui-tab-group>
  </div>
`;
AAAOverview.storyName = 'Overview';

export const WithBorders: Story = () => html`
  <h3>With Borders</h3>
  <div
    style="
    height: 48px;
    display: flex;
    --uui-tab-divider: var(--uui-color-divider-standalone);
    ">
    <uui-tab-group style="display: flex;">
      <uui-tab label="content"> Content </uui-tab>
      <uui-tab label="Packages"> Packages </uui-tab>
      <uui-tab label="Media" active> Media </uui-tab>
      <uui-tab label="Settings"> Settings </uui-tab>
      <uui-tab label="Translations"> Translations </uui-tab>
      <uui-tab label="Users"> Users </uui-tab>
    </uui-tab-group>
  </div>
`;

export const Navbar: Story = () => html`
  <h3>Navbar</h3>
  <div
    style="
    display: flex;
    height: 60px;
    font-size: 16px;
    ">
    <uui-tab-group style="display: flex;">
      <uui-tab label="content"> Content </uui-tab>
      <uui-tab label="Packages" active> Packages </uui-tab>
      <uui-tab label="Media"> Media </uui-tab>
      <uui-tab label="Settings"> Settings </uui-tab>
      <uui-tab label="Translations"> Translations </uui-tab>
      <uui-tab label="Users"> Users </uui-tab>
    </uui-tab-group>
  </div>
`;

export const UsingHref: Story = () => html`
  <h3>Href links</h3>
  <div
    style="
    display: flex;
    height: 60px;
    font-size: 16px;
    ">
    <uui-tab-group>
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
      <uui-tab label="Translations" href="http://www.umbraco.com/#translations">
        Translations
      </uui-tab>
      <uui-tab label="Users" href="http://www.umbraco.com/#users">
        Users
      </uui-tab>
    </uui-tab-group>
  </div>
`;

export const WithIcons: Story = props => html`
  <h3>Tabs with Icons</h3>
  <uui-icon-registry-essential>
    <div style="display: flex;">
      <uui-tab-group
        dropdown-direction="horizontal"
        style="
        height: 70px;
        font-size: 12px;
        ${props.inlineStyles}">
        <uui-tab>
          <uui-icon slot="icon" name="document"></uui-icon>
          Content
        </uui-tab>
        <uui-tab active>
          <uui-icon slot="icon" name="settings"></uui-icon>
          Packages
        </uui-tab>
        <uui-tab>
          <uui-icon slot="icon" name="picture"></uui-icon>
          Media
        </uui-tab>
      </uui-tab-group>
    </div>
  </uui-icon-registry-essential>
`;
WithIcons.parameters = {
  docs: {
    source: {
      code: `
      <uui-tab-group>
        <uui-tab>
          <uui-icon slot="icon" name="document"></uui-icon>
          Content
        </uui-tab>
        <uui-tab active>
          <uui-icon slot="icon" name="settings"></uui-icon>
          Packages
        </uui-tab>
        <uui-tab>
          <uui-icon slot="icon" name="picture"></uui-icon>
          Media
        </uui-tab>
      </uui-tab-group>`,
    },
  },
};

export const WitchSpacing: Story = props => html`
  <h3>Tabs with Spacing</h3>
  <uui-icon-registry-essential>
    <div style="display: flex;">
      <uui-tab-group
        dropdown-direction="horizontal"
        style="
        gap: 70px;
        margin: 0 auto;
        font-size: 12px;
        ${props.inlineStyles}">
        <uui-tab>
          <uui-icon slot="icon" name="document"></uui-icon>
          Content
        </uui-tab>
        <uui-tab active>
          <uui-icon slot="icon" name="settings"></uui-icon>
          Packages
        </uui-tab>
        <uui-tab>
          <uui-icon slot="icon" name="picture"></uui-icon>
          Media
        </uui-tab>
      </uui-tab-group>
    </div>
  </uui-icon-registry-essential>
`;
WitchSpacing.parameters = {
  docs: {
    source: {
      code: `
      <uui-tab-group>
        <uui-tab>
          <uui-icon slot="icon" name="document"></uui-icon>
          Content
        </uui-tab>
        <uui-tab active>
          <uui-icon slot="icon" name="settings"></uui-icon>
          Packages
        </uui-tab>
        <uui-tab>
          <uui-icon slot="icon" name="picture"></uui-icon>
          Media
        </uui-tab>
      </uui-tab-group>`,
    },
  },
};
