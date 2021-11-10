import { LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';

type Constructor<T = {}> = new (...args: any[]) => T;

export declare class FormControlMixinInterface {
  formAssociated: boolean;
  get value(): FormDataEntryValue;
  set value(newValue: FormDataEntryValue);
  name: string;
  disabled: boolean;
  _value: FormDataEntryValue;
  _internals: any;
}

/**
 * The mixin allows a custom element to participate in HTML forms.
 *
 * @param {Object} superClass - superclass to be extended.
 * @mixin
 */
export const FormControlMixin = <T extends Constructor<LitElement>>(
  superClass: T
) => {
  class FormControlMixinClass extends superClass {

    /**
     * This is a static class field indicating that the element is can be used inside a native form and participate in its events. 
     * It may require a polyfill, check support here https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/attachInternals.
     * Read more about form controls here https://web.dev/more-capable-form-controls/
     * @type {boolean}
     */
    static readonly formAssociated = true;

    /**
     * This is a name property of the component.
     * @type {string}
     * @attr
     * @default ''
     */
    @property({ type: String })
    name = '';

    /**
     * This is a value property
     * @type {string}
     * @attr
     * @default ''
     */
    @property()
    get value() {
      return this._value;
    }
    set value(newValue) {
      const oldValue = this._value;
      this._value = newValue;
      if (
        'ElementInternals' in window &&
        //@ts-ignore
        'setFormValue' in window.ElementInternals.prototype
      ) {
        this._internals.setFormValue(this._value);
      }
      this.requestUpdate('value', oldValue);
    }

    /**
     * Disables the input.
     * @type {boolean}
     * @attr
     * @default false
     */
    @property({ type: Boolean, reflect: true })
    disabled = false;


    private _value: FormDataEntryValue = '';
    private _internals: any;

    constructor(...args: any[]) {
      super(...args);
      this._internals = (this as any).attachInternals();
    }

    public formResetCallback() {
      this.value = this.getAttribute('value') || '';
    }
    
    public checkValidity () {
      return this._internals?.checkValidity();
    }

  }
  return FormControlMixinClass as unknown as Constructor<FormControlMixinInterface> & T;
};
