import { LitElement, html, internalProperty } from 'lit-element';

/**
 *  @element uui-avatar-group
 */

export class UUIAvatarGroupExamplePageElement extends LitElement {
  @internalProperty()
  private limit = 3;

  @internalProperty()
  private avatars = [
    {
      name: 'Gaufrid Milko',
    },
    {
      name: 'Dorita Angelita',
    },
    {
      name: 'Mikhael Khshayarsha',
    },
    {
      name: 'John Domino',
    },
  ];

  private increaseLimit() {
    this.limit = this.limit + 1;
  }

  private decreaseLimit() {
    if (this.limit === 0) {
      return;
    }

    this.limit = this.limit - 1;
  }

  private addAvatar() {
    this.avatars = [...this.avatars, { name: 'First Last' }];
  }

  get totalAvatars(): number {
    return this.avatars.length;
  }

  render() {
    return html`
      <uui-avatar-group .limit="${this.limit}">
        ${this.avatars.map(
          avatar => html` <uui-avatar .text="${avatar.name}"> </uui-avatar> `
        )}
      </uui-avatar-group>
      <br />
      <br />
      <div>Limit: ${this.limit}</div>
      <div>Avatars in total: ${this.totalAvatars}</div>
      <button type="button" @click="${this.addAvatar}">Add avatar</button>
      <button type="button" @click="${this.increaseLimit}">
        Increase limit
      </button>
      <button type="button" @click="${this.decreaseLimit}">
        Decrease limit
      </button>
    `;
  }
}
