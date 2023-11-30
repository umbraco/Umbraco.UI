import { LitElement, css } from 'lit';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { property, state } from 'lit/decorators.js';
import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import type { InterfaceHeading } from '@umbraco-ui/uui-base/lib';
import { StaticValue, html, literal, unsafeStatic } from 'lit/static-html.js';

function slotHasContent(target: EventTarget | null): boolean {
  return target
    ? (target as HTMLSlotElement).assignedNodes({ flatten: true }).length > 0
    : false;
}

/**
 *  A layout box for grouping elements, as well its possible to append a header, with a headline or other elements to the box.
 *  @element uui-box
 *  @slot headline - headline area, this area is placed within the headline tag which is located inside the header. Use this to ensure the right headline styling.
 *  @slot header - header area, use this for things that are not the headline but are located in the header.
 *  @slot header-actions - right-side of the box header, use this to append some actions that are general for the topic of this box.
 *  @slot - area for the content of the box
 *  @cssprop --uui-box-default-padding - overwrite the box padding
 *
 */
@defineElement('uui-box')
export class UUIBoxElement extends LitElement {
  /**
   * Headline for this box, can also be set via the `headline` slot.
   * @type string
   * @attr
   * @default null
   */
  @property({ type: String })
  headline: string | null = null;

  /**
   * Changes the headline variant for accessibility for this box.
   * Notice this does not change the visual representation of the headline. (Umbraco recommends displaying a h5 size headline in the UUI-BOX)
   * @type {"h1" | "h2" | "h3" | "h4" | "h5" | "h6"}
   * @attr
   * @default "h5"
   */
  @property({ attribute: 'headline-variant' })
  set headlineVariant(value: InterfaceHeading) {
    if (!value) {
      this._headlineVariantTag = literal`h5`;
    } else {
      this._headlineVariantTag = unsafeStatic(value);
    }
  }

  @state()
  private _headlineVariantTag: StaticValue = literal`h5`;

  @state()
  private _headlineSlotHasContent = false;
  private _headlineSlotChanged = (e: Event) => {
    this._headlineSlotHasContent = slotHasContent(e.target);
  };

  @state()
  private _headerSlotHasContent = false;
  private _headerSlotChanged = (e: Event) => {
    this._headerSlotHasContent = slotHasContent(e.target);
  };

  @state()
  private _headerActionsSlotHasContent = false;
  private _headerActionsSlotChanged = (e: Event) => {
    this._headerActionsSlotHasContent = slotHasContent(e.target);
  };

  /**
   * Renders a header with the `header`-slot, `header-actions`-slot, headline and `headline`-slot within
   * @returns {TemplateResult}
   * @protected
   * @method
   */
  protected renderHeader() {
    /* eslint-disable lit/no-invalid-html, lit/binding-positions */
    return html`<div
      id="header"
      class="uui-text"
      style=${
        this._headerSlotHasContent ||
        this._headlineSlotHasContent ||
        this._headerActionsSlotHasContent ||
        this.headline !== null
          ? ''
          : 'display: none'
      }>
      <${this._headlineVariantTag}
        id="headline"
        class="uui-h5"
        style=${
          this._headlineSlotHasContent || this.headline !== null
            ? ''
            : 'display: none'
        }>
        ${this.headline}
        <slot name="headline" @slotchange=${this._headlineSlotChanged}></slot>
      </${this._headlineVariantTag}>
      <slot name="header" @slotchange=${this._headerSlotChanged}></slot>
      <slot name="header-actions" @slotchange=${
        this._headerActionsSlotChanged
      }></slot>
    </div>`;
    /* eslint-enable lit/no-invalid-html, lit/binding-positions */
  }

  render() {
    return html`
      ${this.renderHeader()}
      <slot></slot>
    `;
  }

  static styles = [
    UUITextStyles,
    css`
      :host {
        display: block;
        box-shadow: var(--uui-shadow-depth-1);
        border-radius: var(--uui-border-radius);
        background-color: var(--uui-color-surface);
      }

      #header {
        display: flex;
        column-gap: var(--uui-size-space-5);
        border-bottom: 1px solid var(--uui-color-divider-standalone);
        padding: var(--uui-size-space-4) var(--uui-size-space-5);
      }

      slot:not([name]) {
        display: block;
        padding: var(--uui-box-default-padding, var(--uui-size-space-5));
      }

      slot[name='header-actions'] {
        display: block;
        margin-left: auto;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-box': UUIBoxElement;
  }
}
