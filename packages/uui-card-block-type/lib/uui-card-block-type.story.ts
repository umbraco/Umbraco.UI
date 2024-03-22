import type { Meta, StoryFn } from '@storybook/web-components';

import './uui-card-block-type.element';
import '@umbraco-ui/uui-tag/lib/index';
import '@umbraco-ui/uui-button/lib/index';
import type { UUICardBlockTypeElement } from './uui-card-block-type.element';
import readme from '../README.md?raw';
import { html } from 'lit';

const meta: Meta<UUICardBlockTypeElement> = {
  id: 'uui-card-block-type',
  title: 'Displays/Cards/Block Type',
  component: 'uui-card-block-type',
  parameters: {
    readme: { markdown: readme },
    docs: {
      source: {
        code: `<uui-card-block-type></uui-card-block-type>`,
      },
    },
  },
  argTypes: {
    background: {
      control: { type: 'color' },
    },
  },

  decorators: [
    (Story: any) =>
      html`<div
        style="display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 200px));gap:20px">
        ${Story()}
      </div>`,
  ],
};

const renderWandIcon = (color = 'black') =>
  html`<uui-icon-registry-essential>
    <uui-icon name="wand" style="color:${color}"></uui-icon>
  </uui-icon-registry-essential>`;

export const AAAOverview: StoryFn = props => html`
  <uui-card-block-type
    selectable
    name=${props.name}
    description=${props.description}
    background=${props.background}
    ?selectable=${props.selectable}
    ?selected=${props.selected}
    ?error=${props.error}
    ?disabled=${props.disabled}
    href=${props.href}
    target=${props.target}>
    ${renderWandIcon()}
  </uui-card-block-type>
`;
AAAOverview.storyName = 'Overview';

AAAOverview.args = {
  name: 'Name',
  description: 'Description',
  selectable: false,
  selected: false,
  error: false,
  disabled: false,
};

export const Description: StoryFn = props => html`
  <uui-card-block-type
    selectable
    name=${props.name}
    description=${props.description}
    background=${props.background}
    ?selectable=${props.selectable}
    ?selected=${props.selected}
    ?error=${props.error}
    ?disabled=${props.disabled}
    href=${props.href}
    target=${props.target}>
    ${renderWandIcon()}
  </uui-card-block-type>
`;

Description.args = {
  name: 'The Block Name',
  description:
    "Description and description, don't get confused by its description. How about a description.",
  selectable: false,
  selected: false,
  error: false,
  disabled: false,
};

export const Tag: StoryFn = props => html`
  <uui-card-block-type
    name=${props.name}
    description=${props.description}
    background=${props.background}
    ?selectable=${props.selectable}
    ?selected=${props.selected}
    ?error=${props.error}
    ?disabled=${props.disabled}
    href=${props.href}
    target=${props.target}>
    ${renderWandIcon()}
    <uui-tag slot="tag" size="s" color="danger">Trashed</uui-tag>
  </uui-card-block-type>
`;

Tag.args = {
  name: 'The Block Name',
  selectable: false,
  selected: false,
  error: false,
  disabled: false,
};

export const Actions: StoryFn = props => html`
  <uui-card-block-type
    name=${props.name}
    description=${props.description}
    background=${props.background}
    ?selectable=${props.selectable}
    ?selected=${props.selected}
    ?error=${props.error}
    ?disabled=${props.disabled}
    href=${props.href}
    target=${props.target}>
    ${renderWandIcon()}

    <uui-action-bar slot="actions">
      <uui-button look="secondary" label="Remove">Remove</uui-button>
    </uui-action-bar>
  </uui-card-block-type>
`;

Actions.args = {
  name: 'The Block Name',
  description: 'Hover the block!',
  selectable: false,
  selected: false,
  error: false,
  disabled: false,
};

export const Background: StoryFn = props => html`
  <uui-card-block-type
    name=${props.name}
    description=${props.description}
    background=${props.background}
    ?selectable=${props.selectable}
    ?selected=${props.selected}
    ?error=${props.error}
    ?disabled=${props.disabled}
    href=${props.href}
    target=${props.target}>
    ${renderWandIcon()}
  </uui-card-block-type>
`;

Background.args = {
  name: 'Amazing block',
  description: 'With a different background',
  background: 'rgba(58, 84, 230, 0.34)',
  selectable: false,
  selected: false,
  error: false,
  disabled: false,
};

export const Image: StoryFn = props => html`
  <uui-card-block-type
    name=${props.name}
    description=${props.description}
    background=${props.background}
    ?selectable=${props.selectable}
    ?selected=${props.selected}
    ?error=${props.error}
    ?disabled=${props.disabled}
    href=${props.href}
    target=${props.target}>
    <img
      src="https://umbraco.com/media/v5gf3w2a/umbraco-toolkit-wide.svg"
      alt="" />
  </uui-card-block-type>
`;

Image.args = {
  name: 'Amazing block',
  description: 'With an image and colored background',
  background: 'rgba(58, 84, 230, 0.34)',
  selectable: false,
  selected: false,
  error: false,
  disabled: false,
};

export const Error: StoryFn = props => html`
  <uui-card-block-type
    name=${props.name}
    description=${props.description}
    background=${props.background}
    ?selectable=${props.selectable}
    ?selected=${props.selected}
    ?error=${props.error}
    ?disabled=${props.disabled}
    href=${props.href}
    target=${props.target}>
    ${renderWandIcon()}
  </uui-card-block-type>
`;

Error.args = {
  name: 'The Block Name',
  selectable: false,
  selected: false,
  error: true,
  disabled: false,
};

export const Selectable: StoryFn = props => html`
  <uui-card-block-type
    name=${props.name}
    description=${props.description}
    background=${props.background}
    ?selectable=${props.selectable}
    ?selected=${props.selected}
    ?error=${props.error}
    ?disabled=${props.disabled}
    href=${props.href}
    target=${props.target}>
    ${renderWandIcon()}
  </uui-card-block-type>
`;

Selectable.args = {
  name: 'The Block Name',
  selectable: true,
  selected: false,
  error: false,
  disabled: false,
};

export const Selected: StoryFn = props => html`
  <uui-card-block-type
    name=${props.name}
    description=${props.description}
    background=${props.background}
    ?selectable=${props.selectable}
    ?selected=${props.selected}
    ?error=${props.error}
    ?disabled=${props.disabled}
    href=${props.href}
    target=${props.target}>
    ${renderWandIcon()}
  </uui-card-block-type>
`;

Selected.args = {
  name: 'The Block Name',
  selectable: true,
  selected: true,
  error: false,
  disabled: false,
};

export const Multiple: StoryFn = props => html`
  <uui-card-block-type
    name=${props.name}
    description=${props.description}
    background=${props.background}
    ?selectable=${props.selectable}
    ?selected=${props.selected}
    ?error=${props.error}
    ?disabled=${props.disabled}
    href=${props.href}
    target=${props.target}>
    ${renderWandIcon('rgba(0,0,0,0.5)')}
  </uui-card-block-type>
  <uui-card-block-type
    name="Block 2"
    description="Description 2"
    background=${props.background}
    ?selectable=${props.selectable}
    ?selected=${props.selected}
    ?error=${props.error}
    ?disabled=${props.disabled}
    href=${props.href}
    target=${props.target}>
    ${renderWandIcon('red')}
  </uui-card-block-type>
  <uui-card-block-type
    name="Block 3"
    description="Description 3"
    background=${props.background}
    selectable
    ?selected=${props.selected}
    ?error=${props.error}
    ?disabled=${props.disabled}
    href=${props.href}
    target=${props.target}>
    ${renderWandIcon('rgba(11, 229, 255, 0.5)')}
  </uui-card-block-type>
`;

Multiple.args = {
  name: 'Block 1',
  description:
    'Description 1 seems to be a little longer than the other block descriptions. This is affecting the other blocks.',
  selectable: true,
  selected: false,
  error: false,
  disabled: false,
};

export const Disabled: StoryFn = props => html`
  <uui-card-block-type
    name=${props.name}
    description=${props.description}
    background=${props.background}
    ?selectable=${props.selectable}
    ?selected=${props.selected}
    ?error=${props.error}
    ?disabled=${props.disabled}
    href=${props.href}
    target=${props.target}>
    ${renderWandIcon()}
  </uui-card-block-type>
`;

Disabled.args = {
  name: 'The Block Name',
  description: 'This block seems to be disabled!',
  selectable: false,
  selected: false,
  error: false,
  disabled: true,
};

export default meta;
