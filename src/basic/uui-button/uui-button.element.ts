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

  // TODO: This need to be tested and implemented correctly. We need it not to be focusable, clickable and the styling should be fitted as well.
  @property({ type: Boolean, attribute: true })
  disabled = false;

  // TODO: I'm not sure we will need a loading state, but lets concider having a waiting state, as waiting for a request to complete like Save.
  @property({ type: Boolean, attribute: true })
  loading = false;

  //TODO: Refactor to use a shared Type and style definition. As we use these symbolic colors in multiple places.
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
      <button @click=${this.onClick} disabled=${this.disabled}>
        <slot></slot>
      </button>
    `;
  }
}
