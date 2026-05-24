import { defineElement } from '../../internal/registration/index.js';
import { html, LitElement } from 'lit';
import { state } from 'lit/decorators.js';

import type { UUISelectOption } from '../select/select.element.js';

const options: Array<UUISelectOption> = [
  { name: '🥕 Carrot', value: 'orange' },
  { name: '🥒 Cucumber', value: 'green' },
  { name: '🍆 Aubergine', value: 'purple' },
  { name: '🍌 Banana', value: 'yellow' },
  { name: '🍓 Strawberry', value: 'red' },
];

@defineElement('uui-input-group-select-example')
export class UUIInputGroupSelectExample extends LitElement {
  @state()
  private value = 'orange';

  private readonly emojiMap: Record<string, string> = {
    orange: '🥕',
    green: '🥒',
    purple: '🍆',
    yellow: '🍌',
    red: '🍓',
  };

  render() {
    return html`<uui-input-group>
      <uui-input-group-addon slot="prepend">
        ${this.emojiMap[this.value] ?? '🍎'}
      </uui-input-group-addon>
      <uui-select
        .options=${options}
        .value=${this.value}
        @change=${this.#onChange}></uui-select>
    </uui-input-group>`;
  }

  #onChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-input-group-select-example': UUIInputGroupSelectExample;
  }
}
