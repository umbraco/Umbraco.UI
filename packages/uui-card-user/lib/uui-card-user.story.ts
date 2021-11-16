import { html } from 'lit-html';
import './index';

export default {
  title: 'Displays/Cards/User Card',
  component: 'uui-card-user',
};

export const Default = () =>
  html`
    <div style="width: 130px; display: grid; gap: 16px">
      <uui-card-user selectable name="Sherlock Holmes">
        <uui-tag size="s" slot="tag" look="positive">Invited</uui-tag>
        <div style="margin-bottom: 12px">Editors</div>
        <div>Last login</div>
        <div>March 19, 2021 9:14 AM</div>
      </uui-card-user>
      <uui-card-user selectable selected name="John Watson">
        <div style="margin-bottom: 12px">Editors</div>
        <div>Has not logged in yet</div>
      </uui-card-user>
      <uui-card-user disabled selected name="John Disabled">
        <div style="margin-bottom: 12px">Editors</div>
        <div>Has not logged in yet</div>
      </uui-card-user>
      <uui-card-user disabled error name="John Disabled">
        <div style="margin-bottom: 12px">Editors</div>
        <div>Has not logged in yet</div>
      </uui-card-user>
      <uui-card-user selectable disabled error name="John Disabled">
        <div style="margin-bottom: 12px">Editors</div>
        <div>Has not logged in yet</div>
      </uui-card-user>
      <uui-card-user selectable error name="John Error">
        <div style="margin-bottom: 12px">Editors</div>
        <div>Has not logged in yet</div>
      </uui-card-user>
    </div>
  `;
