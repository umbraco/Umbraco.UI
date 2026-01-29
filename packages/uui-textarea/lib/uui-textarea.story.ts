import '.';
import readme from '../README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { spread } from '../../../storyhelpers';

const meta: Meta = {
  id: 'uui-textarea',
  component: 'uui-textarea',
  title: 'Inputs/Textarea',
  args: {
    label: 'Label',
  },
  argTypes: {
    '--uui-textarea-min-height': { control: { type: 'text' } },
    '--uui-textarea-max-height': { control: { type: 'text' } },
    '--uui-textarea-font-size': { control: { type: 'text' } },
    '--uui-textarea-background-color': { control: { type: 'color' } },
  },
  render: args => html`<uui-textarea ${spread(args)}></uui-textarea>`,
  parameters: {
    readme: {
      markdown: readme,
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const MaxLength: Story = {
  args: {
    maxlength: 10,
  },
};

export const MinLength: Story = {
  args: {
    minlength: 5,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Placeholder: Story = {
  args: {
    placeholder: 'Placeholder...',
  },
};

/**
 * The height will confine itself within the max and min height if defined.
 */
export const AutoHeight: Story = {
  args: {
    autoHeight: true,
    '--uui-textarea-min-height': '100px',
    '--uui-textarea-max-height': '200px',
  },
};

export const Error = {
  args: {
    error: true,
  },
};

/**
 * This story demonstrates that auto-height works when values are set programmatically.
 * Click the buttons to see the textarea grow or shrink automatically.
 */
export const AutoHeightProgrammaticValue: Story = {
  args: {
    autoHeight: true,
    '--uui-textarea-min-height': '50px',
    '--uui-textarea-max-height': '300px',
  },
  render: args => {
    const shortText = 'Short text';
    const longText = `This is a very long text
with multiple lines
that should cause
the textarea
to grow
in height
automatically
when auto-height is enabled.
Line 9
Line 10
Line 11
Line 12`;

    return html`
      <div>
        <uui-textarea id="test-textarea" ${spread(args)}></uui-textarea>
        <div style="margin-top: 10px;">
          <button
            @click=${() => {
              const textarea = document.getElementById('test-textarea');
              if (textarea) textarea.value = shortText;
            }}>
            Set Short Text
          </button>
          <button
            @click=${() => {
              const textarea = document.getElementById('test-textarea');
              if (textarea) textarea.value = longText;
            }}>
            Set Long Text
          </button>
          <button
            @click=${() => {
              const textarea = document.getElementById('test-textarea');
              if (textarea) textarea.value = '';
            }}>
            Clear
          </button>
        </div>
      </div>
    `;
  },
};
