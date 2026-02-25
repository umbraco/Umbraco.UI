import { UUIFormControlEvent } from '../../internal/events';
import type { UUIFormControlMixinInterface } from '../../internal/mixins';
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

/**
 * @element uui-form-validation-message
 * @description - Component for displaying one or more validation messages from UUI Form Control within the given scope.
 * Notice: Only supports components that is build on the FormControlMixing.
 * @slot - for button contents
 * @slot message - for extras in the messages container
 * @see FormControlMixin
 */

export class UUIFormValidationMessageElement extends LitElement {
  /**
   * Set the element containing Form Controls of interest.
   * @type {string}
   * @attr for
   * @default this
   */
  @property({ reflect: false, attribute: true })
  public get for(): HTMLElement | string | null {
    return this._for;
  }
  public set for(value: HTMLElement | string | null) {
    let element = null;
    if (typeof value === 'string') {
      const scope = this.getRootNode();
      element = (scope as DocumentFragment)?.getElementById(value);
    } else if (value instanceof HTMLElement) {
      element = value;
    }
    const newScope = element ?? this;
    const oldScope = this._for;

    if (oldScope === newScope) {
      return;
    }
    if (oldScope !== null) {
      oldScope.removeEventListener(
        UUIFormControlEvent.INVALID,
        this._onControlInvalid as EventListener,
      );
      oldScope.removeEventListener(
        UUIFormControlEvent.VALID,
        this._onControlValid as EventListener,
      );
    }
    this._for = newScope;
    this._for.addEventListener(
      UUIFormControlEvent.INVALID,
      this._onControlInvalid as EventListener,
    );
    this._for.addEventListener(
      UUIFormControlEvent.VALID,
      this._onControlValid as EventListener,
    );
  }
  private _for: HTMLElement | null = null;

  constructor() {
    super();
    if (this.for === null) {
      this.for = this;
    }
  }

  private readonly _messages = new Map<
    UUIFormControlMixinInterface<unknown>,
    string
  >();

  private readonly _onControlInvalid = (e: UUIFormControlEvent) => {
    const ctrl = (e as any).composedPath()[0];
    if (ctrl.pristine === false) {
      // Currently we only show message from components who does have the pristine property. (we only want to show messages from fields that are NOT pristine aka. that are dirty or in a from that has been submitted)
      this._messages.set(ctrl, ctrl.validationMessage);
    } else {
      this._messages.delete(ctrl);
    }
    this.requestUpdate('_messages');
  };

  private readonly _onControlValid = (e: UUIFormControlEvent) => {
    const ctrl = (e as any).composedPath()[0];
    this._messages.delete(ctrl);
    this.requestUpdate('_messages');
  };

  render() {
    return html`
      <slot></slot>
      <div id="messages">
        ${repeat(
          this._messages,
          item => html`<div>${unsafeHTML(item[1])}</div>`,
        )}
        <slot name="message"></slot>
      </div>
    `;
  }

  static override readonly styles = [
    css`
      #messages {
        color: var(--uui-color-invalid-standalone);
      }
    `,
  ];
}
