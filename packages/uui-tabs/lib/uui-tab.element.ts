import { ActiveMixin, LabelMixin } from '@umbraco-ui/uui-base/lib/mixins';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

/**
 * A single tab. Should be put into `<uui-tab-group>`,
 * @element uui-tabs
 * @slot default - for label
 * @slot icon - for icon
 * @slot extra - for extra
 * @description - All-round tab-button
 * @cssprop --uui-tab-text - Define the tab text color
 * @cssprop --uui-tab-text-hover - Define the tab text hover color
 * @cssprop --uui-tab-text-active - Define the tab text active color
 * @cssprop --uui-tab-background - Define the tab group background color
 * @cssprop --uui-tab-divider - Define the tab dividers color
 */
@defineElement('uui-tab')
export class UUITabElement extends ActiveMixin(LabelMixin('', LitElement)) {
  static styles = [
    css`
      :host {
        color: var(--uui-tab-text, var(--uui-color-interactive));
        font-family: inherit;
      }

      #button {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: var(--uui-size-2) var(--uui-size-4);
        border: none;
        box-sizing: border-box;
        min-height: 32px;
        font-size: inherit;
        height: 100%;
        min-width: 70px;
        background: none;
        color: inherit;
        cursor: pointer;
        font-family: inherit;

        /* for anchor tag: */
        text-decoration: none;
        line-height: normal;
      }

      :host(:not([active]):not([disabled])) #button:hover {
        color: var(--uui-tab-text-hover, var(--uui-color-default-emphasis));
      }

      :host(:not([active]):not([disabled])) #button:active {
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15),
          0 1px 2px rgba(0, 0, 0, 0.05);
      }

      :host([active]) #button {
        cursor: default;
      }
      :host([disabled]) #button {
        color: var(--uui-color-disabled-contrast);
        cursor: default;
      }

      #button::before {
        content: '';
        position: absolute;
        height: 0px;
        /* max-width: 50px; */
        width: calc(100% - 16px);
        left: auto;
        right: auto;
        background-color: var(--uui-color-current);
        bottom: 0;
        border-radius: 3px 3px 0 0;
        opacity: 0;
        transition: opacity ease-in 120ms, height ease-in 120ms;
      }
      #button:hover::before {
        background-color: var(--uui-color-current-emphasis);
      }
      :host([active]) #button::before {
        opacity: 1;
        height: 4px;
        transition: opacity 120ms, height ease-out 120ms;
      }

      :host([disabled]) #button::before {
        background-color: var(--uui-color-disabled-standalone);
      }

      slot[name='icon']::slotted(*) {
        font-size: 20px;
        margin-bottom: var(--uui-size-2);
      }
    `,
  ];

  /**
   * Reflects the disabled state of the element. True if tab is disabled. Change this to switch the state programmatically.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  /**
   * Set an href, this will turns the inner button into a anchor tag.
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

  constructor() {
    super();
    this.addEventListener('click', this.onHostClick);
  }

  private onHostClick(e: MouseEvent) {
    if (this.disabled) {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  }

  render() {
    return this.href
      ? html`
          <a
            id="button"
            href=${ifDefined(!this.disabled ? this.href : undefined)}
            target=${ifDefined(this.target || undefined)}
            rel=${ifDefined(
              this.target === '_blank' ? 'noopener noreferrer' : undefined
            )}
            role="tab">
            <slot name="icon"></slot>
            ${this.renderLabel()}
            <slot name="extra"></slot>
          </a>
        `
      : html`
          <button
            type="button"
            id="button"
            ?disabled=${this.disabled}
            role="tab">
            <slot name="icon"></slot>
            ${this.renderLabel()}
            <slot name="extra"></slot>
          </button>
        `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-tab': UUITabElement;
  }
}
