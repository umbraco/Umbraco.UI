import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators';

/**
 *  @element uui-card-grid
 *
 */
import { CardType } from '../uui-card/UuiCardType';
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
    `,
  ];

  // TODO: consider wether we should tread all cards the same, to provide the flexibility to combine as we like.
  @property({ reflect: true })
  type: CardType = null;

  render() {
    return html`<slot></slot>`;
  }
}
