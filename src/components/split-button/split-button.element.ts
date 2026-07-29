import { css, html, LitElement } from 'lit';
import type { UUIInterfaceColor, UUIInterfaceLook } from '../../internal/types';
import { eventOptions, property, query } from 'lit/decorators.js';
import type {
  PopoverContainerPlacement,
  UUIPopoverContainerElement,
} from '../popover-container/popover-container';
import { when } from 'lit/directives/when.js';

/**
 * @element uui-split-button
 */
export class UUISplitButtonElement extends LitElement {
  #open = false;

  @property({ type: Boolean, reflect: true })
  public get open() {
    return this.#open;
  }
  public set open(value) {
    this.#open = value;

    if (value === true && this.popoverContainerElement) {
      this.openDropdown();
    } else {
      this.closeDropdown();
    }
  }

  @property()
  label?: string;

  @property()
  look: UUIInterfaceLook = 'default';

  @property()
  color: UUIInterfaceColor = 'default';

  @property()
  placement: PopoverContainerPlacement = 'bottom-start';

  @property({ type: Boolean })
  compact = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, attribute: 'hide-expand' })
  hideExpand = false;

  @query('#dropdown-popover')
  popoverContainerElement?: UUIPopoverContainerElement;

  openDropdown() {
    // TODO: This ignorer is just needed for JSON SCHEMA TO WORK, As its not updated with latest TS jet.
    // @ts-ignore
    this.popoverContainerElement?.showPopover();
    this.#open = true;
  }

  closeDropdown() {
    // TODO: This ignorer is just needed for JSON SCHEMA TO WORK, As its not updated with latest TS jet.
    // @ts-ignore
    this.popoverContainerElement?.hidePopover();
    this.#open = false;
  }

  #onToggle(event: ToggleEvent) {
    // TODO: This ignorer is just needed for JSON SCHEMA TO WORK, As its not updated with latest TS jet.

    // @ts-ignore
    this.open = event.newState === 'open';

    /*if (this.open) {
      this.dispatchEvent(new UmbOpenedEvent());
    } else {
      this.dispatchEvent(new UmbClosedEvent());
    }*/
  }

  // Capture phase so this runs before a menu item's action opens its modal: WebKit otherwise
  // leaves the popovertarget toggle state "open" after the modal light-dismisses the popover,
  // and the trigger then stops responding until the page is reloaded.
  @eventOptions({ capture: true })
  private _onPopoverClickCapture() {
    if (this.#open) {
      this.closeDropdown();
    }
  }

  render() {
    return html`<uui-button
        .look=${this.look}
        .color=${this.color}
        .label=${this.label ?? ''}
        .compact=${this.compact}
        ?disabled=${this.disabled}>
        <slot name="label"></slot>
      </uui-button>
      ${when(
        !this.hideExpand,
        () =>
          html`<uui-button
            .look=${this.look}
            .color=${this.color}
            .compact=${this.compact}
            ?disabled=${this.disabled}
            id="dropdown-button"
            popovertarget="dropdown-popover"
            data-mark="open-dropdown">
            <uui-symbol-expand
              id="symbol-expand"
              .open=${this.#open}></uui-symbol-expand>
          </uui-button>`,
      )}
      <uui-popover-container
        id="dropdown-popover"
        .placement=${this.placement}
        @toggle=${this.#onToggle}
        @click=${this._onPopoverClickCapture}>
        <umb-popover-layout>
          <slot></slot>
        </umb-popover-layout>
      </uui-popover-container>`;
  }

  static override styles = [
    css`
      :host {
        display: inline-flex;
        gap: 1px;
      }
      :host(:not([hide-expand])) uui-button:first-of-type {
        --uui-button-border-radius: var(--uui-border-radius-3) 0 0
          var(--uui-border-radius-3);
      }
      :host(:not([hide-expand])) uui-button:last-of-type {
        --uui-button-border-radius: 0 var(--uui-border-radius-3)
          var(--uui-border-radius-3) 0;
      }

      #dropdown-button {
        min-width: max-content;
        height: 100%;
        color: inherit;
      }
      :host(:not([hide-expand]):not([compact])) #dropdown-button {
        --uui-button-padding-left-factor: 2;
        --uui-button-padding-right-factor: 2;
      }
    `,
  ];
}
