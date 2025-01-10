import type { Meta, StoryObj } from '@storybook/web-components';
import type { UUITextCopyButtonElement } from './uui-text-copy-button.element';
import readme from '../README.md?raw';
import { html } from 'lit';
import { UUITextCopyButtonEvent } from './UUITextCopyButtonEvent';
import '@umbraco-ui/uui-button/lib';
import '@umbraco-ui/uui-icon/lib';
import '@umbraco-ui/uui-loader-circle/lib';

const meta: Meta<UUITextCopyButtonElement> = {
  id: 'uui-text-copy-button',
  title: 'Inputs/Text Copy Button',
  component: 'uui-text-copy-button',
  parameters: {
    readme: { markdown: readme },
  },
};

export default meta;
type Story = StoryObj<UUITextCopyButtonElement>;

export const Overview: Story = {
  name: 'Simple Copy',
  args: {
    value: 'Hey stop copying me 🥸',
    disabled: false,
  },
  parameters: {
    docs: {
      source: {
        code: `<uui-text-copy-button value="Hey stop copying me 🥸"></uui-text-copy-button>`,
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
        code: `<uui-text-copy-button value="Hey stop copying me 🥸" label="This is my A11y label I want"></uui-text-copy-button>`,
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
        code: `<uui-text-copy-button value="You cannot copy this" disabled></uui-text-copy-button>`,
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
    <uui-text-copy-button .value=${args.value}>
      Custom Copy Text
    </uui-text-copy-button>
  `,
  parameters: {
    docs: {
      source: {
        code: `<uui-text-copy-button value="Custom slot content">Custom Copy Text</uui-text-copy-button>`,
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
    <uui-text-copy-button
      .value=${args.value}
      .color=${args.color}
      .look=${args.look}>
      <uui-icon name="copy"></uui-icon> Copy
    </uui-text-copy-button>
  `,
  parameters: {
    docs: {
      source: {
        code: `
<uui-text-copy-button value="I have the same look and color props as UUI-Button" color="positive" look="primary"></uui-text-copy-button>
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
    <uui-text-copy-button
      .value=${args.value}
      @copied=${(event: UUITextCopyButtonEvent) => {
        alert(`Copied text: ${event.detail.text}`);
      }}></uui-text-copy-button>
  `,
  parameters: {
    docs: {
      source: {
        code: `
<uui-text-copy-button value="Copy this text"></uui-text-copy-button>
<script>
  document.querySelector('uui-text-copy-button').addEventListener('copied', (event) => {
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
    <uui-text-copy-button
      .value=${args.value}
      @copying=${(event: UUITextCopyButtonEvent) => {
        event.detail.text += ' - Modified before copying';
      }}>
      <uui-icon name="copy"></uui-icon> Copy
    </uui-text-copy-button>
  `,
  parameters: {
    docs: {
      source: {
        code: `
<uui-text-copy-button value="Original text"></uui-text-copy-button>
<script>
  document.querySelector('uui-text-copy-button').addEventListener('copying', (event) => {
    event.detail.text += ' - Modified before copying';
  });
</script>
        `,
      },
    },
  },
};

export const EmptyValueErrorState: Story = {
  name: 'Empty Value - shows an Error State',
  args: {
    value: '',
  },
  render: args => html`
    <uui-text-copy-button .value=${args.value}></uui-text-copy-button>
  `,
  parameters: {
    docs: {
      source: {
        code: `
<uui-text-copy-button value=""></uui-text-copy-button>
        `,
      },
    },
  },
};

export const CopyFromInput: Story = {
  name: 'Copy From uui-input',
  render: () => html`
    <uui-input id="inputToCopy" placeholder="Type something">
      <uui-text-copy-button copy-from="inputToCopy" slot="append" compact>
        <uui-icon name="copy"></uui-icon>
      </uui-text-copy-button>
    </uui-input>
  `,
  parameters: {
    docs: {
      source: {
        code: `
<uui-input id="inputToCopy" placeholder="Type something">
  <uui-text-copy-button copy-from="inputToCopy" slot="append" compact>
    <uui-icon name="copy"></uui-icon>
  </uui-text-copy-button>
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
        code: `<uui-text-copy-button value="A long 3 second delay" animation-state-delay="3000"></uui-text-copy-button>`,
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
    <uui-text-copy-button .value=${args.value}>
      <uui-icon name="clipboard"></uui-icon> Copy to Clipboard
    </uui-text-copy-button>
  `,
  parameters: {
    docs: {
      source: {
        code: `
<uui-text-copy-button value="I have used a different icon">
  <uui-icon name="clipboard"></uui-icon> Copy to Clipboard
</uui-text-copy-button>`,
      },
    },
  },
};
