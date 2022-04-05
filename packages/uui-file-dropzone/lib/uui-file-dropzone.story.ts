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
<uui-file-dropzone>
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
      @file-drop=${e => console.log('Hello', e.detail)}>
      <uui-button look="placeholder" style="width: 100px; height: 100px;">
      </uui-button>
    </uui-file-dropzone>
  `;
AAAOverview.storyName = 'Overview';

export const MultipleFiles: Story = () =>
  html`
    <uui-file-dropzone multiple>
      <uui-button look="placeholder" style="width: 100px; height: 100px;">
      </uui-button>
    </uui-file-dropzone>
  `;

export const SingleFile: Story = () =>
  html`
    <uui-file-dropzone>
      <uui-button look="placeholder" style="width: 100px; height: 100px;">
      </uui-button>
    </uui-file-dropzone>
  `;

export const WithSymbol: Story = () =>
  html`
    <uui-file-dropzone>
      <uui-button look="placeholder">
        <uui-symbol-file-dropzone></uui-symbol-file-dropzone>
      </uui-button>
    </uui-file-dropzone>
  `;

WithSymbol.parameters = {
  docs: {
    source: {
      code: `
<uui-file-dropzone>
<uui-button look="placeholder">
  <uui-symbol-file-dropzone></uui-symbol-file-dropzone>
</uui-button>
</uui-file-dropzone>`,
    },
  },
};
