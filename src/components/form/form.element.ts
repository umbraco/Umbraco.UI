import { html, LitElement } from 'lit';

/**
 * @element uui-form
 * @description uui-form must wrap a native form element. This ensures the User Experiences of the form fits with the Umbraco standard.
 */
export class UUIFormElement extends LitElement {
  private _formElement: HTMLFormElement | null = null;

  public getFormElement(): HTMLFormElement | null {
    return this._formElement;
  }

  private _onSlotChanged(event: Event) {
    if (this._formElement) {
      this._formElement.removeEventListener('submit', this._onSubmit);
      this._formElement.removeEventListener('reset', this._onReset);
    }

    const formElements = (event.target as HTMLSlotElement)
      .assignedNodes({ flatten: true })
      .filter(x => x instanceof HTMLFormElement) as HTMLFormElement[];
    this._formElement = formElements.length > 0 ? formElements[0] : null;

    if (this._formElement) {
      this._formElement.setAttribute('novalidate', '');
      this._formElement.addEventListener('submit', this._onSubmit);
      this._formElement.addEventListener('reset', this._onReset);
    }
  }

  private _onSubmit(event: SubmitEvent) {
    if (event.target === null) {
      return;
    }
    const formNode = event.target as HTMLFormElement;
    const isValid = formNode.checkValidity();

    if (!isValid) {
      // submit-invalid attribute is used by descendant form controls to check wether submit has been requested without succeeding.
      formNode.setAttribute('submit-invalid', '');
      return;
    }
    formNode.removeAttribute('submit-invalid');
  }

  private _onReset(event: Event) {
    if (event.target === null) {
      return;
    }
    (event.target as HTMLFormElement).removeAttribute('submit-invalid');
  }

  render() {
    return html`<slot @slotchange=${this._onSlotChanged}></slot>`;
  }
}
