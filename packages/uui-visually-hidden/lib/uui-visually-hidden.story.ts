import type { Meta, StoryObj } from '@storybook/web-components';

import './uui-visually-hidden.element';
import type { UUIVisuallyHiddenElement } from './uui-visually-hidden.element';
import readme from '../README.md?raw';

const meta: Meta<UUIVisuallyHiddenElement> = {
  id: 'uui-visually-hidden',
  title: 'Displays/Visually Hidden',
  component: 'uui-visually-hidden',
  parameters: {
    readme: { markdown: readme },
    docs: {
      source: {
        code: `<uui-visually-hidden></uui-visually-hidden>`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<UUIVisuallyHiddenElement>;

export const Overview: Story = {};

export const SkipNavigation: Story = {
  args: {},
  parameters: {
    docs: {
      source: {
        code: `<uui-visually-hidden>
  <a href="#">Skip to main content</a>
</uui-visually-hidden>`,
      },
    },
  },
};
