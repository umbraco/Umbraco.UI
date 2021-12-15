import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-card-media/lib/index';

export default {
  title: 'Displays/Cards/Media Card',
  component: 'uui-card-media',
  id: 'uui-card-media',
  parameters: {
    docs: {
      source: {
        code: `<uui-card-media name="Media Name" fileExt="jpg"></uui-card-media>`,
      },
    },
  },
  args: {
    name: 'The card',
    fileExt: 'jpg',
    selectable: false,
    selected: false,
    error: false,
    disabled: false,
  },
};

export const File: Story = props =>
  html`
    <div style="width: 200px">
      <uui-card-media
        name=${props.name}
        fileExt=${props.name}
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
        fileExt=${props.name}
        ?selectable=${props.selectable}
        ?selected=${props.selected}
        ?error=${props.error}
        ?disabled=${props.disabled}></uui-card-media>
      <uui-tag slot="tag" size="s" look="positive">Published</uui-tag>
    </div>
  `;
export const Actions: Story = props =>
  html`
    <div style="width: 200px">
      <uui-card-media
        name=${props.name}
        fileExt=${props.name}
        ?selectable=${props.selectable}
        ?selected=${props.selected}
        ?error=${props.error}
        ?disabled=${props.disabled}></uui-card-media>
      <uui-action-bar slot="actions">
        <uui-button label="Remove">Remove</uui-button>
      </uui-action-bar>
    </div>
  `;

export const Folder: Story = props =>
  html`
    <div style="width: 200px">
      <uui-card-media
        name=${props.name}
        fileExt=${props.name}
        ?selectable=${props.selectable}
        ?selected=${props.selected}
        ?error=${props.error}
        ?disabled=${props.disabled}></uui-card-media>
    </div>
  `;
Folder.args = {
  fileExt: null,
};

export const Picture: Story = props =>
  html`
    <div style="width: 50vw; max-width: 450px;">
      <uui-card-media
        name=${props.name}
        fileExt=${props.name}
        ?selectable=${props.selectable}
        ?selected=${props.selected}
        ?error=${props.error}
        ?disabled=${props.disabled}
        ><img src="https://placedog.net/1447/?random" alt=""
      /></uui-card-media>
      <uui-card-media
        name=${props.name}
        fileExt=${props.name}
        ?selectable=${props.selectable}
        ?selected=${props.selected}
        ?error=${props.error}
        ?disabled=${props.disabled}
        ><img src="https://placedog.net/240/?random" alt=""
      /></uui-card-media>
      <uui-card-media
        name=${props.name}
        fileExt=${props.name}
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
        fileExt=${props.name}
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
        fileExt=${props.name}
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
