import { css } from 'lit';
import { UUIButtonGroupElement } from '@umbraco-ui/uui-button-group/lib/uui-button-group.element';

/**
 *  @element uui-action-bar
 *  @description - Extends button group to hold buttons with icons that represent actions.
 */

export class UUIActionBarElement extends UUIButtonGroupElement {
  static styles = [
    ...UUIButtonGroupElement.styles,
    css`
      ::slotted(*) {
        --uui-button-slot-padding-r-factor: 0.333;
        --uui-button-slot-padding-l-factor: 0.333;
      }

      ::slotted(uui-button:first-child) {
        --uui-button-border-radius: 50px 0 0 50px;
        --uui-button-slot-padding-l-factor: 1.666;
      }
      ::slotted(uui-button:last-child) {
        --uui-button-border-radius: 0 50px 50px 0;
        --uui-button-slot-padding-r-factor: 1.666;
      }
      ::slotted(uui-button:first-child:last-child) {
        --uui-button-border-radius: 50px 50px 50px 50px;
        --uui-button-slot-padding-l-factor: 1;
        --uui-button-slot-padding-r-factor: 1;
      }

      ::slotted([look='outline']),
      ::slotted([look='placeholder']) {
        --uui-button-slot-padding-r-factor: 0.666;
        --uui-button-slot-padding-l-factor: 0.666;
      }

      ::slotted(uui-button[look='outline']:first-child),
      ::slotted(uui-button[look='placeholder']:first-child) {
        --uui-button-border-radius: 50px 0 0 50px;
        --uui-button-slot-padding-l-factor: 0.8;
      }
      ::slotted(uui-button[look='outline']:last-child),
      ::slotted(uui-button[look='placeholder']:last-child) {
        --uui-button-border-radius: 0 50px 50px 0;
        --uui-button-slot-padding-r-factor: 0.8;
      }
      ::slotted(uui-button[look='outline']:first-child:last-child),
      ::slotted(uui-button[look='placeholder']:first-child:last-child) {
        --uui-button-border-radius: 50px 50px 50px 50px;
        --uui-button-slot-padding-l-factor: 0.8;
        --uui-button-slot-padding-r-factor: 0.8;
      }
    `,
  ];
}
