import { html } from 'lit-html';
import '@umbraco-ui/uui-card-content-node/lib/index';
import '@umbraco-ui/uui-icon-registry-essential/lib/index';
import { Story } from '@storybook/web-components';

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
};

export const AAAOverview: Story = props =>
  html`
    <div style="width: 300px">
      <uui-card-content-node
        name=${props.name}
        ?selectable=${props.selectable}
        ?selected=${props.selected}
        ?error=${props.error}
        ?disabled=${props.disabled}>
        <uui-tag size="s" slot="tag" look="positive">Published</uui-tag>
        <!-- TODO: we should make some kind of component for this data layout: -->
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
    </div>
  `;
AAAOverview.storyName = 'Overview';
AAAOverview.parameters = {
  docs: {
    source: {
      code: `<uui-card-content-node name="The card">
      <!-- Missing proper layout component for the details -->
    </uui-card-content-node>`,
    },
  },
};

export const CustomIcon: Story = props => html`
  <uui-icon-registry-essential>
    <div style="width: 300px">
      <uui-card-content-node
        name=${props.name}
        ?selectable=${props.selectable}
        ?selected=${props.selected}
        ?error=${props.error}
        ?disabled=${props.disabled}>
        <uui-icon slot="icon" name="picture"></uui-icon>
        <uui-tag size="s" slot="tag" look="positive">Published</uui-tag>
        <!-- TODO: we should make some kind of component for this data layout: -->
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
    </div>
  </uui-icon-registry-essential>
`;

CustomIcon.parameters = {
  docs: {
    source: {
      code: `
      <uui-card-content-node selectable name="The card">
        <uui-icon slot="icon" name="bug"></uui-icon>
      </uui-card-content-node>
    `,
    },
  },
};

export const Actions: Story = props => html`
  <div style="width: 300px">
    <uui-card-content-node
      name=${props.name}
      ?selectable=${props.selectable}
      ?selected=${props.selected}
      ?error=${props.error}
      ?disabled=${props.disabled}>
      <uui-action-bar slot="actions">
        <uui-button label="Remove">Remove</uui-button>
      </uui-action-bar>
      <!-- TODO: we should make some kind of component for this data layout: -->
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
    </uui-card-content-node>
  </div>
`;

Actions.parameters = {
  docs: {
    source: {
      code: `
      <uui-card-content-node selectable name="The card">
        <uui-action-bar slot="actions">
          <uui-button label="Remove">Remove</uui-button>
        </uui-action-bar>
      </uui-card-content-node>
    `,
    },
  },
};

export const Disabled: Story = props => html`
  <div style="width: 300px">
    <uui-card-content-node
      name=${props.name}
      ?selectable=${props.selectable}
      ?selected=${props.selected}
      ?error=${props.error}
      ?disabled=${props.disabled}>
      <uui-tag size="s" slot="tag" look="positive">Published</uui-tag>
      <!-- TODO: we should make some kind of component for this data layout: -->
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
    </uui-card-content-node>
  </div>
`;

Disabled.args = {
  disabled: true,
};
Disabled.parameters = {
  docs: {
    source: {
      code: `
      <uui-card-content-node disabled name="The card">
      </uui-card-content-node>
    `,
    },
  },
};
