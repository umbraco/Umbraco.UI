import { Story } from '@storybook/web-components';
import { html } from 'lit';
import { ArrayOfUmbracoWords } from '../../../storyhelpers/UmbracoWordGenerator';
import './index';
import readme from '../README.md?raw';

export default {
  title: 'Displays/Reference List',
  component: 'uui-ref-list',
  parameters: {
    readme: { markdown: readme },
  },
};

const listOfNodeNames: string[] = ArrayOfUmbracoWords(10);
const Template: Story = () => html`
  <uui-ref-list style="max-width: 420px;">
    ${listOfNodeNames.map(
      name =>
        html`<uui-ref-node name=${name} detail="path/to/nowhere">
          <uui-action-bar slot="actions">
            <uui-button label="Remove">Remove</uui-button>
          </uui-action-bar>
        </uui-ref-node>`,
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

  <uui-ref-node name="Node 1" detail="path/to/nowhere">
    <uui-action-bar slot="actions">
      <uui-button label="Remove">Remove</uui-button>
    </uui-action-bar>
  </uui-ref-node>

  <uui-ref-node name="Node 2" detail="path/to/nowhere">
    <uui-action-bar slot="actions">
      <uui-button label="Remove">Remove</uui-button>
    </uui-action-bar>
  </uui-ref-node>

  <uui-ref-node name="Node 3" detail="path/to/nowhere">
    <uui-action-bar slot="actions">
      <uui-button label="Remove">Remove</uui-button>
    </uui-action-bar>
  </uui-ref-node>

</uui-ref-list>
    `,
    },
  },
};
