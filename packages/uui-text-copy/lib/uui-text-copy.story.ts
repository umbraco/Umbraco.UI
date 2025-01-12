import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

import './uui-text-copy.element';
import type { UUITextCopyElement } from './uui-text-copy.element';
import readme from '../README.md?raw';

// For the story to show the example of using inside an uui-input
import '@umbraco-ui/uui-input/lib';

import '@umbraco-ui/uui-button/lib';
import '@umbraco-ui/uui-loader-circle/lib';

import { UUITextCopyEvent } from './UUITextCopyEvent';

const meta: Meta<UUITextCopyElement> = {
  id: 'uui-text-copy',
  title: 'Buttons/Text Copy',
  component: 'uui-text-copy',
  parameters: {
    readme: { markdown: readme },
  },
  args: {
    value: 'Hey stop copying me 🥸',
    color: 'default',
    look: 'default',
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
};

export default meta;
type Story = StoryObj<UUITextCopyElement>;

export const Overview: Story = {
  name: 'Simple Copy',
  args: {
    value: 'Hey stop copying me 🥸',
  },
  parameters: {
    docs: {
      source: {
        code: `<uui-text-copy value="Hey stop copying me 🥸"></uui-text-copy>`,
      },
    },
  },
};

export const WithLabelSet: Story = {
  name: 'Simple Copy with an A11y Label set',
  args: {
    value: 'Hey stop copying me 🥸',
    disabled: false,
    label: 'This is my A11y label I want',
  },
  parameters: {
    docs: {
      source: {
        code: `<uui-text-copy value="Hey stop copying me 🥸" label="This is my A11y label I want"></uui-text-copy>`,
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
        code: `<uui-text-copy value="You cannot copy this" disabled></uui-text-copy>`,
      },
    },
  },
};

export const CustomSlotContent: Story = {
  name: 'Custom Slot Content',
  args: {
    value: 'Custom slot content',
  },
  render: args => html`
    <uui-text-copy .value=${args.value}> Custom Copy Text </uui-text-copy>
  `,
  parameters: {
    docs: {
      source: {
        code: `<uui-text-copy value="Custom slot content">Custom Copy Text</uui-text-copy>`,
      },
    },
  },
};

export const ColorAndLook: Story = {
  name: 'Color and Look',
  args: {
    value: 'Copy this text',
    color: 'positive',
    look: 'primary',
  },
  render: args => html`
    <uui-text-copy
      .value=${args.value}
      .color=${args.color || 'default'}
      .look=${args.look || 'default'}>
      <uui-icon name="copy"></uui-icon> Copy
    </uui-text-copy>
  `,
  parameters: {
    docs: {
      source: {
        code: `
<uui-text-copy value="I have the same look and color props as UUI-Button" color="positive" look="primary"></uui-text-copy>
        `,
      },
    },
  },
};

export const CopiedEvent: Story = {
  name: 'Copied Event',
  args: {
    value: 'Copy this text',
  },
  render: args => html`
    <uui-text-copy
      .value=${args.value}
      @copied=${(event: UUITextCopyEvent) => {
        alert(`Copied text: ${event.detail.text}`);
      }}></uui-text-copy>
  `,
  parameters: {
    docs: {
      source: {
        code: `
<uui-text-copy value="Copy this text"></uui-text-copy>
<script>
  document.querySelector('uui-text-copy').addEventListener('copied', (event) => {
    alert(\`Copied text: \${event.detail.text}\`);
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
    value: 'Original text',
  },
  render: args => html`
    <uui-text-copy
      .value=${args.value}
      @copying=${(event: UUITextCopyEvent) => {
        event.detail.text += ' - Modified before copying';
      }}></uui-text-copy>
  `,
  parameters: {
    docs: {
      source: {
        code: `
<uui-text-copy value="Original text"></uui-text-copy>
<script>
  document.querySelector('uui-text-copy').addEventListener('copying', (event) => {
    event.detail.text += ' - Modified before copying';
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
  render: args => html`
    <uui-text-copy .copyFrom=${args.copyFrom}></uui-text-copy>
  `,
  parameters: {
    docs: {
      source: {
        code: `
<uui-text-copy copy-from="idSelectorDoesNotExist"></uui-text-copy>
        `,
      },
    },
  },
};

export const CopyFromInput: Story = {
  name: 'Copy From uui-input',
  render: () => html`
    <uui-input id="inputToCopy" placeholder="Type something">
      <uui-text-copy copy-from="inputToCopy" slot="append" compact>
        <uui-icon name="copy"></uui-icon>
      </uui-text-copy>
    </uui-input>
  `,
  parameters: {
    docs: {
      source: {
        code: `
<uui-input id="inputToCopy" placeholder="Type something">
  <uui-text-copy copy-from="inputToCopy" slot="append" compact>
    <uui-icon name="copy"></uui-icon>
  </uui-text-copy>
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
        code: `<uui-text-copy value="A long 3 second delay" animation-state-delay="3000"></uui-text-copy>`,
      },
    },
  },
};

export const WithDifferentIcon: Story = {
  name: 'Different Icon',
  args: {
    value: 'I have used a different icon',
  },
  render: args => html`
    <uui-text-copy .value=${args.value}>
      <uui-icon name="clipboard"></uui-icon> Copy to Clipboard
    </uui-text-copy>
  `,
  parameters: {
    docs: {
      source: {
        code: `
<uui-text-copy value="I have used a different icon">
  <uui-icon name="clipboard"></uui-icon> Copy to Clipboard
</uui-text-copy>`,
      },
    },
  },
};
