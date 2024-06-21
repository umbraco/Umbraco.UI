import type { Meta, StoryObj } from '@storybook/web-components';

import './uui-input-otp.element';
import type { UUIInputOtpElement } from './uui-input-otp.element';
import readme from '../README.md?raw';

const meta: Meta<UUIInputOtpElement> = {
  id: 'uui-input-otp',
  title: 'Input Otp',
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

export const Error: Story = {
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
