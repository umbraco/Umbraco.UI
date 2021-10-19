import { LitElement, css } from 'lit';
import { property } from 'lit/decorators.js';
import { SelectableMixin } from '@umbraco-ui/uui-base/lib/mixins';
import { UUICardEvent } from './UUICardEvent';

/**
 *  @element uui-card
 *  @fires {UUICardEvent} click-title - fires when the media card title is clicked
 *  @description - Base card component to be extended by specific cards.
 */

export class UUICardElement extends SelectableMixin(LitElement) {
  static styles = [
    css`
      :host {
        position: relative;
        display: flex;
        width: 100%;
        justify-content: center;
        box-sizing: border-box;
        box-shadow: var(--uui-shadow-depth-1);
        border-radius: var(--uui-size-border-radius, 3px);
        min-height: var(--uui-layout-medium);
        background-color: var(--uui-interface-surface, white);
        --uui-card-border-width: 3px;
        transition: box-shadow 100ms ease-out;
      }

      :host(*) * {
        outline-color: #6ab4f0;
        outline-offset: 4px;
      }

      :host(:hover),
      :host(:focus),
      :host(:focus-within) {
        box-shadow: var(--uui-shadow-depth-2);
      }

      :host(:focus) {
        outline-color: #6ab4f0;
        outline-width: var(--uui-card-border-width);
        outline-style: solid;
        outline-offset: var(--uui-card-border-width);
      }

      :host([error]) {
        border: var(--uui-card-border-width) solid
          var(--uui-look-danger-border, #d42054);
      }

      :host([selectable]) {
        cursor: pointer;
      }

      :host([disabled]) {
        opacity: 0.6;
        filter: saturate(0.5);
        pointer-events: none;
        background: var(--uui-interface-surface-disabled);
      }

      :host(:not([disabled]))::after {
        content: '';
        position: absolute;
        pointer-events: none;
        inset: calc(var(--uui-card-border-width) * -1);
        width: calc(100% + var(--uui-card-border-width) * 2);
        height: calc(100% + var(--uui-card-border-width) * 2);
        box-sizing: border-box;
        border: var(--uui-card-border-width) solid
          var(--uui-interface-select, #1b264f);
        border-radius: calc(
          var(--uui-size-border-radius, 3px) + var(--uui-card-border-width)
        );
        transition: opacity 100ms ease-out;
        opacity: 0;
      }
      :host(:hover)::after {
        opacity: 0.33;
      }
      :host([selected]:hover)::after {
        opacity: 0.66;
      }
      :host([selected])::after {
        opacity: 1;
      }
      :host([error])::after {
        inset: calc(var(--uui-card-border-width) * -2);
        width: calc(100% + calc(var(--uui-card-border-width) * 4));
        height: calc(100% + calc(var(--uui-card-border-width) * 4));
      }
    `,
  ];

  @property({ type: Boolean, reflect: true, attribute: 'disabled' })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  error = false;

  constructor() {
    super();
    this.addEventListener('click', this.toggleSelect);
    this.addEventListener('keydown', this.handleSelectKeydown);
  }

  private toggleSelect() {
    if (this.disabled) return;

    if (this.selectable) this.selected = !this.selected;
    if (this.selected)
      this.dispatchEvent(new UUICardEvent(UUICardEvent.SELECTED));
  }

  private handleSelectKeydown(e: KeyboardEvent) {
    if (this.disabled) return;

    // TODO: Is it correct to both be able to select with space and enter?
    if (e.key !== ' ' && e.key !== 'Enter') return;
    e.preventDefault();
    this.toggleSelect();
  }

  protected handleOpenClick(e: Event) {
    if (this.disabled) return;

    e.stopPropagation();
    this.dispatchEvent(new UUICardEvent(UUICardEvent.OPEN));
  }
  protected handleOpenKeydown(e: KeyboardEvent) {
    if (this.disabled) return;

    // TODO: Is it correct to both be able to open by space and enter? We to investigate, i would think that enter was the only option.
    if (e.key !== ' ' && e.key !== 'Enter') return;
    e.preventDefault();
    e.stopPropagation();
    this.dispatchEvent(new UUICardEvent(UUICardEvent.OPEN));
  }
}
