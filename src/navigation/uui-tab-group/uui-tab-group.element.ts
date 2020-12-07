import {
  LitElement,
  html,
  css,
  property,
  PropertyValues,
  query,
} from 'lit-element';
import { UUITabEvent } from '../../event/UUITabEvent';
import { UUITabGroupEvent } from '../../event/UUITabGroupEvent';
import { UUITabElement } from '../uui-tab/uui-tab.element';

/**
 *  @element uui-input
 */
export class UUITabGroupElement extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        flex-wrap: wrap;
      }
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

  private async onTabActivate(childEvent: UUITabEvent) {
    // We do not want to propagate the activate event outside the scope of this group, instead we want implementors to use the change event.
    childEvent.stopPropagation();

    // If cancelled do not continue.
    if (childEvent.defaultPrevented === true) {
      return;
    }

    // Lets notify that tabs are going to change.
    const changeEvent = new UUITabGroupEvent('change', {
      cancelable: true,
      detail: { key: childEvent.detail.key },
    });

    this.dispatchEvent(changeEvent);

    // Allow event to be cancelled from event bubbling phase.
    await Promise.resolve;

    /*
    if we didnt chose to stopPropagation of the childEvent, then we should implement this check:
    // Check if the activate event has been cancelled by any parent listeners.
    if (childEvent.defaultPrevented === true) {
      changeEvent.preventDefault();
      return;
    }
    */

    // If this event was cancelled, we will cancel the child event.
    if (changeEvent.defaultPrevented === true) {
      childEvent.preventDefault();
      return;
    }

    // Try out Radio Buttons, to see which events and how they work.
    this._active = childEvent.detail.key;
    this.reflectInactive();
  }

  // TODO: refactor, so we dont have dublicate code.
  private async onTabDeactivate(childEvent: UUITabEvent) {
    // We do not want to propagate the activate event outside the scope of this group, instead we want implementors to use the change event.
    childEvent.stopPropagation();

    // If cancelled do not continue.
    if (childEvent.defaultPrevented === true) return;

    // Lets notify that tabs are going to change.
    const changeEvent = new UUITabGroupEvent('change', {
      cancelable: true,
      detail: { key: childEvent.detail.key },
    });
    this.dispatchEvent(changeEvent);

    // If this event was cancelled, we will cancel the child event.
    if (changeEvent.defaultPrevented === true) {
      childEvent.preventDefault();
      return;
    }

    this._active = null;
    this.reflectInactive();
    console.log('deactivate event approved for tab group', this._active);
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
