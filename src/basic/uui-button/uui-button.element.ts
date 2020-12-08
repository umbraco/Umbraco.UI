import { LitElement, html, css, property } from 'lit-element';
import { UUIButtonClickEvent } from '../../event/UUIButtonClickEvent';

/**
 *  @element uui-button
 *  @fires {UUIButtonClickEvent} click - fires when the element is clicked
 *  @slot - for button contents
 */
export class UUIButtonElement extends LitElement {
  static styles = [
    css`
      button {
        background: #1b264f;
        display: inline-block;
        padding: 6px 14px;
        margin-bottom: 0;
        font-size: 15px;
        line-height: 20px;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        color: #fff;
        border: none;
        box-shadow: none;
        border-radius: 3px;
      }
      :host([button-style='positive']) button {
        background: #2bc37c;
      }

      :host[loading] button:before {
        content: '⏳';
      }
    `,
  ];

  @property({ type: Boolean, attribute: true })
  loading = false;

  @property({ type: String, attribute: 'button-style' }) buttonStyle:
    | 'primary'
    | 'secondary'
    | 'positive'
    | 'warning'
    | 'danger'
    | 'gray' = 'primary';

  private onClick(e: Event) {
    e.preventDefault();
    e.stopPropagation();

    this.dispatchEvent(new UUIButtonClickEvent());
  }
  render() {
    return html`
      <button @click=${this.onClick}>
        <slot></slot>
      </button>
    `;
  }
}
