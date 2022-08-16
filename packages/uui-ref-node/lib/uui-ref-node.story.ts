import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

import { ArrayOfUmbracoWords } from '../../../storyhelpers/UmbracoWordGenerator';

export default {
  id: 'uui-ref-node',
  title: 'Displays/References/Node',
  component: 'uui-ref-node',
  decorators: [
    (Story: any) => html`
      <uui-icon-registry-essential>
        <div style="max-width: 420px;">${Story()}</div>
      </uui-icon-registry-essential>
    `,
  ],
};

const Template: Story = props => html`
  <uui-ref-node
    name="${props.name}"
    detail="${props.detail}"
    ?selectable=${props.selectable}
    ?selectOnly=${props.selectOnly}
    ?error=${props.error}
    ?disabled=${props.disabled}>
    <uui-tag size="s" slot="tag" color="positive">Published</uui-tag>
    <uui-action-bar slot="actions"
      ><uui-button label="delete"
        ><uui-icon name="delete"></uui-icon></uui-button
    ></uui-action-bar>
  </uui-ref-node>
`;

export const AAAOverview = Template.bind({});
AAAOverview.args = {
  name: 'Rabbit Suit Product Page',
  detail: 'path/to/nowhere',
};
AAAOverview.storyName = 'Overview';
AAAOverview.parameters = {
  docs: {
    source: {
      code: `
<uui-ref-node
  name="Rabbit Suit Product Page"
  detail="path/to/nowhere">
  <uui-tag size="s" slot="tag" color="positive" >Published</uui-tag>
  <uui-action-bar slot="actions"
    ><uui-button><uui-icon name="delete"></uui-icon></uui-button
  ></uui-action-bar>
</uui-ref-node>
    `,
    },
  },
};

export const CustomIcon: Story = () => html`
  <essential-icon-registry>
    <uui-ref-node-data-type
      name="Rabbit Suit Product Page"
      detail="path/to/nowhere">
      <uui-icon slot="icon" name="colorpicker"></uui-icon>
      <uui-action-bar slot="actions">
        <uui-button label="Remove">Remove</uui-button>
      </uui-action-bar>
    </uui-ref-node-data-type>
  </essential-icon-registry>
`;

CustomIcon.parameters = {
  docs: {
    source: {
      code: `
<uui-ref-node
  name="Rabbit Suit Product Page"
  detail="path/to/nowhere">
  <uui-icon slot="icon" name="colorpicker"></uui-icon>
  <uui-action-bar slot="actions">
    <uui-button label="Remove">Remove</uui-button>
  </uui-action-bar>
</uui-ref-node>
    `,
    },
  },
};

export const Border: Story = () => html`
  <uui-ref-node border name="Rabbit Suit Product Page" detail="path/to/nowhere">
    <uui-tag size="s" slot="tag" color="positive">Published</uui-tag>
    <uui-action-bar slot="actions">
      <uui-button type="button" label="Delete"
        ><uui-icon name="delete"></uui-icon
      ></uui-button>
    </uui-action-bar>
  </uui-ref-node>
`;

Border.parameters = {
  docs: {
    source: {
      code: `
<uui-ref-node
  border
  name="Rabbit Suit Product Page"
  detail="path/to/nowhere">
  <uui-tag size="s" slot="tag" color="positive" >Published</uui-tag>
  <uui-action-bar slot="actions">
    <uui-button type="button" label="Delete"><uui-icon name="delete"></uui-icon></uui-button>
  </uui-action-bar>
</uui-ref-node>
    `,
    },
  },
};

export const Selectable: Story = props => html`
  <uui-ref-node
    ?selectable="${props.selectable}"
    name="Rabbit Suit Product Page"
    detail="path/to/nowhere">
    <uui-tag size="s" slot="tag" color="positive">Published</uui-tag>
    <uui-action-bar slot="actions">
      <uui-button type="button" label="Delete"
        ><uui-icon name="delete"></uui-icon
      ></uui-button>
    </uui-action-bar>
  </uui-ref-node>
`;

Selectable.args = {
  selectable: true,
};

Selectable.parameters = {
  docs: {
    source: {
      code: `
<uui-ref-node
  selectable
  name="Rabbit Suit Product Page"
  detail="path/to/nowhere">
  <uui-tag size="s" slot="tag" color="positive" >Published</uui-tag>
  <uui-action-bar slot="actions">
    <uui-button type="button" label="Delete"><uui-icon name="delete"></uui-icon></uui-button>
  </uui-action-bar>
</uui-ref-node>
    `,
    },
  },
};

export const Disabled: Story = props => html`
  <uui-ref-node
    ?disabled="${props.disabled}"
    name="Rabbit Suit Product Page"
    detail="path/to/nowhere">
    <uui-tag size="s" slot="tag" color="positive">Published</uui-tag>
    <uui-action-bar slot="actions">
      <uui-button type="button" label="Delete"
        ><uui-icon name="delete"></uui-icon
      ></uui-button>
    </uui-action-bar>
  </uui-ref-node>
`;

Disabled.args = {
  disabled: true,
};

Disabled.parameters = {
  docs: {
    source: {
      code: `
<uui-ref-node
  disabled
  name="Rabbit Suit Product Page"
  detail="path/to/nowhere">
  <uui-tag size="s" slot="tag" color="positive" >Published</uui-tag>
  <uui-action-bar slot="actions">
    <uui-button type="button" label="Delete"><uui-icon name="delete"></uui-icon></uui-button>
  </uui-action-bar>
</uui-ref-node>
    `,
    },
  },
};

const listOfNodeNames: string[] = ArrayOfUmbracoWords(10);
export const Listed: Story = () => html`
  <uui-ref-list>
    ${listOfNodeNames.map(
      name => html`<uui-ref-node name=${name} detail="path/to/nowhere">
        <uui-tag size="s" slot="tag" color="positive">Published</uui-tag>
        <uui-action-bar slot="actions">
          <uui-button type="button" label="Delete"
            ><uui-icon name="delete"></uui-icon
          ></uui-button>
        </uui-action-bar>
      </uui-ref-node>`
    )}
  </uui-ref-list>
`;

Listed.parameters = {
  docs: {
    source: {
      code: `
<uui-ref-list>

  <uui-ref-node name="Node 1" detail="path/to/nowhere">
    <uui-tag size="s" slot="tag" color="positive" >Published</uui-tag>
    <uui-action-bar slot="actions">
      <uui-button type="button" label="Delete"><uui-icon name="delete"></uui-icon></uui-button>
    </uui-action-bar>
  </uui-ref-node>

  <uui-ref-node name="Node 2" detail="path/to/nowhere">
    <uui-tag size="s" slot="tag" color="positive" >Published</uui-tag>
    <uui-action-bar slot="actions">
      <uui-button type="button" label="Delete"><uui-icon name="delete"></uui-icon></uui-button>
    </uui-action-bar>
  </uui-ref-node>

  <uui-ref-node name="Node 3" detail="path/to/nowhere">
    <uui-action-bar slot="actions">
      <uui-button type="button" label="Delete"><uui-icon name="delete"></uui-icon></uui-button>
    </uui-action-bar>
  </uui-ref-node>

</uui-ref-list>
    `,
    },
  },
};
