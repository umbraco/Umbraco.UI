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

  constructor() {
    super();

    this.addEventListener(
      'navigation-item-activate',
      this.onChildActivated as EventListener
    );
    this.addEventListener(
      'navigation-item-deactivate',
      this.onChildDeactivated as EventListener
    );
  }

  private onChildActivated(e: UUITabEvent) {
    console.log('# activate: event reached editors', e);
    // to test that we can break the activation...
    //e.preventDefault();
    //this.activeId = e.detail.tabId;
  }
  private onChildDeactivated(e: UUITabEvent) {
    console.log('# deactivate: event reached editors');
    // to test that we can break the activation...
    // TODO: test that we can stop propagation.
    //e.preventDefault();
    //this.activeId = null;
  }

  render() {
    return html`
      <uui-tab-group .active=${this.activeKey}>
        <uui-tab .key=${'123'}> Tab A </uui-tab>
        <uui-tab .key=${'200'}> Tab B </uui-tab>
        <uui-tab .key=${'300'}> Tab C </uui-tab>
      </uui-tab-group>
      <button type="button" @click=${() => (this.activeKey = '123')}>
        open 123
      </button>
      <button type="button" @click=${() => (this.activeKey = '200')}>
        open 200
      </button>
      <button type="button" @click=${() => (this.activeKey = '300')}>
        open 300
      </button>
      <button type="button" @click=${() => (this.activeKey = null)}>
        Set to empty null
      </button>
      <div>${this.activeKey}</div>
    `;
  }
}
