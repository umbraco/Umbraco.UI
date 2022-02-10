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
        color: var(--uui-color-danger);
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
    // Find first form control and set it for the label. (ability to overwrite the focus element)
    //  this._labelEl.for =

    const existingControls = [...this._controls];

    this._controls = event.target
      .assignedElements({ flatten: true })
      .filter(
        (e: any) => e.pristine !== undefined
      ) as FormControlMixinInterface[];

    const oldControls = existingControls.filter(
      ctrl => this._controls.indexOf(ctrl) === -1
    );
    oldControls.forEach(ctrl => {
      ctrl.removeEventListener(
        UUIFormControlEvent.INVALID as any,
        this._onControlInvalid
      );
      ctrl.removeEventListener(
        UUIFormControlEvent.VALID as any,
        this._onControlValid
      );
    });

    let oneOrMoreIsRequired = false;

    const newControls = this._controls.filter(
      ctrl => existingControls.indexOf(ctrl) === -1
    );
    newControls.forEach(ctrl => {
      if (ctrl.required) {
        oneOrMoreIsRequired = true;
      }
      ctrl.addEventListener(
        UUIFormControlEvent.INVALID as any,
        this._onControlInvalid
      );
      ctrl.addEventListener(
        UUIFormControlEvent.VALID as any,
        this._onControlValid
      );
    });
    if (newControls.length > 0) {
      if (this._labelEl == null) {
        console.log('Missing label element');
      }
      this._labelEl.for = newControls[0];
    }

    this._required = oneOrMoreIsRequired;
  };

  private _onControlInvalid = (e: UUIFormControlEvent) => {
    const ctrl = e.target;
    if (ctrl.pristine === false) {
      this._messages.set(ctrl, ctrl.validationMessage);
    } else {
      this._messages.delete(ctrl);
    }
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
