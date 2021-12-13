import { html } from 'lit-html';
import '@umbraco-ui/uui-menu-item/lib/index';
import { Story } from '@storybook/web-components';
import { UUIMenuItemEvent } from './UUIMenuItemEvent';
import { UUIMenuItemElement } from './uui-menu-item.element';
import './index';

export default {
  title: 'Buttons/Menu Item',
  component: 'uui-menu-item',
  id: 'uui-menu-item',
};

const labelNames = [
  'Content',
  'Media',
  'Data Types',
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
    ?show-children=${props.showChildren}
    ?selected=${props.selected}
    ?active=${props.active}
    ?selectable=${props.selectable}>
  </uui-menu-item>`;
AAAOverview.storyName = 'Overview';
AAAOverview.args = {
  label: 'Menu Item 1',
  loading: false,
  disabled: false,
  hasChildren: false,
  showChildren: false,
  selected: false,
  active: false,
  selectable: false,
};
AAAOverview.parameters = {
  docs: {
    source: {
      code: html` <uui-menu-item label="Menu Item 1"></uui-menu-item> `.strings,
    },
  },
};

export const Nested = () =>
  html`
    <div style="max-width: 500px;">
      ${labelNames.map(
        (name: string) =>
          html` <uui-menu-item label="${name}" has-children>
            ${renderItems()}
          </uui-menu-item>`
      )}
    </div>
  `;
Nested.parameters = {
  docs: {
    source: {
      code: html`
        <uui-menu-item label="Menu Item 1" has-children>
          <uui-menu-item label="Nested Menu Item 1"></uui-menu-item>
          <uui-menu-item label="Nested Menu Item 2"></uui-menu-item>
        </uui-menu-item>
      `.strings,
    },
  },
};

let activeStoryActiveItem: UUIMenuItemElement | null = null;

function activeStoryOnClick(e: UUIMenuItemEvent) {
  if (activeStoryActiveItem) {
    activeStoryActiveItem.active = false;
  }

  activeStoryActiveItem = e.target;
  e.target.active = !e.target.active;
}

export const Active = () =>
  html`
    <div style="max-width: 500px;">
      <uui-menu-item
        label="Menu Item 1"
        @click-label=${activeStoryOnClick}></uui-menu-item>
      <uui-menu-item
        label="Menu Item 2"
        @click-label=${activeStoryOnClick}></uui-menu-item>
      <uui-menu-item
        label="Menu Item 3"
        @click-label=${activeStoryOnClick}></uui-menu-item>
      <uui-menu-item
        label="Menu Item 4"
        @click-label=${activeStoryOnClick}></uui-menu-item>
    </div>
  `;
Active.parameters = {
  docs: {
    source: {
      code: html` <uui-menu-item label="Menu Item 2" active></uui-menu-item> `
        .strings,
    },
  },
};

export const Loading = () =>
  html`
    <div style="max-width: 500px;">
      <uui-menu-item label="Menu Item 1"></uui-menu-item>
      <uui-menu-item label="Menu Item 2" loading></uui-menu-item>
      <uui-menu-item label="Menu Item 3"></uui-menu-item>
      <uui-menu-item label="Menu Item 4"></uui-menu-item>
    </div>
  `;
Loading.parameters = {
  docs: {
    source: {
      code: html` <uui-menu-item label="Menu Item 2" loading></uui-menu-item> `
        .strings,
    },
  },
};

let disabledStoryActiveItem: UUIMenuItemElement | null = null;

function disabledStoryOnClick(e: UUIMenuItemEvent) {
  if (disabledStoryActiveItem) {
    disabledStoryActiveItem.active = false;
  }

  disabledStoryActiveItem = e.target;
  e.target.active = !e.target.active;
}

export const Disabled = () =>
  html`
    <div style="max-width: 500px;">
      <uui-menu-item
        @click-label=${disabledStoryOnClick}
        label="Menu Item 1"></uui-menu-item>
      <uui-menu-item
        @click-label=${disabledStoryOnClick}
        label="Menu Item 2"
        disabled></uui-menu-item>
      <uui-menu-item
        @click-label=${disabledStoryOnClick}
        label="Menu Item 3"></uui-menu-item>
      <uui-menu-item
        @click-label=${disabledStoryOnClick}
        label="Menu Item 4"></uui-menu-item>
    </div>
  `;
Disabled.parameters = {
  docs: {
    source: {
      code: html` <uui-menu-item label="Menu Item 2" disabled></uui-menu-item> `
        .strings,
    },
  },
};

export const WithActions = () =>
  html`
    <div style="max-width: 500px;">
      <uui-menu-item label="Menu Item 1">
        <uui-action-bar slot="actions">
          <uui-button label="Open actions menu"
            ><uui-symbol-more></uui-symbol-more
          ></uui-button>
        </uui-action-bar>
      </uui-menu-item>

      <uui-menu-item label="Menu Item 2">
        <uui-action-bar slot="actions">
          <uui-button label="Open actions menu"
            ><uui-symbol-more></uui-symbol-more
          ></uui-button>
        </uui-action-bar>
      </uui-menu-item>

      <uui-menu-item label="Menu Item 3">
        <uui-action-bar slot="actions">
          <uui-button label="Open actions menu"
            ><uui-symbol-more></uui-symbol-more
          ></uui-button>
        </uui-action-bar>
      </uui-menu-item>

      <uui-menu-item label="Menu Item 4">
        <uui-action-bar slot="actions">
          <uui-button label="Open actions menu"
            ><uui-symbol-more></uui-symbol-more
          ></uui-button>
        </uui-action-bar>
      </uui-menu-item>
    </div>
  `;
WithActions.parameters = {
  docs: {
    source: {
      code: html`
        <uui-menu-item label="Menu Item 2">
          <uui-action-bar slot="actions">
            <uui-button label="Open actions menu"
              ><uui-symbol-more></uui-symbol-more
            ></uui-button>
          </uui-action-bar>
        </uui-menu-item>
      `.strings,
    },
  },
};

export const Selectable = () =>
  html`
    <div style="max-width: 500px;">
      <uui-menu-item label="Menu Item 1" selectable></uui-menu-item>
      <uui-menu-item label="Menu Item 2" selectable></uui-menu-item>
      <uui-menu-item label="Menu Item 3" selectable></uui-menu-item>
      <uui-menu-item label="Menu Item 4" selectable></uui-menu-item>
    </div>
  `;
Selectable.parameters = {
  docs: {
    source: {
      code: html`
        <uui-menu-item label="Menu Item 2" selectable></uui-menu-item>
      `.strings,
    },
  },
};

export const WithIcon = () =>
  html`
    <div style="max-width: 500px;">
      <uui-menu-item label="Menu Item 1">
        <uui-icon slot="icon" name="info"></uui-icon>
      </uui-menu-item>
      <uui-menu-item label="Menu Item 2">
        <uui-icon slot="icon" name="bug"></uui-icon>
      </uui-menu-item>
      <uui-menu-item label="Menu Item 3">
        <uui-icon slot="icon" name="info"></uui-icon>
      </uui-menu-item>
      <uui-menu-item label="Menu Item 4">
        <uui-icon slot="icon" name="bug"></uui-icon>
      </uui-menu-item>
    </div>
  `;
WithIcon.parameters = {
  docs: {
    source: {
      code: html`
        <uui-menu-item label="Menu Item 1">
          <uui-icon slot="icon" name="info"></uui-icon>
        </uui-menu-item>
      `.strings,
    },
  },
};
