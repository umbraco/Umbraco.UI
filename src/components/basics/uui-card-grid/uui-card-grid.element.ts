import { LitElement, html, css, property } from 'lit-element';
/**
 *  @element uui-card-grid
 *
 */
import { CardType } from '../../../type/CardType';
export class UUICardGridElement extends LitElement {
  static styles = [
    css`
      :host {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        grid-gap: var(--uui-size-small, 12px);
        place-items: strech;
      }

      :host([type='node']),
      :host([type='user']) {
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      }
    `,
  ];

  @property({ reflect: true })
  type: CardType = null;

  render() {
    return html`<slot></slot>`;
  }
}
