import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

//this is not used anywhere. YET!!!

export class UUIFormAssociatedElement extends LitElement {
  /**
   * This is a static class field indicating that the element is can be used inside a native form and participate in its events. It may require a polyfill, check support here https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/attachInternals.  Read more about form controls here https://web.dev/more-capable-form-controls/
   * @type {boolean}
   */
  static readonly formAssociated = true;

  private _internals;

  constructor() {
    super();
    this._internals = (this as any).attachInternals();
  }

  private _value: FormDataEntryValue = '';

  @property({ type: String, reflect: true })
  public name = '';

  @property({ reflect: true })
  get value() {
    return this._value;
  }
  set value(newVal) {
    const oldValue = this._value;
    //how to put additional logic here?
    this._value = newVal;
    if (
      'ElementInternals' in window &&
      //@ts-ignore
      'setFormValue' in window.ElementInternals.prototype
    ) {
      this._internals.setFormValue(this._value);
    }
    this.requestUpdate('value', oldValue);
  }
}
