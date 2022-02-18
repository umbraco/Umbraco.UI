import { UUIAvatarElement } from '@umbraco-ui/uui-avatar/lib';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import { property, queryAssignedElements, state } from 'lit/decorators.js';

/**
 * Group a set of avatars, set a limit to minimize the visual space.
 * @element uui-avatar-group
 * @slot for uui-avatar elements
 */
@defineElement('uui-avatar-group')
export class UUIAvatarGroupElement extends LitElement {
  static styles = [
    css`
      :host {
        display: inline-flex;
        align-items: center;
        padding-left: 3px;
        padding-right: 3px;
      }

      ::slotted(uui-avatar) {
        margin-left: -0.2em;
        margin-right: -0.2em;
        border: 0.1em solid var(--uui-avatar-border-color);
      }

      #overflow-indication {
        margin-left: 6px;
      }
    `,
  ];

  @queryAssignedElements({
    slot: undefined,
    selector: 'uui-avatar',
    flatten: true,
  })
  private _avatarNodes?: UUIAvatarElement[];

  @state()
  private _avatarArray: UUIAvatarElement[] = [];

  /**
   * This sets a limit of how many avatars can be shown. It will ad a +{number} after the avatars to show the number of hidden avatars.
   * @type {number}
   * @attr
   * @default 0
   */
  @property({ type: Number, attribute: true })
  limit = 0;

  firstUpdated() {
    this._setAvatarArray();
  }

  private _onSlotChange() {
    this._setAvatarArray();
    this._updateAvatarVisibility();
  }

  private _setAvatarArray() {
    this._avatarArray = this._avatarNodes ? this._avatarNodes : [];
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('limit')) {
      this._updateAvatarVisibility();
    }
  }

  private _updateAvatarVisibility() {
    this._avatarArray.forEach((avatar: UUIAvatarElement, index: number) => {
      avatar.style.display =
        index < this.limit || this.limit === 0 ? '' : 'none';
    });
  }

  private _isLimitExceeded() {
    return this.limit !== 0 && this._avatarArray.length > this.limit;
  }

  render() {
    return html`
      <slot @slotchange=${this._onSlotChange}></slot>
      ${this._isLimitExceeded()
        ? //prettier-ignore
          html`<small id="overflow-indication">+${this._avatarArray.length - this.limit}</small>`
        : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-avatar-group': UUIAvatarGroupElement;
  }
}
