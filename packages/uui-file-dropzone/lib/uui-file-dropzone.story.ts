import { Meta, StoryFn } from '@storybook/web-components';
import { action } from '@storybook/addon-actions';
import { html } from 'lit';
import type { UUIFileDropzoneEvent } from './UUIFileDropzoneEvent';
import type { UUIFileDropzoneElement } from './uui-file-dropzone.element';

import '@umbraco-ui/uui-button/lib';
import '@umbraco-ui/uui-symbol-file-dropzone/lib';

import './uui-file-dropzone.element';
import readme from '../README.md?raw';

const meta: Meta<typeof UUIFileDropzoneElement> = {
  id: 'uui-file-dropzone',
  title: 'Inputs/Files/File Dropzone',
  component: 'uui-file-dropzone',
  decorators: [
    Story =>
      html`<div style="font-size: 12px; margin-bottom: 20px;">
          Note: Dropzone logs dropped files in the console and the change event
          can be seen in the actions tab.
        </div>
        ${Story()}`,
  ],
  parameters: {
    readme: {
      markdown: readme,
    },
  },
};

export default meta;

const handleFileChange = (e: UUIFileDropzoneEvent) => {
  console.log('event.detail: ', e.detail);
  action('change')(e);
};

const Template: StoryFn<UUIFileDropzoneElement> = props => {
  return html`
    <uui-file-dropzone
      @change=${handleFileChange}
      .accept=${props.accept}
      ?multiple=${props.multiple}
      label="Drop files here"></uui-file-dropzone>
  `;
};

export const AAAOverview = Template.bind({});
AAAOverview.storyName = 'Overview';

export const Multiple = Template.bind({});
Multiple.args = {
  multiple: true,
};
Multiple.parameters = {
  docs: {
    description: {
      story:
        'When the multiple attribute is specified, the file input allows the user to select more than one file.',
    },
  },
};

export const Accept = Template.bind({});
Accept.args = {
  accept: 'image/*',
};
Accept.parameters = {
  docs: {
    description: {
      story:
        'The accept attribute takes as its value a comma-separated list of one or more file types, or unique file type specifiers, describing which file types to allow. See the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept) for more information.',
    },
  },
};

export const DisallowFolderUpload = Template.bind({});
DisallowFolderUpload.args = {
  DisallowFolderUpload: true,
};
DisallowFolderUpload.parameters = {
  docs: {
    description: {
      story:
        'The disallow-folder-upload attribute prevents the user from uploading folders.',
    },
  },
};

export const BrowseFiles: StoryFn<UUIFileDropzoneElement> = props => {
  const handleBrowse = () => {
    const dropzone = document.getElementById(
      'browse-dropzone',
    ) as UUIFileDropzoneElement;
    dropzone.browse();
  };

  return html`
    <uui-file-dropzone
      id="browse-dropzone"
      .accept=${props.accept}
      ?multiple=${props.multiple}
      @change=${handleFileChange}
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
