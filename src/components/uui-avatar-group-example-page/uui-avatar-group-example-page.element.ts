import { LitElement, html } from 'lit';
import { state } from 'lit/decorators.js';
/**
 *  @element uui-avatar-group-example-page
 */

export class UUIAvatarGroupExamplePageElement extends LitElement {
  @state()
  private limit = 3;

  @state()
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
          avatar => html` <uui-avatar title="${avatar.name}"> </uui-avatar> `
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
