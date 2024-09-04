import '.';
import { html, nothing } from 'lit';
import type { Meta, StoryFn, StoryObj } from '@storybook/web-components';
import { renderSlots, spread } from '../../../storyhelpers';

import { useState } from '@storybook/preview-api';

import '@umbraco-ui/uui-icon-registry-essential/lib';
import '@umbraco-ui/uui-symbol-expand/lib';
import '@umbraco-ui/uui-symbol-more/lib';
import '@umbraco-ui/uui-loader-bar/lib';
import { ifDefined } from 'lit/directives/if-defined.js';

const meta: Meta = {
  id: 'uui-menu-item',
  component: 'uui-menu-item',
  title: 'Buttons/Menu Item',
  args: {
    label: 'Menu Item 1',
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
  render: args =>
    html`<uui-menu-item style=${ifDefined(args.style)} ${spread(args)}
      >${renderSlots(args)}</uui-menu-item
    >`,
  decorators: [story => html`<div style="max-width: 400px">${story()}</div>`],
};

export default meta;
type Story = StoryObj;

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

export const Default: Story = {};

export const Nested: Story = {
  render: args => html`
    ${labelNames.map(
      (name: string) =>
        html` <uui-menu-item
          label="${name}"
          .caretLabel="${args.caretLabel}"
          has-children>
          ${renderItems()}
        </uui-menu-item>`,
    )}
  `,
  parameters: {
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
  },
};

export const Active: Story = {
  render: () => {
    const [activeIndex, setActiveIndex] = useState<Number>(1);

    const onClick = (index: number) => {
      setActiveIndex(index);
    };

    return html`
      ${MenuItems.map(
        (menuItem, index) =>
          html`<uui-menu-item
            ?active=${activeIndex === index}
            label="${menuItem.title}"
            @click-label=${() => onClick(index)}></uui-menu-item>`,
      )}
    `;
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Selectable: Story = {
  args: {
    selectable: true,
  },
};

export const Anchor: Story = {
  args: {
    href: 'https://www.umbraco.com',
    target: '_blank',
  },
};

export const WithActions: Story = {
  args: {
    'actions slot': html`<uui-action-bar slot="actions">
      <uui-button label="Open actions menu"
        ><uui-symbol-more></uui-symbol-more
      ></uui-button>
    </uui-action-bar>`,
  },
};

export const WidthBadge: Story = {
  args: {
    'badge slot': html`<uui-badge slot="badge" color="warning">!</uui-badge>`,
  },
};

export const WithIcon: Story = {
  args: {
    'icon slot': html`<uui-icon slot="icon" name="favorite"></uui-icon>`,
  },
};

export const ItemIndentation: Story = {
  render: () => html`
    ${MenuItems.map(
      (menuItem, i) => html`
        <uui-menu-item
          label="${menuItem.title}"
          style=${ifDefined(
            i === 1 ? '--uui-menu-item-indent: 1;' : undefined,
          )}>
        </uui-menu-item>
      `,
    )}
  `,
};

export const FlatStructure: Story = {
  args: {
    style: '--uui-menu-item-flat-structure: 1;',
  },
};

export const SelectMode: Story = {
  args: {
    selectable: true,
    selectMode: 'persisting',
  },
  render: args =>
    html`<uui-menu-item
      label="Parent"
      has-children
      show-children
      ?selectable=${args.selectable}
      select-mode=${args.selectMode}>
      ${MenuItems.map(
        (menuItem, i) =>
          html`<uui-menu-item
            label="${menuItem.title}"
            ?selected=${i == 1 ? true : false}
            ?selectable=${args.selectable}
            select-mode=${args.selectMode}></uui-menu-item>`,
      )}
    </uui-menu-item>`,
  parameters: {
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
  },
};

const renderCombinationOfStates = (
  label: string,
  active: boolean,
  disabled: boolean,
  selected: boolean,
  selectable: boolean,
  highlightSelectMode: boolean,
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
export const CombinationOfStates: StoryFn = () => html`
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
    true,
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
    true,
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
    true,
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
    true,
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
    true,
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
    true,
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
    true,
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
    true,
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
    true,
  )}
`;
