import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { property, query } from 'lit/decorators.js';
import { css, html, LitElement } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import {
  drag,
  clamp,
} from '@umbraco-ui/uui-base/lib/utils';

/**
 * @element uui-split-panel
 */
@defineElement('uui-split-panel')
export class UUISplitPanelElement extends LitElement {
      static styles = [
    css`
      :host {
        --uui-divider-width: 4px;
        --uui-divider-hit-area: 12px;
        --min: 0%;
        --max: 100%;
    
        display: grid;
      }
    
      .start,
      .end {
        overflow: hidden;
      }
    
      .divider {
        flex: 0 0 var(--uui-divider-width);
        display: flex;
        position: relative;
        align-items: center;
        justify-content: center;
        background-color: var(--uui-palette-grey-light);
        color: var(--uui-palette-grey-dark);
        z-index: 1;
      }
    
      .divider:focus {
        outline: none;
      }
    
      :host(:not([disabled])) .divider:focus-visible {
        background-color: var(--uui-palette-space-cadet);
        color: var(--uui-palette-grey-dimmed);
      }
    
      :host([disabled]) .divider {
        cursor: not-allowed;
      }
    
      /* Horizontal */
      :host(:not([vertical], [disabled])) .divider {
        cursor: col-resize;
      }
    
      :host(:not([vertical])) .divider::after {
        display: flex;
        content: '';
        position: absolute;
        height: 100%;
        left: calc(var(--uui-divider-hit-area) / -2 + var(--uui-divider-width) / 2);
        width: var(--uui-divider-hit-area);
      }
    
      /* Vertical */
      :host([vertical]) {
        flex-direction: column;
      }
    
      :host([vertical]:not([disabled])) .divider {
        cursor: row-resize;
      }
    
      :host([vertical]) .divider::after {
        content: '';
        position: absolute;
        width: 100%;
        top: calc(var(--uui-divider-hit-area) / -2 + var(--uui-divider-width) / 2);
        height: var(--uui-divider-hit-area);
      }
    
      @media (forced-colors: active) {
        .divider {
          outline: solid 1px transparent;
        }
      }
    `,
  ];

  private _cachedPositionInPixels!: number;
  private _resizeObserver!: ResizeObserver;
  private _size!: number;

  @query('.divider') _divider!: HTMLElement;

  /**
   * The current position of the divider from the primary panel's edge as a percentage 0-100. Defaults to 50% of the
   * container's initial size.
   * @type {Number}
   * @attr
   * @default 50
   */
  @property({ type: Number, reflect: true }) position = 50;

  /**
   * The current position of the divider from the primary panel's edge in pixels.
   * @type {Number}
   * @attr
   * @default
   */
  @property({ attribute: 'position-in-pixels', type: Number }) positionInPixels!: number;

  /**
   * Draws the split panel in a vertical orientation with the start and end panels stacked.
   * @type {Boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true }) vertical = false;

  /**
   * Disables resizing. Note that the position may still change as a result of resizing the host element.
   * @type {Boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * If no primary panel is designated, both panels will resize proportionally when the host element is resized. If a
   * primary panel is designated, it will maintain its size and the other panel will grow or shrink as needed when the
   * host element is resized.
   */
  @property() primary?: 'start' | 'end';

  /**
   * One or more space-separated values at which the divider should snap. Values can be in pixels or percentages, e.g.
   * `"100px 50%"`.
   */
  @property() snap?: string;

  /**
   * How close the divider must be to a snap point until snapping occurs.
   * @type {Number}
   * @attr
   * @default 12
   */
  @property({ type: Number, attribute: 'snap-threshold' }) snapThreshold = 12;

  connectedCallback() {
    super.connectedCallback();
    this._resizeObserver = new ResizeObserver(entries => this.handleResize(entries));
    this.updateComplete.then(() => this._resizeObserver.observe(this));

    this.detectSize();
    this._cachedPositionInPixels = this.percentageToPixels(this.position);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._resizeObserver.unobserve(this);
  }

  private detectSize() {
    const { width, height } = this.getBoundingClientRect();
    this._size = this.vertical ? height : width;
  }

  private percentageToPixels(value: number) {
    return this._size * (value / 100);
  }

  private pixelsToPercentage(value: number) {
    return (value / this._size) * 100;
  }

  private handleDrag(event: PointerEvent) {
    const isRtl = false; //this.localize.dir() === 'rtl';

    if (this.disabled) {
      return;
    }

    // Prevent text selection when dragging
    if (event.cancelable) {
      event.preventDefault();
    }

    drag(this, {
      onMove: (x, y) => {
        let newPositionInPixels = this.vertical ? y : x;

        // Flip for end panels
        if (this.primary === 'end') {
          newPositionInPixels = this._size - newPositionInPixels;
        }

        // Check snap points
        if (this.snap) {
          const snaps = this.snap.split(' ');

          snaps.forEach(value => {
            let snapPoint: number;

            if (value.endsWith('%')) {
              snapPoint = this._size * (parseFloat(value) / 100);
            } else {
              snapPoint = parseFloat(value);
            }

            if (isRtl && !this.vertical) {
              snapPoint = this._size - snapPoint;
            }

            if (
              newPositionInPixels >= snapPoint - this.snapThreshold &&
              newPositionInPixels <= snapPoint + this.snapThreshold
            ) {
              newPositionInPixels = snapPoint;
            }
          });
        }

        this.position = clamp(this.pixelsToPercentage(newPositionInPixels), 0, 100);
      },
      initialEvent: event
    });
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (this.disabled) {
      return;
    }

    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) {
      let newPosition = this.position;
      const incr = (event.shiftKey ? 10 : 1) * (this.primary === 'end' ? -1 : 1);

      event.preventDefault();

      if ((event.key === 'ArrowLeft' && !this.vertical) || (event.key === 'ArrowUp' && this.vertical)) {
        newPosition -= incr;
      }

      if ((event.key === 'ArrowRight' && !this.vertical) || (event.key === 'ArrowDown' && this.vertical)) {
        newPosition += incr;
      }

      if (event.key === 'Home') {
        newPosition = this.primary === 'end' ? 100 : 0;
      }

      if (event.key === 'End') {
        newPosition = this.primary === 'end' ? 0 : 100;
      }

      this.position = clamp(newPosition, 0, 100);
    }
  }

  private handleResize(entries: ResizeObserverEntry[]) {
    const { width, height } = entries[0].contentRect;
    this._size = this.vertical ? height : width;

    // Resize when a primary panel is set
    if (this.primary) {
      this.position = this.pixelsToPercentage(this._cachedPositionInPixels);
    }
  }

    render() {

      const gridTemplate = this.vertical ? 'gridTemplateRows' : 'gridTemplateColumns';
      const gridTemplateAlt = this.vertical ? 'gridTemplateColumns' : 'gridTemplateRows';
      const isRtl = false; //this.localize.dir() === 'rtl';
      const primary = `
        clamp(
          0%,
          clamp(
            var(--min),
            ${this.position}% - var(--uui-divider-width) / 2,
            var(--max)
          ),
          calc(100% - var(--uui-divider-width))
        )
      `;
      const secondary = 'auto';

      if (this.primary === 'end') {
        if (isRtl && !this.vertical) {
          this.style[gridTemplate] = `${primary} var(--uui-divider-width) ${secondary}`;
        } else {
          this.style[gridTemplate] = `${secondary} var(--uui-divider-width) ${primary}`;
        }
      } else {
        if (isRtl && !this.vertical) {
          this.style[gridTemplate] = `${secondary} var(--uui-divider-width) ${primary}`;
        } else {
          this.style[gridTemplate] = `${primary} var(--uui-divider-width) ${secondary}`;
        }
      }

      // Unset the alt grid template property
      this.style[gridTemplateAlt] = '';

        return html
        `<slot name="start" part="panel start" class="start"></slot>

        <div
          part="divider"
          class="divider"
          tabindex=${ifDefined(this.disabled ? undefined : '0')}
          role="separator"
          aria-valuenow=${this.position}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label="Resize"
          @keydown=${this.handleKeyDown}
          @mousedown=${this.handleDrag}
          @touchstart=${this.handleDrag}
        >
          <slot name="divider"></slot>
        </div>
        
        <slot name="end" part="panel end" class="end"></slot>
      `;
    }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-split-panel': UUISplitPanelElement ;
  }
}
