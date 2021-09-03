import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

//this is not used anywhere. YET!!!

export class UUIFormAssociatedElement extends LitElement {
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
    this._internals.setFormValue(this._value);
    this.requestUpdate('value', oldValue);
  }
}
