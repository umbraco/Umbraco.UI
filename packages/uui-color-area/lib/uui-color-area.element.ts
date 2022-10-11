import { colord } from 'colord';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { css, html, LitElement } from 'lit';

import { drag, clamp } from '@umbraco-ui/uui-base/lib/utils';

import { styleMap } from 'lit/directives/style-map.js';

import { UUIColorAreaEvent } from './UUIColorAreaEvents';

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
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%),
          linear-gradient(to right, #fff 0%, rgba(255, 255, 255, 0) 100%);
        border-top-left-radius: var(--sl-border-radius-medium);
        border-top-right-radius: var(--sl-border-radius-medium);
        box-sizing: border-box;
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
        transition: 150ms transform;
        box-sizing: inherit;
      }
      .color-area__handle--dragging {
        cursor: none;
        transform: scale(1.5);
      }
    `,
  ];

  @state() private isDraggingGridHandle = false;
  @state() private hue = 0;
  @state() private saturation = 100;
  @state() private lightness = 100;
  @state() private brightness = 100;
  @state() private alpha = 100;

  private _value: string | null = null;

  /** The current value. */
  @property({ type: String })
  public get value(): string | null {
    return this._value;
  }

  public set value(val: string | null) {
    let oldVal = this._value;
    this._value = val;
    this.requestUpdate('value', oldVal);
  }

  handleGridDrag(event: PointerEvent) {
    const grid = this.shadowRoot!.querySelector<HTMLElement>('.color-area')!;
    const handle = grid.querySelector<HTMLElement>('.color-area__handle')!;
    const { width, height } = grid.getBoundingClientRect();

    handle.focus();
    event.preventDefault();
    event.stopPropagation();

    this.isDraggingGridHandle = true;

    drag(grid, {
      onMove: (x, y) => {
        this.saturation = clamp((x / width) * 100, 0, 100);
        this.brightness = clamp(100 - (y / height) * 100, 0, 100);
        this.lightness = this.getLightness(this.brightness);
        console.log("saturation", this.saturation);
        console.log("lightness", this.lightness);
        this.syncValues();
      },
      onStop: () => (this.isDraggingGridHandle = false),
      initialEvent: event
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
      this.brightness = clamp(this.brightness + increment, 0, 100);
      this.lightness = this.getLightness(this.brightness);
      this.syncValues();
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.brightness = clamp(this.brightness - increment, 0, 100);
      this.lightness = this.getLightness(this.brightness);
      this.syncValues();
    }
  }

  getBrightness(lightness: number) {
    return clamp(-1 * ((200 * lightness) / (this.saturation - 200)), 0, 100);
  }

  getLightness(brightness: number) {
    return clamp(((((200 - this.saturation) * brightness) / 100) * 5) / 10, 0, 100);
  }

  getValueFromMousePosition(event: MouseEvent) {
    return this.getValueFromCoordinates(event.clientX - event.offsetX, event.clientY - event.offsetY);
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

    const color = colord({
      h: this.hue,
      s: this.saturation,
      l: this.lightness,
      a: this.alpha
    });

    this.value = color.toRgbString();

    this.dispatchEvent(new UUIColorAreaEvent(UUIColorAreaEvent.CHANGE));
  }

    render() {

      const gridHandleX = this.saturation;
      const gridHandleY = 100 - this.brightness;

      return html`
        <div
          class="color-area"
          style=${styleMap({ backgroundColor: `hsl(${this.hue}deg, 100%, 50%)` })}
          @mousedown=${this.handleGridDrag}
          @touchstart=${this.handleGridDrag}
        >
          <span
            class=${classMap({
              'color-area__handle': true,
              'color-area__handle--dragging': this.isDraggingGridHandle
            })}
            style=${styleMap({
              top: `${gridHandleY}%`,
              left: `${gridHandleX}%`,
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