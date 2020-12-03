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
  private activeId: string | null = '123';

  constructor() {
    super();

    this.addEventListener(
      'navigation-item-activate',
      this.onChildActivated as EventListener,
      true
    );
    this.addEventListener(
      'navigation-item-deactivate',
      this.onChildDeactivated as EventListener,
      true
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
    e.preventDefault();
    //this.activeId = null;
  }

  render() {
    return html`
      <uui-editor-tab-group .active=${this.activeId}>
        <uui-editor-tab id="123"> Editor Tab A </uui-editor-tab>
        <uui-editor-tab id="200"> Editor Tab B </uui-editor-tab>
        <uui-editor-tab id="300"> Editor Tab C </uui-editor-tab>
      </uui-editor-tab-group>
      <button type="button" @click=${() => (this.activeId = '123')}>123</button>
      <button type="button" @click=${() => (this.activeId = '200')}>200</button>
      <button type="button" @click=${() => (this.activeId = '300')}>300</button>
      <button type="button" @click=${() => (this.activeId = null)}>
        Set to empty null
      </button>
      <div>${this.activeId}</div>
    `;
  }
}
