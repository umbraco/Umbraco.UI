import { LitElement, html, css, property } from 'lit-element';

/**
 *  @element uui-badge
 *  @slot - for badge contents
 */

type BadgeSize = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl';
type ButtonStyle =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'gray';

export class UUIBadgeElement extends LitElement {
  static styles = [
    css`
      div {
        display: inline-block;
        -webkit-appearance: none;
        border: 0;
        font-weight: bold;
        color: #1a2650;
        line-height: 1;
        background-color: rgba(216, 215, 217, 0.5);
        font-size: 13px;
        margin: 0 7px 7px 0;
        padding: 10px 20px;
        border-radius: 4px;
        transition: all 0.2s ease;
        position: relative;
      }

      .success {
        background: #2bc37c;
        color: #fff;
      }

      .s {
        font-size: 10px;
        padding: 5px 10px;
      }
      .xl {
        font-size: 18px;
        padding: 15px 30px;
      }
    `,
  ];

  @property({ attribute: true })
  public size: BadgeSize = 'm';

  @property({ attribute: true })
  public color: ButtonStyle = 'gray';

  render() {
    return html`
      <div class="${this.size + ' ' + this.color}">
        <slot></slot>
      </div>
    `;
  }
}
