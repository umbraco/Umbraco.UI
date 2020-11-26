import { LitElement, html, css, property } from 'lit-element';
import { UUIEvent } from '../utils/UUIEvent';

type UUIButtonClickEventDetails = {
  fromUUIButton: boolean;
};
export class UUIButtonClickEvent extends UUIEvent<UUIButtonClickEventDetails> {}

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
      button.success {
        background: #2bc37c;
      }

      button.loading:before {
        content: '⏳';
      }
    `,
  ];

  @property({ type: Boolean, attribute: true })
  loading = false;

  @property({ type: String, attribute: 'button-style' }) buttonStyle:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'gray' = 'primary';

  private onClick(e: Event) {
    e.preventDefault();
    e.stopPropagation();

    this.dispatchEvent(
      new UUIButtonClickEvent('click', {
        detail: {
          fromUUIButton: true,
        },
      })
    );
  }
  render() {
    return html`
      <button
        @click=${this.onClick}
        class="${this.loading ? 'loading' : ''} ${this.buttonStyle || ''}"
      >
        <slot></slot>
      </button>
    `;
  }
}
