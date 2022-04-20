import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import { UUIFileDropzoneEvent } from './UUIFileDropzoneEvents';
import { UUIFileDropzoneElement } from './uui-file-dropzone.element';
import '.';

export default {
  id: 'uui-file-dropzone',
  title: 'Inputs/Files/File Dropzone',
  component: 'uui-file-dropzone',
};

const handleFileChange = (e: UUIFileDropzoneEvent) => console.log(e.detail);

export const AAAOverview: Story = props => {
  return html`
    <uui-file-dropzone
      ?multiple=${props.multiple}
      accept=${props.accept}
      @file-change=${handleFileChange}>
      Drop files here
    </uui-file-dropzone>
  `;
};
AAAOverview.storyName = 'Overview';

export const Multiple: Story = () =>
  html`
    <uui-file-dropzone multiple @file-change=${handleFileChange}
      >Drop files here</uui-file-dropzone
    >
  `;

Multiple.parameters = {
  docs: {
    storyDescription:
      'When the multiple attribute is specified, the file input allows the user to select more than one file.',
  },
};

export const Accept: Story = () =>
  html`
    <uui-file-dropzone accept="image/*" @file-change=${handleFileChange}
      >Drop files here</uui-file-dropzone
    >
  `;

Accept.parameters = {
  docs: {
    storyDescription:
      'The accept attribute takes as its value a comma-separated list of one or more file types, or unique file type specifiers, describing which file types to allow. See the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept) for more information.',
  },
};

export const BrowseFiles: Story = () => {
  const handleBrowse = () => {
    const dropzone = document.getElementById(
      'browse-dropzone'
    ) as UUIFileDropzoneElement;
    dropzone.browse();
  };

  return html`
    <uui-file-dropzone id="browse-dropzone" @file-change=${handleFileChange}>
      Drop files here
      <uui-button style="margin-top: 9px;" @click=${handleBrowse} look="primary"
        >Browse</uui-button
      >
    </uui-file-dropzone>
  `;
};

BrowseFiles.parameters = {
  docs: {
    storyDescription:
      'The browse method allows the user to select a file from their computer.',
    source: {
      code: `
const handleBrowse = () => {
  const dropzone = document.getElementById('browse-dropzone');
  dropzone.browse();
};

<uui-file-dropzone id="browse-dropzone">
  Drop files here
  <uui-button style="margin-top: 9px;" @click="handleBrowse" look="primary">Browse</uui-button>
</uui-file-dropzone>`,
    },
  },
};
