import { colord } from 'colord';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
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
        display: inline-block;
        width: 280px;
        height: 200px;
        --grid-handle-size: 16px;
      }
      :host([disabled]) {
        pointer-events: none;
        cursor: not-allowed;
        opacity: 0.55;
      }
      .color-area {
        position: relative;
        height: 100%;
        width: 100%;
        background-image: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 1) 100%
          ),
          linear-gradient(to right, #fff 0%, rgba(255, 255, 255, 0) 100%);
        border-top-left-radius: var(--sl-border-radius-medium);
        border-top-right-radius: var(--sl-border-radius-medium);
        box-sizing: border-box;
        cursor: crosshair;
        forced-color-adjust: none;
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
      .color-area__handle--empty {
        display: none;
      }
    `,
  ];

  @state() private isEmpty = false;
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

  public set value(newVal: string | null) {
    const oldVal = this._value;
    this._value = newVal;
    this.requestUpdate('value', oldVal);

    if (!newVal) {
      this.hue = 0;
      this.saturation = 100;
      this.brightness = 100;
      this.lightness = this.getLightness(this.brightness);
      this.alpha = 100;
      return;
    }

    try {
      // TODO: Can we move the parsing of a color string to shared utility function?
      const parsed = colord(newVal);

      if (parsed) {
        const hslColor = parsed.toHsl();

        this.hue = hslColor.h;
        this.saturation = hslColor.s;
        this.lightness = hslColor.l;
        this.brightness = this.getBrightness(hslColor.l);
      }
    } catch (e) {
      // TODO: Should we log this?
      console.error('Something went wrong parsing the color string.', e);
    }
  }

  /** Disables the color area. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  handleGridDrag(event: PointerEvent) {
    if (this.disabled) return;
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
        this.syncValues();
      },
      onStop: () => (this.isDraggingGridHandle = false),
      initialEvent: event,
    });
  }

  handleGridKeyDown(event: KeyboardEvent) {
    if (this.disabled) return;
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
    return clamp(
      ((((200 - this.saturation) * brightness) / 100) * 5) / 10,
      0,
      100
    );
  }

  getValueFromMousePosition(event: MouseEvent) {
    return this.getValueFromCoordinates(
      event.clientX - event.offsetX,
      event.clientY - event.offsetY
    );
  }

  getValueFromTouchPosition(event: TouchEvent) {
    return this.getValueFromCoordinates(
      event.touches[0].clientX,
      event.touches[0].clientY
    );
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
      a: this.alpha,
    });

    this.value = color.toRgbString();

    this.isEmpty = false;

    this.dispatchEvent(new UUIColorAreaEvent(UUIColorAreaEvent.CHANGE));
  }

  render() {
    const gridHandleX = this.saturation;
    const gridHandleY = 100 - this.brightness;

    return html`
      <div
        part="grid"
        class="color-area"
        style=${styleMap({ backgroundColor: `hsl(${this.hue}deg, 100%, 50%)` })}
        @mousedown=${this.handleGridDrag}
        @touchstart=${this.handleGridDrag}>
        <span
          part="grid-handle"
          class=${classMap({
            'color-area__handle': true,
            'color-area__handle--dragging': this.isDraggingGridHandle,
            'color-area__handle--empty': this.isEmpty,
          })}
          style=${styleMap({
            top: `${gridHandleY}%`,
            left: `${gridHandleX}%`,
            backgroundColor: `hsla(${this.hue}deg, ${this.saturation}%, ${this.lightness}%)`,
          })}
          role="application"
          tabindex=${ifDefined(this.disabled ? undefined : '0')}
          aria-label="HSB"
          @keydown=${this.handleGridKeyDown}></span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-color-area': UUIColorAreaElement;
  }
}