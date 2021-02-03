import { LitElement, html, internalProperty } from 'lit-element';

/**
 *  @element uui-avatar-group
 */

export class UUIAvatarGroupExampleElement extends LitElement {
  private avatarSrc =
    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&s=b616b2c5b373a80ffc9636ba24f7a4a9';

  private avatarSrcSet: string[] = [
    `${this.avatarSrc}&h=100&w=100`,
    `${this.avatarSrc}&h=200&w=200`,
    `${this.avatarSrc}&h=300&w=300`,
  ];

  @internalProperty()
  private limit = 2;

  @internalProperty()
  private avatars = [
    {
      name: 'Gaufrid Milko',
      src: this.avatarSrcSet,
    },
    {
      name: 'Dorita Angelita',
      src: this.avatarSrcSet,
    },
    {
      name: 'Mikhael Khshayarsha',
      src: this.avatarSrcSet,
    },
  ];

  private increaseLimit() {
    this.limit = this.limit + 1;
  }

  private addAvatar() {
    this.avatars = [
      ...this.avatars,
      { name: 'First Last', src: this.avatarSrcSet },
    ];
  }

  render() {
    return html`
      <uui-avatar-group .limit="${this.limit}" size="l" look="primary">
        ${this.avatars.map(
          avatar => html`
            <uui-avatar text="${avatar.name}" size="l" look="primary">
            </uui-avatar>
          `
        )}
      </uui-avatar-group>

      <button type="button" @click="${() => this.addAvatar()}">
        Add avatar
      </button>
      <button type="button" @click="${() => this.increaseLimit()}">
        Increase limit
      </button>
    `;
  }
}
