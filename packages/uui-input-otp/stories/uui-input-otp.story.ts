import type { Meta, StoryObj } from '@storybook/web-components';

import '../lib/uui-input-otp.element';
import type { UUIInputOtpElement } from '../lib/uui-input-otp.element';
import readme from '../README.md?raw';

const meta: Meta<UUIInputOtpElement> = {
  id: 'uui-input-otp',
  title: 'Inputs/Input Otp',
  component: 'uui-input-otp',
  parameters: {
    readme: { markdown: readme },
    docs: {
      source: {
        code: `<uui-input-otp></uui-input-otp>`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<UUIInputOtpElement>;

export const Overview: Story = {};

export const IntegerOnly: Story = {
  args: {
    integerOnly: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<uui-input-otp integer-only></uui-input-otp>`,
      },
    },
  },
};

export const Masked: Story = {
  args: {
    masked: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<uui-input-otp masked></uui-input-otp>`,
      },
    },
  },
};

export const Required: Story = {
  args: {
    required: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<uui-input-otp required></uui-input-otp>`,
      },
    },
  },
};

export const WithError: Story = {
  args: {
    error: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<uui-input-otp error></uui-input-otp>`,
      },
    },
  },
};

export const AutocompleteOtp: Story = {
  name: 'Autocomplete OTP',
  args: {
    autocomplete: 'one-time-code',
  },
  parameters: {
    docs: {
      source: {
        code: `<uui-input-otp autocomplete="one-time-code"></uui-input-otp>`,
      },
    },
  },
};
