import {
  LitElement,
  html,
  css,
  property,
  PropertyValues,
  query,
} from 'lit-element';
import { UUITabEvent } from '../../event/UUITabEvent';
import { UUIEditorTabElement } from '../uui-editor-tab/uui-editor-tab.element';

/**
 *  @element uui-input
 */
export class UUIEditorTabGroupElement extends LitElement {
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

  private tabs: UUIEditorTabElement[] | null = null;

  private _active: string | null = null;
  @property({ reflect: true })
  public get active(): string | null {
    return this._active;
  }
  public set active(id: string | null) {
    console.log('set active', id);
    if (this._active !== id) {
      this._active = id;
      this.reflectActive();
    }
  }

  constructor() {
    super();

    this.addEventListener(
      'navigation-item-activate',
      this.onChildActivated as EventListener
    );
    // TODO: deactivate... to unset active..

    this.updateComplete.then(() => {
      console.log('update Complete', this.tabsSlot, this.tabsSlot.childNodes);
    });
  }

  protected firstUpdated(changes: PropertyValues): void {
    super.firstUpdated(changes);
    console.log('firstUpdated', this.tabsSlot, this.tabsSlot.childNodes);
  }

  private queryTabs(e: any): void {
    console.log('queryTabs', this.tabsSlot, this.tabsSlot.childNodes, e);
    const firstTime = this.tabs === null;
    this.tabs = (this.tabsSlot as HTMLSlotElement)
      .assignedElements({ flatten: true })
      .filter(
        (e: Node) => e instanceof UUIEditorTabElement
      ) as UUIEditorTabElement[];

    // If first time, we should check if we have an active value that we need to reflect to our tabs.
    if (firstTime && this._active !== null) {
      this.reflectActive();
    }
  }

  private reflectActive() {
    console.log('reflectActive', this._active, this.tabs);
    if (this._active !== null) {
      this.activateTab(this._active);
    }
    this.reflectInactive();
  }

  public activateTab(id: string) {
    const tab = this.tabs?.find(tab => tab.id === id);
    console.log(' - active tab', tab);
    if (tab) {
      tab.active = true;
    }
  }

  public reflectInactive() {
    this.tabs?.forEach(tab => {
      if (tab.id !== this._active) {
        tab.active = false;
      }
    });
  }

  // TODO: Make tabEvent..
  private onChildActivated(e: UUITabEvent) {
    // async

    // TODO:
    // Allow event to be cancelled from event capture phase.
    //await Promise.resolve;

    if (e.defaultPrevented === true) return;

    // Try out Radio Buttons, to see which events and how they work.
    this._active = e.detail.tabId;
    this.reflectInactive();
    console.log('event reached tabs', e, this._active);
  }

  render() {
    return html` <slot @slotchange=${this.queryTabs}></slot> `;
  }
}
