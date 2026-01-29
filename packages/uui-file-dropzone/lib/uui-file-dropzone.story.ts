import '.';
import readme from '../README.md?raw';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { renderSlots, spread } from '../../../storyhelpers';
import { action } from 'storybook/actions';
import { UUIFileDropzoneElement, UUIFileDropzoneEvent } from '.';

import '@umbraco-ui/uui-button/lib';

const meta: Meta = {
  id: 'uui-file-dropzone',
  component: 'uui-file-dropzone',
  title: 'Inputs/Files/File Dropzone',
  render: args =>
    html`<uui-file-dropzone ${spread(args)}
      >${renderSlots(args)}</uui-file-dropzone
    >`,
  decorators: [
    Story =>
      html`<div style="font-size: 12px; margin-bottom: 20px;">
          Note: Dropzone logs dropped files in the console. The change and
          reject events can be seen in the actions tab.
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
type Story = StoryObj;

const handleFileChange = (e: Event) => {
  if (!(e instanceof UUIFileDropzoneEvent)) {
    return;
  }
  console.log('event.detail: ', e.detail);
  action('change')(e.detail);
};

const handleFileReject = (e: Event) => {
  if (!(e instanceof UUIFileDropzoneEvent)) {
    return;
  }
  console.log('reject event.detail: ', e.detail);
  action('reject')(e.detail);
};

// Attach event listener to the story to log the event
document.addEventListener('change', handleFileChange);
document.addEventListener('reject', handleFileReject);

export const Default: Story = {};

/**
 * When the multiple attribute is specified, the file input allows the user to select more than one file.
 */
export const Multiple: Story = {
  args: {
    multiple: true,
  },
};

/**
 * The accept attribute takes as its value a comma-separated list of one or more file types, or unique file type specifiers, describing which file types to allow. See the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept) for more information.
 */
export const Accept: Story = {
  args: {
    accept: 'image/*',
  },
};

/**
 * When files are dropped or selected that don't match the accept attribute, a reject event is emitted with the rejected files.
 * Try dropping or selecting non-image files (e.g., .txt, .pdf) to see the reject event in the actions tab.
 */
export const RejectEvent: Story = {
  args: {
    accept: 'image/*',
    multiple: true,
  },
};

/**
 * The disallow-folder-upload attribute prevents the user from uploading folders.
 */
export const DisallowFolderUpload: Story = {
  args: {
    disallowFolderUpload: true,
  },
};

/**
 * The browse method allows the user to select a file from their computer.
 */
export const BrowseFiles: Story = {
  render: props => {
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
        ?disallow-folder-upload=${props.disallowFolderUpload}
        @change=${handleFileChange}
        @reject=${handleFileReject}
        label="Drop files here">
        Drop files here
        <uui-button
          style="margin-top: 9px;"
          @click=${handleBrowse}
          look="primary"
          label="Browse"></uui-button>
      </uui-file-dropzone>
    `;
  },
  parameters: {
    docs: {
      source: {
        format: false,
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
  },
};
