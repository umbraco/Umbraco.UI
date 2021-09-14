import { LitElement, html } from 'lit';
import { state } from 'lit/decorators.js';

/**
 *  @element uui-tabs-example-page
 */
export class UUITabsExamplePageElement extends LitElement {
  /*
  static styles = [
    css`
    `,
  ];
  */
  @state()
  private activeIndex: number | null = 0;

  render() {
    return html`
      <uui-tab-group>
        <uui-tab
          .active=${this.activeIndex === 0}
          @click=${() => {
            this.activeIndex = 0;
          }}>
          Tab A
        </uui-tab>
        <uui-tab
          .active=${this.activeIndex === 1}
          @click=${() => {
            this.activeIndex = 1;
          }}>
          Tab B
        </uui-tab>
        <uui-tab
          .active=${this.activeIndex === 2}
          @click=${() => {
            this.activeIndex = 2;
          }}>
          Tab C
        </uui-tab>
      </uui-tab-group>
      <button type="button" @click=${() => (this.activeIndex = 0)}>
        open A
      </button>
      <button type="button" @click=${() => (this.activeIndex = 1)}>
        open B
      </button>
      <button type="button" @click=${() => (this.activeIndex = 2)}>
        open C
      </button>
      <button type="button" @click=${() => (this.activeIndex = null)}>
        Reset active
      </button>
      <div>Currently active: ${this.activeIndex}</div>
    `;
  }
}
