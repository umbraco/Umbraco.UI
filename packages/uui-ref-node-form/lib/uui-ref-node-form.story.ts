import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import { ArrayOfUmbracoWords } from '../../../src/helper/UmbracoWordGenerator';
import './index';

export default {
  id: 'uui-ref-node-form',
  title: 'Displays/References/Form',
  component: 'uui-ref-node-form',
};

const Template: Story = props => html`
  <div style="max-width: 420px;">
    <uui-ref-node-form
      name="${props.name}"
      icon="${props.icon}"
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
  icon: 'bug',
  detail: 'Accept and signup for newsletter',
};
AAAOverview.storyName = 'Overview';
AAAOverview.parameters = {
  docs: {
    source: {
      code: `
<uui-ref-node-form
  name="Newsletter Signup"
  icon="bug"
  alias="Signup for newsletter">
  <uui-action-bar slot="actions">
    <uui-button label="Remove">Remove</uui-button>
  </uui-action-bar>
</uui-ref-node-form>
    `,
    },
  },
};

export const Border: Story = () => html`
  <div style="max-width: 420px;">
    <uui-ref-node-form
      border
      name="Newsletter Signup"
      icon="bug"
      detail="Signup for newsletter">
      <uui-action-bar slot="actions">
        <uui-button label="Remove">Remove</uui-button>
      </uui-action-bar>
    </uui-ref-node-form>
  </div>
`;

Border.parameters = {
  docs: {
    source: {
      code: `
<uui-ref-node-form
  border
  name="Newsletter Signup"
  icon="bug"
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
      icon="bug"
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
  icon="bug"
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
    <uui-ref-node-document-type
      ?disabled="${props.disabled}"
      name="Newsletter Signup"
      icon="bug"
      detail="Signup for newsletter">
      <uui-action-bar slot="actions">
        <uui-button label="Remove">Remove</uui-button>
      </uui-action-bar>
    </uui-ref-node-document-type>
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
  icon="bug"
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
      name => html`<uui-ref-node-form
        name=${name}
        icon="bug"
        detail="Description here...">
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
  
  <uui-ref-node-form name="Form 1" icon="bug" detail="Description here...">
    <uui-action-bar slot="actions">
      <uui-button label="Remove">Remove</uui-button>
    </uui-action-bar>
  </uui-ref-node-form>

  <uui-ref-node-form name="Form 2" icon="bug" detail="Description here...">
    <uui-action-bar slot="actions">
      <uui-button label="Remove">Remove</uui-button>
    </uui-action-bar>
  </uui-ref-node-form>

  <uui-ref-node-form name="Form 3" icon="bug" detail="Description here...">
    <uui-action-bar slot="actions">
      <uui-button label="Remove">Remove</uui-button>
    </uui-action-bar>
  </uui-ref-node-form>

</uui-ref-list>
    `,
    },
  },
};
