import '.';
import readme from '../README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { renderSlots, spread } from '../../../storyhelpers';

import '@umbraco-ui/uui-tag/lib';
import '@umbraco-ui/uui-action-bar/lib';
import '@umbraco-ui/uui-button/lib';
import '@umbraco-ui/uui-icon/lib';

const meta: Meta = {
  id: 'uui-ref-node',
  component: 'uui-ref-node',
  title: 'Displays/References/Node',
  args: {
    name: 'Rabbit Suit Product Page',
    detail: 'path/to/nowhere',
  },
  render: args =>
    html`<uui-ref-node ${spread(args)}>${renderSlots(args)}</uui-ref-node>`,
  decorators: [
    (Story: any) => html`<div style="max-width: 420px;">${Story()}</div>`,
  ],
  parameters: {
    readme: {
      markdown: readme,
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    'tag slot': html`<uui-tag size="s" slot="tag" color="positive"
      >Published</uui-tag
    >`,
    'actions slot': html`<uui-action-bar slot="actions"
      ><uui-button label="delete"
        ><uui-icon name="delete"></uui-icon></uui-button
    ></uui-action-bar>`,
  },
};
export const CustomIcon: Story = {
  args: {
    'icon slot': html`<uui-icon slot="icon" name="colorpicker"></uui-icon>`,
  },
};

export const Standalone: Story = {
  args: {
    standalone: true,
  },
};

export const Href: Story = {
  args: {
    href: 'https://umbraco.com',
    target: '_blank',
  },
};

export const LongLink: Story = {
  args: {
    name: 'Example with very long link',
    detail:
      'https://www.example.com/search/results?page=12&sort=ascending&category=electronics&subcategory=smartphones&brand=Samsung&min_price=199.99&max_price=1499.99&availability=in_stock&rating=4_plus&discount=true&shipping=free&color=black%2Cwhite%2Cblue&features=5G%2Cwireless_charging%2Cwaterproof&seller=official_store&lang=en_US&currency=USD&ref=homepage_banner&utm_source=google&utm_medium=cpc&utm_campaign=fall_sale_2025&utm_term=smartphone_deals&utm_content=ad_variant_3&session_id=8a7b9c123f00456d87eabc990f12a345&user_id=anonymous_54b23ff89d12&timestamp=2025-10-12T16%3A45%3A30Z&tracking_code=XYZ123ABC789DEF456GHI',
    'actions slot': html`<uui-action-bar slot="actions"
      ><uui-button label="remove">Remove</uui-button></uui-action-bar
    >`,
  },
};

export const Selectable: Story = {
  args: {
    selectable: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Readonly: Story = {
  args: {
    readonly: true,
  },
};
