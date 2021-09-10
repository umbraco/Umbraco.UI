import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

import '@umbraco-ui/uui-breadcrumbs/src/index';

export default {
  title: 'Basics/Breadcrumbs',
  component: 'uui-breadcrumbs',
};

const links = [
  { name: 'Home', link: '#Home' },
  { name: 'Products', link: '#Products' },
  { name: 'Cars', link: '#Cars' },
];

export const Basic: Story = () =>
  html`<uui-breadcrumbs
    >${links.map(
      link =>
        html`<uui-breadcrumb-item .href=${link.link}
          >${link.name}</uui-breadcrumb-item
        >`
    )}</uui-breadcrumbs
  >`;
