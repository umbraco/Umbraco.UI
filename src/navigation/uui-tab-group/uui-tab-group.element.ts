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
    console.log('set active', key);
    if (this._active !== key) {
      this._active = key;
      this.reflectActive();
    }
  }

  constructor() {
    super();

    this.addEventListener(
      'navigation-item-activate',
      this.onChildActivated as any
    );
    // TODO: deactivate... to unset active..
    this.updateComplete.then(() => {
      console.log(
        '## update Complete',
        this.tabsSlot,
        this.tabsSlot.childNodes.length
      );
    });
  }

  protected firstUpdated(changes: PropertyValues): void {
    super.firstUpdated(changes);
    console.log(
      '## firstUpdated',
      this.tabsSlot,
      this.tabsSlot.childNodes.length
    );
  }

  private queryTabs(e: any): void {
    console.log(
      '## slot changed - queryTabs',
      this.tabsSlot,
      this.tabsSlot.childNodes.length,
      e
    );
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
    console.log('- reflectActive', this._active, this.tabs?.length);
    if (this._active !== null) {
      this.activateTab(this._active);
    }
    this.reflectInactive();
  }

  public activateTab(key: string) {
    const tab = this.tabs?.find(tab => tab.key === key);
    console.log(' --- active tab', tab);
    if (tab) {
      console.log(' --- setting active tab', tab);
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

  // TODO: Make tabEvent..
  private async onChildActivated(childEvent: UUITabEvent) {
    // TODO:
    // Allow event to be cancelled from event capture phase.
    await Promise.resolve;

    // If cancelled do not continue.
    if (childEvent.defaultPrevented === true) return;

    // Lets notify that tabs are going to change.
    const event = new UUITabGroupEvent('change', {
      cancelable: true,
      detail: { key: childEvent.detail.key },
    });
    this.dispatchEvent(event);

    // If this event was cancelled, we will cancel the child event.
    if (event.defaultPrevented === true) {
      childEvent.preventDefault();
      return;
    }

    // Try out Radio Buttons, to see which events and how they work.
    this._active = childEvent.detail.key;
    this.reflectInactive();
    console.log('event approved for tab group', this._active);
  }

  render() {
    return html` <slot @slotchange=${this.queryTabs}></slot> `;
  }
}
