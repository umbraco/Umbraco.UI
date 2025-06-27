import type { StoryFn, Meta, StoryObj } from '@storybook/web-components-vite';
import type { UUIColorAreaElement } from './uui-color-area.element';
import '.';
import readme from '../README.md?raw';
import { html } from 'lit';
import { spread } from '../../../storyhelpers';

const meta: Meta = {
  id: 'uui-color-area',
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
  title: 'Inputs/Color/Color Area',
  argTypes: {
    value: { control: 'color' },
  },
  render: args => html`<uui-color-area ${spread(args)}></uui-color-area>`,
  parameters: {
    readme: {
      markdown: readme,
    },
  },
};

export default meta;
type Story = StoryObj;

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
  controls: { include: ['disabled'] },
  docs: {
    source: {
      code: `<uui-color-area disabled></uui-color-area>`,
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
export const Default: Story = {};
