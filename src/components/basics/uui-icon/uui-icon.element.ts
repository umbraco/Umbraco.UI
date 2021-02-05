import { LitElement, html, css, property, query } from 'lit-element';
import { UUIIconFactory } from '../../../service/UUIIconFactory';
/**
 *  @element uui-icon
 *
 */

export class UUIIconElement extends LitElement {
  static styles = [
    css`
      :host {
        display: inline-block;
        width: 1em;
        height: 1em;
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
      UUIIconFactory.GetIcon(this._name).then(svg => {
        if (this.shadowRoot) {
          this.shadowRoot.innerHTML = svg;
        }
      });
    }
  }
}
