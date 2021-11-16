import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-card-media/lib/index';

export default {
  title: 'Displays/Cards/Card Media',
  component: 'uui-card-media',
  id: 'uui-card-media',
  parameters: {
    docs: {
      source: {
        code: `<uui-card-media></uui-card-media>`,
      },
    },
  },
};

export const File: Story = props =>
html`
  <div style="width: 200px">
    <uui-card-media selectable name="File 1" file-ext="txt"></uui-card-media>
  </div>
`;

export const NotSelectable: Story = props =>
html`
  <div style="width: 200px">
    <uui-card-media name="File 1" file-ext="txt"></uui-card-media>
    <uui-card-media name="File 1" file-ext="txt"></uui-card-media>
  </div>
`;

export const Folder: Story = props =>
html`
  <div style="width: 200px">
    <uui-card-media selectable name="File 1"></uui-card-media>
  </div>
`;

export const Picture: Story = props =>
html`
  <div style="width: 50vw; max-width: 450px;">
    <uui-card-media selectable name="Doggo 1" file-ext="jpg"
      ><img src="https://placedog.net/1447/?random" alt=""
    /></uui-card-media>
    <uui-card-media selectable name="Doggo 1" file-ext="jpg"
      ><img src="https://placedog.net/240/?random" alt=""
    /></uui-card-media>
    <uui-card-media selectable name="Doggo 1" file-ext="jpg"
      ><img src="https://placedog.net/110/?random" alt=""
    /></uui-card-media>
  </div>
`;

export const Error: Story = props =>
html`
  <div style="width: 50vw; max-width: 450px;">
    <uui-card-media error name="Doggo 1" file-ext="image"
      ><img src="https://placedog.net/1447/?random" alt=""
    /></uui-card-media>
  </div>
`;

export const ErrorAndSelectable: Story = props =>
html`
  <div style="width: 50vw; max-width: 450px;">
    <uui-card-media selectable error name="Doggo 1" file-ext="image"
      ><img src="https://placedog.net/1447/?random" alt=""
    /></uui-card-media>
  </div>
`;
