import { Story } from '@storybook/web-components';
import '@umbraco-ui/uui-icon-registry-essential/lib/index';
import '@umbraco-ui/uui-icon/lib/index';
import { UUIIconRegistryEssentialElement } from './uui-icon-registry-essential.element';
import { UUIIconElement } from '@umbraco-ui/uui-icon/lib/uui-icon.element';

export default {
  id: 'uui-icon-registry-essential',
  title: 'Design/Icon Registry Essential',
  component: 'uui-icon-registry-essential',
  parameters: {
    docs: {
      source: {
        code: `<uui-icon-registry-essential>...</uui-icon-registry-essential>`,
      },
    },
  },
};

export const Overview: Story = () => {
  const registryElement = new UUIIconRegistryEssentialElement();

  registryElement.registry.getIconNames().forEach(name => {
    const icon = new UUIIconElement();
    icon.name = name;
    console.log(name);
    registryElement.appendChild(icon);
  });

  return registryElement;
};
