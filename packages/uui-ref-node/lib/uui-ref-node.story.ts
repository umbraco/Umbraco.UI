import './define';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

import { ArrayOfUmbracoWords } from '../../../storyhelpers/UmbracoWordGenerator';

export default {
  id: 'uui-ref-node',
  title: 'Displays/References/Node',
  component: 'uui-ref-node',
};

const Template: Story = props => html`
  <div style="max-width: 420px;">
    <uui-ref-node
      name="${props.name}"
      detail="${props.detail}"
      ?selectable=${props.selectable}
      ?selectOnly=${props.selectOnly}
      ?error=${props.error}
      ?disabled=${props.disabled}>
      <uui-tag size="s" slot="tag" look="positive">Published</uui-tag>
      <uui-action-bar slot="actions"
        ><uui-button><uui-icon name="delete"></uui-icon></uui-button
      ></uui-action-bar>
    </uui-ref-node>
  </div>
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
  <uui-tag size="s" slot="tag" look="positive">Published</uui-tag>
  <uui-action-bar slot="actions"
    ><uui-button><uui-icon name="delete"></uui-icon></uui-button
  ></uui-action-bar>
</uui-ref-node>
    `,
    },
  },
};

export const CustomIcon: Story = () => html`
  <div style="max-width: 420px;">
    <uui-ref-node-data-type
      name="Rabbit Suit Product Page"
      detail="path/to/nowhere">
      <uui-icon slot="icon" name="shopping-basket-alt"></uui-icon>
      <uui-action-bar slot="actions">
        <uui-button label="Remove">Remove</uui-button>
      </uui-action-bar>
    </uui-ref-node-data-type>
  </div>
`;

CustomIcon.parameters = {
  docs: {
    source: {
      code: `
<uui-ref-node
  name="Rabbit Suit Product Page"
  detail="path/to/nowhere">
  <uui-icon slot="icon" name="shopping-basket-alt"></uui-icon>
  <uui-action-bar slot="actions">
    <uui-button label="Remove">Remove</uui-button>
  </uui-action-bar>
</uui-ref-node>
    `,
    },
  },
};

export const Border: Story = () => html`
  <div style="max-width: 420px;">
    <uui-ref-node
      border
      name="Rabbit Suit Product Page"
      detail="path/to/nowhere">
      <uui-tag size="s" slot="tag" look="positive">Published</uui-tag>
      <uui-action-bar slot="actions">
        <uui-button type="button" label="Delete"
          ><uui-icon name="delete"></uui-icon
        ></uui-button>
      </uui-action-bar>
    </uui-ref-node>
  </div>
`;

Border.parameters = {
  docs: {
    source: {
      code: `
<uui-ref-node
  border
  name="Rabbit Suit Product Page"
  detail="path/to/nowhere">
  <uui-tag size="s" slot="tag" look="positive">Published</uui-tag>
  <uui-action-bar slot="actions">
    <uui-button type="button" label="Delete"><uui-icon name="delete"></uui-icon></uui-button>
  </uui-action-bar>
</uui-ref-node>
    `,
    },
  },
};

export const Selectable: Story = props => html`
  <div style="max-width: 420px;">
    <uui-ref-node
      ?selectable="${props.selectable}"
      name="Rabbit Suit Product Page"
      detail="path/to/nowhere">
      <uui-tag size="s" slot="tag" look="positive">Published</uui-tag>
      <uui-action-bar slot="actions">
        <uui-button type="button" label="Delete"
          ><uui-icon name="delete"></uui-icon
        ></uui-button>
      </uui-action-bar>
    </uui-ref-node>
  </div>
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
  <uui-tag size="s" slot="tag" look="positive">Published</uui-tag>
  <uui-action-bar slot="actions">
    <uui-button type="button" label="Delete"><uui-icon name="delete"></uui-icon></uui-button>
  </uui-action-bar>
</uui-ref-node>
    `,
    },
  },
};

export const Disabled: Story = props => html`
  <div style="max-width: 420px;">
    <uui-ref-node
      ?disabled="${props.disabled}"
      name="Rabbit Suit Product Page"
      detail="path/to/nowhere">
      <uui-tag size="s" slot="tag" look="positive">Published</uui-tag>
      <uui-action-bar slot="actions">
        <uui-button type="button" label="Delete"
          ><uui-icon name="delete"></uui-icon
        ></uui-button>
      </uui-action-bar>
    </uui-ref-node>
  </div>
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
  <uui-tag size="s" slot="tag" look="positive">Published</uui-tag>
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
  <uui-ref-list style="max-width: 420px;">
    ${listOfNodeNames.map(
      name => html`<uui-ref-node name=${name} detail="path/to/nowhere">
        <uui-tag size="s" slot="tag" look="positive">Published</uui-tag>
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
    <uui-tag size="s" slot="tag" look="positive">Published</uui-tag>
    <uui-action-bar slot="actions">
      <uui-button type="button" label="Delete"><uui-icon name="delete"></uui-icon></uui-button>
    </uui-action-bar>
  </uui-ref-node>

  <uui-ref-node name="Node 2" detail="path/to/nowhere">
    <uui-tag size="s" slot="tag" look="positive">Published</uui-tag>
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
