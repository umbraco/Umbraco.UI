import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit';

export default {
  id: 'uui-symbol-file-thumbnail',
  title: 'Symbols/File Thumbnail',
  component: 'uui-symbol-file-thumbnail',
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const Overview: Story = props =>
  html`<uui-symbol-file-thumbnail
    style="max-width: 300px; max-height: 300px"
    src=${props.src}
    alt=${props.alt}></uui-symbol-file-thumbnail>`;

Overview.args = {
  src: 'https://picsum.photos/300/200',
  alt: 'Image alt',
};

export const NoSource: Story = props =>
  html`<uui-symbol-file-thumbnail
    style="max-width: 300px; max-height: 300px"
    src=${props.src}
    alt=${props.alt}></uui-symbol-file-thumbnail>`;

NoSource.args = {
  src: '',
  alt: 'Image alt',
};
