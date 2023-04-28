import '@umbraco-ui/uui-color-swatches/lib';
import '@umbraco-ui/uui-color-swatch/lib';
import '@umbraco-ui/uui-color-slider/lib';
import '@umbraco-ui/uui-color-area/lib';
import '@umbraco-ui/uui-input/lib';
import '@umbraco-ui/uui-button/lib';
import '@umbraco-ui/uui-button-group/lib';
import '@umbraco-ui/uui-icon/lib';
import '@umbraco-ui/uui-popover/lib';

import '.';

import { Meta, StoryFn } from '@storybook/web-components';
import { html } from 'lit-html';
import { UUIColorPickerElement } from './uui-color-picker.element';

const defaultSwatches = [
  '#d0021b',
  '#f5a623',
  '#f8e71c',
  '#8b572a',
  '#7ed321',
  '#417505',
  '#bd10e0',
  '#9013fe',
  '#4a90e2',
  '#50e3c2',
  '#b8e986',
  '#000',
  '#444',
  '#888',
  '#ccc',
  '#fff',
];

export default {
  id: 'uui-color-picker',
  title: 'Inputs/Color/Color Picker',
  component: 'uui-color-picker',
  args: {
    inline: false,
    swatches: defaultSwatches,
    format: 'hex',
  },
  parameters: {
    actions: {
      handles: ['change'],
    },
  },
} as Meta<UUIColorPickerElement>;

const Template: StoryFn<UUIColorPickerElement> = props => html`
  <uui-color-picker
    .inline=${props.inline}
    .value=${props.value}
    .format=${props.format}
    .disabled=${props.disabled}
    .swatches=${props.swatches}
    .size=${props.size}
    .opacity=${props.opacity}
    .uppercase=${props.uppercase}
    .name=${props.name}
    .noFormatToggle=${props.noFormatToggle}>
  </uui-color-picker>
`;

export const AAAOverview = Template.bind({});
AAAOverview.storyName = 'Overview';

export const Inline = Template.bind({});
Inline.args = {
  inline: true,
};
Inline.parameters = {
  docs: {
    source: {
      code: `<uui-color-picker inline="true"></uui-color-picker>`,
    },
  },
};

export const WithOpacity = Template.bind({});
WithOpacity.args = {
  opacity: true,
};
WithOpacity.parameters = {
  docs: {
    source: {
      code: `<uui-color-picker opacity></uui-color-picker>`,
    },
  },
};

const formats = ['hex', 'rgb', 'hsl'];

export const Formats: StoryFn = () => html`
  <h4>Formats</h4>
  ${formats.map(
    format =>
      html`
        <h5>${format}</h5>
        <uui-color-picker .format=${format as any} value="blue">
        </uui-color-picker>
      `
  )}
`;
Formats.args = { format: 'hex' };
Formats.parameters = {
  docs: {
    source: {
      code: `
        <uui-color-picker format="hex"></uui-color-picker>`,
    },
  },
};
