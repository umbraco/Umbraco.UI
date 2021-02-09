import { LitElement, html, css, query, property } from 'lit-element';
import { UUICarretElement } from '../../fragments/uui-carret/uui-carret.element';

/**
 *  @element uui-dropdown
 */

export class UUIDropdownElement extends LitElement {
  static styles = [
    css`
      :host {
        position: relative;
        display: block;
        box-sizing: border-box;
        border: 1px solid var(--uui-interface-border);
      }

      #visible-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5em;
        box-sizing: border-box;
      }

      uui-carret {
        height: 100%;
        color: currentColor;
      }

      #dropdown-container {
        border: 1px solid var(--uui-interface-border);
        position: absolute;
        left: -1px;
        top: 100%;
        transform-origin: top center;
        box-sizing: border-box;
        width: calc(100% + 2px);
      }
    `,
  ];

  @query('uui-carret')
  _carret!: UUICarretElement;

  @query('#dropdown-container')
  _dropdownContainer!: HTMLElement;

  private _keyframes = [
    { transform: 'scaleY(0)', opacity: 0 },
    { opacity: 0, offset: 0.3 },
    { opacity: 1, offset: 0.8 },
    { transform: 'scaleY(1)' },
  ];

  private _options: KeyframeAnimationOptions = {
    duration: 350,
    fill: 'both',
    easing: 'cubic-bezier(.67,.52,.84,1.36)',
  };

  private _animation!: Animation;

  firstUpdated() {
    this._animation = this._dropdownContainer.animate(
      this._keyframes,
      this._options
    );
    this._animation.pause();
  }

  private _reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  );

  private _isOpen = false;
  @property({ type: Boolean, reflect: true, attribute: 'open' })
  get isOpen() {
    return this._isOpen;
  }

  set isOpen(newVal) {
    const oldVal = this._isOpen;
    this._isOpen = newVal;

    if (!this._reducedMotion || this._reducedMotion.matches) {
      console.log('reduced motion');
    } else {
      this.toggleOpen(newVal);
    }

    this.requestUpdate('isOpen', oldVal);
  }

  public toggleOpen(isOpen: boolean) {
    this._animation.play();
    this._animation.finished.then(() => {
      this._animation.pause();
      this._animation.playbackRate = isOpen ? -1 : 1;
    });
  }

  render() {
    return html`
      <div
        id="visible-container"
        @click="${() => (this.isOpen = !this.isOpen)}"
      >
        <span>stuff</span>
        <uui-carret ?open="${this.isOpen}"></uui-carret>
      </div>

      <div id="dropdown-container">
        <slot></slot>
      </div>
    `;
  }
}
