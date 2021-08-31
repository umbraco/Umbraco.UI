import { LitElement, html, css } from 'lit';
import { property, query, state } from 'lit/decorators';
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

  @property({ type: Number, attribute: true })
  get() {
    return this._limit;
  }
  set(value: number) {
    this._limit = value;
    this.updateAvatarVisibility();
  }

  @property({ type: String }) borderColor = 'white';

  @state() _limit = 0;

  @state()
  private avatars: UUIAvatarElement[] = [];

  @query('slot')
  protected avatarsSlot!: HTMLSlotElement;

  private queryAvatars(): void {
    this.avatars = (this.avatarsSlot as HTMLSlotElement)
      .assignedElements({ flatten: true })
      .filter((e: Node) => e instanceof UUIAvatarElement) as UUIAvatarElement[];

    this.updateAvatarVisibility();
  }

  private updateAvatarVisibility() {
    this.avatars.forEach((avatar: UUIAvatarElement, index: number) => {
      const avatarNumber: number = index + 1;
      avatar.style.border = `0.1em solid ${this.borderColor}`;
      avatar.style.display =
        avatarNumber <= this._limit || this._limit === 0 ? '' : 'none';
    });
  }

  updated() {
    this.updateAvatarVisibility();
  }

  firstUpdated() {
    this.queryAvatars();
  }

  render() {
    return html`
      <slot @slotchange=${this.queryAvatars}></slot>
      ${this._limit !== 0 && this.avatars.length > this._limit
        ? html`<small id="overflow-indication"
            >+${this.avatars.length - this._limit}</small
          >`
        : ''}
    `;
  }
}
