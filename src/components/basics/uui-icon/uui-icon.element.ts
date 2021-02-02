import { LitElement, html, css, property } from 'lit-element';
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
        margin: 5px;
      }

      ::slotted(svg) {
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
      console.log('HPPY');
    }
  }

  render() {
    return html` <slot></slot> `;
  }
}
