import { LitElement, html, css } from 'lit';

/**
 *  @element uui-button-group
 *  @slot - for buttons
 *  @description
 */
export class UUIButtonGroupElement extends LitElement {
  static styles = [
    css`
      ::slotted(uui-button) {
        --uui-button-border-radius: 0;
      }
      ::slotted(uui-button:not(:first-child)) {
        --uui-button-merge-border-left: 1;
      }
      ::slotted(uui-button:first-child) {
        --uui-button-border-radius: var(--uui-button-border-radius, 3px) 0 0
          var(--uui-button-border-radius, 3px);
      }
      ::slotted(uui-button:nth-last-child(1)) {
        --uui-button-border-radius: 0 var(--uui-button-border-radius, 3px)
          var(--uui-button-border-radius, 3px) 0;
      }

      ::slotted(uui-dropdown) {
        --uui-dropdown-toggle-slot-button-border-radius: 0;
      }
      ::slotted(uui-dropdown:not(:first-child)) {
        --uui-dropdown-toggle-slot-button-merge-border-left: 1;
      }
      ::slotted(uui-dropdown:first-child) {
        --uui-dropdown-toggle-slot-button-border-radius: var(
            --uui-button-border-radius,
            3px
          )
          0 0 var(--uui-button-border-radius, 3px);
      }
      ::slotted(uui-dropdown:nth-last-child(1)) {
        --uui-dropdown-toggle-slot-button-border-radius: 0
          var(--uui-button-border-radius, 3px)
          var(--uui-button-border-radius, 3px) 0;
      }

      ::slotted(*:hover) {
        z-index: 1;
      }
    `,
  ];

  render() {
    return html` <slot></slot> `;
  }
}
