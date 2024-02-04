import { Story } from '@storybook/web-components';
import { html } from 'lit';
import { ArrayOfUmbracoWords } from '../../../storyhelpers/UmbracoWordGenerator';
import './index';
import readme from '../README.md?raw';

export default {
  id: 'uui-ref-node-document-type',
  title: 'Displays/References/Document Type',
  component: 'uui-ref-node-document-type',
  parameters: {
    readme: { markdown: readme },
  },
};

const Template: Story = props => html`
  <div style="max-width: 420px;">
    <uui-ref-node-document-type
      name="${props.name}"
      alias="${props.alias}"
      detail="${props.detail}"
      ?selectable=${props.selectable}
      ?error=${props.error}
      ?disabled=${props.disabled}>
      <uui-action-bar slot="actions">
        <uui-button label="Remove">Remove</uui-button>
      </uui-action-bar>
    </uui-ref-node-document-type>
  </div>
`;

export const AAAOverview = Template.bind({});
AAAOverview.args = {
  name: 'Product Page',
  alias: 'productPage',
};
AAAOverview.storyName = 'Overview';
AAAOverview.parameters = {
  docs: {
    source: {
      code: `
<uui-ref-node-document-type
  name="Product Page"
  alias="productPage">
  <uui-action-bar slot="actions">
    <uui-button label="Remove">Remove</uui-button>
  </uui-action-bar>
</uui-ref-node-document-type>
    `,
    },
  },
};

export const CustomIcon: Story = () => html`
  <uui-icon-registry-essential>
    <div style="max-width: 420px;">
      <uui-ref-node-data-type name="Product Page" alias="productPage">
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
  name="Product Page"
  alias="productPage">
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
    <uui-ref-node-document-type
      standalone
      name="Product Page"
      alias="productPage">
      <uui-action-bar slot="actions">
        <uui-button label="Remove">Remove</uui-button>
      </uui-action-bar>
    </uui-ref-node-document-type>
  </div>
`;

Standalone.parameters = {
  docs: {
    source: {
      code: `
<uui-ref-node-document-type
  standalone
  name="Product Page"
  alias="productPage">
  <uui-action-bar slot="actions">
    <uui-button label="Remove">Remove</uui-button>
  </uui-action-bar>
</uui-ref-node-document-type>
    `,
    },
  },
};

export const Selectable: Story = props => html`
  <div style="max-width: 420px;">
    <uui-ref-node-document-type
      ?selectable="${props.selectable}"
      name="Product Page"
      alias="productPage">
      <uui-action-bar slot="actions">
        <uui-button label="Remove">Remove</uui-button>
      </uui-action-bar>
    </uui-ref-node-document-type>
  </div>
`;

Selectable.args = {
  selectable: true,
};

Selectable.parameters = {
  docs: {
    source: {
      code: `
<uui-ref-node-document-type
  selectable
  name="Product Page"
  alias="productPage">
  <uui-action-bar slot="actions">
    <uui-button label="Remove">Remove</uui-button>
  </uui-action-bar>
</uui-ref-node-document-type>
    `,
    },
  },
};

export const Disabled: Story = props => html`
  <div style="max-width: 420px;">
    <uui-ref-node-document-type
      ?disabled="${props.disabled}"
      name="Product Page"
      alias="productPage">
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
<uui-ref-node-document-type
  disabled
  name="Product Page"
  alias="productPage">
  <uui-action-bar slot="actions">
    <uui-button label="Remove">Remove</uui-button>
  </uui-action-bar>
</uui-ref-node-document-type>
    `,
    },
  },
};

const listOfNodeNames: string[] = ArrayOfUmbracoWords(10);
export const Listed: Story = () => html`
  <uui-ref-list style="max-width: 420px;">
    ${listOfNodeNames.map(
      name =>
        html`<uui-ref-node-document-type name=${name} alias="alias">
          <uui-action-bar slot="actions">
            <uui-button label="Remove">Remove</uui-button>
          </uui-action-bar>
        </uui-ref-node-document-type>`
    )}
  </uui-ref-list>
`;

Listed.parameters = {
  docs: {
    source: {
      code: `
<uui-ref-list>

  <uui-ref-node-document-type name="Document Type 1" alias="alias">
    <uui-action-bar slot="actions">
      <uui-button label="Remove">Remove</uui-button>
    </uui-action-bar>
  </uui-ref-node-document-type>

  <uui-ref-node-document-type name="Document Type 2" alias="alias">
    <uui-action-bar slot="actions">
      <uui-button label="Remove">Remove</uui-button>
    </uui-action-bar>
  </uui-ref-node-document-type>

  <uui-ref-node-document-type name="Document Type 3" alias="alias">
    <uui-action-bar slot="actions">
      <uui-button label="Remove">Remove</uui-button>
    </uui-action-bar>
  </uui-ref-node-document-type>

</uui-ref-list>
    `,
    },
  },
};
