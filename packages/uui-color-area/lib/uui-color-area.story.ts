import type { Meta, StoryFn } from '@storybook/web-components';
import { html } from 'lit';
import { withActions } from '@storybook/addon-actions/decorator';
import type { UUIColorAreaElement } from './uui-color-area.element';
import readme from '../README.md?raw';

import './uui-color-area.element';

const meta: Meta<UUIColorAreaElement> = {
  id: 'uui-color-area',
  title: 'Inputs/Color/Color Area',
  component: 'uui-color-area',
  args: {
    hue: 0,
    saturation: 0,
    lightness: 0,
    brightness: 0,
    alpha: 100,
    disabled: false,
    readonly: false,
    value: '',
  },
  argTypes: {
    value: { control: 'color' },
  },
  parameters: {
    readme: {
      markdown: readme,
    },
    docs: {
      source: {
        code: `<uui-color-area></uui-color-area>`,
      },
    },
    actions: {
      handles: ['change'],
    },
  },
  decorators: [withActions as any],
};

export default meta;

const Template: StoryFn<UUIColorAreaElement> = props => {
  return html`<uui-color-area
    .hue=${props.hue}
    .saturation=${props.saturation}
    .lightness=${props.lightness}
    .brightness=${props.brightness}
    .alpha=${props.alpha}
    .value=${props.value}
    .disabled=${props.disabled}
    .readonly=${props.readonly}>
  </uui-color-area>`;
};

export const AAAOverview = Template.bind({});
AAAOverview.storyName = 'Overview';

export const Disabled = Template.bind({});

Disabled.args = {
  disabled: true,
};

Disabled.parameters = {
  controls: { include: ['disbled'] },
  docs: {
    source: {
      code: `<uui-color-area disbled></uui-color-area>`,
    },
  },
};

export const Readonly = Template.bind({});

Readonly.args = {
  readonly: true,
};

Readonly.parameters = {
  controls: { include: ['readonly'] },
  docs: {
    source: {
      code: `<uui-color-area readonly></uui-color-area>`,
    },
  },
};
