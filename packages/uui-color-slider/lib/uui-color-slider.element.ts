import { LitElement, html, css } from 'lit';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

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
        --slider-border-radius: 3px;
        display: block;
      }
      .color-slider {
        position: relative;
        height: var(--slider-height);
        background-image: var(--slider-bg);
        background-size: var(--slider-bg-size);
        background-position: var(--slider-bg-position);
        border-radius: var(--slider-border-radius);
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
        border-radius: var(--slider-border-radius);
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
      }
    `,
  ];

  @state() private isVertical = false;

 /**
 * This is a minimum value of the slider.
 * @type {number}
 * @attr
 * @default 0
 */
  @property({ type: Number })
  min = 0;

  /**
   * This is a maximum value of the slider.
   * @type {number}
   * @attr
   * @default 100
   */
  @property({ type: Number })
  max = 100;

  /** The minimum increment value allowed by the control. */
  @property({ type: Number }) precision = 1;

  /**
  * The orientation of the slider.
  * @type {string}
  * @attr
  * @default 'horizontal'
  */
  @property({ type: String })
  orientation: 'horizontal' | 'vertical' = 'horizontal';

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

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    
    if (this.orientation === 'vertical') {
      this.isVertical = true;
    } else {
      this.isVertical = false;
    }
  }

  handleDrag(event: PointerEvent) {

    if (this.disabled)
      return;

    const container = this.shadowRoot!.querySelector<HTMLElement>('.color-slider')!;
    const handle = container.querySelector<HTMLElement>('.color-slider__handle')!;
    const { width, height } = container.getBoundingClientRect();

    handle.focus();
    event.preventDefault();

    drag(container, {
      onMove: (x, y) => {
        if (this.isVertical) {
          this.value = clamp((y / height) * this.max, this.min, this.max);
        }
        else {
          this.value = clamp((x / width) * this.max, this.min, this.max);
        }
        
        this.syncValues();
      },
      initialEvent: event
    });
  }

  handleClick(event: MouseEvent) {

    if (this.disabled)
      return;
    
    this.value = this.getValueFromMousePosition(event);
    this.syncValues();
  }

  handleKeyDown(event: KeyboardEvent) {
    const increment = event.shiftKey ? 10 : 1;

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.value = clamp(this.value - increment, this.min, this.max);
      this.syncValues();
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.value = clamp(this.value + increment, this.min, this.max);
      this.syncValues();
    }

    if (event.key === 'Home') {
      event.preventDefault();
      this.value = this.min;
      this.syncValues();
    }

    if (event.key === 'End') {
      event.preventDefault();
      this.value = this.max;
      this.syncValues();
    }
  }

  getValueFromMousePosition(event: MouseEvent) {
    if (this.isVertical) {
      return this.getValueFromYCoordinate(event.clientY);
    }
    return this.getValueFromXCoordinate(event.clientX);
  }

  getValueFromTouchPosition(event: TouchEvent) {
    if (this.isVertical) {
      return this.getValueFromYCoordinate(event.touches[0].clientY);
    }
    return this.getValueFromXCoordinate(event.touches[0].clientX);
  }

  getValueFromXCoordinate(coordinate: number) {
    const container = this.shadowRoot!.querySelector<HTMLElement>('.color-slider')!;
    const containerLeft = container.getBoundingClientRect().left;
    const containerWidth = container.getBoundingClientRect().width;
    
    return clamp(
      this.roundToPrecision(((coordinate - containerLeft) / containerWidth) * this.max, this.precision),
      this.min,
      this.max
    );
  }

  getValueFromYCoordinate(coordinate: number) {
    const container = this.shadowRoot!.querySelector<HTMLElement>('.color-slider')!;
    const containerTop = container.getBoundingClientRect().top;
    const containerHeight = container.getBoundingClientRect().height;

    console.log("containerHeight", containerHeight);
    console.log("containerTop", containerTop);
    console.log("coordinate", coordinate);

    console.log("test", this.max - ((coordinate - containerTop) / containerHeight) * this.max);
    
    return clamp(
      this.roundToPrecision(((coordinate - containerTop) / containerHeight) * this.max, this.precision),
      this.min,
      this.max
    );
  }

  roundToPrecision(numberToRound: number, precision = 0.5) {
    const multiplier = 1 / precision;
    return Math.ceil(numberToRound * multiplier) / multiplier;
  }

  syncValues() {
    
    this.dispatchEvent(new UUIColorSliderEvent(UUIColorSliderEvent.CHANGE));
  }

  render() {
    return html`
        <div
          part="slider"
          class="color-slider"
          class=${classMap({
            'color-slider': true,
            'color-slider--vertical': this.isVertical,
            'color-slider--disabled': this.disabled
          })}
          role="slider"
          aria-label="${this.label}"
          aria-orientation="${this.orientation}"
          aria-valuemin="${Math.round(this.min)}"
          aria-valuemax="${Math.round(this.max)}"
          aria-valuenow="${Math.round(this.value)}"
          @click=${this.handleClick}
          @mousedown=${this.handleDrag}
          @touchstart=${this.handleDrag}
        >
          <slot name="detail"></slot>
          <span
            class="color-slider__handle"
            style=${styleMap({
              top: `${!this.isVertical || this.value === 0 ? 0 : 100 / (this.max / this.value)}%`,
              left: `${this.isVertical || this.value === 0 ? 0 : 100 / (this.max / this.value)}%`
            })}
            tabindex=${ifDefined(this.disabled ? undefined : '0')}
            @keydown=${this.handleKeyDown}
          ></span>
        </div>
        ${this.value}`;
    }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-color-slider': UUIColorSliderElement;
  }
}