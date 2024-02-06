import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit';
import readme from '../README.md?raw';

export default {
  title: 'Displays/Badge',
  component: 'uui-badge',
  id: 'uui-badge',
  args: {
    color: 'default',
    look: 'primary',
    slot: '1',
    attention: false,
  },
  argTypes: {
    look: {
      control: {
        type: 'select',
      },
      options: ['default', 'primary', 'secondary', 'outline', 'placeholder'],
    },
    color: {
      control: {
        type: 'select',
      },
      options: ['default', 'positive', 'warning', 'danger'],
    },
    slot: {
      control: { type: 'text' },
    },
  },
  parameters: {
    readme: {
      markdown: readme,
    },
  },
};

const Template: Story = props =>
  html` <uui-icon-registry-essential>
    <div
      style="position:relative; width:80px; height:80px; border: 1px dashed rgba(0,0,0,0.1)">
      <uui-badge
        .color=${props.color}
        .look=${props.look}
        ?attention=${props.attention}
        >${props.slot}</uui-badge
      >
    </div>
  </uui-icon-registry-essential>`;

export const AAAOverview = Template.bind({});
AAAOverview.args = {
  color: 'default',
  slot: '1',
  attention: false,
};
AAAOverview.storyName = 'Overview';
AAAOverview.parameters = {
  docs: {
    source: {
      code: `
<div style="position:relative; width:80px; height:80px; border: 1px dashed rgba(0,0,0,0.1)">
  <uui-badge>1</uui-badge>
</div>
    `,
    },
  },
};

export const WithAttention = Template.bind({});
WithAttention.args = {
  color: 'warning',
  slot: '!',
  attention: true,
};
WithAttention.parameters = {
  docs: {
    source: {
      code: `
<div style="position:relative; width:80px; height:80px; border: 1px dashed rgba(0,0,0,0.1)">
  <uui-badge color="danger" attention>!</uui-badge>
</div>
    `,
    },
  },
};

export const WithText = Template.bind({});
WithText.args = {
  color: 'positive',
  slot: 'Published',
};
WithText.parameters = {
  docs: {
    source: {
      code: `
<div style="position:relative; width:80px; height:80px; border: 1px dashed rgba(0,0,0,0.1)">
  <uui-badge color="positive">Published</uui-badge>
</div>
    `,
    },
  },
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  color: 'positive',
  slot: html`<uui-icon name="favorite"></uui-icon>`,
};
WithIcon.parameters = {
  controls: {
    exclude: ['slot'],
  },
  docs: {
    source: {
      code: `
<div style="position:relative; width:80px; height:80px; border: 1px dashed rgba(0,0,0,0.1)">
  <uui-icon-registry-essential>
    <uui-badge ="positive">
      <uui-icon name="favorite"></uui-icon>
    </uui-badge>
  </uui-icon-registry-essential>
</div>
    `,
    },
  },
};

export const OnButton: Story = props =>
  html` <uui-button look="outline">
    Button label
    <uui-badge .color=${props.color}>${props.slot}</uui-badge>
  </uui-button>`;
OnButton.args = {
  color: 'danger',
  slot: '!',
};
OnButton.parameters = {
  docs: {
    source: {
      code: `
<uui-button look="outline">
  <uui-badge ="danger">!</uui-badge>
  Button label
</uui-button>
    `,
    },
  },
};

const looks = ['default', 'primary', 'secondary', 'outline', 'placeholder'];
const colors = ['default', 'positive', 'warning', 'danger'];

function uppercaseFirstLetter(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export const LooksAndColors: Story = () => html`
  ${colors.map(
    color => html`
      <h5>${uppercaseFirstLetter(color)}</h5>
      <div style="margin-bottom: 32px; display: flex; gap: 16px;">
        ${looks.map(
          look => html`
            <div
              style="position:relative; width:100px; height:80px; border: 1px dashed rgba(0,0,0,0.1); margin-top: 16px">
              <uui-badge
                .look=${look as any}
                .color=${color as any}
                style="margin-right:12px;"
                >${uppercaseFirstLetter(look)}</uui-badge
              >
            </div>
          `,
        )}
      </div>
    `,
  )}
`;
