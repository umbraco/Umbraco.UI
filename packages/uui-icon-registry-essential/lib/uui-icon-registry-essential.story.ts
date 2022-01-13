import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-icon-registry-essential/lib/index';
import '@umbraco-ui/uui-icon/lib/index';
import { UUIIconRegistryEssential } from './UUIIconRegistryEssential';

export default {
  id: 'uui-icon-registry-essential',
  title: 'Symbols/Icon Registry Essential',
  component: 'uui-icon-registry-essential',
  parameters: {
    docs: {
      source: {
        code: `
<uui-icon-registry-essential>
  <uui-icon name="<IconName>"></uui-icon>
  <uui-icon name="<IconName>"></uui-icon>
  <uui-icon name="<IconName>"></uui-icon>
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
    <uui-icon-registry-essential style="display: flex;">
      ${sortedIcons?.map(
        name => html`
          <div
            style="flex: 0 0 100px; display: flex; flex-direction: column; align-items: center;">
            <uui-icon
              name="${name}"
              style="font-size: 24px; margin-bottom: 6px;"></uui-icon>
            <div>${name}</div>
          </div>
        `
      )}
    </uui-icon-registry-essential>
  `;
};
