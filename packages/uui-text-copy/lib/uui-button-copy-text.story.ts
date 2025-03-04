import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

import './uui-button-copy-text.element.js';
import { UUICopyTextEvent } from './UUICopyTextEvent';
import type { UUIButtonCopyTextElement } from './uui-button-copy-text.element.js';
import readme from '../README.md?raw';
import { renderSlots, spread } from '../../../storyhelpers/index.js';

// For the story to show the example of using inside an uui-input
import '@umbraco-ui/uui-input/lib';

import '@umbraco-ui/uui-button/lib';
import '@umbraco-ui/uui-loader-circle/lib';

const meta: Meta<UUIButtonCopyTextElement> = {
  id: 'uui-button-copy-text',
  title: 'Buttons/Copy text',
  component: 'uui-button-copy-text',
  parameters: {
    readme: { markdown: readme },
  },
  args: {
    text: 'Hey stop copying me 🥸',
    color: 'default',
    look: 'secondary',
  },
  argTypes: {
    look: {
      options: ['default', 'primary', 'secondary', 'outline', 'placeholder'],
      control: 'select',
    },
    color: {
      options: ['default', 'positive', 'warning', 'danger'],
      control: 'select',
    },
  },
  render: args => {
    return html`<uui-button-copy-text ${spread(args)}
      >${renderSlots(args)}</uui-button-copy-text
    >`;
  },
};

export default meta;
type Story = StoryObj<UUIButtonCopyTextElement>;

export const Overview: Story = {
  name: 'Simple Copy',
  args: {
    text: 'Hey stop copying me 🥸',
  },
  parameters: {
    docs: {
      source: {
        code: `<uui-button-copy-text text="Hey stop copying me 🥸"></uui-button-copy-text>`,
      },
    },
  },
};

export const WithLabelSet: Story = {
  name: 'Simple Copy with an A11y Label set',
  args: {
    text: 'Hey stop copying me 🥸',
    disabled: false,
    label: 'This is my A11y label I want',
  },
  parameters: {
    docs: {
      source: {
        code: `<uui-button-copy-text text="Hey stop copying me 🥸" label="This is my A11y label I want"></uui-button-copy-text>`,
      },
    },
  },
};

export const Disabled: Story = {
  name: 'Disabled State',
  args: {
    value: 'You cannot copy this',
    disabled: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<uui-button-copy-text text="You cannot copy this" disabled></uui-button-copy-text>`,
      },
    },
  },
};

export const CustomSlotContent: Story = {
  name: 'Custom Slot Content',
  args: {
    text: 'Custom slot content',
  },
  parameters: {
    docs: {
      source: {
        code: `<uui-button-copy-text text="Custom slot content">Custom Slot Content</uui-button-copy-text>`,
      },
    },
  },
};

export const ColorAndLook: Story = {
  name: 'Color and Look',
  args: {
    text: 'Copy this text',
    color: 'positive',
    look: 'primary',
  },
  parameters: {
    docs: {
      source: {
        code: `
<uui-button-copy-text value="I have the same look and color props as UUI-Button" color="positive" look="primary"></uui-button-copy-text>
        `,
      },
    },
  },
};

export const CopiedEvent: Story = {
  name: 'Copied Event',
  args: {
    text: 'Copy this text',
  },
  render: args => html`
    <uui-button-copy-text
      ${spread(args)}
      @copied=${(event: UUICopyTextEvent) => {
        alert(`Copied text: ${event.text}`);
      }}></uui-button-copy-text>
  `,
  parameters: {
    docs: {
      source: {
        code: `
<uui-button-copy-text text="Copy this text"></uui-button-copy-text>
<script>
  document.querySelector('uui-button-copy-text').addEventListener('copied', (event) => {
    alert(\`Copied text: \${event.text}\`);
  });
</script>
        `,
      },
    },
  },
};

export const ModifyClipboardContent: Story = {
  name: 'Modify Clipboard Content',
  args: {
    text: 'Original text',
  },
  render: args => html`
    <uui-button-copy-text
      ${spread(args)}
      @copying=${(event: UUICopyTextEvent) => {
        event.text += ' - Modified before copying';
      }}></uui-button-copy-text>
  `,
  parameters: {
    docs: {
      source: {
        code: `
<uui-button-copy-text text="Original text"></uui-button-copy-text>
<script>
  document.querySelector('uui-button-copy-text').addEventListener('copying', (event) => {
    event.text += ' - Modified before copying';
  });
</script>
        `,
      },
    },
  },
};

export const EmptyValueErrorState: Story = {
  name: 'Not Found Element set in Copy From - shows an Error State',
  args: {
    copyFrom: 'idSelectorDoesNotExist',
  },
  parameters: {
    docs: {
      source: {
        code: `
<uui-button-copy-text copy-from="idSelectorDoesNotExist"></uui-button-copy-text>
        `,
      },
    },
  },
};

export const CopyFromInput: Story = {
  name: 'Copy From uui-input',
  render: () => html`
    <uui-input id="inputToCopy" placeholder="Type something">
      <uui-button-copy-text copy-from="inputToCopy" slot="append" compact>
        <uui-icon name="copy"></uui-icon>
      </uui-button-copy-text>
    </uui-input>
  `,
  parameters: {
    docs: {
      source: {
        code: `
<uui-input id="inputToCopy" placeholder="Type something">
  <uui-button-copy-text copy-from="inputToCopy" slot="append" compact>
    <uui-icon name="copy"></uui-icon>
  </uui-button-copy-text>
</uui-input>
        `,
      },
    },
  },
};

export const AnimationDelay: Story = {
  name: 'Animation Delay',
  args: {
    value: 'A long 3 second delay',
    animationStateDelay: 3000,
  },
  parameters: {
    docs: {
      source: {
        code: `<uui-button-copy-text value="A long 3 second delay" animation-state-delay="3000"></uui-button-copy-text>`,
      },
    },
  },
};

export const WithDifferentIcon: Story = {
  name: 'Different Icon',
  args: {
    text: 'I have used a different icon',
  },
  render: args => html`
    <uui-button-copy-text ${spread(args)}>
      <uui-icon name="document"></uui-icon> Copy to Clipboard
    </uui-button-copy-text>
  `,
  parameters: {
    docs: {
      source: {
        code: `
<uui-button-copy-text text="I have used a different icon">
  <uui-icon name="document"></uui-icon> Copy to Clipboard
</uui-button-copy-text>`,
      },
    },
  },
};
