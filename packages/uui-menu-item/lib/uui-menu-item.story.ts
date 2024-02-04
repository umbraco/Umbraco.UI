import '.';
import '@umbraco-ui/uui-icon-registry-essential/lib';

import { Story } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import { UUIMenuItemElement } from './uui-menu-item.element';
import { UUIMenuItemEvent } from './UUIMenuItemEvent';
import readme from '../README.md?raw';
import '@umbraco-ui/uui-symbol-expand/lib';

export default {
  title: 'Buttons/Menu Item',
  component: 'uui-menu-item',
  decorators: [
    (story: any) => html` <div style="max-width: 500px;">${story()}</div> `,
  ],
  id: 'uui-menu-item',
  args: {
    label: 'Menu Item 1',
    loading: false,
    disabled: false,
    hasChildren: false,
    showChildren: false,
    selected: false,
    active: false,
    selectable: false,
    href: undefined,
    target: undefined,
    selectMode: undefined,
  },
  argTypes: {
    '--uui-menu-item-indent': { control: { type: 'text' } },
    '--uui-menu-item-flat-structure': { control: { type: 'text' } },
    selectMode: {
      control: {
        type: 'select',
      },
      options: ['persisting', 'highlight', undefined],
    },
  },
  parameters: {
    readme: { markdown: readme },
  },
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

const MenuItems = [
  {
    title: 'Menu Item 1',
    icon: 'document',
    loading: false,
    badge: false,
  },
  {
    title: 'Menu Item 2',
    icon: 'picture',
    loading: true,
    badge: false,
  },
  {
    title: 'Menu Item 3',
    icon: 'info',
    loading: false,
    badge: true,
  },
  {
    title:
      'Menu Item 4 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9',
    icon: 'document',
    loading: false,
    badge: false,
  },
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

export const AAAOverview: Story = (props: any) =>
  html`<uui-menu-item
    .label=${props.label}
    ?loading=${props.loading}
    ?disabled=${props.disabled}
    ?has-children=${props.hasChildren}
    ?show-children=${props.showChildren}
    ?selected=${props.selected}
    ?active=${props.active}
    ?selectable=${props.selectable}
    ?select-only=${props.selectOnly}>
  </uui-menu-item>`;
AAAOverview.storyName = 'Overview';
AAAOverview.args = {
  label: 'Menu Item 1',
  loading: false,
  disabled: false,
  hasChildren: false,
  showChildren: false,
  selected: false,
  selectOnly: false,
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

export const Nested = () => html`
  ${labelNames.map(
    (name: string) =>
      html` <uui-menu-item label="${name}" has-children>
        ${renderItems()}
      </uui-menu-item>`
  )}
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

export const Active = () => html`
  ${MenuItems.map(
    menuItem =>
      html`<uui-menu-item
        label="${menuItem.title}"
        @click-label=${activeStoryOnClick}></uui-menu-item>`
  )}
`;
Active.parameters = {
  docs: {
    source: {
      code: html` <uui-menu-item label="Menu Item 2" active></uui-menu-item> `
        .strings,
    },
  },
};

export const Loading = () => html`
  ${MenuItems.map(
    menuItem =>
      html`<uui-menu-item
        label="${menuItem.title}"
        ?loading=${menuItem.loading}></uui-menu-item>`
  )}
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

export const Disabled = (props: any) => html`
  ${MenuItems.map(
    menuItem => html`
      <uui-menu-item
        @click-label=${disabledStoryOnClick}
        label="${menuItem.title}"
        ?disabled=${props.disabled}></uui-menu-item>
    `
  )}
`;
Disabled.args = {
  disabled: true,
};
Disabled.parameters = {
  docs: {
    source: {
      code: html` <uui-menu-item label="Menu Item 2" disabled></uui-menu-item> `
        .strings,
    },
  },
};

export const WithActions = () => html`
  ${MenuItems.map(
    menuItem => html`
      <uui-menu-item label="${menuItem.title}">
        <uui-action-bar slot="actions">
          <uui-button label="Open actions menu"
            ><uui-symbol-more></uui-symbol-more
          ></uui-button>
        </uui-action-bar>
      </uui-menu-item>
    `
  )}
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

export const WithBadge = () => html`
  ${MenuItems.map(
    menuItem => html`
      <uui-menu-item label="${menuItem.title}">
        ${menuItem.badge
          ? html`<uui-badge slot="badge" color="warning">!</uui-badge>`
          : ''}
      </uui-menu-item>
    `
  )}
`;
WithBadge.parameters = {
  docs: {
    source: {
      code: html`
        <uui-menu-item label="Menu Item 2">
          <uui-badge slot="badge" color="warning">!</uui-badge>
        </uui-menu-item>
      `.strings,
    },
  },
};

export const Selectable = (props: any) => html`
  ${MenuItems.map(
    menuItem =>
      html`<uui-menu-item
        label="${menuItem.title}"
        ?selectable=${props.selectable}></uui-menu-item>`
  )}
`;
Selectable.args = {
  selectable: true,
};
Selectable.parameters = {
  controls: { include: ['selectable'] },
  docs: {
    source: {
      code: html`
        <uui-menu-item label="Menu Item 2" selectable></uui-menu-item>
      `.strings,
    },
  },
};

export const WithIcon = (props: any) => html`
  <uui-icon-registry-essential>
    ${MenuItems.map(
      menuItem => html`
        <uui-menu-item
          label=${menuItem.title}
          ?loading=${props.loading}
          ?disabled=${props.disabled}
          ?has-children=${props.hasChildren}
          ?show-children=${props.showChildren}
          ?selected=${props.selected}
          ?active=${props.active}
          ?selectable=${props.selectable}
          href=${props.href}
          target=${props.target}>
          <uui-icon slot="icon" name=${menuItem.icon}></uui-icon>
        </uui-menu-item>
      `
    )}
  </uui-icon-registry-essential>
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

export const AnchorTag = (props: any) => html`
  <uui-icon-registry-essential>
    <uui-menu-item
      label=${props.label}
      ?loading=${props.loading}
      ?disabled=${props.disabled}
      ?has-children=${props.hasChildren}
      ?show-children=${props.showChildren}
      ?selected=${props.selected}
      ?active=${props.active}
      ?selectable=${props.selectable}
      href=${props.href}
      target=${props.target}>
      <uui-icon slot="icon" name="document"></uui-icon>
    </uui-menu-item>
  </uui-icon-registry-essential>
`;
AnchorTag.args = {
  href: 'https://www.umbraco.com',
  target: '_blank',
};
AnchorTag.parameters = {
  docs: {
    source: {
      code: html`
        <uui-menu-item
          label="Menu Item 1"
          href="http://www.umbraco.com"
          target="_blank">
        </uui-menu-item>
      `.strings,
    },
  },
};

export const ItemIndentation: Story = () => html`
  ${MenuItems.map(
    (menuItem, i) => html`
      <uui-menu-item
        label="${menuItem.title}"
        style="${ifDefined(i === 1 ? '--uui-menu-item-indent: 1' : '')}">
      </uui-menu-item>
    `
  )}
`;

ItemIndentation.parameters = {
  docs: {
    source: {
      code: `<uui-menu-item label="Menu Item 1" style="--uui-menu-item-indent: 1"></uui-menu-item>`,
    },
  },
};

export const FlatStructure: Story = (props: any) => html`
  <uui-icon-registry-essential>
    <uui-menu-item
      style="--uui-menu-item-flat-structure: 1"
      label=${props.label}
      ?loading=${props.loading}
      ?disabled=${props.disabled}
      ?has-children=${props.hasChildren}
      ?show-children=${props.showChildren}
      ?selected=${props.selected}
      ?active=${props.active}
      ?selectable=${props.selectable}
      href=${props.href}
      target=${props.target}>
    </uui-menu-item>
  </uui-icon-registry-essential>
`;
FlatStructure.parameters = {
  docs: {
    source: {
      code: html`
        <uui-menu-item
          style="--uui-menu-item-flat-structure: 1"
          label="Menu Item 1">
        </uui-menu-item>
      `.strings,
    },
  },
};

export const SelectMode = (props: any) =>
  html`<uui-menu-item
    label="Parent"
    has-children
    show-children
    ?selectable=${props.selectable}
    select-mode=${props.selectMode}>
    ${MenuItems.map(
      (menuItem, i) =>
        html`<uui-menu-item
          label="${menuItem.title}"
          ?selected=${i == 1 ? true : false}
          ?selectable=${props.selectable}
          select-mode=${props.selectMode}></uui-menu-item>`
    )}
  </uui-menu-item> `;
SelectMode.args = {
  selectable: true,
  selectMode: 'highlight',
};
SelectMode.parameters = {
  controls: {
    include: ['selectable', 'selectMode'],
  },
  docs: {
    source: {
      code: html`
        <uui-menu-item
          label="Menu Item"
          select-mode="highlight"
          selectable></uui-menu-item>
      `.strings,
    },
  },
};

const renderCombinationOfStates = (
  label: string,
  active: boolean,
  disabled: boolean,
  selected: boolean,
  selectable: boolean,
  highlightSelectMode: boolean
) => {
  return html`<uui-menu-item
    label=${label}
    has-children
    show-children
    ?active=${active}
    ?disabled=${disabled}
    ?selected=${selected}
    ?selectable=${selectable}
    select-mode=${ifDefined(highlightSelectMode ? 'highlight' : undefined)}>
    <uui-menu-item
      label=${label}
      ?active=${active}
      ?disabled=${disabled}
      ?selected=${selected}
      ?selectable=${selectable}
      select-mode=${ifDefined(highlightSelectMode ? 'highlight' : undefined)}>
    </uui-menu-item>
  </uui-menu-item> `;
};
// show combination of states: active, disabled, selected, selectable, select-mode
// Notice, this implementation sets selectable to false in all cases of begin disabled.
export const CombinationOfStates = () => html`
  ${renderCombinationOfStates('Active', true, false, false, false, false)}
  ${renderCombinationOfStates('Disabled', false, true, false, false, false)}
  ${renderCombinationOfStates('Selected', false, false, true, false, false)}
  ${renderCombinationOfStates('Selectable', false, false, false, true, false)}
  ${renderCombinationOfStates(
    'Highlight select mode',
    false,
    false,
    false,
    false,
    true
  )}

  <br />
  <b>All active</b>
  ${renderCombinationOfStates('Active', true, false, false, false, false)}
  ${renderCombinationOfStates('Disabled', true, true, false, false, false)}
  ${renderCombinationOfStates('Selected', true, false, true, false, false)}
  ${renderCombinationOfStates('Selectable', true, false, false, true, false)}
  ${renderCombinationOfStates(
    'Highlight select mode',
    true,
    false,
    false,
    false,
    true
  )}

  <br />
  <b>All disabled</b>
  ${renderCombinationOfStates('Active', true, true, false, false, false)}
  ${renderCombinationOfStates('Disabled', false, true, false, false, false)}
  ${renderCombinationOfStates('Selected', false, true, true, false, false)}
  ${renderCombinationOfStates('Selectable', false, true, false, true, false)}
  ${renderCombinationOfStates(
    'Highlight select mode',
    false,
    true,
    false,
    false,
    true
  )}

  <br />
  <b>All selected (Default mode)</b>
  ${renderCombinationOfStates('Active', true, false, true, false, false)}
  ${renderCombinationOfStates('Disabled', false, true, true, false, false)}
  ${renderCombinationOfStates('Selected', false, false, true, false, false)}
  ${renderCombinationOfStates('Selectable', false, false, true, true, false)}
  ${renderCombinationOfStates(
    'Highlight select mode',
    false,
    false,
    true,
    false,
    true
  )}

  <br />
  <b>All Selected (Highlight mode)</b>
  ${renderCombinationOfStates('Active', true, false, true, false, true)}
  ${renderCombinationOfStates('Disabled', false, true, true, false, true)}
  ${renderCombinationOfStates('Selected', false, false, true, false, true)}
  ${renderCombinationOfStates('Selectable', false, false, true, true, true)}
  ${renderCombinationOfStates(
    'Highlight select mode',
    false,
    false,
    false,
    false,
    true
  )}

  <br />
  <b>All selected & selectable (Default mode)</b>
  ${renderCombinationOfStates('Active', true, false, true, true, false)}
  ${renderCombinationOfStates('Disabled', false, true, true, false, false)}
  ${renderCombinationOfStates('Selected', false, false, true, true, false)}
  ${renderCombinationOfStates('Selectable', false, false, true, true, false)}
  ${renderCombinationOfStates(
    'Highlight select mode',
    false,
    false,
    true,
    false,
    true
  )}

  <br />
  <b>All Selected & selectable (Highlight mode)</b>
  ${renderCombinationOfStates('Active', true, false, true, true, true)}
  ${renderCombinationOfStates('Disabled', false, true, true, false, true)}
  ${renderCombinationOfStates('Selected', false, false, true, true, true)}
  ${renderCombinationOfStates('Selectable', false, false, true, true, true)}
  ${renderCombinationOfStates(
    'Highlight select mode',
    false,
    false,
    false,
    false,
    true
  )}

  <br />
  <b>All selectable</b>
  ${renderCombinationOfStates('Active', true, false, false, true, false)}
  ${renderCombinationOfStates('Disabled', false, true, false, false, false)}
  ${renderCombinationOfStates('Selected', false, false, true, true, false)}
  ${renderCombinationOfStates('Selectable', false, false, false, true, false)}
  ${renderCombinationOfStates(
    'Highlight select mode',
    false,
    false,
    false,
    true,
    true
  )}

  <br />
  <b>Highlight select Mode</b>
  ${renderCombinationOfStates('Active', true, false, false, false, true)}
  ${renderCombinationOfStates('Disabled', false, true, false, false, true)}
  ${renderCombinationOfStates('Selected', false, false, true, false, true)}
  ${renderCombinationOfStates('Selectable', false, false, false, true, true)}
  ${renderCombinationOfStates(
    'Highlight select mode',
    false,
    false,
    false,
    false,
    true
  )}
`;
