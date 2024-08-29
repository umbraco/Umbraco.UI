import '.';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  id: 'uui-breadcrumbs',
  component: 'uui-breadcrumbs',
  title: 'Buttons/Breadcrumbs',
  render: () =>
    html`<uui-breadcrumbs>
      <uui-breadcrumb-item href="#Home">Home</uui-breadcrumb-item>
      <uui-breadcrumb-item href="#Products">Products</uui-breadcrumb-item>
      <uui-breadcrumb-item href="#Cars">Cars</uui-breadcrumb-item>
    </uui-breadcrumbs>`,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
