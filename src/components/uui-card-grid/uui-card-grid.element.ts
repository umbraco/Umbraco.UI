import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators';

/**
 *  @element uui-card-grid
 *
 */
import { CardType } from '../../type/CardType';
export class UUICardGridElement extends LitElement {
  static styles = [
    css`
      :host {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        grid-gap: var(--uui-size-medium, 24px);
        place-items: strech;
      }

      :host([type='node']),
      :host([type='user']) {
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      }

      :host([type='mixed']) {
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        place-items: start;
        justify-content: space-between;
      }

      /* :host([type='mixed']) ::slotted(*) {
        place-self: end;
      } */
    `,
  ];

  @property({ reflect: true })
  type: CardType = null;

  render() {
    return html`<slot></slot>`;
  }
}
