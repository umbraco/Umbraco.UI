import { LitElement, html } from 'lit';
import { property } from 'lit/decorators';
import { UUITabGroupEvent } from '../uui-tab-group/UUITabGroupEvent';

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
  @property()
  private activeKey: string | null = 'A';

  private changeActive(key: string | null) {
    this.activeKey = key;
  }

  private onChange(e: UUITabGroupEvent) {
    this.activeKey = e.target.active;
  }

  render() {
    return html`
      <uui-tab-group .active=${this.activeKey} @change=${this.onChange}>
        <uui-tab .key=${'A'}> Tab A </uui-tab>
        <uui-tab .key=${'B'}> Tab B </uui-tab>
        <uui-tab .key=${'C'}> Tab C </uui-tab>
      </uui-tab-group>
      <button type="button" @click=${() => this.changeActive('A')}>
        open A
      </button>
      <button type="button" @click=${() => this.changeActive('B')}>
        open B
      </button>
      <button type="button" @click=${() => this.changeActive('C')}>
        open C
      </button>
      <button type="button" @click=${() => this.changeActive(null)}>
        Reset active
      </button>
      <div>Currently active: ${this.activeKey}</div>
    `;
  }
}
