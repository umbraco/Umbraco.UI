import { LitElement, html, css } from 'lit';
import { property, query, state } from 'lit/decorators';
import {
  UUIAvatarElement,
  AvatarSizeType,
  AvatarSizeDefaultValue,
} from '../uui-avatar/uui-avatar.element';
import {
  InterfaceLookType,
  InterfaceLookDefaultValue,
} from '../../type/InterfaceLook';

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
        margin-left: -3px;
        margin-right: -3px;
      }

      #overflow-indication {
        margin-left: 6px;
      }
    `,
  ];

  @property({ type: Number, attribute: true })
  limit = 0;

  @property({ type: String, attribute: true })
  public size: AvatarSizeType = AvatarSizeDefaultValue;

  @state()
  private avatars: UUIAvatarElement[] = [];

  @query('slot')
  protected avatarsSlot!: HTMLSlotElement;

  private queryAvatars(): void {
    this.avatars = (this.avatarsSlot as HTMLSlotElement)
      .assignedElements({ flatten: true })
      .filter((e: Node) => e instanceof UUIAvatarElement) as UUIAvatarElement[];
    this.toggleAvatarVisibility();
  }

  private toggleAvatarVisibility() {
    // console.log(this.avatars);
    this.avatars.forEach((avatar: UUIAvatarElement, index: number) => {
      const avatarNumber: number = index + 1;
      avatar.style.display =
        avatarNumber <= this.limit || this.limit === 0 ? '' : 'none';
    });
  }

  firstUpdated() {
    this.queryAvatars();
    this.toggleAvatarVisibility();
    console.log(this.avatars, 'first updated');
  }

  updated() {
    console.log(this.avatars, 'updated');

    this.toggleAvatarVisibility();
  }

  onslotchange() {
    console.log(this.avatars, 'onslotchange');
  }

  render() {
    return html`
      <slot @slotchange=${this.onslotchange}></slot>
      ${this.limit !== 0 && this.avatars.length > this.limit
        ? html`<small id="overflow-indication"
            >+${this.avatars.length - this.limit}</small
          >`
        : ''}
    `;
  }
}
