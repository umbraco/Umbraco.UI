import { html } from 'lit-html';
import './index';

export default {
  title: 'Symbols/File dropzone',
  component: 'uui-file-dropzone',
};

export const Default = () =>
  html`
    <uui-file-dropzone style="display: grid;">
      <uui-button look="placeholder"
        ><uui-file-dropzone-symbol></uui-file-dropzone-symbol>Anything you put
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
        ><uui-file-dropzone-symbol></uui-file-dropzone-symbol>Anything you put
        in the slot will serve as a dropzone. <br />
        Get the files @file-drop event.
        <br />
        Click will open native input
      </uui-button></uui-file-dropzone
    >
  `;

export const AcceptsDirectories = () =>
  html`
    <uui-file-dropzone multiple directory
      ><uui-button look="placeholder"
        ><uui-file-dropzone-symbol></uui-file-dropzone-symbol>Anything you put
        in the slot will serve as a dropzone. <br />
        Get the files @file-drop event.
        <br />
        Click will open native input
      </uui-button></uui-file-dropzone
    >
  `;
