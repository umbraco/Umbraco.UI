import { LitElement, css } from 'lit';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { property, state } from 'lit/decorators.js';
import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import type { InterfaceHeading } from '@umbraco-ui/uui-base/lib';
import { StaticValue, html, literal, unsafeStatic } from 'lit/static-html.js';

/**
 *  A box for grouping elements
 *  @element uui-box
 *  @slot headline - headline area, this area is placed within the headline tag which is located inside the header. Use this to ensure the right headline styling.
 *  @slot header - header area, use this for things that is not the headline but located in the header.
 *  @slot - area for the content of the box
 *  @cssprop --uui-box-default-padding - overwrite the box padding
 *
 */
@defineElement('uui-box')
export class UUIBoxElement extends LitElement {
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
        display: block;
        border-bottom: 1px solid var(--uui-color-divider-standalone);
        padding: var(--uui-size-space-4) var(--uui-size-space-5);
      }

      slot:not([name]) {
        display: block;
        padding: var(--uui-box-default-padding, var(--uui-size-space-5));
      }
    `,
  ];

  /**
   * Headline for this box, can also be set via the 'box' slot.
   * @type string
   * @attr
   * @default null
   */
  @property({ type: String })
  headline: string | null = null;

  /**
   * Changes the headline variant for accessibility for this box.
   * Notice this does not change the visual representation of the headline. (Umbraco does only recommend displaying a h5 sizes headline in the UUI-BOX)
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
    this._headlineSlotHasContent =
      (e.target as HTMLSlotElement).assignedNodes({ flatten: true }).length > 0;
  };

  @state()
  private _headerSlotHasContent = false;
  private _headerSlotChanged = (e: Event) => {
    this._headerSlotHasContent =
      (e.target as HTMLSlotElement).assignedNodes({ flatten: true }).length > 0;
  };

  /**
   * Renders a header with the header-slot, headline and headline-slot within
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
    </div>`;
    /* eslint-enable lit/no-invalid-html, lit/binding-positions */
  }

  render() {
    return html`
      ${this.renderHeader()}
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-box': UUIBoxElement;
  }
}
