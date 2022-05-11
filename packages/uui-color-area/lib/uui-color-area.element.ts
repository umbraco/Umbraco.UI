import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { property, state } from 'lit/decorators.js';
import { css, html, LitElement } from 'lit';

import { styleMap } from 'lit/directives/style-map.js';

/**
 * @element uui-color-area
 */
@defineElement('uui-color-area')
export class UUIColorAreaElement extends LitElement {
      static styles = [
    css`
      :host {
        --grid-width: 280px;
        --grid-height: 200px;
        --grid-handle-size: 16px;
      }

      .color-area {
        position: relative;
        height: var(--grid-height);
        width: var(--grid-width);
        background-image: linear-gradient(
            to bottom,
            hsl(0, 0%, 100%) 0%,
            hsla(0, 0%, 100%, 0) 50%,
            hsla(0, 0%, 0%, 0) 50%,
            hsl(0, 0%, 0%) 100%
          ),
          linear-gradient(to right, hsl(0, 0%, 50%) 0%, hsla(0, 0%, 50%, 0) 100%);
        border-top-left-radius: var(--sl-border-radius-medium);
        border-top-right-radius: var(--sl-border-radius-medium);
        cursor: crosshair;
      }

      .color-area__handle {
        position: absolute;
        width: var(--grid-handle-size);
        height: var(--grid-handle-size);
        border-radius: 50%;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
        border: solid 2px white;
        margin-top: calc(var(--grid-handle-size) / -2);
        margin-left: calc(var(--grid-handle-size) / -2);
      }
    `,
  ];

  @state() private hue = 0;
  @state() private saturation = 100;
  @state() private lightness = 100;
  @state() private alpha = 100;

  handleGridDrag(event: Event) {
    
  }

  handleGridKeyDown(event: Event) {
    
  }

    render(){

      const x = this.saturation;
      const y = 100 - this.lightness;

      return html`
        <div
          class="color-area"
          style=${styleMap({ backgroundColor: `hsl(${this.hue}deg, 100%, 50%)` })}
          @mousedown=${this.handleGridDrag}
          @touchstart=${this.handleGridDrag}
        >
          <span
            class="color-area__grid-handle"
            style=${styleMap({
              top: `${y}%`,
              left: `${x}%`,
              backgroundColor: `hsla(${this.hue}deg, ${this.saturation}%, ${this.lightness}%)`
            })}
            role="application"
            aria-label="HSL"
            @keydown=${this.handleGridKeyDown}
          ></span>
        </div>
      `;
    }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-color-area': UUIColorAreaElement;
  }
}
