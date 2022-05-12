import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { property, state } from 'lit/decorators.js';
import { css, html, LitElement } from 'lit';

import { drag } from '@umbraco-ui/uui-base/lib/utils/drag';
import { clamp } from '@umbraco-ui/uui-base/lib/utils/math';

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

  handleClick(event: MouseEvent) {
    console.log("handle click");
    this.getValueFromMousePosition(event);
    this.syncValues();
  }

  handleGridDrag(event: Event) {
    const grid = this.shadowRoot!.querySelector<HTMLElement>('.color-area')!;
    const handle = grid.querySelector<HTMLElement>('.color-area__handle')!;
    const { width, height } = grid.getBoundingClientRect();

    handle.focus();
    event.preventDefault();

    drag(grid, (x, y) => {
      this.saturation = clamp((x / width) * 100, 0, 100);
      this.lightness = clamp(100 - (y / height) * 100, 0, 100);
      this.syncValues();
    });
  }

  handleGridKeyDown(event: KeyboardEvent) {
    const increment = event.shiftKey ? 10 : 1;

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.saturation = clamp(this.saturation - increment, 0, 100);
      this.syncValues();
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.saturation = clamp(this.saturation + increment, 0, 100);
      this.syncValues();
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.lightness = clamp(this.lightness + increment, 0, 100);
      this.syncValues();
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.lightness = clamp(this.lightness - increment, 0, 100);
      this.syncValues();
    }
  }

  getValueFromMousePosition(event: MouseEvent) {
    return this.getValueFromCoordinates(event.clientX, event.clientY);
  }

  getValueFromTouchPosition(event: TouchEvent) {
    return this.getValueFromCoordinates(event.touches[0].clientX, event.touches[0].clientY);
  }

  getValueFromCoordinates(x: number, y: number) {
    const grid = this.shadowRoot!.querySelector<HTMLElement>('.color-area')!;
    const { width, height } = grid.getBoundingClientRect();

    this.saturation = clamp((x / width) * 100, 0, 100);
    this.lightness = clamp(100 - (y / height) * 100, 0, 100);
    this.syncValues();
  }

  syncValues() {

  }

    render(){

      const x = this.saturation;
      const y = 100 - this.lightness;

      return html`
        <div
          class="color-area"
          style=${styleMap({ backgroundColor: `hsl(${this.hue}deg, 100%, 50%)` })}
          @click=${this.handleClick}
          @mousedown=${this.handleGridDrag}
          @touchstart=${this.handleGridDrag}
        >
          <span
            class="color-area__handle"
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
