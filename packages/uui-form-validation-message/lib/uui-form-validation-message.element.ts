import { LitElement, html, css } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { FormControlMixinInterface } from '@umbraco-ui/uui-base/lib/mixins';
import { UUIFormControlEvent } from '@umbraco-ui/uui-base/lib/events';
import { property } from 'lit/decorators.js';

/**
 * @element uui-form-validation-message
 * @description - Component for displaying one or more validation messages from Form Control within the given scope. Notice: Only supports components that build on the FormControlMixing.
 */

@defineElement('uui-form-validation-message')
export class UUIFormValidationMessageElement extends LitElement {
  static styles = [
    css`
      :host {
        color: var(--uui-look-danger-surface);
      }
    `,
  ];

  @property({ attribute: false })
  public get scope(): HTMLElement | null {
    return this._scope;
  }
  public set scope(value: HTMLElement | null) {
    const oldScope = this._scope;
    const newScope = value || this;
    if (oldScope === newScope) {
      return;
    }
    if (oldScope !== null) {
      oldScope.removeEventListener(
        UUIFormControlEvent.INVALID,
        this._onControlInvalid as EventListener
      );
      oldScope.removeEventListener(
        UUIFormControlEvent.VALID,
        this._onControlValid as EventListener
      );
    }
    this._scope = newScope;
    this._scope.addEventListener(
      UUIFormControlEvent.INVALID,
      this._onControlInvalid as EventListener
    );
    this._scope.addEventListener(
      UUIFormControlEvent.VALID,
      this._onControlValid as EventListener
    );
  }
  private _scope: HTMLElement | null = null;

  constructor() {
    super();
    this.scope = this;
  }

  private _messages = new Map<FormControlMixinInterface, string>();

  private _onControlInvalid = (e: UUIFormControlEvent) => {
    const ctrl = e.target;
    if (ctrl.pristine === false) {
      // This prevents any component who does not have the pristine property to set a message. (as well we only want to show messages from fields that are NOT pristine aka. that are dirty or in a from that has been submitted)
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
      <slot></slot>
      <div id="messages">
        ${repeat(this._messages, item => html`<div>${item[1]}</div>`)}
        <slot name="message"></slot>
      </div>
    `;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'uui-form-validation-message': UUIFormValidationMessageElement;
  }
}
