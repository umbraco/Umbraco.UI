import { Story } from '@storybook/web-components';
import { html } from 'lit';
import { ArrayOfUmbracoWords } from '../../../storyhelpers/UmbracoWordGenerator';
import './index';
import readme from '../README.md?raw';

export default {
  id: 'uui-ref-node-user',
  title: 'Displays/References/User',
  component: 'uui-ref-node-user',
  parameters: {
    readme: { markdown: readme },
  },
};

const Template: Story = props => html`
  <div style="max-width: 420px;">
    <uui-ref-node-user
      name="${props.name}"
      group-name="${props.groupName}"
      detail="${props.detail}"
      ?selectable=${props.selectable}
      ?error=${props.error}
      ?disabled=${props.disabled}>
      <uui-action-bar slot="actions">
        <uui-button label="Remove">Remove</uui-button>
      </uui-action-bar>
    </uui-ref-node-user>
  </div>
`;

export const AAAOverview = Template.bind({});
AAAOverview.args = {
  name: 'Arnold Edits',
  groupName: 'Editor, Translator',
};
AAAOverview.storyName = 'Overview';
AAAOverview.parameters = {
  docs: {
    source: {
      code: `
<uui-ref-node-user
  name="Arnold Edits"
  group-name="Editor, Translator"
  <uui-action-bar slot="actions">
    <uui-button label="Remove">Remove</uui-button>
  </uui-action-bar>
</uui-ref-node-user>
    `,
    },
  },
};

export const CustomIcon: Story = () => html`
  <uui-icon-registry-essential>
    <div style="max-width: 420px;">
      <uui-ref-node-member name="Arnold Edits" group-name="Editor, Translator">
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
<uui-ref-node-data-type
  name="Arnold Edits"
  group-name="Editor, Translator">
  <uui-icon slot="icon" name="colorpicker"></uui-icon>
  <uui-action-bar slot="actions">
    <uui-button label="Remove">Remove</uui-button>
  </uui-action-bar>
</uui-ref-node-data-type>
    `,
    },
  },
};

export const Standalone: Story = () => html`
  <div style="max-width: 420px;">
    <uui-ref-node-user
      standalone
      name="Arnold Edits"
      group-name="Editor, Translator">
      <uui-action-bar slot="actions">
        <uui-button label="Remove">Remove</uui-button>
      </uui-action-bar>
    </uui-ref-node-user>
  </div>
`;

Standalone.parameters = {
  docs: {
    source: {
      code: `
<uui-ref-node-user
  standalone
  name="Arnold Edits"
  group-name="Editor, Translator"
  <uui-action-bar slot="actions">
    <uui-button label="Remove">Remove</uui-button>
  </uui-action-bar>
</uui-ref-node-user>
    `,
    },
  },
};

export const Selectable: Story = props => html`
  <div style="max-width: 420px;">
    <uui-ref-node-user
      ?selectable="${props.selectable}"
      name="Arnold Edits"
      group-name="Editor, Translator">
      <uui-action-bar slot="actions">
        <uui-button label="Remove">Remove</uui-button>
      </uui-action-bar>
    </uui-ref-node-user>
  </div>
`;

Selectable.args = {
  selectable: true,
};

Selectable.parameters = {
  docs: {
    source: {
      code: `
<uui-ref-node-user
  selectable
  name="Arnold Edits"
  group-name="Editor, Translator"
  <uui-action-bar slot="actions">
    <uui-button label="Remove">Remove</uui-button>
  </uui-action-bar>
</uui-ref-node-user>
    `,
    },
  },
};

export const Disabled: Story = props => html`
  <div style="max-width: 420px;">
    <uui-ref-node-user
      ?disabled="${props.disabled}"
      name="Arnold Edits"
      group-name="Editor, Translator">
      <uui-action-bar slot="actions">
        <uui-button label="Remove">Remove</uui-button>
      </uui-action-bar>
    </uui-ref-node-user>
  </div>
`;

Disabled.args = {
  disabled: true,
};

Disabled.parameters = {
  docs: {
    source: {
      code: `
<uui-ref-node-user
  disabled
  name="Arnold Edits"
  group-name="Editor, Translator"
  <uui-action-bar slot="actions">
    <uui-button label="Remove">Remove</uui-button>
  </uui-action-bar>
</uui-ref-node-user>
    `,
    },
  },
};

const listOfNodeNames: string[] = ArrayOfUmbracoWords(10);
export const Listed: Story = () => html`
  <uui-ref-list style="max-width: 420px;">
    ${listOfNodeNames.map(
      name =>
        html`<uui-ref-node-user name=${name} group-name="Group name">
          <uui-action-bar slot="actions">
            <uui-button label="Remove">Remove</uui-button>
          </uui-action-bar>
        </uui-ref-node-user>`,
    )}
  </uui-ref-list>
`;

Listed.parameters = {
  docs: {
    source: {
      code: `
<uui-ref-list>

  <uui-ref-node-user name="User 1" group-name="Group name">
    <uui-action-bar slot="actions">
      <uui-button label="Remove">Remove</uui-button>
    </uui-action-bar>
  </uui-ref-node-user>

  <uui-ref-node-user name="User 2" group-name="Group name">
    <uui-action-bar slot="actions">
      <uui-button label="Remove">Remove</uui-button>
    </uui-action-bar>
  </uui-ref-node-user>

  <uui-ref-node-user name="User 3" group-name="Group name">
    <uui-action-bar slot="actions">
      <uui-button label="Remove">Remove</uui-button>
    </uui-action-bar>
  </uui-ref-node-user>

</uui-ref-list>
    `,
    },
  },
};
