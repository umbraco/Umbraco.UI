import { Meta, StoryObj } from '@storybook/web-components';
import { action } from '@storybook/addon-actions';
import { html } from 'lit';
import { UUIFileDropzoneEvent } from './UUIFileDropzoneEvent';
import type { UUIFileDropzoneElement } from './uui-file-dropzone.element';

import '@umbraco-ui/uui-button/lib';
import '@umbraco-ui/uui-symbol-file-dropzone/lib';

import './uui-file-dropzone.element';
import readme from '../README.md?raw';

const meta: Meta<UUIFileDropzoneElement> = {
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

type Story = StoryObj<UUIFileDropzoneElement>;

const handleFileChange = (e: Event) => {
  if (!(e instanceof UUIFileDropzoneEvent)) {
    return;
  }
  console.log('event.detail: ', e.detail);
  action('change')(e.detail);
};

// Attach event listener to the story to log the event
document.addEventListener('change', handleFileChange);

export const AAAOverview: Story = {
  name: 'Overview',
};

export const Multiple: Story = {
  args: {
    multiple: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'When the multiple attribute is specified, the file input allows the user to select more than one file.',
      },
    },
  },
};

export const Accept: Story = {
  args: {
    accept: 'image/*',
  },
  parameters: {
    docs: {
      description: {
        story:
          'The accept attribute takes as its value a comma-separated list of one or more file types, or unique file type specifiers, describing which file types to allow. See the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept) for more information.',
      },
    },
  },
};

export const DisallowFolderUpload: Story = {
  args: {
    disallowFolderUpload: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'The disallow-folder-upload attribute prevents the user from uploading folders.',
      },
    },
  },
};

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
  },
};
