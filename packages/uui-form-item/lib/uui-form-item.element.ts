import { LitElement, html, css } from 'lit';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { UUILabelElement } from '@umbraco-ui/uui-label/lib';
import { property, query } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { FormControlMixinInterface } from '@umbraco-ui/uui-base/lib/mixins';
import { UUIFormControlEvent } from 'packages/uui-base/lib/events';

// TODO: Make sure validation messages can be seen for the whole Form Item. Make them follow the screen if form controls are taller than available screen height.

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
      #label {
        display: block;
      }
      #messages {
        color: var(--uui-look-danger-surface);
      }
    `,
  ];

  @property({ type: String })
  label: string | null = null;

  /**
   * Define the related element to this label.
   * @type {string | HTMLElement}
   * @attr for
   * @default null
   */
  @property({ reflect: false, attribute: 'label-for' })
  labelFor: string | HTMLElement | null = null;

  @query('uui-label')
  // @ts-ignore
  private _labelEl: UUILabelElement;

  private _messages = new Map<FormControlMixinInterface, string>();

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
      <slot name="label"></slot>
      <slot
        @invalid=${this._onControlInvalid}
        @valid=${this._onControlValid}></slot>
      <div id="messages">
        ${repeat(this._messages, item => html`<div>${item[1]}</div>`)}
        <slot name="message"></slot>
      </div>
    `;
  }
}
