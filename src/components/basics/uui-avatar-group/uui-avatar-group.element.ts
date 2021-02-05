import {
  LitElement,
  html,
  css,
  query,
  property,
  internalProperty,
} from 'lit-element';
import {
  UUIAvatarElement,
  AvatarSizeType,
  AvatarSizeDefaultValue,
} from '../uui-avatar/uui-avatar.element';
import {
  InterfaceLookType,
  InterfaceLookDefaultValue,
} from '../../../type/InterfaceLook';

/**
 *  @element uui-avatar-group
 */

export class UUIAvatarGroupElement extends LitElement {
  static styles = [
    css`
      :host {
        display: inline-flex;
        align-items: center;
        padding-left: 5px;
        padding-right: 5px;
      }

      ::slotted(uui-avatar),
      uui-avatar {
        margin-left: -5px;
        margin-right: -5px;
      }
    `,
  ];

  @property({ type: Number, attribute: true })
  public limit = 0;

  @property({ type: String, attribute: true })
  public look: InterfaceLookType = InterfaceLookDefaultValue;

  @property({ type: String, attribute: true })
  public size: AvatarSizeType = AvatarSizeDefaultValue;

  @internalProperty()
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
    this.avatars.forEach((avatar: UUIAvatarElement, index: number) => {
      const avatarNumber: number = index + 1;
      avatar.style.display =
        avatarNumber <= this.limit || this.limit === 0 ? '' : 'none';
    });
  }

  get overflow(): number {
    return this.limit === 0 ? 0 : this.avatars.length - this.limit;
  }

  get overflowIsVisible(): boolean {
    return this.overflow > 0;
  }

  updated() {
    this.toggleAvatarVisibility();
  }

  render() {
    return html`
      <slot @slotchange=${this.queryAvatars}></slot>
      ${this.overflowIsVisible
        ? html`<uui-avatar size="${this.size}" look="${this.look}"
            >+${this.overflow}</uui-avatar
          >`
        : ``}
    `;
  }
}
