import {
  LitElement,
  html,
  css,
  property,
  PropertyValues,
  query,
} from 'lit-element';
import { UUITabEvent } from '../../../event/UUITabEvent';
import { UUITabGroupEvent } from '../../../event/UUITabGroupEvent';
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

  private queryTabs(e: any): void {
    const firstTime = this.tabs === null;
    this.tabs = (this.tabsSlot as HTMLSlotElement)
      .assignedElements({ flatten: true })
      .filter((e: Node) => e instanceof UUITabElement) as UUITabElement[];

    // If first time, we should check if we have an active value that we need to reflect to our tabs.
    if (firstTime && this._active !== null) {
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
    this.changeActive(tabEvent.detail.key, tabEvent);
  }

  private onTabDeactivate(tabEvent: UUITabEvent) {
    this.changeActive(null, tabEvent);
  }

  private async changeActive(newKey: string | null, tabEvent: UUITabEvent) {
    // We do not want to propagate the activate event outside the scope of this group, instead we want implementors to use the change event.
    tabEvent.stopPropagation();

    // If cancelled do not continue.
    if (tabEvent.defaultPrevented === true) {
      return;
    }

    // Lets notify that tabs are going to change.
    const changeEvent = new UUITabGroupEvent('change', {
      cancelable: true,
      detail: { key: newKey },
    });

    this.dispatchEvent(changeEvent);

    // Allow event to be cancelled from event bubbling phase.
    await Promise.resolve;

    /*
    if we didnt chose to stopPropagation of the tabEvent, then we should implement this check:
    // Check if the activate event has been cancelled by any parent listeners.
    if (tabEvent.defaultPrevented === true) {
      changeEvent.preventDefault();
      return;
    }
    */

    // If this event was cancelled, we will cancel the child event.
    if (changeEvent.defaultPrevented === true) {
      tabEvent.preventDefault();
      return;
    }

    // Try out Radio Buttons, to see which events and how they work.
    this._active = newKey;
    this.reflectInactive();
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
