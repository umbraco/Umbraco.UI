import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import { ArrayOfUmbracoWords } from '../../../src/helper/UmbracoWordGenerator';
import './index';

export default {
  title: 'Displays/Reference List',
  component: 'uui-ref-list',
};

const listOfNodeNames: string[] = ArrayOfUmbracoWords(10);
const Template: Story = () => html`
  <uui-ref-list style="max-width: 420px;">
    ${listOfNodeNames.map(
      name => html`<uui-ref-node
        name=${name}
        icon="bug"
        detail="path/to/nowhere">
        <uui-action-bar slot="actions">
          <uui-button label="Remove">Remove</uui-button>
        </uui-action-bar>
      </uui-ref-node>`
    )}
  </uui-ref-list>
`;

export const AAAOverview = Template.bind({});
AAAOverview.storyName = 'Overview';
AAAOverview.parameters = {
  docs: {
    source: {
      code: `
<uui-ref-list>

  <uui-ref-node name="Node 1" icon="bug" detail="path/to/nowhere">
    <uui-tag size="s" slot="tag" look="positive">Published</uui-tag>
    <uui-action-bar slot="actions">
      <uui-button label="Remove">Remove</uui-button>
    </uui-action-bar>
  </uui-ref-node>

  <uui-ref-node name="Node 2" icon="bug" detail="path/to/nowhere">
    <uui-action-bar slot="actions">
      <uui-button label="Remove">Remove</uui-button>
    </uui-action-bar>
  </uui-ref-node>
  
  <uui-ref-node name="Node 3" icon="bug" detail="path/to/nowhere">
    <uui-action-bar slot="actions">
      <uui-button label="Remove">Remove</uui-button>
    </uui-action-bar>
  </uui-ref-node>

</uui-ref-list>
    `,
    },
  },
};
