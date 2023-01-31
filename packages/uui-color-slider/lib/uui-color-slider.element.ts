import { LitElement, html, css } from 'lit';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { classMap } from 'lit/directives/class-map.js';
import { drag, clamp } from '@umbraco-ui/uui-base/lib/utils';

import { UUIColorSliderEvent } from './UUIColorSliderEvents';

/**
 *  @element uui-color-slider
 *  @description
 */
@defineElement('uui-color-slider')
export class UUIColorSliderElement extends LitElement {
  static styles = [
    css`
      :host {
        --slider-height: 15px;
        --slider-handle-size: 17px;
        --slider-bg: #fff;
        --slider-bg-size: 100%;
        --slider-bg-position: top left;
        display: block;
      }

      :host([vertical]) .color-slider {
        width: var(--slider-height);
        height: 300px;
      }

      :host(:not([vertical])) .color-slider {
        width: 100%;
        height: var(--slider-height);
      }

      :host(:not([vertical])) .color-slider__handle {
        left: var(--current-value, 0%);
      }

      :host([vertical]) .color-slider__handle {
        top: var(--current-value, 0%);
      }

      .color-slider {
        position: relative;
        background-image: var(--slider-bg);
        background-size: var(--slider-bg-size);
        background-position: var(--slider-bg-position);
        border-radius: 3px;
        box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);
      }
      .color-slider__handle {
        position: absolute;
        top: calc(50% - var(--slider-handle-size) / 2);
        width: var(--slider-handle-size);
        height: var(--slider-handle-size);
        background-color: white;
        border-radius: 50%;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
        margin-left: calc(var(--slider-handle-size) / -2);
      }

      .color-slider--disabled {
        user-select: none;
        cursor: not-allowed;
      }

      .color-slider--vertical {
        width: var(--slider-height);
        height: 300px;
      }

      .color-slider--vertical .color-slider__handle {
        margin-left: -1px;
        margin-top: calc(var(--slider-handle-size) / -2);
      }

      ::slotted(*:first-child) {
        border-radius: 3px;
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
      }
    `,
  ];

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

  /** The minimum increment value allowed by the slider. */
  @property({ type: Number }) precision = 1;

  /** Draws the slider in a vertical orientation. */
  @property({ type: Boolean, reflect: true }) vertical = false;

  /**
   * Label to be used for aria-label and eventually as visual label
   * @type {string}
   * @attr
   */
  @property({ type: String })
  public label!: string;

  @property() value = 0;

  /** Disables the color slider. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  private container?: HTMLElement;
  private handle?: HTMLElement;

  firstUpdated() {
    this.container =
      this.shadowRoot!.querySelector<HTMLElement>('.color-slider')!;
    this.handle = this.container.querySelector<HTMLElement>(
      '.color-slider__handle'
    )!;
  }

  handleDrag(event: PointerEvent) {
    if (this.disabled || !this.container || !this.handle) return;

    const { width, height } = this.container.getBoundingClientRect();

    this.handle.focus();
    event.preventDefault();

    drag(this.container, {
      onMove: (x, y) => {
        if (this.vertical) {
          this.value = clamp((y / height) * this.max, this.min, this.max);
        } else {
          this.value = clamp((x / width) * this.max, this.min, this.max);
        }

        this.syncValues();
      },
      initialEvent: event,
    });
  }

  handleClick(event: MouseEvent) {
    if (this.disabled) return;

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
      this.value = clamp(
        this.vertical ? this.value - increment : this.value + increment,
        this.min,
        this.max
      );
      this.syncValues();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.value = clamp(
        this.vertical ? this.value + increment : this.value - increment,
        this.min,
        this.max
      );
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
    const container =
      this.shadowRoot!.querySelector<HTMLElement>('.color-slider')!;
    const containerLeft = container.getBoundingClientRect().left;
    const containerWidth = container.getBoundingClientRect().width;

    return clamp(
      this.roundToPrecision(
        ((coordinate - containerLeft) / containerWidth) * this.max
      ),
      this.min,
      this.max
    );
  }

  getValueFromYCoordinate(coordinate: number) {
    const container =
      this.shadowRoot!.querySelector<HTMLElement>('.color-slider')!;
    const containerTop = container.getBoundingClientRect().top;
    const containerHeight = container.getBoundingClientRect().height;

    return clamp(
      this.roundToPrecision(
        ((coordinate - containerTop) / containerHeight) * this.max
      ),
      this.min,
      this.max
    );
  }

  roundToPrecision(numberToRound: number) {
    const multiplier = 1 / this.precision;
    return Math.ceil(numberToRound * multiplier) / multiplier;
  }

  syncValues() {
    this.dispatchEvent(new UUIColorSliderEvent(UUIColorSliderEvent.CHANGE));
  }

  render() {
    return html` <div
        part="slider"
        class=${classMap({
          'color-slider': true,
          'color-slider--vertical': this.vertical,
          'color-slider--disabled': this.disabled,
        })}
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
        <slot name="detail"></slot>
        <span
          class="color-slider__handle"
          style="--current-value: ${this.value === 0
            ? 0
            : 100 / (this.max / this.value)}%"
          tabindex=${ifDefined(this.disabled ? undefined : '0')}></span>
      </div>
      ${Math.round(this.value)}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-color-slider': UUIColorSliderElement;
  }
}
