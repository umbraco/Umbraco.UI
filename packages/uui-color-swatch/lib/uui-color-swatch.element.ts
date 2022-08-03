import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { property } from 'lit/decorators.js';
import { css, html, LitElement } from 'lit';

import { styleMap } from 'lit/directives/style-map.js';

import {
  SelectableMixin,
  SelectOnlyMixin,
} from '@umbraco-ui/uui-base/lib/mixins';

/**
 * @element uui-color-swatch
 */
@defineElement('uui-color-swatch')
export class UUIColorSwatchElement extends SelectOnlyMixin(
  SelectableMixin(LitElement)
) {
      static styles = [
    css`
      :host {
        --swatch-size: 25px;

        position: relative;
        display:  inline-block;
      }

      :host([selectable]) {
        cursor: pointer;
      }

      .color-swatch {
        position: relative;
        width: var(--swatch-size);
        height: var(--swatch-size);
        border-radius: 3px;
      }
      .color-swatch--transparent-bg {

      }
      .color-swatch__color {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        border: 1px solid rgba(0, 0, 0, 0.125);
        border-radius: inherit;
        cursor: pointer;
      }
    `,
  ];

  @property() color = '';

  @property() label = '';

  /**
   * Set tot true to disable
   * @type {boolean}
   * @attr
   * @default false
   */
   @property({ type: Boolean, reflect: true })
   disabled = false;

  constructor() {
    super();
    this.selectable = true;
    this.unselectable = false;
  }

  render(){
    return html`
        <div
          class="color-swatch color-swatch--transparent-bg"
          role="button"
          aria-label=${this.label}
        >
        <div class="color-swatch__color" style=${styleMap({ backgroundColor: this.color })}></div>
      </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-color-swatch': UUIColorSwatchElement ;
  }
}
