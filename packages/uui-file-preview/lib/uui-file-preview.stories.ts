import '.';
import readme from '../README.md?raw';
import { html, nothing } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { renderSlots, spread } from '../../../storyhelpers';

import '@umbraco-ui/uui-action-bar/lib';
import '@umbraco-ui/uui-button/lib';
import '@umbraco-ui/uui-symbol-file-thumbnail/lib';
import '@umbraco-ui/uui-symbol-folder/lib';
import '@umbraco-ui/uui-symbol-file/lib';

import { UUIFilePreviewElement } from '.';

const meta: Meta = {
  id: 'uui-file-preview',
  component: 'uui-file-preview',
  title: 'Displays/File Preview',
  render: args =>
    html`<uui-file-preview ${spread(args)}
      >${renderSlots(args)}</uui-file-preview
    >`,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    setTimeout(() => {
      const file = new File(['file'], 'File 1.txt', { type: 'text/plain' });
      const filePreview = document.getElementById(
        'filePreview',
      ) as UUIFilePreviewElement;
      filePreview.file = file;
    });

    return html`
      <uui-file-preview id="filePreview">
        <uui-action-bar slot="actions">
          <uui-button color="danger">
            <uui-icon name="delete"></uui-icon>
          </uui-button>
        </uui-action-bar>
      </uui-file-preview>
    `;
  },
  parameters: {
    docs: {
      source: {
        format: false,
        code: `
const file = new File(["file"], "File 1.txt", { type: "text/plain" });
const filePreview = document.getElementById('filePreview') as UUIFilePreviewElement;
filePreview.file = file;

<uui-file-preview
  id="imagePreview">
  <uui-action-bar slot="actions">
    <uui-button color="danger">
      <uui-icon name="delete"></uui-icon>
    </uui-button>
  </uui-action-bar>
</uui-file-preview>
        `,
      },
    },
  },
};

export const Image: Story = {
  loaders: [
    async () => {
      const imageUrl =
        'https://images.unsplash.com/photo-1650346910623-3a0d9ee1f2ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2371&q=80';

      const response = await fetch(imageUrl);
      const imageBlob = await response.blob();

      return {
        file: new File([imageBlob], 'File 1', { type: 'image/jpeg' }),
      };
    },
  ],
  render: (args, { loaded: { file } }) => {
    setTimeout(() => {
      const imagePreview = document.getElementById(
        'imagePreview',
      ) as UUIFilePreviewElement;
      imagePreview.file = file;
    });

    return html`
      <uui-file-preview id="imagePreview">
        <uui-action-bar slot="actions">
          <uui-button color="danger">
            <uui-icon name="delete"></uui-icon>
          </uui-button>
        </uui-action-bar>
      </uui-file-preview>
    `;
  },
  parameters: {
    docs: {
      source: {
        format: false,
        code: `
const init = async () => {
  const imageUrl =
  'https://images.unsplash.com/photo-1650346910623-3a0d9ee1f2ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2371&q=80';

  const response = await fetch(imageUrl);
  const imageBlob = await response.blob();
  const file = new File([imageBlob], 'File 1', { type: 'image/jpeg' });

  const imagePreview = document.getElementById('imagePreview');
  imagePreview.file = file;
}

init();

<uui-icon-registry-essential>
  <uui-file-preview
    id="imagePreview">
    <uui-action-bar slot="actions">
      <uui-button color="danger">
        <uui-icon name="delete"></uui-icon>
      </uui-button>
    </uui-action-bar>
  </uui-file-preview>
</uui-icon-registry-essential>
        `,
      },
    },
  },
};
