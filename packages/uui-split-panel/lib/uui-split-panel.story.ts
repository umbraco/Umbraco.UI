import type { Meta, StoryObj } from '@storybook/web-components';

import './uui-split-panel.element';
import type { UUISplitPanelElement } from './uui-split-panel.element';
import readme from '../README.md?raw';

const meta: Meta<UUISplitPanelElement> = {
  id: 'uui-split-panel',
  title: 'Split Panel',
  component: 'uui-split-panel',
  parameters: {
    readme: { markdown: readme },
    docs: {
      source: {
        code: `<uui-split-panel></uui-split-panel>`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<UUISplitPanelElement>;

export const Overview: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<uui-split-panel disabled style="height: 400px;">
        <div
          slot="start"
          style="height: 200px; background: var(--uui-color-background); display: flex; align-items: center; justify-content: center; overflow: hidden;"
        >
          Start
        </div>
        <div
          slot="end"
          style="height: 200px; background: var(--uui-color-background); display: flex; align-items: center; justify-content: center; overflow: hidden;"
        >
          End
        </div>
      </uui-split-panel>`,
      },
    },
  },
};

export const Vertical: Story = {
  args: {
    vertical: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<uui-split-panel vertical style="height: 400px;">
        <div
          slot="start"
          style="height: 200px; background: var(--uui-color-background); display: flex; align-items: center; justify-content: center; overflow: hidden;"
        >
          Start
        </div>
        <div
          slot="end"
          style="height: 200px; background: var(--uui-color-background); display: flex; align-items: center; justify-content: center; overflow: hidden;"
        >
          End
        </div>
      </uui-split-panel>`,
      },
    },
  },
};

export const Snapping: Story = {
  args: {
    snap: "100px 50%",
  },
  parameters: {
    docs: {
      source: {
        code: `<div class="split-panel-snapping">
        <uui-split-panel snap="100px 50%" style="height: 400px;">
        <div
          slot="start"
          style="height: 200px; background: var(--uui-color-background); display: flex; align-items: center; justify-content: center; overflow: hidden;"
        >
          Start
        </div>
        <div
          slot="end"
          style="height: 200px; background: var(--uui-color-background); display: flex; align-items: center; justify-content: center; overflow: hidden;"
        >
          End
        </div>
      </uui-split-panel>
      <div class="split-panel-snapping-dots"></div>
      </div>
      <style>
  .split-panel-snapping {
    position: relative;
  }

  .split-panel-snapping-dots::before,
  .split-panel-snapping-dots::after {
    content: '';
    position: absolute;
    bottom: -12px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--sl-color-neutral-400);
    transform: translateX(-3px);
  }

  .split-panel-snapping-dots::before {
    left: 100px;
  }

  .split-panel-snapping-dots::after {
    left: 50%;
  }
</style>`,
      },
    },
  },
};