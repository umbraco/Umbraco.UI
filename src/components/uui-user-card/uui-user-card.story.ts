import { html } from 'lit-html';
import './index';

export default {
  title: 'Displays/Card/User Card',
  component: 'uui-user-card',
};

export const Default = () =>
  html`
    <div style="width: 130px">
      <uui-user-card selectable name="Sherlock Holmes">
        <uui-tag size="s" slot="tag" look="positive">Invited</uui-tag>
        <div style="margin-bottom: 12px">Editors</div>
        <div>Last login</div>
        <div>March 19, 2021 9:14 AM</div>
      </uui-user-card>
      <uui-user-card selectable selected name="John Watson">
        <div style="margin-bottom: 12px">Editors</div>
        <div>Has not logged in yet</div>
      </uui-user-card>
      </uui-user-card>
      <uui-user-card selectable selected error name="John Error">
        <div style="margin-bottom: 12px">Editors</div>
        <div>Has not logged in yet</div>
      </uui-user-card>
    </div>
  `;
