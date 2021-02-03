import {
  LitElement,
  html,
  css,
  property,
  PropertyValues,
  query,
} from 'lit-element';
import { UUITabEvent } from '../uui-tab/UUITabEvent';
import { UUITabGroupEvent } from './UUITabGroupEvent';
import { UUITabElement } from '../uui-tab/uui-tab.element';

/**
 *  @element uui-tab-group
 */
export class UUITabGroupElement extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        flex-wrap: wrap;
      }

      ::slotted(*:not(:last-of-type)) {
        border-right: 1px solid var(--uui-interface-border);
      }
    `,
  ];

  @query('slot')
  protected tabsSlot!: HTMLSlotElement;

  private tabs: UUITabElement[] | null = null;

  private _active: string | null = null;
  @property()
  public get active(): string | null {
    return this._active;
  }
  public set active(key: string | null) {
    if (this._active !== key) {
      this._active = key;
      this.reflectActive();
    }
  }

  private queryTabs(): void {
    const firstTime = this.tabs === null;
    this.tabs = (this.tabsSlot as HTMLSlotElement)
      .assignedElements({ flatten: true })
      .filter((e: Node) => e instanceof UUITabElement) as UUITabElement[];

    // TODO: If first time, we should check if we have an active value that we need to reflect to our tabs.
    if (firstTime) {
      this.reflectActive();
    }
  }

  private reflectActive() {
    if (this._active !== null) {
      this.activateTab(this._active);
    }
    this.reflectInactive();
  }

  public activateTab(key: string) {
    const tab = this.tabs?.find(tab => tab.key === key);
    if (tab) {
      tab.active = true;
    }
  }

  public reflectInactive() {
    this.tabs?.forEach(tab => {
      if (tab.key !== this._active) {
        tab.active = false;
      }
    });
  }

  private onTabActivate(tabEvent: UUITabEvent) {
    // We do not want to propagate the activate event outside the scope of this group, instead we want implementors to use the change event.
    tabEvent.stopPropagation();

    this.changeActive(tabEvent.target.key);
  }

  private onTabDeactivate(tabEvent: UUITabEvent) {
    // We do not want to propagate the activate event outside the scope of this group, instead we want implementors to use the change event.
    tabEvent.stopPropagation();

    this.changeActive(null);
  }

  private changeActive(newKey: string | null) {
    this._active = newKey;
    this.reflectInactive();

    // Lets notify that tabs are going to change.
    const changeEvent = new UUITabGroupEvent('change');

    this.dispatchEvent(changeEvent);
  }

  render() {
    return html`
      <slot
        @activate=${this.onTabActivate}
        @deactivate=${this.onTabDeactivate}
        @slotchange=${this.queryTabs}
      ></slot>
    `;
  }
}
