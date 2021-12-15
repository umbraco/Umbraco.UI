import { LitElement, css } from 'lit';
import { property } from 'lit/decorators.js';
import { iconRegistry } from './UUIIconRegistry';

/**
 * @element uui-icon
 */
export class UUIIconElement extends LitElement {
  static styles = [
    css`
      :host {
        display: inline-block;
        vertical-align: bottom;
        width: 1.15em;
        height: 1.15em;
      }

      :host svg {
        fill: currentColor;
      }
    `,
  ];

  private _name: string | null = null;

  @property()
  get name(): string | null {
    return this._name;
  }
  set name(newValue) {
    this._name = newValue;
    if (this._name !== '' && this._name !== null) {
      iconRegistry
        .getIcon(this._name)
        .then((svg: string) => {
          if (this.shadowRoot) {
            this.shadowRoot.innerHTML = svg;
          }
        })
        .catch(() => {
          if (this.fallback && this.shadowRoot) {
            this.shadowRoot.innerHTML = this.fallback;
          }
        });
    }
  }

  private _svg: string | null = null;

  @property()
  get svg(): string | null {
    return null;
  }
  set svg(newValue: string | null) {
    this._svg = newValue;
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = newValue || '';
    }
  }

  @property()
  fallback: string | null = null;

  connectedCallback() {
    super.connectedCallback();
    if (this._svg) {
      (this.shadowRoot as ShadowRoot).innerHTML = this._svg;
    }
  }
}
