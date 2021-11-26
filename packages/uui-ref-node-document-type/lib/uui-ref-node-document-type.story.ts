import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import { ArrayOfUmbracoWords } from '../../../src/helper/UmbracoWordGenerator';
import './index';

export default {
  id: 'uui-ref-node-document-type',
  title: 'Displays/References/Document Type',
  component: 'uui-ref-node-document-type',
  parameters: {
    docs: {
      source: {
        code: `<uui-ref-node-document-type></uui-ref-node-document-type>`,
      },
    },
  },
};

export const Overview: Story = () => html`
  <div style="max-width: 420px;">
    <uui-ref-node-document-type
      name="Product Page"
      icon="bug"
      alias="productPageAlias">
      <uui-action-bar slot="actions">
        <uui-button>Remove</uui-button>
      </uui-action-bar>
    </uui-ref-node-document-type>
  </div>
`;

export const Selectable = () => html`
  <div style="max-width: 420px;">
    <uui-ref-node-document-type
      selectable
      name="Product Page"
      icon="bug"
      alias="productPageAlias">
      <uui-action-bar slot="actions">
        <uui-button>Remove</uui-button>
      </uui-action-bar>
    </uui-ref-node-document-type>
  </div>
`;

export const Disabled = () => html`
  <div style="max-width: 420px;">
    <uui-ref-node-document-type
      disabled
      name="Product Page"
      icon="bug"
      alias="productPageAlias">
      <uui-action-bar slot="actions">
        <uui-button>Remove</uui-button></uui-action-bar
      >
    </uui-ref-node-document-type>
  </div>
`;

const listOfNodeNames: string[] = ArrayOfUmbracoWords(10);
export const Listed = () => html`
  <uui-ref-list style="max-width: 420px;">
    ${listOfNodeNames.map(
      name => html`<uui-ref-node-document-type
        name=${name}
        icon="bug"
        alias="productPageAlias">
        <uui-action-bar slot="actions">
          <uui-button>Remove</uui-button>
        </uui-action-bar>
      </uui-ref-node-document-type>`
    )}
  </uui-ref-list>
`;
