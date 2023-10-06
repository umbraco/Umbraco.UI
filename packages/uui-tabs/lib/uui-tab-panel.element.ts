import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { classMap } from 'lit/directives/class-map.js';
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

let id = 0;

/**
 *  A single tab panel. Should be put into `<uui-tab-group>`,
 *  @element uui-tab-panel
 *  @slot - Default slot for the tab panel
 *  @cssprop --uui-tab-panel-padding - Define the tab panel padding
 */
@defineElement('uui-tab-panel')
export class UUITabPanelElement extends LitElement {
  static styles = [
    css`
      :host {
        --uui-tab-panel-padding: 1rem 0;

        display: none;
        width: 100%;
      }

      :host([active]) {
        display: block;
      }

      .tab-panel {
        display: block;
        padding: var(--uui-tab-panel-padding);
      }
    `,
  ];

  private readonly attrId = ++id;
  private readonly componentId = `uui-tab-panel-${this.attrId}`;

  /** 
   * The tab panel's name.
   */
  @property({ reflect: true }) name = '';

  /**
   * When true, the tab panel will be shown.
   * @type {Boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true }) active = false;

  /*#resizeObserver: ResizeObserver = new ResizeObserver(
    this.#onResize.bind(this)
  );*/

  connectedCallback() {
    super.connectedCallback();
    //this.#resizeObserver.observe(this);
    this.id = this.id.length > 0 ? this.id : this.componentId;
    if (!this.hasAttribute('role')) this.setAttribute('role', 'tabpanel');
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    //this.#resizeObserver.unobserve(this);
  }

  handleActiveChange() {
    this.setAttribute('aria-hidden', this.active ? 'false' : 'true');
  }

  render() {
    return html`
      <slot
        part="base"
        class=${classMap({
          'tab-panel': true,
          'tab-panel--active': this.active
        })}
      ></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-tab-panel': UUITabPanelElement;
  }
}
