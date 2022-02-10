import { LitElement, html, css } from 'lit';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { UUILabelElement } from '@umbraco-ui/uui-label/lib';
import { property, query, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { FormControlMixinInterface } from '@umbraco-ui/uui-base/lib/mixins';
import { UUIFormControlEvent } from 'packages/uui-base/lib/events';

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
      #messages {
        color: red;
      }
    `,
  ];

  @property({ type: String })
  label: string | null = null;

  @state()
  private _required = false;

  @query('uui-label')
  // @ts-ignore
  private _labelEl: UUILabelElement;

  private _controls: FormControlMixinInterface[] = [];

  private _messages = new Map<FormControlMixinInterface, string>();

  private _onSlotChanged = (event: any) => {
    // gather form controls.
    // Listen for validation, and display messages.
    // Check if one or more is required and set the this._required = true;
    // Find first form control and set it for the label. (ability to overwrite the focus element)
    //  this._labelEl.for =

    const existingControls = [...this._controls];

    this._controls = event.target
      .assignedElements({ flatten: true })
      .filter(
        (e: any) => e.checkValidity !== undefined
      ) as FormControlMixinInterface[];

    const oldControls = existingControls.filter(
      control => this._controls.indexOf(control) === -1
    );
    oldControls.forEach(control => {
      control.removeEventListener(
        UUIFormControlEvent.INVALID as any,
        this._onControlInvalid
      );
      control.removeEventListener(
        UUIFormControlEvent.VALID as any,
        this._onControlValid
      );
    });

    const newControls = this._controls.filter(
      control => existingControls.indexOf(control) === -1
    );
    newControls.forEach(control => {
      control.addEventListener(
        UUIFormControlEvent.INVALID as any,
        this._onControlInvalid
      );
      control.addEventListener(
        UUIFormControlEvent.VALID as any,
        this._onControlValid
      );
    });
  };

  private _onControlInvalid = (e: UUIFormControlEvent) => {
    this._messages.set(e.target, e.target.validationMessage);
    this.requestUpdate();
  };

  private _onControlValid = (e: UUIFormControlEvent) => {
    this._messages.delete(e.target);
    this.requestUpdate();
  };

  render() {
    return html`
      <uui-label> ${this.label} ${this._required ? '*' : ''} </uui-label>
      <slot name="label"></slot>
      <slot @slotchange=${this._onSlotChanged}></slot>
      <div id="messages">
        ${repeat(this._messages, item => html`${item[1]}`)}
        <slot name="message"></slot>
      </div>
    `;
  }
}
