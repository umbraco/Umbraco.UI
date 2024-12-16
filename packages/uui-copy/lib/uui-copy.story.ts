import type { Meta, StoryObj } from '@storybook/web-components';

import './uui-copy.element';
import type { UUICopyElement } from './uui-copy.element';
import readme from '../README.md?raw';

const meta: Meta<UUICopyElement> = {
  id: 'uui-copy',
  title: 'Copy',
  component: 'uui-copy',
  parameters: {
    readme: { markdown: readme },
    docs: {
      source: {
        code: `<uui-copy></uui-copy>`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<UUICopyElement>;

export const Overview: Story = {};
