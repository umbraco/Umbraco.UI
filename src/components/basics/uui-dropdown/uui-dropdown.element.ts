import {
  LitElement,
  html,
  css,
  query,
  property,
  internalProperty,
  queryAll,
} from 'lit-element';
import { UUICarretElement } from '../../fragments/uui-carret/uui-carret.element';

/**
 *  @element uui-dropdown
 */

export class UUIDropdownElement extends LitElement {
  static styles = [
    css`
      :host {
        position: relative;
      }

      /* #selected-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5em;
        box-sizing: border-box;
      } */

      /* uui-carret {
        height: 100%;
        color: currentColor;
      } */

      #data-container {
        position: absolute;
        left: -1px;

        transform-origin: top center;
        box-sizing: border-box;
        box-shadow: 0 5px 20px rgb(0 0 0 / 30%);
        /* width: calc(100% + 2px); */
      }
      //TODO shadow instead of border and rounded corners
    `,
  ];

  @query('uui-carret')
  _carret!: UUICarretElement;

  @query('#data-container')
  _dropdownContainer!: HTMLElement;

  @query('slot:not([name="input"])')
  _slot!: HTMLSlotElement;

  protected get _slottedElements() {
    return this._slot ? this._slot.assignedElements({ flatten: false }) : [];
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('mouseup', this.closeDropdownOnOutsideClick);
  }

  disconnectedCallback() {
    window.removeEventListener('mouseup', this.closeDropdownOnOutsideClick);
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
    duration: 350,
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

  private _isOpen = false;
  @property({ type: Boolean, reflect: true, attribute: 'open' })
  get isOpen() {
    return this._isOpen;
  }

  set isOpen(newVal) {
    const oldVal = this._isOpen;
    this._isOpen = newVal;

    this.requestUpdate('isOpen', oldVal).then(() => {
      this.toggleOpen(newVal);
    });
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

    if (!path.includes(this)) {
      this.isOpen = false;
    }
  };

  render() {
    return html`
      <slot name="input" @click="${() => (this.isOpen = !this.isOpen)}"></slot>

      <div id="data-container" part="data-container">
        <slot></slot>
      </div>
    `;
  }
}
