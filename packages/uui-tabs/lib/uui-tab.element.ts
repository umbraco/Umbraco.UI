import { ActiveMixin, LabelMixin } from '@umbraco-ui/uui-base/lib/mixins';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

/**
 * A single tab. Should be put into `<uui-tab-group>`,
 * @element uui-tabs
 * @slot - for label
 * @slot icon - for icon
 * @slot extra - for extra
 * @description - All-round tab-button
 * @cssprop --uui-tab-text - Define the tab text color
 * @cssprop --uui-tab-text-hover - Define the tab text hover color
 * @cssprop --uui-tab-text-active - Define the tab text active color
 * @cssprop --uui-tab-divider - Define the tab dividers color
 * @cssprop --uui-tab-padding-horizontal - Define the tab horizontal padding
 */
@defineElement('uui-tab')
export class UUITabElement extends ActiveMixin(LabelMixin('', LitElement)) {
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

  /**
   * Set the visual orientation of this tab, this changes the look and placement of the active indication.
   * @type {string}
   * @attr
   * @default horizontal
   */
  @property({ type: String, reflect: true })
  public orientation?: 'horizontal' | 'vertical' = 'horizontal';

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
              this.target === '_blank' ? 'noopener noreferrer' : undefined,
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

  static styles = [
    css`
      :host {
        color: var(--uui-tab-text, var(--uui-color-interactive));
        font-family: inherit;
        width: fit-content;
      }

      #button {
        position: relative;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        min-height: var(--uui-size-12);
        min-width: 70px;
        padding: var(--uui-size-3)
          var(--uui-tab-padding-horizontal, var(--uui-size-5));
        border: none;
        font-size: inherit;
        background: none;
        color: inherit;
        cursor: pointer;
        font-family: inherit;

        /* for anchor tag: */
        text-decoration: none;
        line-height: normal;
      }

      :host([orientation='vertical']) #button {
        min-height: var(--uui-size-14);
        padding: var(--uui-size-2)
          var(--uui-tab-padding-horizontal, var(--uui-size-5));
      }

      :host(:not([active]):not([disabled])) #button:hover {
        color: var(--uui-tab-text-hover, var(--uui-color-default-emphasis));
      }

      :host(:not([active]):not([disabled])) #button:active {
        box-shadow:
          inset 0 2px 4px rgba(0, 0, 0, 0.15),
          0 1px 2px rgba(0, 0, 0, 0.05);
      }

      :host([active]) {
        color: var(--uui-tab-text-active, unset);
      }

      :host([disabled]) #button {
        color: var(--uui-color-disabled-contrast);
        cursor: default;
      }

      #button::before {
        content: '';
        position: absolute;
        background-color: var(--uui-color-current);
        opacity: 0;
      }
      :host([active]) #button::before {
        opacity: 1;
      }

      /* HORIZONTAL */
      :host([orientation='horizontal']) #button::before {
        left: auto;
        right: auto;
        border-radius: var(--uui-border-radius) var(--uui-border-radius) 0 0;
        height: 0px;
        width: calc(100% - 15px);
        bottom: 0;
        transition:
          opacity linear 120ms,
          height ease-in-out 120ms;
      }
      :host([active][orientation='horizontal']) #button::before {
        height: 4px;
      }

      /* VERTICAL */
      :host([orientation='vertical']) #button::before {
        top: auto;
        bottom: auto;
        border-radius: 0 var(--uui-border-radius) var(--uui-border-radius) 0;
        height: calc(100% - 12px);
        width: 0px;
        left: 0;
        transition:
          opacity linear 120ms,
          width ease-in-out 120ms;
      }
      :host([active][orientation='vertical']) #button::before {
        width: 4px;
      }

      #button:hover::before {
        background-color: var(--uui-color-current-emphasis);
      }
      :host([disabled]) #button::before {
        background-color: var(--uui-color-disabled-standalone);
      }

      slot[name='icon']::slotted(*) {
        font-size: 20px;
        margin-bottom: var(--uui-size-2);
      }

      slot.label {
        /* TODO: Find a better selector */
        text-align: center;
        display: flex;
        width: 100%;
        flex-direction: column;
      }

      :host([orientation='vertical']) slot.label {
        text-align: left;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-tab': UUITabElement;
  }
}
