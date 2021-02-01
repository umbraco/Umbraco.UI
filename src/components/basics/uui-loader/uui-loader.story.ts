import { html } from 'lit-html';
import './index';

export default {
  title: 'Basics/Loader',
  component: 'uui-loader',
};

export const Overview = () =>
  html`
    <h2>Default</h1>
    <uui-loader></uui-loader>

    <h2>White (Styled with css custom properties)</h2>
    <div style="position: relative; background-color: black; display: inline-block; padding: 10px;">
      <uui-loader style="--uui-loader-background: white;"></uui-loader>
    </div>

    <h2>Centered in container</h2>
    <div style="position: relative; width: 100px; height: 100px; background-color: white;">
      <uui-loader style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)"></uui-loader>
    </div>
  `;
