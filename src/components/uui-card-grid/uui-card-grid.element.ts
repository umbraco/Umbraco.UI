import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

/**
 *  @element uui-card-grid
 *
 */
export class UUICardGridElement extends LitElement {
  static styles = [
    css`
      :host {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-gap: var(--uui-size-medium, 24px);
        place-items: start;
        justify-content: space-between;
      }

      :host([type='media']) {
        place-items: stretch;
      }
    `,
  ];

  // TODO: consider wether we can eliminate this, evt. make a media-card-grid specific for this scenario.
  @property({ reflect: true })
  type: 'media' | null = null;

  render() {
    return html`<slot></slot>`;
  }
}
