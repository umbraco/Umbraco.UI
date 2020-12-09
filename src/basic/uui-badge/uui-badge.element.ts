import { LitElement, html, css, property } from 'lit-element';

/**
 *  @element uui-badge
 *  @slot - for badge contents
 */

type BadgeSize = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl';

//TODO: Refactor to use a shared Type and style definition. As we use these symbolic colors in multiple places.
type BadgeColor =
  | 'primary'
  | 'secondary'
  | 'positive'
  | 'warning'
  | 'danger'
  | 'gray';

export class UUIBadgeElement extends LitElement {
  static styles = [
    css`
      :host {
        position: relative;
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
      }

      :host([color='positive']) {
        background: #2bc37c;
        color: #fff;
      }
      :host([color='danger']) {
        background: red;
        color: #fff;
      }

      :host([size='s']) {
        font-size: 10px;
        padding: 5px 10px;
      }
      :host([size='xl']) {
        font-size: 18px;
        padding: 15px 30px;
      }
    `,
  ];

  @property({ attribute: true })
  public size: BadgeSize = 'm';

  @property({ attribute: true })
  public color: BadgeColor = 'gray';

  render() {
    console.log(UUIBadgeElement.styles);
    return html` <slot></slot> `;
  }
}
