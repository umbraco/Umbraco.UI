import { LitElement, html, css } from 'lit';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { property } from 'lit/decorators.js';

import { styleMap } from 'lit/directives/style-map.js';

//import { drag } from '../../internal/drag';
//import { clamp } from '../../internal/math';

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

        display: block;
      }

      .color-slider {
        position: relative;
        height: var(--slider-height);
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
      
    `,
  ];

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

  /** Disables the color picker slider. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  handleDrag(event: Event) {
    const container = this.shadowRoot!.querySelector<HTMLElement>('.color-slider')!;
    const handle = container.querySelector<HTMLElement>('.color-slider__handle')!;
    const { width } = container.getBoundingClientRect();

    handle.focus();
    event.preventDefault();

    this.drag(container, x => {
      this.value = this.clamp((x / width) * this.max, this.min, this.max);
      this.syncValues();
    });
  }

  handleClick(event: MouseEvent) {
    console.log("handle click");
    this.value = this.getValueFromMousePosition(event);
    this.syncValues();
  }

  handleKeyDown(event: KeyboardEvent) {
    const increment = event.shiftKey ? 10 : 1;

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.value = this.clamp(this.value - increment, this.min, this.max);
      this.syncValues();
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.value = this.clamp(this.value + increment, this.min, this.max);
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
    return this.getValueFromXCoordinate(event.clientX);
  }

  getValueFromTouchPosition(event: TouchEvent) {
    return this.getValueFromXCoordinate(event.touches[0].clientX);
  }

  getValueFromXCoordinate(coordinate: number) {
    const container = this.shadowRoot!.querySelector<HTMLElement>('.color-slider')!;
    const containerLeft = container.getBoundingClientRect().left;
    const containerWidth = container.getBoundingClientRect().width;
    
    return this.clamp(
      this.roundToPrecision(((coordinate - containerLeft) / containerWidth) * this.max, this.precision),
      this.min,
      this.max
    );
  }

  roundToPrecision(numberToRound: number, precision = 0.5) {
    const multiplier = 1 / precision;
    return Math.ceil(numberToRound * multiplier) / multiplier;
  }

  // Export functon so it can be re-used?
  clamp(value: number, min: number, max: number) {
    if (value < min) {
      return min;
    }
    if (value > max) {
      return max;
    }
    return value;
  }

  // Export functon so it can be re-used?
  drag(container: HTMLElement, onMove: (x: number, y: number) => void) {
    function move(pointerEvent: PointerEvent) {
      const dims = container.getBoundingClientRect();
      const defaultView = container.ownerDocument.defaultView!;
      const offsetX = dims.left + defaultView.pageXOffset;
      const offsetY = dims.top + defaultView.pageYOffset;
      const x = pointerEvent.pageX - offsetX;
      const y = pointerEvent.pageY - offsetY;
  
      onMove(x, y);
    }
  
    function stop() {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', stop);
    }
  
    document.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerup', stop);
  }

  syncValues() {

  }

    render(){
      return html`
          <div
            class="color-slider"
            @click=${this.handleClick}
            @mousedown=${this.handleDrag}
            @touchstart=${this.handleDrag}
          >
            <span
              class="color-slider__handle"
              style=${styleMap({
                left: `${this.value === 0 ? 0 : 100 / (this.max / this.value)}%`
              })}
              role="slider"
              aria-label="${this.label}"
              aria-orientation="${this.orientation}"
              aria-valuemin="${Math.round(this.min)}"
              aria-valuemax="${Math.round(this.max)}"
              @keydown=${this.handleKeyDown}
            ></span>
          </div>
          ${this.value}`;

        /*return html`
          <div
          part="slider hue-slider"
          class="color-picker__hue color-picker__slider"
          >
          <span
            class="color-picker__slider-handle"
            style=${styleMap({
              left: `${this.hue === 0 ? 0 : 100 / (360 / this.hue)}%`
            })}
            role="slider"
            aria-label="${this.label}"
            aria-orientation="${this.orientation}"
            aria-valuemin="${Math.round(this.min)}"
            aria-valuemax="${Math.round(this.max)}"
            aria-valuenow=${Math.round(this.value)}
            tabindex=${ifDefined(this.disabled ? undefined : '0')}
          ></span>
        </div>
        `;*/
    }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-color-slider': UUIColorSliderElement;
  }
}