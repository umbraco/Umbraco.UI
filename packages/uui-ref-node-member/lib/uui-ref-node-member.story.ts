import { Story } from '@storybook/web-components';
import { html } from 'lit';
import { ArrayOfUmbracoWords } from '../../../storyhelpers/UmbracoWordGenerator';
import './index';
import readme from '../README.md?raw';

export default {
  id: 'uui-ref-node-member',
  title: 'Displays/References/Member',
  component: 'uui-ref-node-member',
  parameters: {
    readme: { markdown: readme },
  },
};

const Template: Story = props => html`
  <div style="max-width: 420px;">
    <uui-ref-node-member
      name="${props.name}"
      group-name="${props.groupName}"
      detail="${props.detail}"
      ?selectable=${props.selectable}
      ?error=${props.error}
      ?disabled=${props.disabled}>
      <uui-action-bar slot="actions">
        <uui-button label="Remove">Remove</uui-button>
      </uui-action-bar>
    </uui-ref-node-member>
  </div>
`;

export const AAAOverview = Template.bind({});
AAAOverview.args = {
  name: 'Arnold Vitz',
  groupName: 'Visitor, Registered-Member',
};
AAAOverview.storyName = 'Overview';
AAAOverview.parameters = {
  docs: {
    source: {
      code: `
<uui-ref-node-member
  name="Arnold Vitz"
  group-name="Visitor, Registered-Member">
  <uui-action-bar slot="actions">
    <uui-button label="Remove">Remove</uui-button>
  </uui-action-bar>
</uui-ref-node-member>
    `,
    },
  },
};

export const CustomIcon: Story = () => html`
  <uui-icon-registry-essential>
    <div style="max-width: 420px;">
      <uui-ref-node-member
        name="Arnold Vitz"
        group-name="Visitor, Registered-Member">
        <uui-icon slot="icon" name="colorpicker"></uui-icon>
        <uui-action-bar slot="actions">
          <uui-button label="Remove">Remove</uui-button>
        </uui-action-bar>
      </uui-ref-node-member>
    </div>
  </uui-icon-registry-essential>
`;

CustomIcon.parameters = {
  docs: {
    source: {
      code: `
<uui-ref-node-member
  name="Arnold Vitz"
  group-name="Visitor, Registered-Member">
  <uui-icon slot="icon" name="colorpicker"></uui-icon>
  <uui-action-bar slot="actions">
    <uui-button label="Remove">Remove</uui-button>
  </uui-action-bar>
</uui-ref-node-member>
    `,
    },
  },
};

export const Standalone: Story = () => html`
  <div style="max-width: 420px;">
    <uui-ref-node-member
      standalone
      name="Arnold Vitz"
      group-name="Visitor, Registered-Member">
      <uui-action-bar slot="actions">
        <uui-button label="Remove">Remove</uui-button>
      </uui-action-bar>
    </uui-ref-node-member>
  </div>
`;

Standalone.parameters = {
  docs: {
    source: {
      code: `
<uui-ref-node-member
  standalone
  name="Arnold Vitz"
  group-name="Visitor, Registered-Member">
  <uui-action-bar slot="actions">
    <uui-button label="Remove">Remove</uui-button>
  </uui-action-bar>
</uui-ref-node-member>
    `,
    },
  },
};

export const Selectable: Story = props => html`
  <div style="max-width: 420px;">
    <uui-ref-node-member
      ?selectable="${props.selectable}"
      name="Arnold Vitz"
      group-name="Visitor, Registered-Member">
      <uui-action-bar slot="actions">
        <uui-button label="Remove">Remove</uui-button>
      </uui-action-bar>
    </uui-ref-node-member>
  </div>
`;

Selectable.args = {
  selectable: true,
};

Selectable.parameters = {
  docs: {
    source: {
      code: `
<uui-ref-node-member
  selectable
  name="Arnold Vitz"
  group-name="Visitor, Registered-Member">
  <uui-action-bar slot="actions">
    <uui-button label="Remove">Remove</uui-button>
  </uui-action-bar>
</uui-ref-node-member>
    `,
    },
  },
};

export const Disabled: Story = props => html`
  <div style="max-width: 420px;">
    <uui-ref-node-member
      ?disabled="${props.disabled}"
      name="Arnold Vitz"
      group-name="Visitor, Registered-Member">
      <uui-action-bar slot="actions">
        <uui-button label="Remove">Remove</uui-button>
      </uui-action-bar>
    </uui-ref-node-member>
  </div>
`;

Disabled.args = {
  disabled: true,
};

Disabled.parameters = {
  docs: {
    source: {
      code: `
<uui-ref-node-member
  disabled
  name="TextField"
  alias="Umbraco.TextField">
  <uui-action-bar slot="actions">
    <uui-button label="Remove">Remove</uui-button>
  </uui-action-bar>
</uui-ref-node-member>
    `,
    },
  },
};

const listOfNodeNames: string[] = ArrayOfUmbracoWords(10);
export const Listed: Story = () => html`
  <uui-ref-list style="max-width: 420px;">
    ${listOfNodeNames.map(
      name =>
        html`<uui-ref-node-member name=${name} group-name="Group name">
          <uui-action-bar slot="actions">
            <uui-button label="Remove">Remove</uui-button>
          </uui-action-bar>
        </uui-ref-node-member>`,
    )}
  </uui-ref-list>
`;

Listed.parameters = {
  docs: {
    source: {
      code: `
<uui-ref-list>

  <uui-ref-node-member name="Member 1" group-name="Group name">
    <uui-action-bar slot="actions">
      <uui-button label="Remove">Remove</uui-button>
    </uui-action-bar>
  </uui-ref-node-member>

  <uui-ref-node-member name="Member 2" group-name="Group name">
    <uui-action-bar slot="actions">
      <uui-button label="Remove">Remove</uui-button>
    </uui-action-bar>
  </uui-ref-node-member>

  <uui-ref-node-member name="Member 3" group-name="Group name">
    <uui-action-bar slot="actions">
      <uui-button label="Remove">Remove</uui-button>
    </uui-action-bar>
  </uui-ref-node-member>

</uui-ref-list>
    `,
    },
  },
};
