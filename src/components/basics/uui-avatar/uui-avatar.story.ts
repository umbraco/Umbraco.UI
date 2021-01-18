import { html } from 'lit-html';
import './index';

export default {
  title: 'Basics/Avatar',
  component: 'uui-avatar',
};

export const Overview = () => html`
  <h2>Avatars</h2>
  <div style="display: flex; align-items: center;">
    <uui-avatar
      size="xl"
      img-src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=100&w=100&s=b616b2c5b373a80ffc9636ba24f7a4a9"
      img-srcset="https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9 2x, https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=300&w=300&s=b616b2c5b373a80ffc9636ba24f7a4a9 3x"
    >
    </uui-avatar>

    <uui-avatar
      size="xl"
      img-src="https://images.unsplash.com/photo-1546539782-6fc531453083?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=100&w=100&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
      img-srcset="https://images.unsplash.com/photo-1546539782-6fc531453083?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ 2x, https://images.unsplash.com/photo-1546539782-6fc531453083?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=300&w=300&ixid=eyJhcHBfaWQiOjE3Nzg0fQ 3x"
    >
    </uui-avatar>

    <uui-avatar
      size="xl"
      img-src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=100&w=100&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
      img-srcset="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ 2x, https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=300&w=300&ixid=eyJhcHBfaWQiOjE3Nzg0fQ 3x"
    >
    </uui-avatar>
  </div>

  <h2>Responsive</h2>
  <p>Fit to its container</p>
  <div style="width: 300px; height: 300px;">
    <uui-avatar name="Mads Rasmussen" color="primary"></uui-avatar>
  </div>

  <h2>Initials</h2>
  <p>When there is no image and a name</p>
  <div style="display: flex; align-items: center;">
    <uui-avatar name="Niels Lyngsø" size="xl" color="primary"></uui-avatar>
    <uui-avatar
      name="Julia Gruszczynska"
      size="xl"
      color="primary"
    ></uui-avatar>
    <uui-avatar
      name="Mads Nicolaj Rasmussen"
      size="xl"
      color="primary"
    ></uui-avatar>
  </div>

  <h2>Sizes</h2>
  <p>All the fixed sizes</p>
  <div style="display: flex; align-items: center;">
    <uui-avatar size="xxl" color="primary" name="First Last"></uui-avatar>
    <uui-avatar size="xl" color="primary" name="First Last"></uui-avatar>
    <uui-avatar size="l" color="primary" name="First Last"></uui-avatar>
    <uui-avatar size="m" color="primary" name="First Last"></uui-avatar>
    <uui-avatar size="s" color="primary" name="First Last"></uui-avatar>
    <uui-avatar size="xs" color="primary" name="First Last"></uui-avatar>
    <uui-avatar size="xxs" color="primary" name="First Last"></uui-avatar>
  </div>

  <h2>Colors</h2>
  <p>All the fixed colors</p>
  <div style="display: flex; align-items: center;">
    <uui-avatar name="First Last" color="primary" size="m"></uui-avatar>
    <uui-avatar name="First Last" color="secondary" size="m"></uui-avatar>
    <uui-avatar name="First Last" color="success" size="m"></uui-avatar>
    <uui-avatar name="First Last" color="warning" size="m"></uui-avatar>
    <uui-avatar name="First Last" color="danger" size="m"></uui-avatar>
    <uui-avatar name="First Last" color="white" size="m"></uui-avatar>
    <uui-avatar name="First Last" color="gray" size="m"></uui-avatar>
  </div>
`;
