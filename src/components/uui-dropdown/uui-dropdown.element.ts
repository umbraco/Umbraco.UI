import { LitElement, html, css } from 'lit';
import { query, property } from 'lit/decorators.js';
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

      #popper {
        z-index: 1;
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

      slot:not([name])::slotted(uui-button) {
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

  constructor() {
    super();
    this.setAttribute('aria-haspopup', 'true');
  }
  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this.onOutsideClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.onOutsideClick);
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
    this._animation.finished.then(() => {
      this._animation.pause();
    });
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

    if (this._open === true) {
      this.toggleOpen(true);
    }
  }

  private _open = false;
  @property({ type: Boolean, reflect: true, attribute: 'open' })
  get open() {
    return this._open;
  }

  set open(newVal) {
    if (newVal !== this._open) {
      const oldVal = this._open;
      this._open = newVal;
      if (newVal === true) {
        if (this._popper) {
          this._popper.update();
        }
        this.dispatchEvent(new UUIDropdownEvent(UUIDropdownEvent.OPEN));
        this.setAttribute('aria-expanded', 'true');
      } else {
        this.dispatchEvent(new UUIDropdownEvent(UUIDropdownEvent.CLOSE));
        this.setAttribute('aria-expanded', 'false');
      }
      this.toggleOpen(newVal);
      this.requestUpdate('open', oldVal);
    }
  }

  public toggleOpen(open: boolean) {
    if (this._animation) {
      this._animation.playbackRate = open ? 1 : -1;
      this._animation.play();
    }
  }

  protected onOutsideClick = (e: MouseEvent) => {
    if (this.disableOutsideClick !== true) {
      e.stopPropagation();
      e.preventDefault();
      const path = e.composedPath();

      if (path.includes(this)) {
        return;
      }
      if (this.open) {
        this.open = false;
      }
    }
  };

  render() {
    return html`
      <slot></slot>

      <div id="popper">
        <div id="data-container" part="data-container">
          <slot name="dropdown"></slot>
        </div>
      </div>
    `;
  }
}
