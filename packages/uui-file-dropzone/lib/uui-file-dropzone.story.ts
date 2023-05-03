import { StoryFn } from '@storybook/web-components';
import { html } from 'lit';
import { UUIFileDropzoneEvent } from './UUIFileDropzoneEvents';
import { UUIFileDropzoneElement } from './uui-file-dropzone.element';

import '@umbraco-ui/uui-symbol-file-dropzone/lib';
import '.';

export default {
  id: 'uui-file-dropzone',
  title: 'Inputs/Files/File Dropzone',
  component: 'uui-file-dropzone',
  decorators: [
    (Story: any) =>
      html`<div style="font-size: 12px; margin-bottom: 20px;">
          Note: Dropzone logs dropped files in console
        </div>
        ${Story()}`,
  ],
};

const handleFileChange = (e: UUIFileDropzoneEvent) =>
  console.log('event.detail: ', e.detail);

export const AAAOverview: StoryFn = props => {
  return html`
    <uui-file-dropzone
      ?multiple=${props.multiple}
      accept=${props.accept}
      @file-change=${handleFileChange}
      label="Drop files here"></uui-file-dropzone>
  `;
};
AAAOverview.storyName = 'Overview';

export const Multiple: StoryFn = () =>
  html`
    <uui-file-dropzone
      multiple
      @file-change=${handleFileChange}
      label="Drop files here"></uui-file-dropzone>
  `;

Multiple.parameters = {
  docs: {
    description: {
      story:
        'When the multiple attribute is specified, the file input allows the user to select more than one file.',
    },
  },
};

export const Accept: StoryFn = () =>
  html`
    <uui-file-dropzone
      accept="image/*"
      @file-change=${handleFileChange}
      label="Drop files here"></uui-file-dropzone>
  `;

Accept.parameters = {
  docs: {
    description: {
      story:
        'The accept attribute takes as its value a comma-separated list of one or more file types, or unique file type specifiers, describing which file types to allow. See the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept) for more information.',
    },
  },
};

export const BrowseFiles: StoryFn = () => {
  const handleBrowse = () => {
    const dropzone = document.getElementById(
      'browse-dropzone'
    ) as UUIFileDropzoneElement;
    dropzone.browse();
  };

  return html`
    <uui-file-dropzone
      id="browse-dropzone"
      @file-change=${handleFileChange}
      label="Drop files here">
      Drop files here
      <uui-button
        style="margin-top: 9px;"
        @click=${handleBrowse}
        look="primary"
        label="Browse"></uui-button>
    </uui-file-dropzone>
  `;
};

BrowseFiles.parameters = {
  docs: {
    description: {
      story:
        'The browse method allows the user to select a file from their computer.',
    },
    source: {
      code: `
const handleBrowse = () => {
  const dropzone = document.getElementById('browse-dropzone');
  dropzone.browse();
};

<uui-file-dropzone id="browse-dropzone" label="Drop files here">
  Drop files here
  <uui-button style="margin-top: 9px;" @click="handleBrowse" look="primary">Browse</uui-button>
</uui-file-dropzone>`,
    },
  },
};
