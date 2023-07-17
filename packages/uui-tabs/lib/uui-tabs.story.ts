import '.';
import '@umbraco-ui/uui-icon/lib';
import '@umbraco-ui/uui-icon-registry-essential/lib';

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
  <uui-tab-group
    style="
    height: 60px;
    --uui-tab-text: ${props['--uui-tab-text']};
    --uui-tab-text-hover: ${props['--uui-tab-text-hover']};
    --uui-tab-text-active: ${props['--uui-tab-text-active']};
    --uui-tab-background: ${props['--uui-tab-background']};
    --uui-tab-divider: ${props['--uui-tab-divider']};
    ${props.inlineStyles}">
    <uui-tab active> Content </uui-tab>
    <uui-tab ?disabled=${props.disabled}> Packages </uui-tab>
    <uui-tab> Media </uui-tab>
  </uui-tab-group>
`;
AAAOverview.storyName = 'Overview';

export const WithBorders: Story = () => html`
  <h3>With Borders</h3>
  <div
    style="
    height: 48px;
    --uui-tab-text: var(--uui-color-default);
    --uui-tab-text-hover: var(--uui-color-default-emphasis);
    --uui-tab-text-active: var(--uui-color-default-emphasis);
    --uui-tab-background: none;
    --uui-tab-divider: var(--uui-color-divider-standalone);
    ">
    <uui-tab-group>
      <uui-tab> Content </uui-tab>
      <uui-tab> Packages </uui-tab>
      <uui-tab active> Media </uui-tab>
    </uui-tab-group>
  </div>
`;

export const Navbar: Story = () => html`
  <h3>Navbar</h3>
  <div
    style="
    height: 60px;
    font-size: 16px;
    --uui-tab-text: var(--uui-color-surface-alt);
    --uui-tab-text-hover: var(--uui-color-surface);
    --uui-tab-text-active: var(--uui-color-current);
    --uui-tab-background: var(--uui-color-default);
    ">
    <uui-tab-group>
      <uui-tab>Content</uui-tab>
      <uui-tab active>Packages</uui-tab>
      <uui-tab>Media</uui-tab>
    </uui-tab-group>
  </div>
`;

export const WithIcons: Story = props => html`
  <h3>Tabs with Icons</h3>
  <uui-icon-registry-essential>
    <uui-tab-group
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
