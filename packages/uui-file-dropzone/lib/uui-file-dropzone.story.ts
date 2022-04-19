import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  id: 'uui-file-dropzone',
  title: 'Inputs/Files/File Dropzone',
  component: 'uui-file-dropzone',
  parameters: {
    docs: {
      source: {
        code: `
<uui-file-dropzone @file-drop="e => console.log(e.detail)">
  <uui-button look="placeholder" style="width: 100px; height: 100px;"></uui-button>
</uui-file-dropzone>`,
      },
    },
  },
};

export const AAAOverview: Story = props =>
  html`
    <uui-file-dropzone
      ?multiple=${props.multiple}
      ?directory=${props.directory}
      .accept=${props.accept}
      @file-drop=${e => console.log(e.detail)}>
      Drop files here
    </uui-file-dropzone>
  `;
AAAOverview.storyName = 'Overview';

export const MultipleFiles: Story = () =>
  html`
    <h4>Selected files are logged to the console</h4>
    <uui-file-dropzone multiple @file-drop=${e => console.log(e.detail)}>
      <uui-button look="placeholder" style="width: 100px; height: 100px;">
      </uui-button>
    </uui-file-dropzone>
  `;

MultipleFiles.parameters = {
  docs: {
    source: {
      code: `
<uui-file-dropzone multiple @file-drop="e => console.log(e.detail)">
<uui-button look="placeholder" style="width: 100px; height: 100px;"></uui-button>
</uui-file-dropzone>`,
    },
  },
};

export const SingleFile: Story = () =>
  html`
    <h4>Selected files are logged to the console</h4>
    <uui-file-dropzone @file-drop=${e => console.log(e.detail)}>
      <uui-button look="placeholder" style="width: 100px; height: 100px;">
      </uui-button>
    </uui-file-dropzone>
  `;

export const WithSymbol: Story = () =>
  html`
    <h4>Selected files are logged to the console</h4>
    <uui-file-dropzone @file-drop=${e => console.log(e.detail)}>
      <uui-button look="placeholder">
        <uui-symbol-file-dropzone></uui-symbol-file-dropzone>
      </uui-button>
    </uui-file-dropzone>
  `;

WithSymbol.parameters = {
  docs: {
    source: {
      code: `
<uui-file-dropzone @file-drop="e => console.log(e.detail)">
<uui-button look="placeholder">
  <uui-symbol-file-dropzone></uui-symbol-file-dropzone>
</uui-button>
</uui-file-dropzone>`,
    },
  },
};
