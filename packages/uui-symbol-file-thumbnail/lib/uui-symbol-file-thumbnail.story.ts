import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  id: 'uui-symbol-file-thumbnail',
  title: 'Symbols/File Thumbnail',
  component: 'uui-symbol-file-thumbnail',
  parameters: {
    docs: {
      source: {
        code: `<uui-symbol-file-thumbnail></uui-symbol-file-thumbnail>`,
      },
    },
  },
};

export const Overview: Story = props =>
  html`<uui-symbol-file-thumbnail
    .source=${props.source}
    .alt=${props.alt}></uui-symbol-file-thumbnail>`;

Overview.args = {
  source: 'https://picsum.photos/2000/3000',
  alt: 'Image alt',
};
