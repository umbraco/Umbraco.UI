import { LitElement, html, css } from 'lit';
import { query, property } from 'lit/decorators';
import { UUIDropdownEvent } from './UUIDropdownEvent';
import { createPopper, Instance, Modifier } from './popper';
import { Placement } from '@popperjs/core/lib/enums';
/**
 * @element uui-dropdown
 * @event dropdown-close fired when dropdown is closing
 * @event dropdown-open fired when dropdown is opening
 * @slot toggle - for interactive element that will toggle dropdown
 * @slot input - for input
 * @slot for dropdopwn content
 */

//TODO - rename that to something with popover or popup proxy and add other sides, not only down
export class UUIDropdownElement extends LitElement {
  static styles = [
    css`
      :host {
        display: inline-block;
        vertical-align: middle;
        box-sizing: border-box;
      }

      #data-container {
        box-sizing: border-box;
        border-radius: var(--uui-size-border-radius);
        box-shadow: 0 5px 20px rgb(0 0 0 / 30%);
      }

      #popper[data-popper-placement='bottom'] #data-container {
        transform-origin: top center;
      }

      #popper[data-popper-placement='top'] #data-container {
        transform-origin: bottom center;
      }

      #popper[data-popper-placement='left'] #data-container {
        transform-origin: center right;
      }

      #popper[data-popper-placement='right'] #data-container {
        transform-origin: center left;
      }

      slot[name='toggle']::slotted(uui-button) {
        --uui-button-border-radius: var(
          --uui-dropdown-toggle-slot-button-border-radius
        );
        --uui-button-merge-border-left: var(
          --uui-dropdown-toggle-slot-button-merge-border-left
        );
      }

      @media (prefers-color-scheme: dark) {
        #data-container {
          border: 1px solid var(--uui-interface-border);
        }
      }
    `,
  ];

  private _popper!: Instance;

  @property({ type: String })
  position: Placement = 'bottom';

  @property({ type: Boolean })
  auto = false;

  @property({ type: Boolean, attribute: 'same-width' })
  sameWidth = false;

  @property({ type: Boolean, attribute: 'disable-outside-click' })
  disableOutsideClick = false;

  @query('#data-container')
  _dropdownContainer!: HTMLElement;

  @query('#popper')
  _popperWrapper!: HTMLElement;

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this.closeDropdownOnOutsideClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.closeDropdownOnOutsideClick);
    if (this._popper) this._popper.destroy();
  }

  private _keyframes = [
    { transform: 'scaleY(0)', opacity: 0 },
    { opacity: 0, offset: 0.5 },
    { opacity: 1, offset: 0.9 },
    { transform: 'scaleY(1)' },
  ];

  private _reducedMotion() {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    return !mediaQuery || mediaQuery.matches;
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
    this._animation = this._dropdownContainer.animate(
      this._keyframes,
      this._options
    );
    this._animation.pause();
    this._animation.currentTime = 0;
    this.createPopperInstance();
  }

  @property({ attribute: false })
  popperOwner: HTMLElement | undefined = undefined;

  private createPopperInstance() {
    const sameWidth: Modifier<any, any> = {
      name: 'sameWidth',
      enabled: this.sameWidth,
      phase: 'beforeWrite',
      requires: ['computeStyles'],
      fn: ({ state }) => {
        state.styles.popper.width = `${state.rects.reference.width}px`;
      },
      effect: ({ state }) => {
        const ref = state.elements.reference as HTMLElement;
        state.elements.popper.style.width = `${ref.offsetWidth}px`;
      },
    };

    const PopperOwner = this.popperOwner ? this.popperOwner : this;

    this._popper = createPopper(PopperOwner, this._popperWrapper, {
      placement: this.position,

      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 6],
          },
        },
        {
          name: 'flip',
          enabled: this.auto,
        },
        sameWidth,
      ],
    });
  }

  private _isOpen = false;
  @property({ type: Boolean, reflect: true, attribute: 'open' })
  get isOpen() {
    return this._isOpen;
  }

  set isOpen(newVal) {
    const oldVal = this._isOpen;
    if (newVal !== this._isOpen) {
      this._isOpen = newVal;
      if (newVal) {
        this._popper.update();
        this.dispatchEvent(new UUIDropdownEvent(UUIDropdownEvent.OPEN));
      } else {
        this.dispatchEvent(new UUIDropdownEvent(UUIDropdownEvent.CLOSE));
      }
      this.toggleOpen(newVal);
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
    if (this.disableOutsideClick !== true) {
      e.stopPropagation();
      e.preventDefault();
      const path = e.composedPath();

      if (path.includes(this)) {
        return;
      }
      if (this.isOpen) {
        this.isOpen = false;
      }
    }
  };

  render() {
    return html`
      <slot name="input"></slot>
      <slot name="toggle" @click="${() => (this.isOpen = !this.isOpen)}"></slot>

      <div id="popper">
        <div id="data-container" part="data-container">
          <slot></slot>
        </div>
      </div>
    `;
  }
}
