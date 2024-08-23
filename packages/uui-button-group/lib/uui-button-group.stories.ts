import '.';
import { html, nothing } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { spread } from '../../../storyhelpers/spread-directive';

const meta: Meta = {
  id: 'uui-button-group',
  component: 'uui-button-group',
  title: 'Buttons/Button Group',
  render: () => html`
    <uui-button-group>
      <uui-button look="primary" label="Button 1"></uui-button>
      <uui-button look="primary" label="Button 2"></uui-button>
      <uui-button look="secondary" color="positive" label="Save"></uui-button>
      <uui-button look="primary" color="danger" label="Delete"></uui-button>
    </uui-button-group>
  `,
};

export default meta;
type Story = StoryObj;

/**
 * For styling options see the [Button](/docs/uui-button--docs) component.
 */
export const Default: Story = {};
