import { LitElement, html, css } from 'lit-element';

/**
 *  @element uui-tabs-example-page
 */
export class UUIDialogExampleElement extends LitElement {
  static styles = [
    css`
      uui-dialog {
        --uui-interface-ordinary-background-color: red;
      }
    `,
  ];

  render() {
    return html` <uui-dialog>
      <uui-button slot="actions">Cancel</uui-button>
      <uui-button slot="actions" button-style="positive">Do this</uui-button>
    </uui-dialog>`;
  }
}
