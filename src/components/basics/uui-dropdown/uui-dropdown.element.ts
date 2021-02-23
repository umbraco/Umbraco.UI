import { LitElement, html, css, query, property } from 'lit-element';
import { UUIDropdownEvent } from './UUIDropdownEvent';
import { createPopper } from './popper';
/**
 *  @element uui-dropdown
 * @event dropdown-close fired when dropdown is closing
 * @event dropdown-open fired when dropdown is opening
 * @slot interactive - for interactive element that will open dropdown
 * @slot input - for input
 * @slot for dropdopwn content
 */

//TODO - rename that to something with popover or popup proxy and add other sides, not only down
export class UUIDropdownElement extends LitElement {
  static styles = [
    css`
      :host {
        /* position: relative; */
        display: inline-block;
        vertical-align: middle;
        margin: 300vh 0;
        box-sizing: border-box;
      }

      #data-container {
        /* position: absolute; */
        box-sizing: border-box;
        border-radius: var(--uui-size-border-radius);
        box-shadow: 0 5px 20px rgb(0 0 0 / 30%);
      }

      :host([position='bottom']) #data-container {
        margin-top: var(--uui-size-base-unit);
        transform-origin: top center;
      }

      :host([position='top']) #data-container {
        /* bottom: 100%; */
        margin-bottom: var(--uui-size-base-unit);
        transform-origin: bottom center;
      }

      ::slotted(*) {
        border-radius: var(--uui-size-border-radius);
      }
    `,
  ];

  private _popper!: any;

  @property({ type: String, reflect: true })
  position = 'bottom';

  @query('#data-container')
  _dropdownContainer!: HTMLElement;

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this.closeDropdownOnOutsideClick);
    console.log(this.shadowRoot);
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.closeDropdownOnOutsideClick);
    super.disconnectedCallback();
  }

  private _keyframes = [
    { transform: 'scaleY(0)', opacity: 0 },
    { opacity: 0, offset: 0.5 },
    { opacity: 1, offset: 0.9 },
    { transform: 'scaleY(1)' },
  ];

  private _reducedMotion() {
    const mediaQuerry = window.matchMedia('(prefers-reduced-motion: reduce)');
    return !mediaQuerry || mediaQuerry.matches;
  }

  private _options: KeyframeAnimationOptions = {
    duration: 300,
    fill: 'both',
    easing: `${
      this._reducedMotion() //? can it be like that? it works if you dont change mediaQuerry on the fly
        ? 'steps(1)'
        : 'cubic-bezier(.69,.67,.59,1.15)'
    }`,
  };
  // /'cubic-bezier(.41,.98,.86,1.19)'
  private _animation!: Animation;

  firstUpdated() {
    // this._animation = this._dropdownContainer.animate(
    //   this._keyframes,
    //   this._options
    // );
    // this._animation.pause();
    // this._animation.currentTime = 0;
    this._popper = createPopper(this, this._dropdownContainer, {
      placement: 'bottom',
      modifiers: [
        {
          name: 'flip',
          options: {
            padding: 8,
          },
        },
      ],
    });

    // await this.updateComplete;
    // this._popoutHeight = window.getComputedStyle(
    //   this._dropdownContainer
    // ).height;
    console.log(this._popper);
  }

  private _isOpen = false;
  @property({ type: Boolean, reflect: true, attribute: 'open' })
  get isOpen() {
    return this._isOpen;
  }

  set isOpen(newVal) {
    const oldVal = this._isOpen;
    if (newVal != oldVal) {
      this._isOpen = newVal;
      if (newVal) {
        this.dispatchEvent(new UUIDropdownEvent(UUIDropdownEvent.OPEN));

        this._popper.update();
      } else {
        this.dispatchEvent(new UUIDropdownEvent(UUIDropdownEvent.CLOSE));
      }
      // this.toggleOpen(newVal);
      this.requestUpdate('isOpen', oldVal);
    }
  }

  public toggleOpen(isOpen: boolean) {
    this._animation.play();
    this._animation.finished.then(() => {
      this._animation.pause();
      this._animation.playbackRate = isOpen ? -1 : 1;
    });
  }

  protected closeDropdownOnOutsideClick = (e: MouseEvent) => {
    e.stopPropagation();
    const path = e.composedPath();

    if (path.includes(this)) {
      return;
    }
    if (this.isOpen) {
      this.isOpen = false;
    }
  };

  render() {
    return html`
      <slot name="input"></slot>
      <slot name="toggle" @click="${() => (this.isOpen = !this.isOpen)}"></slot>

      <div id="data-container" part="data-container">
        <slot></slot>
      </div>
    `;
  }
}
