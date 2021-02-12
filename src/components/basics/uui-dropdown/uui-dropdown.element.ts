import { LitElement, html, css, query, property } from 'lit-element';
import { UUICarretElement } from '../../fragments/uui-carret/uui-carret.element';
import { UUIEvent } from '../../../event/UUIEvent';

/**
 *  @element uui-dropdown
 * @event dropdown-close fired when dropdown is closing
 * @event dropdown-open fired when dropdown is opening
 * @slot input for whatever is suppose to be visible
 * @slot for dropdopwn content
 */

//TODO - rename that to something with popover or popup proxy and add other sides, not only down
export class UUIDropdownElement extends LitElement {
  static styles = [
    css`
      :host {
        position: relative;
      }

      #flex-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5em;
        box-sizing: border-box;
      }

      #data-container {
        position: absolute;

        transform-origin: top center;
        box-sizing: border-box;
        border-radius: var(--uui-size-border-radius);
        box-shadow: 0 5px 20px rgb(0 0 0 / 30%);
      }

      ::slotted(*) {
        border-radius: var(--uui-size-border-radius);
      }
    `,
  ];

  @query('uui-carret')
  _carret!: UUICarretElement;

  @query('#data-container')
  _dropdownContainer!: HTMLElement;

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('mouseup', this.closeDropdownOnOutsideClick);
  }

  disconnectedCallback() {
    document.removeEventListener('mouseup', this.closeDropdownOnOutsideClick);
    super.disconnectedCallback();
  }

  private _keyframes = [
    { transform: 'scaleY(0)', opacity: 0 },
    { opacity: 0, offset: 0.3 },
    { opacity: 1, offset: 0.8 },
    { transform: 'scaleY(1)' },
  ];

  private _reducedMotion() {
    const mediaQuerry = window.matchMedia('(prefers-reduced-motion: reduce)');
    return !mediaQuerry || mediaQuerry.matches;
  }

  private _options: KeyframeAnimationOptions = {
    duration: 250,
    fill: 'both',
    easing: `${
      this._reducedMotion() //? can it be like that? it works if you dont change mediaQuerry on the fly
        ? 'steps(1)'
        : 'cubic-bezier(.41,.98,.86,1.19)'
    }`,
  };

  private _animation!: Animation;

  firstUpdated() {
    this._animation = this._dropdownContainer.animate(
      this._keyframes,
      this._options
    );
    this._animation.pause();
  }

  private openEvent = new UUIEvent('dropdown-open');
  private closeEvent = new UUIEvent('dropdown-close');

  private _isOpen = false;
  @property({ type: Boolean, reflect: true, attribute: 'open' })
  get isOpen() {
    return this._isOpen;
  }

  set isOpen(newVal) {
    const oldVal = this._isOpen;
    this._isOpen = newVal;
    if (newVal) this.dispatchEvent(this.openEvent);
    else this.dispatchEvent(this.closeEvent);
    this.requestUpdate('isOpen', oldVal).then(() => this.toggleOpen(newVal));
  }

  public toggleOpen(isOpen: boolean) {
    this._animation.play();
    this._animation.finished.then(() => {
      this._animation.pause();
      this._animation.playbackRate = isOpen ? -1 : 1;
    });
  }

  protected closeDropdownOnOutsideClick = (e: MouseEvent) => {
    const path = e.composedPath();

    if (path.includes(this)) {
      return;
    }
    if (this.isOpen) this.isOpen = false;
  };

  render() {
    return html`
      <div id="flex-container">
        <slot name="input"></slot>
        <slot
          name="button"
          @click="${() => (this.isOpen = !this.isOpen)}"
        ></slot>
      </div>
      <div id="data-container" part="data-container">
        <slot></slot>
      </div>
    `;
  }
}
