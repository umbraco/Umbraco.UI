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
      <uui-card-media name="File name" .fileExt=${props.name}> </uui-card-media>
    </div>
  `;

File.parameters = {
  docs: {
    source: {
      code: `
<uui-card-media name="File name" file-ext="txt"></uui-card-media>`,
    },
  },
};

export const Tag: Story = () =>
  html`
    <div style="width: 200px">
      <uui-card-media name="File name">
        <uui-tag slot="tag" size="s" look="danger">Trashed</uui-tag>
        <img src="https://placedog.net/1447/?random" alt="" />
      </uui-card-media>
    </div>
  `;
Tag.parameters = {
  docs: {
    source: {
      code: `<uui-card-media name="File name">
        <uui-tag slot="tag" size="s" look="danger">Trashed</uui-tag>
      </uui-card-media>`,
    },
  },
};

export const Actions: Story = () =>
  html`
    <div style="width: 200px">
      <uui-card-media name="File name">
        <uui-action-bar slot="actions">
          <uui-button label="Remove">Remove</uui-button>
        </uui-action-bar>
        <img src="https://placedog.net/1447/?random" alt="" />
      </uui-card-media>
    </div>
  `;
Actions.parameters = {
  docs: {
    source: {
      code: `<uui-card-media name="File name">
        <uui-action-bar slot="actions">
          <uui-button label="Remove">Remove</uui-button>
        </uui-action-bar>
      </uui-card-media>`,
    },
  },
};

export const Folder: Story = () =>
  html`
    <div style="width: 200px">
      <uui-card-media name="Folder Name"></uui-card-media>
    </div>
  `;
Folder.parameters = {
  docs: {
    source: {
      code: `<uui-card-media name="Folder Name"></uui-card-media>`,
    },
  },
};

export const Image: Story = () =>
  html`
    <div style="width: 200px;">
      <uui-card-media name="File name">
        <img src="https://placedog.net/1447/?random" alt="" />
      </uui-card-media>
    </div>
  `;

Image.parameters = {
  docs: {
    source: {
      code: `
<uui-card-media name="File name">
  <img src="https://placedog.net/1447/?random" alt="" />
</uui-card-media>`,
    },
  },
};

export const Error: Story = props =>
  html`
    <div style="width: 200px;">
      <uui-card-media name="File name" ?error=${props.error}
        ><img src="https://placedog.net/1447/?random" alt=""
      /></uui-card-media>
    </div>
  `;

Error.args = {
  error: true,
};

Error.parameters = {
  docs: {
    source: {
      code: `<uui-card-media name="File name" error></uui-card-media>`,
    },
  },
};

export const Selectable: Story = props =>
  html`
    <div style="width: 200px;">
      <uui-card-media
        name="File name"
        ?selectable=${props.selectable}
        ?selected=${props.selected}
        ><img src="https://placedog.net/1447/?random" alt=""
      /></uui-card-media>
    </div>
  `;
Selectable.args = {
  selectable: true,
};

Selectable.parameters = {
  docs: {
    source: {
      code: `<uui-card-media name="File name" selectable></uui-card-media>`,
    },
  },
};
