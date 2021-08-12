import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators';
import { ActiveMixin } from '../../mixins/ActiveMixin';
import { LabelMixin } from '../../mixins/LabelMixin';

/**
 *  @element uui-editor-tab
 */
export class UUITabElement extends ActiveMixin(LabelMixin('', LitElement)) {
  static styles = [
    css`
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
        max-height: 75px;
        min-width: 75px;
        background-color: var(--uui-interface-surface);
        color: var(--uui-interface-contrast);
        cursor: pointer;

        transition: background-color 80ms;
      }

      :host(:not([active]):not([disabled])) button:hover {
        background-color: var(--uui-interface-surface-hover);
        color: var(--uui-interface-contrast-hover);
      }

      :host(:not([active]):not([disabled])) button:active {
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15),
          0 1px 2px rgba(0, 0, 0, 0.05);
      }

      :host([active]) button {
        color: var(--uui-interface-contrast-active);
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
        max-width: 50px;
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
        font-size: 1.5em;
        margin-bottom: var(--uui-size-space-2);
      }
    `,
  ];

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

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('role')) this.setAttribute('role', 'tab');
  }

  render() {
    return html`
      <button type="button" ?disabled=${this.disabled}>
        ${this.renderLabel()}
      </button>
    `;
  }
}
