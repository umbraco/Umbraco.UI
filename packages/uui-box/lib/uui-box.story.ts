import '.';

import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit';
import type { UUIBoxElement } from './uui-box.element';

import readme from '../README.md?raw';

export default {
  title: 'Layout/Box',
  component: 'uui-box',
  id: 'uui-box',
  args: {
    headline: 'Headline',
    headlineVariant: 'h5',
  },
  argTypes: {
    headlineVariant: {
      control: {
        type: 'select',
      },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
  },
  parameters: {
    readme: {
      markdown: readme,
    },
  },
} as Meta<UUIBoxElement>;

const Template: Story = props => {
  return html`
    <uui-box
      headline="${props.headline}"
      headline-variant="${props.headlineVariant}">
      <p>Some content of this box, appended in the default slot.</p>
      <p>The headline is currently rendered as a ${props.headlineVariant}.</p>
    </uui-box>
  `;
};

export const AAAOverview = Template.bind({});
AAAOverview.storyName = 'Overview';
AAAOverview.parameters = {
  docs: {
    source: {
      type: 'dynamic',
    },
  },
};

export const Slots: Story = () => html`
  <uui-box>
    <uui-button slot="headline" look="placeholder" style="font-weight:inherit;"
      >Headline slot</uui-button
    >
    <uui-button slot="header" look="placeholder">Header slot</uui-button>
    <uui-button slot="header-actions" look="placeholder"
      >Header actions slot</uui-button
    >
    <uui-button look="placeholder">Default slot</uui-button>
  </uui-box>
`;

export const WithHeadlineVariant = Template.bind({});
WithHeadlineVariant.args = { headline: 'H1 Headline', headerVariant: 'h1' };
WithHeadlineVariant.parameters = {
  docs: {
    source: {
      code: `
<uui-box headline="H1 Headline" headline-variant="h1">
  The headline is rendered as a H1.
</uui-box>`,
    },
  },
};
