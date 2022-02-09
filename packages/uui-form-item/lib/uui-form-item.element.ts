import { LitElement, html, css } from 'lit';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { UUILabelElement } from '@umbraco-ui/uui-label';
import { query, state } from 'lit/decorators.js';

/**
 * @element uui-form-item
 */
@defineElement('uui-form-item')
export class UUIFormItemElement extends LitElement {
  static styles = [
    css`
      :host {
        /* Styles goes here */
      }
    `,
  ];

  @state()
  private _required = false;

  @query('uui-label')
  // @ts-ignore
  private _label: UUILabelElement;

  private _onSlotChanged = () => {
    // gather form controls.
    // Listen for validation, and display messages.
    // Check if one or more is required and set the this._required = true;
    // Find first form control and set it for the label. (ability to overwrite the focus element)
    //  this._label.for =
  };

  render() {
    return html`
      <uui-label></uui-label>
      ${this._required ? '*' : ''}
      <slot name="label"></slot>
      <slot @slotchange=${this._onSlotChanged}></slot>
      <slot name="message"></slot>
    `;
  }
}
