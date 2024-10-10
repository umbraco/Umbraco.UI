import '.';
import '@umbraco-ui/uui-icon-registry-essential/lib';

import { Story } from '@storybook/web-components';
import { html } from 'lit';
import readme from '../README.md?raw';

export default {
  title: 'Displays/Cards/Content Node',
  component: 'uui-card-content-node',
  id: 'uui-card-content-node',
  args: {
    name: 'The card',
    selectable: false,
    selected: false,
    error: false,
    disabled: false,
  },
  decorators: [
    (Story: any) => html`<div style="width: 300px;">${Story()}</div>`,
  ],
  parameters: {
    readme: {
      markdown: readme,
    },
  },
};

/* TODO: we should make some kind of component for this data layout */
const cardContent = html`
  <ul style="list-style: none; padding-inline-start: 0px; margin: 0;">
    <li><span style="font-weight: 700">Created:</span> Yesterday</li>
    <li>
      <span style="font-weight: 700">Last Edited: </span> 2021-03-15 09:29
    </li>
    <li><span style="font-weight: 700">Some property:</span> Some value</li>
    <li>
      <span style="font-weight: 700">Another property:</span> Another value
    </li>
  </ul>
`;

export const AAAOverview: Story = props => html`
  <uui-card-content-node
    name=${props.name}
    ?selectable=${props.selectable}
    ?selected=${props.selected}
    ?error=${props.error}
    ?disabled=${props.disabled}
    href=${props.href}
    target=${props.target}
    rel=${props.rel}>
    <uui-tag size="s" slot="tag" color="positive">Published</uui-tag>
    ${cardContent}
  </uui-card-content-node>
`;
AAAOverview.storyName = 'Overview';
AAAOverview.parameters = {
  docs: {
    source: {
      code: `
<uui-card-content-node name="The card">
  <uui-tag size="s" slot="tag" color="positive">Published</uui-tag>
  <ul style="list-style: none; padding-inline-start: 0px; margin: 0;">
    <li><span style="font-weight: 700">Created:</span> Yesterday</li>
    <li>
      <span style="font-weight: 700">Last Edited: </span> 2021-03-15 09:29
    </li>
    <li>
      <span style="font-weight: 700">Some property:</span> Some value
    </li>
    <li>
      <span style="font-weight: 700">Another property:</span> Another
      value
    </li>
  </ul>
</uui-card-content-node>
    `,
    },
  },
};

export const CustomIcon: Story = () => html`
  <uui-icon-registry-essential>
    <uui-card-content-node name="The card">
      <uui-icon slot="icon" name="wand"></uui-icon>
      ${cardContent}
    </uui-card-content-node>
  </uui-icon-registry-essential>
`;

CustomIcon.parameters = {
  controls: { include: [''] },
  docs: {
    source: {
      code: `
<uui-icon-registry-essential>
  <uui-card-content-node name="The card">
    <uui-icon slot="icon" name="wand"></uui-icon>

    <!-- Content -->
  </uui-card-content-node>
<uui-icon-registry-essential>
`,
    },
  },
};

export const Actions: Story = () => html`
  <uui-card-content-node name="The card">
    <uui-action-bar slot="actions">
      <uui-button label="Remove">Remove</uui-button>
    </uui-action-bar>
    ${cardContent}
  </uui-card-content-node>
`;

Actions.parameters = {
  controls: { include: [''] },
  docs: {
    source: {
      code: `
<uui-card-content-node name="The card">
  <uui-action-bar slot="actions">
    <uui-button label="Remove">Remove</uui-button>
  </uui-action-bar>

  <!-- Content -->
</uui-card-content-node>
    `,
    },
  },
};

export const Disabled: Story = props => html`
  <uui-card-content-node ?disabled=${props.disabled} name="The card">
    ${cardContent}
  </uui-card-content-node>
`;

Disabled.args = {
  disabled: true,
};
Disabled.parameters = {
  controls: { include: ['disabled'] },
  docs: {
    source: {
      code: `
<uui-card-content-node name="The card" disabled>
  <!-- Content -->
</uui-card-content-node>
    `,
    },
  },
};

export const Error: Story = props => html`
  <uui-card-content-node ?error=${props.error} name="The card">
    ${cardContent}
  </uui-card-content-node>
`;

Error.args = {
  error: true,
};
Error.parameters = {
  controls: { include: ['error'] },
  docs: {
    source: {
      code: `
<uui-card-content-node name="The card" error>
  <!-- Content -->
</uui-card-content-node>
    `,
    },
  },
};

export const Selectable: Story = props => html`
  <uui-card-content-node ?selectable=${props.selectable} name="The card">
    ${cardContent}
  </uui-card-content-node>
`;

Selectable.args = {
  selectable: true,
};
Selectable.parameters = {
  controls: { include: ['selectable'] },
  docs: {
    source: {
      code: `
<uui-card-content-node name="The card" selectable>
  <!-- Content -->
</uui-card-content-node>
    `,
    },
  },
};

export const Readonly: Story = props => html`
  <uui-card-content-node ?readonly=${props.readonly} name="The card">
    ${cardContent}
  </uui-card-content-node>
`;

Readonly.args = {
  readonly: true,
};
Readonly.parameters = {
  controls: { include: ['readonly'] },
  docs: {
    source: {
      code: `
<uui-card-content-node name="The card" readonly>
  <!-- Content -->
</uui-card-content-node>
    `,
    },
  },
};
