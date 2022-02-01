import { LitElement, html } from 'lit';
import { query } from 'lit/decorators';

/**
 * @element uui-form
 */
export class UUIFormElement extends LitElement {
  @query('form')
  _form: HTMLFormElement | undefined;

  _onSubmit(event: Event) {
    event.preventDefault();

    if (!this._form) {
      return;
    }

    const isValid = this._form.checkValidity();

    if (!isValid) {
      this._form.removeAttribute('hide-validation');
      return;
    }
    this._form.setAttribute('hide-validation', '');

    const formData = new FormData(this._form);

    for (const value of formData.values()) {
      console.log(value);
    }
  }
  _onReset() {
    if (!this._form) {
      return;
    }
    this._form.setAttribute('hide-validation', '');
  }

  render() {
    return html`
      <form
        @submit="${this._onSubmit}"
        @reset="${this._onReset}"
        novalidate
        hide-validation>
        <slot></slot>
      </form>
    `;
  }
}
