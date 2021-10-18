import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-breadcrumbs/lib/index';

export default {
  title: 'Basics/Breadcrumbs',
  id: 'uui-breadcrumbs',
  component: 'uui-breadcrumbs',
};

const links = [
  { name: 'Home', link: '#Home' },
  { name: 'Products', link: '#Products' },
  { name: 'Cars', link: '#Cars' },
];

export const Overview: Story = () =>
  html`<uui-breadcrumbs
    >${links.map(
      link =>
        html`<uui-breadcrumb-item .href=${link.link}
          >${link.name}</uui-breadcrumb-item
        >`
    )}</uui-breadcrumbs
  >`;

Overview.parameters = {
  docs: {
    source: {
      code: `<uui-breadcrumbs>
      <uui-breadcrumb-item href="https://...">Item 1</uui-breadcrumb-item>
      <uui-breadcrumb-item href="https://...">Item 2</uui-breadcrumb-item>
      <uui-breadcrumb-item href="https://...">Item 3</uui-breadcrumb-item>
    </uui-breadcrumbs>`,
    },
  },
};
