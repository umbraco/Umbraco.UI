import type { Meta, StoryObj } from '@storybook/web-components';

import './uui-relative-time.element';
import type { UUIRelativeTimeElement } from './uui-relative-time.element';
import readme from '../README.md?raw';

const meta: Meta<UUIRelativeTimeElement> = {
  id: 'uui-relative-time',
  title: 'Relative Time',
  component: 'uui-relative-time',
  parameters: {
    readme: { markdown: readme },
    docs: {
      source: {
        code: `<uui-relative-time></uui-relative-time>`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<UUIRelativeTimeElement>;

export const Overview: Story = {};
