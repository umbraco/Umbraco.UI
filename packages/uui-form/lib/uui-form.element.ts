import { defineElement } from '@umbraco-ui/uui-base/lib/registration';

/**
 * @element uui-form
 */
@defineElement('uui-form', { extends: 'form' })
export class UUIFormElement extends HTMLFormElement {
  constructor() {
    super();
    this.setAttribute('novalidate', '');
    this.addEventListener('submit', this._onSubmit);
    this.addEventListener('reset', this._onReset);
  }

  private _onSubmit(event: Event) {
    event.preventDefault();

    const isValid = this.checkValidity();

    if (!isValid) {
      this.setAttribute('submit-invalid', '');
      return;
    }
    this.removeAttribute('submit-invalid');

    const formData = new FormData(this);

    for (const value of formData.values()) {
      console.log(value);
    }
  }

  private _onReset() {
    this.removeAttribute('submit-invalid');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-form': UUIFormElement;
  }
}
