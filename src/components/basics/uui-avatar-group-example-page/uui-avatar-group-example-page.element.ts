import { LitElement, html, internalProperty } from 'lit-element';

/**
 *  @element uui-avatar-group
 */

export class UUIAvatarGroupExamplePageElement extends LitElement {
  @internalProperty()
  private limit = 0;

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
      <uui-avatar-group .limit="${this.limit}" size="l" look="primary">
        ${this.avatars.map(
          avatar => html`
            <uui-avatar text="${avatar.name}" size="l" look="primary">
            </uui-avatar>
          `
        )}
      </uui-avatar-group>
      <div>Limit: ${this.limit}</div>
      <div>Avatars in total: ${this.totalAvatars}</div>
      <button type="button" @click="${() => this.addAvatar()}">
        Add avatar
      </button>
      <button type="button" @click="${() => this.increaseLimit()}">
        Increase limit
      </button>
      <button type="button" @click="${() => this.decreaseLimit()}">
        Decrease limit
      </button>
    `;
  }
}
