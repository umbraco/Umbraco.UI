import '.';
import '@umbraco-ui/uui-icon/lib';

import { Story } from '@storybook/web-components';
import { html } from 'lit';

import { UUIIconRegistryEssential } from './UUIIconRegistryEssential';
import readme from '../README.md?raw';

export default {
  id: 'uui-icon-registry-essential',
  title: 'Symbols/Icon Registry Essential',
  component: 'uui-icon-registry-essential',
  parameters: {
    readme: {
      markdown: readme,
    },
    docs: {
      source: {
        code: `
<uui-icon-registry-essential>
  <uui-icon name="[IconName]"></uui-icon>
  <uui-icon name="[IconName]"></uui-icon>
  <uui-icon name="[IconName]"></uui-icon>
  ...
</uui-icon-registry-essential>`,
      },
    },
  },
};

export const Overview: Story = () => {
  const registry = new UUIIconRegistryEssential();
  const sortedIcons = registry
    ?.getIconNames()
    ?.sort((a, b) => a.localeCompare(b));

  return html`
    <uui-icon-registry-essential
      style="display: grid;
        grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
        grid-gap: var(--uui-size-layout-2);
        margin: var(--uui-size-layout-2);
        place-items: start;
        justify-content: space-between;">
      ${sortedIcons?.map(
        name => html`
          <div
            style="width:100%; display: flex; flex-direction: column; align-items: center;">
            <uui-icon
              name="${name}"
              style="font-size: 24px; margin-bottom: 6px;"></uui-icon>
            <small>${name}</small>
          </div>
        `,
      )}
    </uui-icon-registry-essential>
  `;
};
