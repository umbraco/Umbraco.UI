import { Story } from '@storybook/web-components';
import { html } from 'lit';
import { ArrayOfUmbracoWords } from '../../../storyhelpers/UmbracoWordGenerator';
import './index';
import readme from '../README.md?raw';

export default {
  id: 'uui-ref-node-package',
  title: 'Displays/References/Package',
  component: 'uui-ref-node-package',
  decorators: [
    (Story: any) => html`
      <uui-icon-registry-essential>${Story()}</uui-icon-registry-essential>
    `,
  ],
  parameters: {
    readme: { markdown: readme },
  },
};

const Template: Story = props => html`
  <div style="max-width: 420px;">
    <uui-ref-node-package
      name="${props.name}"
      version="${props.version}"
      author="${props.author}"
      detail="${props.detail}"
      ?selectable=${props.selectable}
      ?error=${props.error}
      ?disabled=${props.disabled}>
      <uui-tag size="s" slot="tag" color="positive">Update Available</uui-tag>
      <uui-action-bar slot="actions"
        ><uui-button><uui-icon name="delete"></uui-icon></uui-button
      ></uui-action-bar>
    </uui-ref-node-package>
  </div>
`;

export const AAAOverview = Template.bind({});
AAAOverview.args = {
  name: 'Umbraco Starter Kit',
  version: '1.1',
  author: 'Umbraco HQ',
};
AAAOverview.storyName = 'Overview';
AAAOverview.parameters = {
  docs: {
    source: {
      code: `
<uui-ref-node-package
  name="Umbraco Starter Kit"
  version="1.1"
  author="Umbraco HQ">
  <uui-tag size="s" slot="tag" color="positive" >Update Available</uui-tag>
  <uui-action-bar slot="actions"
    ><uui-button><uui-icon name="delete"></uui-icon></uui-button
  ></uui-action-bar>
</uui-ref-node-package>
    `,
    },
  },
};

export const CustomIcon: Story = () => html`
  <div style="max-width: 420px;">
    <uui-ref-node-package
      name="Umbraco Starter Kit"
      version="1.1"
      author="Umbraco HQ">
      <uui-icon slot="icon" name="wand"></uui-icon>
      <uui-action-bar slot="actions">
        <uui-button label="Remove">Remove</uui-button>
      </uui-action-bar>
    </uui-ref-node-package>
  </div>
`;

CustomIcon.parameters = {
  docs: {
    source: {
      code: `
<uui-ref-node-package
  name="Umbraco Starter Kit"
  version="1.1"
  author="Umbraco HQ">
  <uui-icon slot="icon" name="wand"></uui-icon>
  <uui-action-bar slot="actions">
    <uui-button label="Remove">Remove</uui-button>
  </uui-action-bar>
</uui-ref-node-package>
    `,
    },
  },
};

export const Standalone: Story = () => html`
  <div style="max-width: 420px;">
    <uui-ref-node-package
      standalone
      name="Umbraco Starter Kit"
      version="1.1"
      author="Umbraco HQ">
      <uui-tag size="s" slot="tag" color="positive">Update Available</uui-tag>
      <uui-action-bar slot="actions">
        <uui-button type="button" label="Delete"
          ><uui-icon name="delete"></uui-icon
        ></uui-button>
      </uui-action-bar>
    </uui-ref-node-package>
  </div>
`;

Standalone.parameters = {
  docs: {
    source: {
      code: `
<uui-ref-node-package
  standalone
  name="Umbraco Starter Kit"
  version="1.1"
  author="Umbraco HQ">
  <uui-icon slot="icon" name="bug"></uui-icon>
  <uui-tag size="s" slot="tag" color="positive" >Update Available</uui-tag>
  <uui-action-bar slot="actions"
    ><uui-button><uui-icon name="delete"></uui-icon></uui-button
  ></uui-action-bar>
</uui-ref-node-package>
    `,
    },
  },
};

export const Selectable: Story = props => html`
  <div style="max-width: 420px;">
    <uui-ref-node-package
      ?selectable="${props.selectable}"
      name="Umbraco Starter Kit"
      version="1.1"
      author="Umbraco HQ">
      <uui-tag size="s" slot="tag" color="positive">Update Available</uui-tag>
      <uui-action-bar slot="actions">
        <uui-button type="button" label="Delete"
          ><uui-icon name="delete"></uui-icon
        ></uui-button>
      </uui-action-bar>
    </uui-ref-node-package>
  </div>
`;

Selectable.args = {
  selectable: true,
};

Selectable.parameters = {
  docs: {
    source: {
      code: `
<uui-ref-node-package
  selectable
  name="Umbraco Starter Kit"
  version="1.1"
  author="Umbraco HQ">
  <uui-tag size="s" slot="tag" color="positive" >Published</uui-tag>
  <uui-action-bar slot="actions">
    <uui-button type="button" label="Delete"><uui-icon name="delete"></uui-icon></uui-button>
  </uui-action-bar>
</uui-ref-node-package>
    `,
    },
  },
};

export const Disabled: Story = props => html`
  <div style="max-width: 420px;">
    <uui-ref-node-package
      ?disabled="${props.disabled}"
      name="Umbraco Starter Kit"
      version="1.1"
      author="Umbraco HQ">
      <uui-tag size="s" slot="tag" color="positive">Update Available</uui-tag>
      <uui-action-bar slot="actions">
        <uui-button type="button" label="Delete"
          ><uui-icon name="delete"></uui-icon
        ></uui-button>
      </uui-action-bar>
    </uui-ref-node-package>
  </div>
`;

Disabled.args = {
  disabled: true,
};

Disabled.parameters = {
  docs: {
    source: {
      code: `
<uui-ref-node-package
  disabled
  name="Umbraco Starter Kit"
  version="1.1"
  author="Umbraco HQ">
  <uui-tag size="s" slot="tag" color="positive" >Published</uui-tag>
  <uui-action-bar slot="actions">
    <uui-button type="button" label="Delete"><uui-icon name="delete"></uui-icon></uui-button>
  </uui-action-bar>
</uui-ref-node-package>
    `,
    },
  },
};

const listOfNodeNames: string[] = ArrayOfUmbracoWords(10);
export const Listed: Story = () => html`
  <uui-ref-list style="max-width: 420px;">
    ${listOfNodeNames.map(
      name =>
        html`<uui-ref-node-package
          name="${name}"
          version="1.1"
          author="Umbraco HQ">
          <uui-action-bar slot="actions">
            <uui-button type="button" label="Delete"
              ><uui-icon name="delete"></uui-icon
            ></uui-button>
          </uui-action-bar>
        </uui-ref-node-package>`,
    )}
  </uui-ref-list>
`;

Listed.parameters = {
  docs: {
    source: {
      code: `
<uui-ref-list>

  <uui-ref-node-package name="Package 1" version="1.1" author="Umbraco HQ">
    <uui-action-bar slot="actions">
      <uui-button type="button" label="Delete"><uui-icon name="delete"></uui-icon></uui-button>
    </uui-action-bar>
  </uui-ref-node-package>

  <uui-ref-node-package name="Package 2" version="1.1" author="Umbraco HQ">
    <uui-action-bar slot="actions">
      <uui-button type="button" label="Delete"><uui-icon name="delete"></uui-icon></uui-button>
    </uui-action-bar>
  </uui-ref-node-package>

  <uui-ref-node-package name="Package 3" version="1.1" author="Umbraco HQ">
    <uui-action-bar slot="actions">
      <uui-button type="button" label="Delete"><uui-icon name="delete"></uui-icon></uui-button>
    </uui-action-bar>
  </uui-ref-node-package>

</uui-ref-list>
    `,
    },
  },
};
