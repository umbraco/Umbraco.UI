import { LitElement, html, css } from 'lit';

/**
 *  @element uui-design
 *  @description - Showing how to make spacing and typography come together.
 */
export class UUIDesignMeasurementBoxElement extends LitElement {
  static styles = [
    css`
      :host {
        position: relative;
        display: inline-block;
        margin-top: calc(var(--uui-size-base-unit) * 3);
        margin-right: calc(var(--uui-size-base-unit) * 3);
      }

      .top {
        top: calc(var(--uui-size-base-unit) * -3);
        width: 100%;
      }

      .right {
        right: calc(var(--uui-size-base-unit) * -3);
        height: 100%;
      }
    `,
  ];

  render() {
    return html`
      <uui-design-measurement horizontal class="top"></uui-design-measurement>
      <uui-design-measurement vertical class="right"></uui-design-measurement>
      <slot></slot>
    `;
  }
}
