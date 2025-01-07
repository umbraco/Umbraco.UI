import type { Meta, StoryObj } from '@storybook/web-components';
import './uui-copy.element';
import type { UUICopyElement } from './uui-copy.element';
import readme from '../README.md?raw';
import { html } from 'lit';
import { UUICopyEvent } from './UUICopyEvent';
import '@umbraco-ui/uui-button/lib';
import '@umbraco-ui/uui-icon/lib';
import '@umbraco-ui/uui-loader-circle/lib';

const meta: Meta<UUICopyElement> = {
  id: 'uui-copy',
  title: 'Inputs/Copy',
  component: 'uui-copy',
  parameters: {
    readme: { markdown: readme },
  },
};

export default meta;
type Story = StoryObj<UUICopyElement>;

export const Overview: Story = {
  name: 'Simple Copy',
  args: {
    value: 'Hey stop copying me 🥸',
    disabled: false,
  },
  parameters: {
    docs: {
      source: {
        code: `<uui-copy value="Hey stop copying me 🥸"></uui-copy>`,
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
        code: `<uui-copy value="Hey stop copying me 🥸" label="This is my A11y label I want"></uui-copy>`,
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
        code: `<uui-copy value="You cannot copy this" disabled></uui-copy>`,
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
    <uui-copy .value=${args.value}> Custom Copy Text </uui-copy>
  `,
  parameters: {
    docs: {
      source: {
        code: `<uui-copy value="Custom slot content">Custom Copy Text</uui-copy>`,
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
    <uui-copy .value=${args.value} .color=${args.color} .look=${args.look}>
      <uui-icon name="copy"></uui-icon> Copy
    </uui-copy>
  `,
  parameters: {
    docs: {
      source: {
        code: `
<uui-copy value="I have the same look and color props as UUI-Button" color="positive" look="primary"></uui-copy>
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
    <uui-copy
      .value=${args.value}
      @copied=${(event: UUICopyEvent) => {
        alert(`Copied text: ${event.detail.text}`);
      }}></uui-copy>
  `,
  parameters: {
    docs: {
      source: {
        code: `
<uui-copy value="Copy this text"></uui-copy>
<script>
  document.querySelector('uui-copy').addEventListener('copied', (event) => {
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
    <uui-copy
      .value=${args.value}
      @copying=${(event: UUICopyEvent) => {
        event.detail.text += ' - Modified before copying';
      }}>
      <uui-icon name="copy"></uui-icon> Copy
    </uui-copy>
  `,
  parameters: {
    docs: {
      source: {
        code: `
<uui-copy value="Original text"></uui-copy>
<script>
  document.querySelector('uui-copy').addEventListener('copying', (event) => {
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
  render: args => html` <uui-copy .value=${args.value}></uui-copy> `,
  parameters: {
    docs: {
      source: {
        code: `
<uui-copy value=""></uui-copy>
        `,
      },
    },
  },
};

export const CopyFromInput: Story = {
  name: 'Copy From uui-input',
  render: () => html`
    <uui-input id="inputToCopy" placeholder="Type something">
      <uui-copy copy-from="inputToCopy" slot="append" compact>
        <uui-icon name="copy"></uui-icon>
      </uui-copy>
    </uui-input>
  `,
  parameters: {
    docs: {
      source: {
        code: `
<uui-input id="inputToCopy" placeholder="Type something">
  <uui-copy copy-from="inputToCopy" slot="append" compact>
    <uui-icon name="copy"></uui-icon>
  </uui-copy>
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
        code: `<uui-copy value="A long 3 second delay" animation-state-delay="3000"></uui-copy>`,
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
    <uui-copy .value=${args.value}>
      <uui-icon name="clipboard"></uui-icon> Copy to Clipboard
    </uui-copy>
  `,
  parameters: {
    docs: {
      source: {
        code: `
<uui-copy value="I have used a different icon">
  <uui-icon name="clipboard"></uui-icon> Copy to Clipboard
</uui-copy>`,
      },
    },
  },
};
