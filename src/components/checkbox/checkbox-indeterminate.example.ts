import { defineElement } from '../../internal/registration';
import { UUIBooleanInputEvent } from '../boolean-input/boolean-input.js';
import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';

import '../checkbox/checkbox.js';

export type Option = {
  value: string;
  label: string;
};

@defineElement('uui-checkbox-indeterminate-example')
export default class UUICheckboxIndeterminateExample extends LitElement {
  @property()
  label = 'Indeterminate';

  @property({ attribute: false })
  parent!: Option;

  @property({ type: Array, attribute: false })
  options!: Option[];

  @property({ type: Array })
  values: string[] = [];

  private _handleParentChange(e: Event) {
    e.stopPropagation();
    const parent = e.target as HTMLInputElement;
    let values: string[] = [];
    if (parent.checked) {
      values = this.options.map(option => option.value);
    }
    this.values = values;
    this.dispatchEvent(new UUIBooleanInputEvent(UUIBooleanInputEvent.CHANGE));
  }

  private _handleOptionChange(e: Event) {
    e.stopPropagation();
    const option = e.target as HTMLInputElement;
    let values = this.values;
    if (option.checked) {
      values = values.concat(option.value);
    } else {
      values = values.filter(v => v !== option.value);
    }
    this.values = values;
    this.dispatchEvent(new UUIBooleanInputEvent(UUIBooleanInputEvent.CHANGE));
  }

  render() {
    return html`
      <fieldset name="Indeterminate" style="border: none;">
        <legend>${this.label}</legend>
        <uui-checkbox
          value=${this.parent.value}
          label=${this.parent.label}
          @change=${this._handleParentChange}
          name="indeterminate-parent"
          ?indeterminate=${this.values.length > 0 &&
          this.values.length < this.options.length}
          ?checked=${this.values.length === this.options.length}></uui-checkbox>
        <ul style="list-style: none; margin: 0;">
          ${repeat(
            this.options,
            option => option.value,
            option =>
              html` <li>
                <uui-checkbox
                  value=${option.value}
                  label=${option.label}
                  @change=${this._handleOptionChange}
                  name="indeterminate-child"
                  ?checked=${this.values.includes(option.value)}></uui-checkbox>
              </li>`,
          )}
        </ul>
      </fieldset>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-checkbox-indeterminate-example': UUICheckboxIndeterminateExample;
  }
}
