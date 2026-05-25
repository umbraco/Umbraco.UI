import { defineElement } from '../../internal/registration/index.js';
import { html, LitElement } from 'lit';
import { state } from 'lit/decorators.js';
import type { UUISelectOption } from '../select/select.element.js';
import type { UUISelectEvent } from '../select/UUISelectEvent.js';

import '../input-group/input-group.element.js';
import '../input-group-addon/input-group-addon.element.js';
import '../select/select.element.js';

const options: Array<UUISelectOption> = [
  { name: 'Rabbit', value: 'rabbit' },
  { name: 'Giraffe', value: 'giraffe' },
  { name: 'Shark', value: 'shark' },
  { name: 'Unicorn', value: 'unicorn' },
];

@defineElement('uui-input-group-select-example')
export class UUIInputGroupSelectExample extends LitElement {
  @state()
  private value = 'unicorn';

  private readonly emojiMap: Record<string, string> = {
    rabbit: '🐰',
    giraffe: '🦒',
    shark: '🦈',
    unicorn: '🦄',
  };

  render() {
    return html`<uui-input-group>
      <uui-input-group-addon slot="prepend">
        ${this.emojiMap[this.value] ?? ''}</uui-input-group-addon
      ><uui-select
        .options=${options}
        .value=${this.value}
        @change=${this.#onChange}></uui-select>
    </uui-input-group>`;
  }

  #onChange = (e: UUISelectEvent) => {
    this.value = e.target.value as string;
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-input-group-select-example': UUIInputGroupSelectExample;
  }
}
