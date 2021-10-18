import { html } from 'lit-html';
import '@umbraco-ui/uui-menu-item/lib/index';
import { UUIMenuItemEvent } from '@umbraco-ui/uui-menu-item/lib/UUIMenuItemEvent';
import { Story } from '@storybook/web-components';

export default {
  title: 'Buttons/Menu Item',
  component: 'uui-menu-item',
  id: 'uui-menu-item',
};

function handleSelectItem(e: UUIMenuItemEvent) {
  e.target.selected = !e.target.selected;
}

const labelNames = [
  'Content',
  'Media',
  'Data Types',
  'This label is very long, so long that it hopefully shows how text overflows the container.',
  'Macros',
  'Relation Types',
  'Content Templates',
  'Partial Views',
];

const renderItems: any = (count = 5, iteration = 5) => {
  const elements: any = [];

  iteration = iteration - 1 - Math.floor(Math.random() * 4);

  for (let i = 0; i < count; i++) {
    let localIteration = iteration;
    localIteration = localIteration - 1 - Math.floor(Math.random() * 2);
    const index = Math.floor(Math.random() * labelNames.length);
    const element = html`<uui-menu-item
      label="${labelNames[index]}"
      @click-label="${handleSelectItem}"
      ?has-children=${localIteration > 0}
      >${localIteration > 0
        ? renderItems(count, localIteration)
        : ''}</uui-menu-item
    >`;

    elements.push(element);
  }

  return elements;
};

export const AAAOverview: Story = props =>
  html`<uui-menu-item
    .label=${props.label}
    ?loading=${props.loading}
    ?disabled=${props.disabled}
    ?has-children=${props.hasChildren}
    ?show-children=${props.showChildren}>
    <uui-menu-item label="i am a nested item"></uui-menu-item>
  </uui-menu-item>`;
AAAOverview.storyName = 'Overview';
AAAOverview.args = {
  label: 'Content Templates',
  loading: false,
  disabled: false,
  hasChildren: false,
  showChildren: false,
};
AAAOverview.parameters = {
  docs: {
    source: {
      code: html`<uui-menu-item label="Content Templates">
        <uui-menu-item label="i am a nested item"></uui-menu-item>
      </uui-menu-item>`.strings,
    },
  },
};

export const Nested = () =>
  html`
    <div style="max-width: 500px; border: 2px dashed rgba(0,0,0,.1)">
      ${labelNames.map(
        (name: string) =>
          html` <uui-menu-item
            @click-label="${handleSelectItem}"
            label="${name}"
            has-children>
            ${renderItems()}
          </uui-menu-item>`
      )}
    </div>
  `;

export const OneIsActive = () =>
  html`
    <div style="max-width: 500px; border: 2px dashed rgba(0,0,0,.1)">
      <uui-menu-item has-children show-children label="Content Templates">
        <uui-menu-item label="Content Templates"> </uui-menu-item>
        <uui-menu-item active label="Content Templates"> </uui-menu-item>
        <uui-menu-item label="Content Templates"> </uui-menu-item>
      </uui-menu-item>
    </div>
  `;
OneIsActive.parameters = {
  docs: {
    source: {
      code: html` <uui-menu-item
        has-children
        show-children
        label="Content Templates">
        <uui-menu-item label="Content Templates"> </uui-menu-item>
        <uui-menu-item active label="Content Templates"> </uui-menu-item>
        <uui-menu-item label="Content Templates"> </uui-menu-item>
      </uui-menu-item>`.strings,
    },
  },
};

export const OneIsLoading = () =>
  html`
    <div style="max-width: 500px; border: 2px dashed rgba(0,0,0,.1)">
      <uui-menu-item has-children show-children label="Content Templates">
        <uui-menu-item label="Content Templates"> </uui-menu-item>
        <uui-menu-item loading label="Content Templates"> </uui-menu-item>
        <uui-menu-item label="Content Templates"> </uui-menu-item>
      </uui-menu-item>
    </div>
  `;
OneIsLoading.parameters = {
  docs: {
    source: {
      code: html` <uui-menu-item
        has-children
        show-children
        label="Content Templates">
        <uui-menu-item label="Content Templates"> </uui-menu-item>
        <uui-menu-item loading label="Content Templates"> </uui-menu-item>
        <uui-menu-item label="Content Templates"> </uui-menu-item>
      </uui-menu-item>`.strings,
    },
  },
};

export const OneIsDisabled = () =>
  html`
    <div style="max-width: 500px; border: 2px dashed rgba(0,0,0,.1)">
      <uui-menu-item
        @click-label=${handleSelectItem}
        has-children
        show-children
        label="Content Templates">
        <uui-menu-item
          @click-label=${handleSelectItem}
          label="Content Templates">
        </uui-menu-item>
        <uui-menu-item
          @click-label=${handleSelectItem}
          disabled
          label="Content Templates">
        </uui-menu-item>
        <uui-menu-item
          @click-label=${handleSelectItem}
          label="Content Templates">
        </uui-menu-item>
      </uui-menu-item>
    </div>
  `;
OneIsDisabled.parameters = {
  docs: {
    source: {
      code: html` <uui-menu-item
        has-children
        show-children
        label="Content Templates">
        <uui-menu-item label="Content Templates"> </uui-menu-item>
        <uui-menu-item disabled label="Content Templates"> </uui-menu-item>
        <uui-menu-item label="Content Templates"> </uui-menu-item>
      </uui-menu-item>`.strings,
    },
  },
};

export const WithActions = () =>
  html`
    <div style="max-width: 500px; border: 2px dashed rgba(0,0,0,.1)">
      <uui-menu-item has-children show-children label="Content Templates">
        <uui-action-bar slot="actions">
          <uui-button label="Open actions menu">•••</uui-button>
        </uui-action-bar>
        <uui-menu-item label="Content Templates">
          <uui-action-bar slot="actions">
            <uui-button label="Open actions menu">•••</uui-button>
          </uui-action-bar>
        </uui-menu-item>
        <uui-menu-item label="Content Templates">
          <uui-action-bar slot="actions">
            <uui-button label="Open actions menu">•••</uui-button>
          </uui-action-bar>
        </uui-menu-item>
        <uui-menu-item label="Content Templates">
          <uui-action-bar slot="actions">
            <uui-button label="Open actions menu">•••</uui-button>
          </uui-action-bar>
        </uui-menu-item>
      </uui-menu-item>
    </div>
  `;
WithActions.parameters = {
  docs: {
    source: {
      code: html` <uui-menu-item
        has-children
        show-children
        label="Content Templates">
        <uui-action-bar slot="actions">
          <uui-button label="Open actions menu">•••</uui-button>
        </uui-action-bar>
        <uui-menu-item label="Content Templates">
          <uui-action-bar slot="actions">
            <uui-button label="Open actions menu">•••</uui-button>
          </uui-action-bar>
        </uui-menu-item>
        <uui-menu-item label="Content Templates">
          <uui-action-bar slot="actions">
            <uui-button label="Open actions menu">•••</uui-button>
          </uui-action-bar>
        </uui-menu-item>
        <uui-menu-item label="Content Templates">
          <uui-action-bar slot="actions">
            <uui-button label="Open actions menu">•••</uui-button>
          </uui-action-bar>
        </uui-menu-item>
      </uui-menu-item>`.strings,
    },
  },
};
