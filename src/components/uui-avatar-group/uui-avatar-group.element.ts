import { LitElement, html, css } from 'lit';
import { property, query, queryAssignedNodes, state } from 'lit/decorators';
import { UUIAvatarElement } from '../uui-avatar/uui-avatar.element';

/**
 *  @element uui-avatar-group
 */

export class UUIAvatarGroupElement extends LitElement {
  static styles = [
    css`
      :host {
        display: inline-flex;
        align-items: center;
        padding-left: 3px;
        padding-right: 3px;
      }

      ::slotted(uui-avatar),
      uui-avatar {
        margin-left: -0.2em;
        margin-right: -0.2em;
      }

      #overflow-indication {
        margin-left: 6px;
      }
    `,
  ];

  /**
   * This sets a limit of how many avatars can be shown. It will ad a +{number} after the avatars to show the number of hidden avatars.
   * @type {Number}
   * @attr
   * @default [0]
   */
  @property({ type: Number, attribute: true })
  get limit() {
    return this._limit;
  }
  set limit(newVal: number) {
    const oldVal = this._limit;
    this._limit = newVal;
    this.updateAvatarVisibility();
    this.requestUpdate('value', oldVal);
  }
  private _limit = 0;

  /**
   * This sets the color of the borders around the avatars, usually set this to the color of the background of the element the group is on. Change to "transparent" if you dont want a border.
   * @type {String}
   * @attr
   * @default ['white']
   */
  @property({ type: String }) borderColor = 'white';

  @state() private avatarArray: UUIAvatarElement[] = [];

  @query('slot')
  protected avatarsSlot!: HTMLSlotElement;

  @queryAssignedNodes(undefined, true, 'uui-avatar')
  private avatarNodes?: UUIAvatarElement[];

  firstUpdated() {
    this.setAvatarArray();
  }

  private updateAvatarVisibility() {
    this.avatarArray.forEach((avatar: UUIAvatarElement, index: number) => {
      const avatarNumber: number = index + 1;
      avatar.style.border = `0.1em solid ${this.borderColor}`;
      avatar.style.display =
        avatarNumber <= this._limit || this._limit === 0 ? '' : 'none';
    });
  }

  shouldShowLimitNumber() {
    return this._limit !== 0 && this.avatarArray.length > this._limit;
  }

  private onSlotChange() {
    this.setAvatarArray();
    this.updateAvatarVisibility();
  }

  private setAvatarArray() {
    this.avatarArray = this.avatarNodes ? this.avatarNodes : [];
  }

  render() {
    return html`
      <slot @slotchange=${this.onSlotChange}></slot>
      ${this.shouldShowLimitNumber()
        ? html`<small id="overflow-indication"
            >+${this.avatarArray.length - this._limit}</small
          >`
        : ''}
    `;
  }
}
