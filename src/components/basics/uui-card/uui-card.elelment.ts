import { LitElement, html, css, property } from 'lit-element';
import { Size } from '../../../type/Size';
import {
  SymbolicColor,
  SymbolicColorDefaultValue,
} from '../../../type/SymbolicColor';

/**
 *  @element uui-card
 *  @slot - for stuff
 */

export class UUICardElement extends LitElement {
  static styles = [
    css`
      :host {
        --uui-card-background-color: var(
          --uui-interface-ordinary-background-color,
          pink
        );
        background-color: var(--uui-card-background-color);

        --uui-card-button-background-color: var(
          --uui-interface-ordinary-background-color,
          pink
        );

        display: block;
        border: 1px solid darkgray;
        margin: 5em;
        padding: 1em;
        max-width: 300px;
      }

      #action-container {
        display: flex;
        justify-content: space-around;
      }

      #hardcoded-button {
        --uui-button-background-color: var(--uui-card-button-background-color);
      }

      slot[name='subtitle']::slotted(h2) {
        color: whitesmoke;
      }
    `,
  ];

  @property({ attribute: true })
  public size: Size = 'm';

  @property({ attribute: true })
  public color: SymbolicColor = SymbolicColorDefaultValue;

  @property({ attribute: true })
  public title = 'Card Title';

  render() {
    return html`
      <uui-button id="hardcoded-button">X</uui-button>
      <uui-button>X</uui-button>
      <slot name="image"></slot>
      <h2>${this.title}</h2>
      <slot name="subtitle"></slot>
      <hr />
      <slot></slot>
      <hr />
      <div id="action-container">
        <slot name="actions"></slot>
      </div>
    `;
  }
}
