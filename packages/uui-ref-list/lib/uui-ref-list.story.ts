import { html } from 'lit-html';
import { ArrayOfUmbracoWords } from '../../../src/helper/UmbracoWordGenerator';
import './index';

export default {
  title: 'Displays/Reference List',
  component: 'uui-ref-list',
};

const listOfNodeNames: string[] = ArrayOfUmbracoWords(10);
export const ContentReferenceList = () => html`
  <uui-ref-list style="max-width: 640px;">
    ${listOfNodeNames.map(
      name => html`<uui-ref-node name=${name} icon="bug" url="path/to/nowhere">
        <uui-action-bar slot="actions">
          <uui-button label="Remove">Remove</uui-button>
        </uui-action-bar>
      </uui-ref-node>`
    )}
  </uui-ref-list>
`;
