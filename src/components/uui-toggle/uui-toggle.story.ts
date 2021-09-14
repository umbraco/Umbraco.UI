import { Story } from '@storybook/web-components';
import { html } from 'lit';
import { spreadProps } from '../../storybook/helper/SpreadPropsDirective';

import './index';

export default {
  title: 'Inputs/Toggle',
  component: 'uui-toggle',
  argTypes: {
    labelPosition: { options: ['left', 'right', 'top', 'bottom'] },
  },
};

export const Overview: Story = props =>
  html` <uui-toggle ${spreadProps(props)}></uui-toggle> `;
Overview.storyName = 'Overview';
Overview.args = { label: 'I am a label' };

export const Error: Story = () =>
  html`
    <uui-toggle error .label=${'Toggle label'} value="bike"></uui-toggle><br />
    <uui-toggle error label="Toggle me" value="bike" checked></uui-toggle
    ><br /><uui-toggle disabled error label="Disabled"></uui-toggle><br />
    <uui-toggle disabled checked error label="Disabled"></uui-toggle>
  `;

export const Preselected: Story = () =>
  html` <uui-toggle label="Toggle me" value="bike" checked></uui-toggle>`;

export const WithSlottedLabel: Story = () =>
  html`
    <uui-toggle label="Toggle label" value="bike"
      >Using <b>Slot</b> for displayed label</uui-toggle
    >
  `;

export const LabelPosition: Story = () => html`
  <div style="display: flex; justify-content: space-evenly;">
    <uui-toggle label="Left" label-position="left"></uui-toggle>
    <uui-toggle label="Top" label-position="top"></uui-toggle>
    <uui-toggle label="Right" label-position="right"></uui-toggle>
    <uui-toggle label="Bottom" label-position="bottom"></uui-toggle>
  </div>
`;

export const NoLabel: Story = () =>
  html`<uui-toggle
      hide-label
      label="Toggle label"
      name="Hidden Label"
    ></uui-toggle
    ><uui-toggle
      hide-label
      label="Toggle label"
      name="Hidden Label 2"
    ></uui-toggle>
    <p>
      label is set via label attribute. Hide it by adding hide-label bool
      attribute
    </p>`;

export const Disabled: Story = () => html`
  <uui-toggle disabled label="Disabled"></uui-toggle>
  <uui-toggle disabled label="Disabled &amp; checked" checked></uui-toggle>
`;

export const InAForm: Story = () => html`
  <form action="">
    <uui-toggle label="Lol"></uui-toggle>
  </form>
`;
