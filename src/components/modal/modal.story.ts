import '../dialog-layout/dialog-layout.js';
import './modal.js';
import readme from './README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './modal-example.element';
import './modal-with-toasts-example.element';

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

export const ModalWithOverlays: Story = {
  render: () => html`<modal-with-toasts-example></modal-with-toasts-example>`,
};
