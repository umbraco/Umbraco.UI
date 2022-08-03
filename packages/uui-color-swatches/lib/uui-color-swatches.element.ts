import { LitElement, html, css } from 'lit';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { property } from 'lit/decorators.js';

import { UUIColorSwatchesEvent } from './UUIColorSwatchesEvents';

/**
 *  @element uui-color-swatches
 *  @description 
 */
 @defineElement('uui-color-swatches')
export class UUIColorSwatchesElement extends LitElement {
  static styles = [
    css`
      :host {
        --swatch-size: 25px;
        
        display: inline-block;
      }
      .color-picker__swatches {
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        grid-gap: 0.5rem;
        justify-items: center;
        padding: 0.75rem;
      }
      .color-picker__swatch {
        position: relative;
        width: var(--swatch-size);
        height: var(--swatch-size);
        border-radius: 3px;
      }
      
      .color-picker__swatch .color-picker__swatch-color {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: solid 1px rgba(0, 0, 0, 0.125);
        border-radius: inherit;
        cursor: pointer;
      }
    `,
  ];

  @property({ attribute: false }) swatches: string[] = [];

  protected setValue(e: Event) {

    this.dispatchEvent(new UUIColorSwatchesEvent(UUIColorSwatchesEvent.SELECT));
  }

  render() {
    return html`
          <div class="color-picker__swatches">
          ${this.swatches.map(swatch => {
            return html`<uui-color-swatch color="${swatch}"></uui-color-swatch>`;
          })}
          </div>
      `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-color-swatches': UUIColorSwatchesElement;
  }
} 