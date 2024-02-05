import { colord } from 'colord';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { css, html, LitElement } from 'lit';

import { drag, clamp } from '@umbraco-ui/uui-base/lib/utils';

import { styleMap } from 'lit/directives/style-map.js';

import { UUIColorAreaEvent } from './UUIColorAreaEvent';

/**
 * @element uui-color-area
 * @cssprop --uui-color-area-grid-handle-size - The size of the handle in the grid
 */
@defineElement('uui-color-area')
export class UUIColorAreaElement extends LitElement {
  @state() private isDraggingGridHandle = false;

  /**
   * The current hue.
   * @attr
   * @type number
   * @default 0
   * @min 0
   * @max 360
   * @step 1
   * @unit °
   */
  @property({ type: Number }) hue = 0;

  /**
   * The current saturation.
   * @attr
   * @type number
   * @default 0
   * @min 0
   * @max 100
   * @step 1
   * @unit %
   **/
  @property({ type: Number }) saturation = 0;

  /**
   * The current lightness.
   * @attr
   * @type number
   * @default 0
   * @min 0
   * @max 100
   * @step 1
   * @unit %
   **/
  @property({ type: Number }) lightness = 0;

  /**
   * The current brightness.
   * @attr
   * @type number
   * @default 0
   * @min 0
   * @max 100
   * @step 1
   * @unit %
   **/
  @property({ type: Number }) brightness = 0;

  /**
   * The current alpha.
   * @attr
   * @type number
   * @default 100
   * @min 0
   * @max 100
   * @step 1
   * @unit %
   */
  @property({ type: Number }) alpha = 100;

  private _value: string = '#000';

  /** The current value. */
  @property({ type: String })
  public get value(): string {
    return this._value;
  }

  public set value(newVal: string) {
    const oldVal = this._value;
    this._value = newVal;
    this.requestUpdate('value', oldVal);

    try {
      // TODO: Can we move the parsing of a color string to shared utility function?
      const parsed = colord(newVal);

      if (parsed.isValid()) {
        const { h, s, l, a } = parsed.toHsl();

        // Update hue from parsed color, but when color is black, value from hue slider may be different from zero.
        if (h !== 0) {
          this.hue = h;
        }
		
        this.lightness = l;
        this.brightness = this.getBrightness(l);
        this.alpha = a * 100;
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
        // check if coordinates are not NaN (can happen when dragging outside of the grid)
        if (isNaN(x) || isNaN(y)) return;

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

  syncValues() {
    const color = colord({
      h: this.hue,
      s: this.saturation,
      l: this.lightness,
      a: this.alpha / 100,
    });

    this._value = color.toRgbString();

    this.dispatchEvent(new UUIColorAreaEvent(UUIColorAreaEvent.CHANGE));
  }

  /** Generates a hex string from HSL values. Hue must be 0-360. All other arguments must be 0-100. */
  private getHexString(
    hue: number,
    saturation: number,
    lightness: number,
    alpha = 100
  ) {
    const color = colord(
      `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha / 100})`
    );
    if (!color.isValid()) {
      return '';
    }

    return color.toHex();
  }

  render() {
    const gridHandleX = this.saturation;
    const gridHandleY = 100 - this.brightness;

    return html`
      <div
        part="grid"
        class="color-area"
        style=${styleMap({
          backgroundColor: this.getHexString(this.hue, 100, 50),
        })}
        @mousedown=${this.handleGridDrag}
        @touchstart=${this.handleGridDrag}>
        <span
          part="grid-handle"
          class=${classMap({
            'color-area__handle': true,
            'color-area__handle--dragging': this.isDraggingGridHandle,
          })}
          style=${styleMap({
            top: `${gridHandleY}%`,
            left: `${gridHandleX}%`,
            backgroundColor: this.getHexString(
              this.hue,
              this.saturation,
              this.lightness,
              this.alpha
            ),
          })}
          role="application"
          tabindex=${ifDefined(this.disabled ? undefined : '0')}
          aria-label="HSB"
          @keydown=${this.handleGridKeyDown}></span>
      </div>
    `;
  }

  static styles = [
    css`
      :host {
        display: inline-block;
        width: 280px;
        height: 200px;
      }

      :host([disabled]) {
        cursor: not-allowed;
      }

      :host([disabled]) .color-area {
        user-select: none;
        pointer-events: none;
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
        box-sizing: border-box;
        cursor: crosshair;
        forced-color-adjust: none;
      }
      .color-area__handle {
        position: absolute;
        width: var(--uui-color-area-grid-handle-size, 16px);
        height: var(--uui-color-area-grid-handle-size, 16px);
        border-radius: 50%;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
        border: solid 2px white;
        margin-top: calc(var(--uui-color-area-grid-handle-size, 16px) / -2);
        margin-left: calc(var(--uui-color-area-grid-handle-size, 16px) / -2);
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
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-color-area': UUIColorAreaElement;
  }
}
