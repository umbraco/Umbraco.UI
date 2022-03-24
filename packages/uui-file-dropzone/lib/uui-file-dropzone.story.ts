import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  id: 'uui-file-dropzone',
  title: 'File Dropzone',
  component: 'uui-file-dropzone',
  parameters: {
    docs: {
      source: {
        code: `<uui-file-dropzone></uui-file-dropzone>`,
      },
    },
  },
};

export const Overview: Story = props =>
  html`
    <uui-file-dropzone
      ?multiple=${props.multiple}
      ?directory=${props.directory}
      .accept=${props.accept}
      ><uui-button look="placeholder"
        ><uui-symbol-file-dropzone></uui-symbol-file-dropzone>Anything you put
        in the slot will serve as a dropzone. <br />
        Get the files @file-drop event.
        <br />
        Click will open native input
      </uui-button></uui-file-dropzone
    >
  `;

export const Default = () =>
  html`
    <uui-file-dropzone style="display: grid;">
      <uui-button look="placeholder"
        ><uui-symbol-file-dropzone></uui-symbol-file-dropzone>Anything you put
        in the slot will serve as a dropzone. <br />
        Get the files @file-drop event.
        <br />
        Click will open native input
      </uui-button></uui-file-dropzone
    >
  `;

export const Multiple = () =>
  html`
    <uui-file-dropzone multiple
      ><uui-button look="placeholder"
        ><uui-symbol-file-dropzone></uui-symbol-file-dropzone>Anything you put
        in the slot will serve as a dropzone. <br />
        Get the files @file-drop event.
        <br />
        Click will open native input
      </uui-button></uui-file-dropzone
    >
  `;

export const AcceptsDirectories = () =>
  html`
    <uui-file-dropzone
      multiple
      directory
      accept=".mp4, image/*"
      @file-drop=${(e: any) => console.log('EVENT: ', e.detail)}
      ><uui-button look="placeholder"
        ><uui-symbol-file-dropzone></uui-symbol-file-dropzone>Anything you put
        in the slot will serve as a dropzone. <br />
        Get the files @file-drop event.
        <br />
        Click will open native input
      </uui-button></uui-file-dropzone
    >
  `;