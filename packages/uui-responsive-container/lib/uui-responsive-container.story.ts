import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './uui-responsive-container.element';
import type { UUIResponsiveContainerElement } from './uui-responsive-container.element';
import readme from '../README.md?raw';

// Import button so it's available in stories
import '@umbraco-ui/uui-button';
import '@umbraco-ui/uui-button-group';

const meta: Meta = {
  id: 'uui-responsive-container',
  title: 'Layout/Responsive Container',
  component: 'uui-responsive-container',
  args: {
    collapse: 'end',
  },
  argTypes: {
    collapse: {
      control: 'select',
      options: ['end', 'start'],
      description: 'Which side items collapse from',
    },
    '--uui-responsive-container-gap': {
      control: { type: 'text' },
      description: 'Gap between items (e.g., "8px", "16px")',
    },
  },
  parameters: {
    readme: { markdown: readme },
    docs: {
      description: {
        component:
          'A responsive container that automatically collapses overflowing children into a "more" dropdown menu. ' +
          'When there is not enough horizontal space, items are hidden and accessible via a popover triggered by a "..." button. ' +
          'Supports collapsing from either the start (left) or end (right) of the container.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<UUIResponsiveContainerElement>;

export const Overview: Story = {
  render: () => html`
    <div
      style="width: 100%; border: 1px dashed #ccc; padding: 8px; resize: horizontal; overflow: auto;">
      <uui-responsive-container>
        <!-- Primary action -->
        <uui-button look="primary">Save</uui-button>

        <!-- Secondary actions -->
        <uui-button look="secondary">Edit</uui-button>
        <uui-button look="outline">Preview</uui-button>

        <!-- Button group for related actions -->
        <uui-button-group>
          <uui-button look="primary" label="Button 1"></uui-button>
          <uui-button
            look="secondary"
            color="positive"
            label="Save"></uui-button>
          <uui-button look="primary" color="danger" label="Delete"></uui-button>
        </uui-button-group>

        <!-- Colored buttons -->
        <uui-button look="primary" color="positive">Publish</uui-button>
        <uui-button look="primary" color="warning">Unpublish</uui-button>
        <uui-button look="primary" color="danger">Delete</uui-button>

        <!-- Another button group -->
        <uui-button-group>
          <uui-button look="outline">Undo</uui-button>
          <uui-button look="outline">Redo</uui-button>
        </uui-button-group>
      </uui-responsive-container>
    </div>
    <p style="color: #666; font-size: 12px;">
      ↔ Drag the corner to resize and see the collapse behavior
    </p>
  `,
};

export const CollapseFromEnd: Story = {
  render: () => html`
    <div
      style="width: 400px; border: 1px dashed #ccc; padding: 8px; resize: horizontal; overflow: auto;">
      <uui-responsive-container collapse="end">
        <uui-button look="primary">First</uui-button>
        <uui-button>Second</uui-button>
        <uui-button>Third</uui-button>
        <uui-button>Fourth</uui-button>
        <uui-button>Fifth</uui-button>
      </uui-responsive-container>
    </div>
    <p style="color: #666; font-size: 12px;">
      collapse="end" - Items collapse from the right (default)
    </p>
  `,
};

export const CollapseFromStart: Story = {
  render: () => html`
    <div
      style="width: 400px; border: 1px dashed #ccc; padding: 8px; resize: horizontal; overflow: auto;">
      <uui-responsive-container collapse="start">
        <uui-button>First</uui-button>
        <uui-button>Second</uui-button>
        <uui-button>Third</uui-button>
        <uui-button>Fourth</uui-button>
        <uui-button look="primary">Fifth</uui-button>
      </uui-responsive-container>
    </div>
    <p style="color: #666; font-size: 12px;">
      collapse="start" - Items collapse from the left, keeping rightmost items
      visible
    </p>
  `,
};

// Helper functions for click handlers
const handleSave = () => alert('💾 Save clicked!');
const handleEdit = () => alert('✏️ Edit clicked!');
const handleDelete = () => alert('🗑️ Delete clicked!');
const handlePublish = () => alert('🚀 Publish clicked!');
const handleShare = () => alert('📤 Share clicked!');
const handleExport = () => alert('📦 Export clicked!');

export const ClickActions: Story = {
  render: () => html`
    <div
      style="width: 350px; border: 1px dashed #ccc; padding: 8px; resize: horizontal; overflow: auto;">
      <uui-responsive-container>
        <uui-button look="primary" @click=${handleSave}>Save</uui-button>
        <uui-button @click=${handleEdit}>Edit</uui-button>
        <uui-button @click=${handleDelete}>Delete</uui-button>
        <uui-button @click=${handlePublish}>Publish</uui-button>
        <uui-button @click=${handleShare}>Share</uui-button>
        <uui-button @click=${handleExport}>Export</uui-button>
      </uui-responsive-container>
    </div>
    <p style="color: #666; font-size: 12px; margin-top: 16px;">
      <strong>Test instructions:</strong><br />
      1. Resize the container to make some buttons collapse into the dropdown<br />
      2. Click the "..." button to open the dropdown<br />
      3. Click any button in the dropdown<br />
      4. You should see an alert with the button's action! ✅
    </p>
  `,
};
