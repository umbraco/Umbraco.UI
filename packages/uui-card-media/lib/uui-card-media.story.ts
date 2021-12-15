import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-card-media/lib/index';

export default {
  title: 'Displays/Cards/Media',
  component: 'uui-card-media',
  id: 'uui-card-media',
  args: {
    name: 'The card',
    fileExt: 'jpg',
    selectable: false,
    selected: false,
    error: false,
    disabled: false,
  },
};

export const AAAOverview: Story = props =>
  html`
    <div style="width: 200px">
      <uui-card-media
        name=${props.name}
        .fileExt=${props.name}
        ?selectable=${props.selectable}
        ?selected=${props.selected}
        ?error=${props.error}
        ?disabled=${props.disabled}></uui-card-media>
    </div>
  `;
AAAOverview.storyName = 'Overview';
AAAOverview.parameters = {
  docs: {
    source: {
      code: `<uui-card-media name="Media Name" file-ext="jpg"></uui-card-media>`,
    },
  },
};

export const File: Story = props =>
  html`
    <div style="width: 200px">
      <uui-card-media
        name=${props.name}
        .fileExt=${props.name}
        ?selectable=${props.selectable}
        ?selected=${props.selected}
        ?error=${props.error}
        ?disabled=${props.disabled}></uui-card-media>
    </div>
  `;

export const Tag: Story = props =>
  html`
    <div style="width: 200px">
      <uui-card-media
        name=${props.name}
        .fileExt=${props.name}
        ?selectable=${props.selectable}
        ?selected=${props.selected}
        ?error=${props.error}
        ?disabled=${props.disabled}>
        <uui-tag slot="tag" size="s" look="positive">Published</uui-tag>
      </uui-card-media>
    </div>
  `;
Tag.parameters = {
  docs: {
    source: {
      code: `<uui-card-media name="Folder Name">
        <uui-tag slot="tag" size="s" look="positive">Published</uui-tag>
      </uui-card-media>`,
    },
  },
};

export const Actions: Story = props =>
  html`
    <div style="width: 200px">
      <uui-card-media
        name=${props.name}
        .fileExt=${props.name}
        ?selectable=${props.selectable}
        ?selected=${props.selected}
        ?error=${props.error}
        ?disabled=${props.disabled}>
        <uui-action-bar slot="actions">
          <uui-button label="Remove">Remove</uui-button>
        </uui-action-bar>
      </uui-card-media>
    </div>
  `;
Actions.parameters = {
  docs: {
    source: {
      code: `<uui-card-media name="Folder Name">
        <uui-action-bar slot="actions">
          <uui-button label="Remove">Remove</uui-button>
        </uui-action-bar>
      </uui-card-media>`,
    },
  },
};

export const Folder: Story = props =>
  html`
    <div style="width: 200px">
      <uui-card-media
        name=${props.name}
        ?selectable=${props.selectable}
        ?selected=${props.selected}
        ?error=${props.error}
        ?disabled=${props.disabled}></uui-card-media>
    </div>
  `;
Folder.args = {
  fileExt: '',
};
Folder.parameters = {
  docs: {
    source: {
      code: `<uui-card-media name="Folder Name"></uui-card-media>`,
    },
  },
};

export const Picture: Story = props =>
  html`
    <div style="width: 50vw; max-width: 450px;">
      <uui-card-media
        name=${props.name}
        .fileExt=${props.name}
        ?selectable=${props.selectable}
        ?selected=${props.selected}
        ?error=${props.error}
        ?disabled=${props.disabled}
        ><img src="https://placedog.net/1447/?random" alt=""
      /></uui-card-media>
      <uui-card-media
        name=${props.name}
        .fileExt=${props.name}
        ?selectable=${props.selectable}
        ?selected=${props.selected}
        ?error=${props.error}
        ?disabled=${props.disabled}
        ><img src="https://placedog.net/240/?random" alt=""
      /></uui-card-media>
      <uui-card-media
        name=${props.name}
        .fileExt=${props.name}
        ?selectable=${props.selectable}
        ?selected=${props.selected}
        ?error=${props.error}
        ?disabled=${props.disabled}
        ><img src="https://placedog.net/110/?random" alt=""
      /></uui-card-media>
    </div>
  `;

export const Error: Story = props =>
  html`
    <div style="width: 50vw; max-width: 450px;">
      <uui-card-media
        name=${props.name}
        .fileExt=${props.name}
        ?selectable=${props.selectable}
        ?selected=${props.selected}
        ?error=${props.error}
        ?disabled=${props.disabled}
        ><img src="https://placedog.net/1447/?random" alt=""
      /></uui-card-media>
    </div>
  `;
Error.args = {
  error: true,
};

export const ErrorAndSelectable: Story = props =>
  html`
    <div style="width: 50vw; max-width: 450px;">
      <uui-card-media
        name=${props.name}
        .fileExt=${props.name}
        ?selectable=${props.selectable}
        ?selected=${props.selected}
        ?error=${props.error}
        ?disabled=${props.disabled}
        ><img src="https://placedog.net/1447/?random" alt=""
      /></uui-card-media>
    </div>
  `;
ErrorAndSelectable.args = {
  selectable: true,
  selected: true,
  error: true,
};

export const Selectable: Story = props =>
  html`
    <div style="width: 50vw; max-width: 450px;">
      <uui-card-media
        name=${props.name}
        .fileExt=${props.name}
        ?selectable=${props.selectable}
        ?selected=${props.selected}
        ?error=${props.error}
        ?disabled=${props.disabled}
        ><img src="https://placedog.net/1447/?random" alt=""
      /></uui-card-media>
    </div>
  `;
Selectable.args = {
  selectable: true,
};
