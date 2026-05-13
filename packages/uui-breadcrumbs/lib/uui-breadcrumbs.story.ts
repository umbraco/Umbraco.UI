import '.';
import readme from '../README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';

const meta: Meta = {
  id: 'uui-breadcrumbs',
  component: 'uui-breadcrumbs',
  title: 'Buttons/Breadcrumbs',
  render: () =>
    html`<uui-breadcrumbs>
      <uui-breadcrumb-item href="#Home">Home</uui-breadcrumb-item>
      <uui-breadcrumb-item href="#Products">Products</uui-breadcrumb-item>
      <uui-breadcrumb-item href="#Cars">Cars</uui-breadcrumb-item>
      <uui-breadcrumb-item href="#Home">Home</uui-breadcrumb-item>
      <uui-breadcrumb-item href="#Products">Products</uui-breadcrumb-item>
      <uui-breadcrumb-item href="#Cars">Cars</uui-breadcrumb-item>
      <uui-breadcrumb-item href="#Home">Home</uui-breadcrumb-item>
      <uui-breadcrumb-item href="#Products">Products</uui-breadcrumb-item>
      <uui-breadcrumb-item href="#Cars">Cars</uui-breadcrumb-item>
    </uui-breadcrumbs>`,
  parameters: {
    readme: {
      markdown: readme,
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const ClickRouting: Story = {
  render: () => html`
    <uui-breadcrumbs>
      <uui-breadcrumb-item @click=${() => alert('Home')}
        >Home</uui-breadcrumb-item
      >
      <uui-breadcrumb-item @click=${() => alert('Category')}
        >Category</uui-breadcrumb-item
      >
      <uui-breadcrumb-item @click=${() => alert('Subcategory')}
        >Subcategory</uui-breadcrumb-item
      >
      <uui-breadcrumb-item @click=${() => alert('Section')}
        >Section</uui-breadcrumb-item
      >
      <uui-breadcrumb-item @click=${() => alert('Subsection')}
        >Subsection</uui-breadcrumb-item
      >
      <uui-breadcrumb-item @click=${() => alert('Topic')}
        >Topic</uui-breadcrumb-item
      >
      <uui-breadcrumb-item @click=${() => alert('Subtopic')}
        >Subtopic</uui-breadcrumb-item
      >
      <uui-breadcrumb-item @click=${() => alert('Article')}
        >Article</uui-breadcrumb-item
      >
      <uui-breadcrumb-item @click=${() => alert('Detail')}
        >Detail</uui-breadcrumb-item
      >
      <uui-breadcrumb-item>Current</uui-breadcrumb-item>
    </uui-breadcrumbs>
  `,
};
