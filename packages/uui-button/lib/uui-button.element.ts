import {
  UUIHorizontalShakeAnimationValue,
  UUIHorizontalShakeKeyframes,
} from '@umbraco-ui/uui-base/lib/animations';
import { demandCustomElement } from '@umbraco-ui/uui-base/lib/utils';
import {
  UUIFormControlMixin,
  LabelMixin,
  PopoverTargetMixin,
} from '@umbraco-ui/uui-base/lib/mixins';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import {
  iconCheck,
  iconWrong,
} from '@umbraco-ui/uui-icon-registry-essential/lib/svgs';
import { css, html, LitElement, nothing, TemplateResult } from 'lit';
import { property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import {
  UUIInterfaceColor,
  UUIInterfaceLook,
} from '@umbraco-ui/uui-base/lib/types';

export type UUIButtonState = undefined | 'waiting' | 'success' | 'failed';

export type UUIButtonType = 'submit' | 'button' | 'reset';

/**
 *  @element uui-button
 *  @fires {UUIButtonEvent} click - fires when the element is clicked
 *  @slot - for default content
 *  @slot label - for label content
 *  @slot extra - for extra
 *  @property {string} label - label to be used for aria-label and potentially as visual label for some components
 *  @attribute label - label to be used for aria-label and potentially as visual label for some components
 *  @description - All-around button
 *  @cssprop --uui-button-height - overwrite the button height
 *  @cssprop --uui-button-border-width - overwrite the border width
 *  @cssprop --uui-button-border-radius - overwrite the border radius
 *  @cssprop --uui-button-font-weight - overwrite the font weight
 *  @cssprop --uui-button-font-size - overwrite the font size
 *  @cssprop --uui-button-background-color - overwrite the background color
 *  @cssprop --uui-button-background-color-hover - overwrite the background color for hover state
 *  @cssprop --uui-button-background-color-disabled - overwrite the background color for disabled state
 *  @cssprop --uui-button-border-color - overwrite the border color
 *  @cssprop --uui-button-border-color-hover - overwrite the border color for hover state
 *  @cssprop --uui-button-border-color-disabled - overwrite the border color for disabled state
 *  @cssprop --uui-button-contrast - overwrite the text color
 *  @cssprop --uui-button-contrast-hover - overwrite the text color for hover state
 *  @cssprop --uui-button-contrast-disabled - overwrite the text color for disabled state
 *  @cssprop --uui-button-content-align - Overwrite justify-content alignment. Possible values: 'left', 'right', 'center'.
 *  @cssprop --uui-button-transition - Add transition to the button. Default is none.
 */
@defineElement('uui-button')
export class UUIButtonElement extends UUIFormControlMixin(
  LabelMixin('', PopoverTargetMixin(LitElement)),
) {
  /**
   * Specifies the type of button
   * @type {"submit" | "button" | "reset"}
   * @attr
   * @default "button"
   */
  @property({ type: String, reflect: true })
  type: UUIButtonType = 'button';

  /**
   * Disables the button, changes the looks of it and prevents if from emitting the click event
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Changes the look of the button to one of the predefined, symbolic looks. For example - set this to positive if you want nice, green "confirm" button.
   * @type {"default" | "primary" | "secondary" | "outline" | "placeholder"}
   * @attr
   * @default "default"
   */
  @property({ reflect: true })
  look: UUIInterfaceLook = 'default';

  /**
   * Changes the look of the button to one of the predefined, symbolic looks. For example - set this to positive if you want nice, green "confirm" button.
   * @type {"default" | "positive" | "warning" | "danger"}
   * @attr
   * @default "default"
   */
  @property({ reflect: true })
  color: UUIInterfaceColor = 'default';

  /**
   * Makes the left and right padding of the button narrower.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  compact = false;

  /**
   * Sets the state of the button. With waiting state a loader will show, the success state and fail states display icons. State is reset do default automatically after 3 seconds.
   * @type {undefined |'waiting' | 'success' | 'failed'}
   * @attr
   * @default undefined
   */
  @property({ type: String, reflect: true })
  state: UUIButtonState = undefined;

  /**
   * Set an href, this will turns the button into a anchor tag.
   * @type {string}
   * @attr
   * @default undefined
   */
  @property({ type: String })
  public href?: string;

  /**
   * Set an anchor tag target, only used when using href.
   * @type {string}
   * @attr
   * @default undefined
   */
  @property({ type: String })
  public target?: '_blank' | '_parent' | '_self' | '_top';

  /**
   * Set the rel attribute for an anchor tag, only used when using href.
   * @type {string}
   * @attr
   * @default undefined
   */
  @property({ type: String })
  public rel?: string;

  @query('#button')
  protected _button!: HTMLInputElement;

  constructor() {
    super();
    this.addEventListener('click', this._onHostClick);
  }

  protected getFormElement(): HTMLElement {
    return this._button;
  }

  async focus() {
    await this.updateComplete;
    this._button.focus();
  }
  async blur() {
    await this.updateComplete;
    this._button.blur();
  }
  async click() {
    await this.updateComplete;
    this._button.click();
  }

  private _onHostClick(e: MouseEvent) {
    if (this.disabled) {
      e.preventDefault();
      e.stopImmediatePropagation();
      return;
    }

    if (this._internals?.form) {
      switch (this.type) {
        case 'reset':
          this._internals.form.reset();
          break;
        case 'button':
          break;
        default:
          if (this._internals.form.requestSubmit) {
            this._internals.form.requestSubmit();
          } else {
            this._internals.form.dispatchEvent(new SubmitEvent('submit'));
          }
          break;
      }
    }

    this._togglePopover();
  }

  #resetStateTimeout?: number;

  // Reset the state after 2sec if it is 'success' or 'failed'.
  updated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('state')) {
      clearTimeout(this.#resetStateTimeout);
      if (this.state === 'success' || this.state === 'failed') {
        this.#resetStateTimeout = setTimeout(
          () => (this.state = undefined),
          2000,
        ) as any;
      }
    }
  }

  protected renderState(): TemplateResult | typeof nothing {
    let element: TemplateResult;
    switch (this.state) {
      case 'waiting':
        demandCustomElement(this, 'uui-loader-circle');
        element = html`<uui-loader-circle id="loader"></uui-loader-circle>`;
        break;
      case 'success':
        demandCustomElement(this, 'uui-icon');
        element = html`<uui-icon
          name="check"
          .fallback=${iconCheck.strings[0]}></uui-icon>`;
        break;
      case 'failed':
        demandCustomElement(this, 'uui-icon');
        element = html`<uui-icon
          name="wrong"
          .fallback=${iconWrong.strings[0]}></uui-icon>`;
        break;
      default:
        return nothing;
    }

    return html`<div id="state">${element}</div>`;
  }

  render() {
    return this.href
      ? html`
          <a
            id="button"
            aria-label=${ifDefined(this.label)}
            href=${ifDefined(!this.disabled ? this.href : undefined)}
            target=${ifDefined(this.target || undefined)}
            rel=${ifDefined(
              this.rel ||
                ifDefined(
                  this.target === '_blank' ? 'noopener noreferrer' : undefined,
                ),
            )}>
            ${this.renderState()} ${this.renderLabel()}
            <slot name="extra"></slot>
          </a>
        `
      : html`
          <button
            id="button"
            ?disabled=${this.disabled}
            aria-label=${ifDefined(this.label)}>
            ${this.renderState()} ${this.renderLabel()}
            <slot name="extra"></slot>
          </button>
        `;
  }

  static styles = [
    UUIHorizontalShakeKeyframes,
    css`
      :host {
        position: relative;
        display: inline-flex;
        margin-left: calc(var(--uui-button-merge-border-left, 0) * -1px);
        --uui-button-padding-left-factor: 3;
        --uui-button-padding-right-factor: 3;
        --uui-button-padding-top-factor: 1;
        --uui-button-padding-bottom-factor: 1;

        min-height: var(--uui-button-height, var(--uui-size-11));
        max-height: 100%;
        cursor: pointer;

        text-align: center;
        font-size: var(--uui-button-font-size, inherit);
        font-weight: var(--uui-button-font-weight, 500);
        transition:
          background-color 80ms,
          border-color 80ms,
          color 80ms;
      }

      :host([compact]) {
        --uui-button-padding-left-factor: 1;
        --uui-button-padding-right-factor: 1;
        --uui-button-padding-top-factor: 0;
        --uui-button-padding-bottom-factor: 0;
      }

      .label {
        line-height: normal; /** needed to reset 'a > span' */
        display: block;
        transition: opacity 120ms;
      }
      :host([state]:not([state=''])) .label {
        opacity: 0;
      }

      #state {
        position: absolute;
        opacity: 0;
        animation-name: fadeIn;
        animation-delay: 40ms;
        animation-duration: 360ms;
        animation-fill-mode: forwards;
        display: flex;
        justify-content: center;
        width: 100%;
        height: 100%;
        align-items: center;
      }

      #button {
        width: 100%;
        background-color: transparent;
        color: inherit;
        font-size: inherit;
        border-radius: inherit;
        font-family: inherit;
        font-weight: inherit;
        text-align: inherit;
        border: none;
        cursor: inherit;

        display: inline-flex;
        align-items: center;
        justify-content: var(--uui-button-content-align, center);

        /* for anchor tag: */
        text-decoration: none;
        color: currentColor;
        line-height: inherit;

        border-width: var(--uui-button-border-width, 1px);
        border-style: solid;
        border-radius: var(
          --uui-button-border-radius,
          var(--uui-border-radius)
        );
        cursor: pointer;

        padding: calc(var(--uui-size-2) * var(--uui-button-padding-top-factor))
          calc(var(--uui-size-2) * var(--uui-button-padding-right-factor))
          calc(var(--uui-size-2) * var(--uui-button-padding-bottom-factor))
          calc(var(--uui-size-2) * var(--uui-button-padding-left-factor));

        box-shadow: none;

        transition: var(--uui-button-transition, none);
      }

      #button:focus-visible {
        outline: 2px solid var(--color-emphasis);
      }

      button[disabled]:active,
      a:not([href]):active {
        animation: ${UUIHorizontalShakeAnimationValue};
      }

      /* ANIMATIONS */
      @keyframes fadeIn {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }

      @keyframes fadeOut {
        0% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }

      #icon-check,
      #icon-wrong {
        display: grid;
        place-items: center;
        width: 1.5em;
      }

      #loader {
        font-size: 1.5em;
      }
      :host([look]:not([look=''])) #loader {
        color: inherit;
      }

      /* edge case for default color */
      :host(:not([color]):not([look='primary'])),
      :host([color='']:not([look='primary'])),
      :host([color='default']:not([look='primary'])) {
        --uui-button-contrast-hover: var(--uui-color-default-emphasis);
      }

      :host([color='warning'][look='outline']) #button,
      :host([color='warning'][look='placeholder']) #button {
        --uui-button-contrast-hover: var(--color-standalone);
      }

      /** Button color attribute: */
      #button {
        --color: var(--uui-color-default);
        --color-standalone: var(--uui-color-default-standalone);
        --color-emphasis: var(--uui-color-default-emphasis);
        --color-contrast: var(--uui-color-default-contrast);
      }
      :host([color='positive']) #button {
        --color: var(--uui-color-positive);
        --color-standalone: var(--uui-color-positive-standalone);
        --color-emphasis: var(--uui-color-positive-emphasis);
        --color-contrast: var(--uui-color-positive-contrast);
      }
      :host([color='warning']) #button {
        --color: var(--uui-color-warning);
        --color-standalone: var(--uui-color-warning-standalone);
        --color-emphasis: var(--uui-color-warning-emphasis);
        --color-contrast: var(--uui-color-warning-contrast);
      }
      :host([color='danger']) #button {
        --color: var(--uui-color-danger);
        --color-standalone: var(--uui-color-danger-standalone);
        --color-emphasis: var(--uui-color-danger-emphasis);
        --color-contrast: var(--uui-color-danger-contrast);
      }
      :host([disabled]) #button {
        --color: var(--uui-color-disabled);
        --color-standalone: var(--uui-color-disabled-contrast);
        --color-emphasis: var(--uui-color-disabled);
        --color-contrast: var(--uui-color-disabled-contrast);

        cursor: default;
      }

      /** Button look attribute: */
      /* DEFAULT */
      #button {
        background-color: var(--uui-button-background-color, transparent);
        color: var(--uui-button-contrast, var(--color-standalone));
        border-color: var(--uui-button-border-color, transparent);
      }
      :host(:not([disabled]):hover) #button {
        background-color: var(
          --uui-button-background-color-hover,
          var(--uui-color-surface-emphasis)
        );
        color: var(--uui-button-contrast-hover, var(--color-standalone));
        border-color: var(--uui-button-border-color-hover, transparent);
      }
      :host([disabled]) #button {
        background-color: var(
          --uui-button-background-color-disabled,
          transparent
        );
        color: var(--uui-button-contrast-disabled, var(--color-contrast));
        border-color: var(--uui-button-border-color-disabled, transparent);
      }

      /* PRIMARY */
      :host([look='primary']) #button {
        background-color: var(--uui-button-background-color, var(--color));
        color: var(--uui-button-contrast, var(--color-contrast));
        border-color: var(--uui-button-border-color, transparent);

        /* special for primary: */
        font-weight: var(--uui-button-font-weight, 700);
      }

      :host([look='primary']:hover) #button {
        background-color: var(
          --uui-button-background-color-hover,
          var(--color-emphasis)
        );
        color: var(--uui-button-contrast-hover, var(--color-contrast));
        border-color: var(--uui-button-border-color-hover, transparent);
      }

      /* special outline offset tof primary style so you can see the outline */
      :host([look='primary']) #button:focus-visible {
        outline-offset: 2px;
      }

      :host([look='primary'][disabled]) #button {
        background-color: var(
          --uui-button-background-color-disabled,
          var(--color)
        );
        color: var(--uui-button-contrast-disabled, var(--color-contrast));
        border-color: var(--uui-button-border-color-disabled, var(--color));
      }
      /* SECONDARY */
      :host([look='secondary']) #button {
        background-color: var(
          --uui-button-background-color,
          var(--uui-color-surface-alt)
        );
        color: var(--uui-button-contrast, var(--color-standalone));
        border-color: var(--uui-button-border-color, transparent);

        /* special for secondary: */
        font-weight: var(--uui-button-font-weight, 700);
      }
      :host([look='secondary']:hover) #button {
        background-color: var(
          --uui-button-background-color-hover,
          var(--uui-color-surface-emphasis)
        );
        color: var(--uui-button-contrast-hover, var(--color-standalone));
        border-color: var(--uui-button-border-color-hover, transparent);
      }
      :host([look='secondary'][disabled]) #button {
        background-color: var(
          --uui-button-background-color-disabled,
          var(--color)
        );
        color: var(--uui-button-contrast-disabled, var(--color-contrast));
        border-color: var(--uui-button-border-color-disabled, var(--color));
      }

      /* OUTLINE */
      :host([look='outline']) #button {
        background-color: var(--uui-button-background-color, transparent);
        color: var(--uui-button-contrast, var(--color-standalone));
        border-color: var(
          --uui-button-border-color,
          var(--uui-color-border-standalone)
        );

        /* special for outline: */
        font-weight: var(--uui-button-font-weight, 700);
      }
      :host([look='outline']:not([disabled]):hover) #button {
        background-color: var(--uui-button-background-color-hover, transparent);
        color: var(--uui-button-contrast-hover, var(--color-standalone));
        border-color: var(--uui-button-border-color-hover);
      }
      :host([look='outline'][disabled]) #button {
        background-color: var(
          --uui-button-background-color-disabled,
          transparent
        );
        color: var(--uui-button-contrast-disabled, var(--color-standalone));
        border-color: var(
          --uui-button-border-color-disabled,
          var(--color-standalone)
        );
      }

      /* PLACEHOLDER */
      :host([look='placeholder']) #button {
        border-style: dashed;
        background-color: var(--uui-button-background-color, transparent);
        color: var(--uui-button-contrast, var(--color-standalone));
        border-color: var(
          --uui-button-border-color,
          var(--uui-color-border-standalone)
        );
      }
      :host([look='placeholder']:not([disabled]):hover) #button {
        background-color: var(--uui-button-background-color-hover, transparent);
        color: var(--uui-button-contrast-hover, var(--color-standalone));
        border-color: var(--uui-button-border-color-hover);
      }
      :host([look='placeholder'][disabled]) #button {
        background-color: var(
          --uui-button-background-color-disabled,
          var(--color)
        );
        color: var(--uui-button-contrast-disabled, var(--color-standalone));
        border-color: var(
          --uui-button-border-color-disabled,
          var(--color-standalone)
        );
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-button': UUIButtonElement;
  }
}
