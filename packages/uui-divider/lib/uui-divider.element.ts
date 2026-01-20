import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

/**
 * @element uui-divider
 * @cssprop --uui-divider-width - Divider width
 * @cssprop --uui-divider-color - Divider color
 * @cssprop --uui-divider-spacing - Spacing around the divider
 */
@defineElement('uui-divider')
export class UUIDividerElement extends LitElement {
  /**
   * Draws the divider in a vertical orientation.
   * @type {boolean}
   * @attr
   * @default false
   **/
  @property({ type: Boolean, reflect: true }) vertical = false;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'separator');
  }

  updated(_changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(_changedProperties);
    if (_changedProperties.has('vertical')) {
      this.setAttribute(
        'aria-orientation',
        this.vertical ? 'vertical' : 'horizontal',
      );
    }
  }

  static styles = [
    css`
      :host(:not([vertical])) {
        display: block;
        border-top: var(--uui-divider-width, 1px) solid
          var(--uui-divider-color, var(--uui-color-border));
        margin: var(--uui-divider-spacing) 0;
      }

      :host([vertical]) {
        display: inline-block;
        height: 100%;
        border-left: solid var(--uui-divider-width, 1px)
          var(--uui-divider-color, var(--uui-color-border));
        margin: 0 var(--uui-divider-spacing);
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-divider': UUIDividerElement;
  }
}
