import '@umbraco-ui/uui-dialog-layout/lib';
import '.';
import readme from '../README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import './modal-example.element';

const meta: Meta = {
  id: 'uui-modal',
  component: 'uui-modal',
  title: 'Layout/Modals',
  parameters: {
    readme: {
      markdown: readme,
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`<modal-example></modal-example>`,
};
