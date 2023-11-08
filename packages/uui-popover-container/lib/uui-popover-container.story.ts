import type { Meta, StoryObj } from '@storybook/web-components';

import './uui-popover-container.element';
import '../../uui-button/lib/index';
import '../../uui-box/lib/index';
import type { UUIPopoverContainerElement } from './uui-popover-container.element';
import readme from '../README.md?raw';
import { html } from 'lit';

const meta: Meta<UUIPopoverContainerElement> = {
  id: 'uui-popover-container',
  title: 'Displays/Popover Container',
  component: 'uui-popover-container',
  parameters: {
    readme: { markdown: readme },
  },
};

export default meta;
type Story = StoryObj<UUIPopoverContainerElement>;

export const Overview: Story = {
  play: async ({ canvasElement }) => {
    const button = canvasElement.querySelector('#popover-button');
    button?.scrollIntoView({
      behavior: 'instant',
      block: 'center',
      inline: 'center',
    });
  },
  args: {
    placement: 'bottom-start',
    margin: 0,
  },
  argTypes: {
    open: {
      control: false,
    },
    placement: {
      options: [
        'auto',
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'right',
        'right-start',
        'right-end',
        'left',
        'left-start',
        'left-end',
      ],
    },
  },
  render: args => html`
    <uui-button
      id="popover-button"
      popovertarget="popover-container"
      look="primary"
      style="margin: 200%; text-wrap: nowrap;"
      label="Open popover">
      Open popover
    </uui-button>
    <uui-popover-container
      id="popover-container"
      popover
      placement=${args.placement}
      margin=${args.margin}>
      <div
        style="background-color: var(--uui-color-surface); max-width: 400px; box-shadow: var(--uui-shadow-depth-4); padding: var(--uui-size-space-6); border-radius: var(--uui-border-radius);">
        <h3>This is my popover</h3>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem,
          est. Eius dolorem dolorum praesentium ut impedit recusandae at maiores
          adipisci nulla atque, est consectetur modi porro blanditiis expedita
          rem dolore.
        </p>
        <uui-button
          id="popover-button2"
          popovertarget="popover-container2"
          look="secondary"
          label="Open another popover">
          Open another popover
        </uui-button>
        <uui-popover-container
          id="popover-container2"
          popover
          placement=${args.placement}
          margin=${args.margin}>
          <div
            style="background-color: var(--uui-color-surface); max-width: 400px; box-shadow: var(--uui-shadow-depth-4); padding: var(--uui-size-space-6); border-radius: var(--uui-border-radius);">
            <h3>This is my second popover</h3>
            <p style="margin-bottom: 0;">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Voluptatem, est. Eius dolorem dolorum praesentium ut impedit
              recusandae at maiores adipisci nulla atque, est consectetur modi
              porro blanditiis expedita rem dolore.
            </p>
          </div>
        </uui-popover-container>
      </div>
    </uui-popover-container>
  `,
};

export const Tooltip: Story = {
  play: ({ canvasElement }) => {
    const tooltipElement = canvasElement.querySelector('#tooltip-toggle');
    const popover = canvasElement.querySelector(
      '#tooltip-popover'
    ) as UUIPopoverContainerElement;

    tooltipElement?.addEventListener('mouseenter', () => popover.showPopover());
    tooltipElement?.addEventListener('mouseleave', () => popover.hidePopover());
  },
  args: {
    placement: 'bottom-start',
    margin: 0,
  },
  argTypes: {
    open: {
      control: false,
    },
    placement: {
      options: [
        'auto',
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'right',
        'right-start',
        'right-end',
        'left',
        'left-start',
        'left-end',
      ],
    },
  },
  render: args => html`
    Sometimes words such as
    <b id="tooltip-toggle" popovertarget="tooltip-popover">petrichor</b> needs
    some more explanation
    <uui-popover-container
      id="tooltip-popover"
      popover
      placement=${args.placement}
      margin=${args.margin}>
      <div
        style="background-color: var(--uui-color-surface); max-width: 150px; box-shadow: var(--uui-shadow-depth-4); padding: var(--uui-size-space-4); border-radius: var(--uui-border-radius); font-size: 0.9rem;">
        A pleasant smell that frequently accompanies the first rain after a long
        period of warm, dry weather.
      </div>
    </uui-popover-container>
  `,
};
