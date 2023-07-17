import '.';
import '@umbraco-ui/uui-action-bar/lib';
import '@umbraco-ui/uui-button/lib';
import '@umbraco-ui/uui-icon-registry-essential/lib';
import '@umbraco-ui/uui-icon/lib';
import '@umbraco-ui/uui-symbol-file-thumbnail/lib';
import '@umbraco-ui/uui-symbol-folder/lib';
import '@umbraco-ui/uui-symbol-file/lib';

import { StoryFn } from '@storybook/web-components';
import { html } from 'lit';
import { UUIFilePreviewElement } from './uui-file-preview.element';
import readme from '../README.md?raw';

export default {
  id: 'uui-file-preview',
  title: 'Displays/File Preview',
  component: 'uui-file-preview',
  parameters: {
    readme: {
      markdown: readme,
    },
  },
};

export const AAAOverview: StoryFn = () => {
  setTimeout(() => {
    const file = new File(['file'], 'File 1.txt', { type: 'text/plain' });
    const filePreview = document.getElementById(
      'filePreview',
    ) as UUIFilePreviewElement;
    filePreview.file = file;
  });

  return html`
    <uui-icon-registry-essential>
      <uui-file-preview id="filePreview">
        <uui-action-bar slot="actions">
          <uui-button color="danger">
            <uui-icon name="delete"></uui-icon>
          </uui-button>
        </uui-action-bar>
      </uui-file-preview>
    </uui-icon-registry-essential>
  `;
};
AAAOverview.storyName = 'Overview';

AAAOverview.parameters = {
  docs: {
    source: {
      code: `
const file = new File(["file"], "File 1.txt", { type: "text/plain" });
const filePreview = document.getElementById('filePreview') as UUIFilePreviewElement;
filePreview.file = file;

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
};

export const Image: StoryFn = () => {
  const init = async () => {
    const imageUrl =
      'https://images.unsplash.com/photo-1650346910623-3a0d9ee1f2ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2371&q=80';

    const response = await fetch(imageUrl);
    const imageBlob = await response.blob();
    const file = new File([imageBlob], 'File 1', { type: 'image/jpeg' });

    const imagePreview = document.getElementById(
      'imagePreview',
    ) as UUIFilePreviewElement;
    imagePreview.file = file;
  };

  init();

  return html`
    <uui-icon-registry-essential>
      <uui-file-preview id="imagePreview">
        <uui-action-bar slot="actions">
          <uui-button color="danger">
            <uui-icon name="delete"></uui-icon>
          </uui-button>
        </uui-action-bar>
      </uui-file-preview>
    </uui-icon-registry-essential>
  `;
};

Image.parameters = {
  docs: {
    source: {
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
};
