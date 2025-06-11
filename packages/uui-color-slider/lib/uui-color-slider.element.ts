import { LitElement, html, css } from 'lit';
import { Colord } from 'colord';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import {
  drag,
  clamp,
  reverseNumberInRange,
} from '@umbraco-ui/uui-base/lib/utils';

import { UUIColorSliderEvent } from './UUIColorSliderEvent';
import { LabelMixin } from '@umbraco-ui/uui-base/lib/mixins';

export type UUIColorSliderOrientation = 'horizontal' | 'vertical';
export type UUIColorSliderType = 'hue' | 'opacity' | 'saturation' | 'lightness';

/**
 *  @element uui-color-slider
 *  @description A slider that is a part of uui-color-picker
 * @fires {UUIColorSliderEvent} change - Fires when the value of the slider changes.
 * @cssprop --uui-slider-height - The height of the slider.
 * @cssprop --uui-slider-handle-size - The size of the slider handle.
 * @cssprop --uui-slider-background-image - The background image of the slider.
 * @cssprop --uui-slider-background-size - The background size of the slider.
 * @cssprop --uui-slider-background-position - The background position of the slider.
 */
@defineElement('uui-color-slider')
export class UUIColorSliderElement extends LabelMixin('label', LitElement) {
  /**
   * The type of the slider.
   * @type {UUIColorSliderType}
   * @attr
   * @default 'hue'
   */
  @property({ reflect: true }) type: UUIColorSliderType = 'hue';

  /**
   * The color value.
   * @type {string}
   * @attr
   * @default ''
   */
  @property() color: string = '';

  /**
   * This is a minimum value of the slider.
   * @type {number}
   * @attr
   * @default 0
   */
  @property({ type: Number }) min = 0;

  /**
   * This is a maximum value of the slider.
   * @type {number}
   * @attr
   * @default 100
   */
  @property({ type: Number }) max = 100;

  /**
   * The minimum increment value allowed by the slider.
   * @type {number}
   * @attr
   **/
  @property({ type: Number }) precision = 1;

  /**
   * Draws the slider in a vertical orientation.
   * @type {boolean}
   * @attr
   * @default false
   **/
  @property({ type: Boolean, reflect: true }) vertical = false;

  /**
   * The current value of the slider.
   * @type {number}
   * @attr
   * @default 0
   */
  @property() value = 0;

  /**
   * Sets the color slider to readonly mode.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /**
   * Sets the color slider to disabled.
   * @type {boolean}
   * @attr
   * @default false
   **/
  @property({ type: Boolean, reflect: true })
  disabled = false;

  private container!: HTMLElement;
  private handle!: HTMLElement;

  willUpdate(changedProperties: Map<string, any>) {
    if (changedProperties.has('type')) {
      if (this.type === 'hue') {
        this.max = this.max ?? 360;
      } else if (this.type === 'saturation') {
        this.max = this.max ?? 100;
      } else if (this.type === 'lightness') {
        this.max = this.max ?? 100;
      } else if (this.type === 'opacity') {
        this.max = this.max ?? 100;
      }

      this.precision = this.precision ?? 1;

      if (this.color) {
        const colord = new Colord(this.color);
        const { h, s, l } = colord.toHsl();

        const gradient =
          this.type === 'saturation'
            ? `linear-gradient(to ${this.vertical ? 'top' : 'right'}, hsl(${h}, 0%, ${l}%), hsl(${h}, 100%, ${l}%))`
            : this.type === 'lightness'
              ? `linear-gradient(to ${this.vertical ? 'top' : 'right'}, hsl(${h}, ${s}%, 0%), hsl(${h}, ${s}%, 100%))`
              : null;

        this.style.setProperty('--uui-slider-background-image', gradient);
      }
    }
  }

  firstUpdated() {
    this.container =
      this.shadowRoot!.querySelector<HTMLElement>('#color-slider')!;
    this.handle = this.container.querySelector<HTMLElement>(
      '#color-slider__handle',
    )!;
  }

  handleDrag(event: PointerEvent) {
    if (this.disabled || this.readonly || !this.container || !this.handle)
      return;

    const { width, height } = this.container.getBoundingClientRect();

    this.handle.focus();
    event.preventDefault();
    drag(this.container, {
      onMove: (x, y) => {
        if (this.vertical) {
          this.value = reverseNumberInRange(
            clamp((y / height) * this.max, this.min, this.max),
            this.min,
            this.max,
          );
        } else {
          this.value = clamp((x / width) * this.max, this.min, this.max);
        }

        this.syncValues();
      },
      initialEvent: event,
    });
  }

  handleClick(event: MouseEvent) {
    if (this.disabled || this.readonly) return;

    this.value = this.getValueFromMousePosition(event);
    this.syncValues();
  }

  handleKeyDown(event: KeyboardEvent) {
    const increment = event.shiftKey ? 10 : 1;

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.value = clamp(this.value - increment, this.min, this.max);
      this.syncValues();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.value = clamp(this.value + increment, this.min, this.max);
      this.syncValues();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.value = clamp(this.value + increment, this.min, this.max);
      this.syncValues();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.value = clamp(this.value - increment, this.min, this.max);
      this.syncValues();
    } else if (event.key === 'Home') {
      event.preventDefault();
      this.value = this.min;
      this.syncValues();
    } else if (event.key === 'End') {
      event.preventDefault();
      this.value = this.max;
      this.syncValues();
    }
  }

  getValueFromMousePosition(event: MouseEvent) {
    if (this.vertical) {
      return this.getValueFromYCoordinate(event.clientY);
    }
    return this.getValueFromXCoordinate(event.clientX);
  }

  getValueFromTouchPosition(event: TouchEvent) {
    if (this.vertical) {
      return this.getValueFromYCoordinate(event.touches[0].clientY);
    }
    return this.getValueFromXCoordinate(event.touches[0].clientX);
  }

  getValueFromXCoordinate(coordinate: number) {
    const { left, width } = this.container.getBoundingClientRect();
    return clamp(
      this.roundToPrecision(((coordinate - left) / width) * this.max),
      this.min,
      this.max,
    );
  }

  getValueFromYCoordinate(coordinate: number) {
    const { top, height } = this.container.getBoundingClientRect();
    return clamp(
      this.roundToPrecision(((coordinate - top) / height) * this.max),
      this.min,
      this.max,
    );
  }

  roundToPrecision(numberToRound: number) {
    const multiplier = 1 / this.precision;
    return Math.ceil(numberToRound * multiplier) / multiplier;
  }

  syncValues() {
    this.dispatchEvent(new UUIColorSliderEvent(UUIColorSliderEvent.CHANGE));
  }

  get cssPropCurrentValue() {
    return this.value === 0
      ? this.vertical
        ? 100
        : 0
      : 100 /
          (this.vertical
            ? this.max / reverseNumberInRange(this.value, this.min, this.max)
            : this.max / this.value);
  }

  render() {
    return html` <div
        part="slider"
        id="color-slider"
        role="slider"
        aria-label="${this.label}"
        aria-orientation="${this.vertical ? 'vertical' : 'horizontal'}"
        aria-valuemin="${Math.round(this.min)}"
        aria-valuemax="${Math.round(this.max)}"
        aria-valuenow="${Math.round(this.value)}"
        @click=${this.handleClick}
        @mousedown=${this.handleDrag}
        @touchstart=${this.handleDrag}
        @keydown=${this.handleKeyDown}>
        ${this.type === 'opacity'
          ? html`<div
              id="current-hue"
              style=${styleMap({
                backgroundImage: `linear-gradient(to ${
                  this.vertical ? 'top' : 'right'
                },
            transparent 0%,
            ${this.color} 100%
            )`,
              })}></div>`
          : ''}
        <!-- <slot name="detail"> </slot> -->
        <span
          id="color-slider__handle"
          style="--current-value: ${this.cssPropCurrentValue}%;"
          tabindex=${ifDefined(this.disabled ? undefined : '0')}>
        </span>
      </div>
      ${Math.round(this.value)}`;
  }

  static styles = [
    css`
      :host {
        --uui-slider-height: 15px;
        --uui-slider-handle-size: 17px;
        --uui-slider-background-image: #fff;
        --uui-slider-background-size: 100%;
        --uui-slider-background-position: top left;
        display: block;
      }

      :host([type='hue']) {
        --uui-slider-background-image: linear-gradient(
          to right,
          rgb(255, 0, 0) 0%,
          rgb(255, 255, 0) 17%,
          rgb(0, 255, 0) 33%,
          rgb(0, 255, 255) 50%,
          rgb(0, 0, 255) 67%,
          rgb(255, 0, 255) 83%,
          rgb(255, 0, 0) 100%
        );
      }

      :host([vertical][type='hue']) {
        --uui-slider-background-image: linear-gradient(
          to top,
          rgb(255, 0, 0) 0%,
          rgb(255, 255, 0) 17%,
          rgb(0, 255, 0) 33%,
          rgb(0, 255, 255) 50%,
          rgb(0, 0, 255) 67%,
          rgb(255, 0, 255) 83%,
          rgb(255, 0, 0) 100%
        );
      }

      :host([type='opacity']) {
        --uui-slider-background-image: linear-gradient(
            45deg,
            var(--uui-palette-grey) 25%,
            transparent 25%
          ),
          linear-gradient(45deg, transparent 75%, var(--uui-palette-grey) 75%),
          linear-gradient(45deg, transparent 75%, var(--uui-palette-grey) 75%),
          linear-gradient(45deg, var(--uui-palette-grey) 25%, transparent 25%);

        --uui-slider-background-size: 10px 10px;
        --uui-slider-background-position: 0 0, 0 0, -5px -5px, 5px 5px;
      }

      #color-slider {
        position: relative;
        background-image: var(--uui-slider-background-image);
        background-size: var(--uui-slider-background-size);
        background-position: var(--uui-slider-background-position);
        border-radius: 3px;
        box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);
        width: 100%;
        height: var(--uui-slider-height);
      }

      :host([vertical]) #color-slider {
        width: var(--uui-slider-height);
        height: 300px;
      }

      :host([disabled]) {
        cursor: not-allowed;
      }

      :host([disabled]) #color-slider {
        user-select: none;
        pointer-events: none;
        opacity: 0.55;
      }

      :host([readonly]) {
        cursor: default;
      }

      :host([readonly]) #color-slider {
        pointer-events: none;
      }

      #color-slider__handle {
        position: absolute;
        top: calc(50% - var(--uui-slider-handle-size) / 2);
        width: var(--uui-slider-handle-size);
        height: var(--uui-slider-handle-size);
        background-color: white;
        border-radius: 50%;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
        margin-left: calc(var(--uui-slider-handle-size) / -2);
        left: var(--current-value, 0%);
      }

      :host([vertical]) #color-slider__handle {
        left: unset;
        top: var(--current-value, 100%);
        margin-left: -1px;
        margin-top: calc(var(--uui-slider-handle-size) / -2);
      }

      ::slotted(*:first-child) {
        border-radius: 3px;
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
      }

      #current-hue {
        border-radius: 3px;
        position: absolute;
        inset: 0 0 0 0;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-color-slider': UUIColorSliderElement;
  }
}
