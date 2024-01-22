import { Story } from '@storybook/web-components';
import { html } from 'lit';
import { ArrayOfUmbracoWords } from '../../../storyhelpers/UmbracoWordGenerator';
import './index';
import readme from '../README.md?raw';

export default {
  id: 'uui-ref-node-form',
  title: 'Displays/References/Form',
  component: 'uui-ref-node-form',
  parameters: {
    readme: { markdown: readme },
  },
};

const Template: Story = props => html`
  <div style="max-width: 420px;">
    <uui-ref-node-form
      name="${props.name}"
      detail="${props.detail}"
      ?selectable=${props.selectable}
      ?error=${props.error}
      ?disabled=${props.disabled}>
      <uui-action-bar slot="actions">
        <uui-button label="Remove">Remove</uui-button>
      </uui-action-bar>
    </uui-ref-node-form>
  </div>
`;

export const AAAOverview = Template.bind({});
AAAOverview.args = {
  name: 'Newsletter Signup',
  detail: 'Accept and signup for newsletter',
};
AAAOverview.storyName = 'Overview';
AAAOverview.parameters = {
  docs: {
    source: {
      code: `
<uui-ref-node-form
  name="Newsletter Signup"
  alias="Signup for newsletter">
  <uui-action-bar slot="actions">
    <uui-button label="Remove">Remove</uui-button>
  </uui-action-bar>
</uui-ref-node-form>
    `,
    },
  },
};

export const CustomIcon: Story = () => html`
  <uui-icon-registry-essential>
    <div style="max-width: 420px;">
      <uui-ref-node-data-type
        name="Newsletter Signup"
        detail="Signup for newsletter">
        <uui-icon slot="icon" name="colorpicker"></uui-icon>
        <uui-action-bar slot="actions">
          <uui-button label="Remove">Remove</uui-button>
        </uui-action-bar>
      </uui-ref-node-data-type>
    </div>
  </uui-icon-registry-essential>
`;

CustomIcon.parameters = {
  docs: {
    source: {
      code: `
<uui-ref-node-data-type
  name="Newsletter Signup"
  detail="Signup for newsletter">
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
    <uui-ref-node-form
      standalone
      name="Newsletter Signup"
      detail="Signup for newsletter">
      <uui-action-bar slot="actions">
        <uui-button label="Remove">Remove</uui-button>
      </uui-action-bar>
    </uui-ref-node-form>
  </div>
`;

Standalone.parameters = {
  docs: {
    source: {
      code: `
<uui-ref-node-form
  standalone
  name="Newsletter Signup"
  detail="Signup for newsletter">
  <uui-action-bar slot="actions">
    <uui-button label="Remove">Remove</uui-button>
  </uui-action-bar>
</uui-ref-node-form>
    `,
    },
  },
};

export const Selectable: Story = props => html`
  <div style="max-width: 420px;">
    <uui-ref-node-form
      ?selectable="${props.selectable}"
      name="Newsletter Signup"
      detail="Signup for newsletter">
      <uui-action-bar slot="actions">
        <uui-button label="Remove">Remove</uui-button>
      </uui-action-bar>
    </uui-ref-node-form>
  </div>
`;

Selectable.args = {
  selectable: true,
};

Selectable.parameters = {
  docs: {
    source: {
      code: `
<uui-ref-node-form
  selectable
  name="Newsletter Signup"
  detail="Signup for newsletter">
  <uui-action-bar slot="actions">
    <uui-button label="Remove">Remove</uui-button>
  </uui-action-bar>
</uui-ref-node-form>
    `,
    },
  },
};

export const Disabled: Story = props => html`
  <div style="max-width: 420px;">
    <uui-ref-node-form
      ?disabled="${props.disabled}"
      name="Newsletter Signup"
      detail="Signup for newsletter">
      <uui-action-bar slot="actions">
        <uui-button label="Remove">Remove</uui-button>
      </uui-action-bar>
    </uui-ref-node-form>
  </div>
`;

Disabled.args = {
  disabled: true,
};

Disabled.parameters = {
  docs: {
    source: {
      code: `
<uui-ref-node-form
  disabled
  name="Newsletter Signup"
  alias="Signup for newsletter">
  <uui-action-bar slot="actions">
    <uui-button label="Remove">Remove</uui-button>
  </uui-action-bar>
</uui-ref-node-form>
    `,
    },
  },
};

const listOfNodeNames: string[] = ArrayOfUmbracoWords(10);
export const Listed: Story = () => html`
  <uui-ref-list style="max-width: 420px;">
    ${listOfNodeNames.map(
      name =>
        html`<uui-ref-node-form name=${name} detail="Description here...">
          <uui-action-bar slot="actions">
            <uui-button label="Remove">Remove</uui-button>
          </uui-action-bar>
        </uui-ref-node-form>`
    )}
  </uui-ref-list>
`;

Listed.parameters = {
  docs: {
    source: {
      code: `
<uui-ref-list>

  <uui-ref-node-form name="Form 1" detail="Description here...">
    <uui-action-bar slot="actions">
      <uui-button label="Remove">Remove</uui-button>
    </uui-action-bar>
  </uui-ref-node-form>

  <uui-ref-node-form name="Form 2" detail="Description here...">
    <uui-action-bar slot="actions">
      <uui-button label="Remove">Remove</uui-button>
    </uui-action-bar>
  </uui-ref-node-form>

  <uui-ref-node-form name="Form 3" detail="Description here...">
    <uui-action-bar slot="actions">
      <uui-button label="Remove">Remove</uui-button>
    </uui-action-bar>
  </uui-ref-node-form>

</uui-ref-list>
    `,
    },
  },
};
