import { promises } from 'dns';
import { LitElement, html, css, property } from 'lit-element';
import { UUITabEvent } from '../../event/UUITabEvent';

/**
 *  @element uui-input
 */
export class UUITabsExamplePageElement extends LitElement {
  /*
  static styles = [
    css`
    `,
  ];
  */
  @property()
  private activeKey: string | null = '123';

  private changeActiveKey(key: string | null) {
    // If we like this

    this.activeKey = key;
  }

  private async onChange(e: UUITabEvent) {
    //Wrap listener actions into this, if we want to accept this to be stopped by a parent?
    await Promise.resolve;
    if (e.defaultPrevented !== true) {
      this.activeKey = e.detail.key;
    }
  }

  render() {
    return html`
      <uui-tab-group .active=${this.activeKey} @change=${this.onChange}>
        <uui-tab .key=${'123'}> Tab A </uui-tab>
        <uui-tab .key=${'200'}> Tab B </uui-tab>
        <uui-tab .key=${'300'}> Tab C </uui-tab>
      </uui-tab-group>
      <button type="button" @click=${() => this.changeActiveKey('123')}>
        open 123
      </button>
      <button type="button" @click=${() => this.changeActiveKey('200')}>
        open 200
      </button>
      <button type="button" @click=${() => this.changeActiveKey('300')}>
        open 300
      </button>
      <button type="button" @click=${() => this.changeActiveKey(null)}>
        Set to empty null
      </button>
      <div>${this.activeKey}</div>
    `;
  }
}
