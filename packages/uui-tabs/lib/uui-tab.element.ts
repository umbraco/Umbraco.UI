import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { ActiveMixin, LabelMixin } from '@umbraco-ui/uui-base/lib/mixins';

/**
 * A single tab. Should be put into `<uui-tab-group>`,
 * @element uui-tabs
 * @cssprop --uui-tab-text - Define the tab text color
 * @cssprop --uui-tab-text-hover - Define the tab text hover color
 * @cssprop --uui-tab-text-active - Define the tab text active color
 * @cssprop --uui-tab-background - Define the tab group background color
 * @cssprop --uui-tab-divider - Define the tab dividers color
 * @slot for tab content.
 */
export class UUITabElement extends ActiveMixin(LabelMixin('', LitElement)) {
  static styles = [
    css`
      :host {
        color: var(--uui-tab-text, var(--uui-interface-contrast));
        font-family: inherit;
      }

      button {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: var(--uui-size-space-2) var(--uui-size-space-4)
          var(--uui-size-space-1) var(--uui-size-space-4);
        border: none;
        box-sizing: border-box;
        min-height: 32px;
        font-size: inherit;
        height: 100%;
        min-width: 75px;
        background: none;
        color: inherit;
        cursor: pointer;
        font-family: inherit;
      }

      :host(:not([active]):not([disabled])) button:hover {
        color: var(
          --uui-tab-text-hover,
          var(--uui-look-primary-surface-hover, white)
        );
      }

      :host(:not([active]):not([disabled])) button:active {
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15),
          0 1px 2px rgba(0, 0, 0, 0.05);
      }

      :host([active]) button {
        color: var(
          --uui-tab-text-active,
          var(--uui-look-primary-surface-hover, white)
        );
        cursor: default;
      }
      :host([disabled]) button {
        color: var(--uui-interface-contrast-disabled);
        cursor: default;
      }

      button::before {
        content: '';
        position: absolute;
        height: 0px;
        /* max-width: 50px; */
        width: calc(100% - 16px);
        left: auto;
        right: auto;
        background-color: var(--uui-interface-active);
        bottom: 0;
        border-radius: 3px 3px 0 0;
        opacity: 0;
        transition: opacity ease-in 120ms, height ease-in 120ms;
      }
      button:hover::before {
        background-color: var(--uui-interface-active-hover);
      }
      :host([active]) button::before {
        opacity: 1;
        height: 4px;
        transition: opacity 120ms, height ease-out 120ms;
      }

      :host([disabled]) button::before {
        background-color: var(--uui-interface-active-disabled);
      }

      ::slotted(uui-icon) {
        margin-bottom: var(--uui-size-space-2);
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
    return html`
      <button type="button" ?disabled=${this.disabled} role="tab">
        ${this.renderLabel()}
      </button>
    `;
  }
}
