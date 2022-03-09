import { html } from 'lit-html';
import './index';

export default {
  title: 'Symbols/Lock Symbol',
  component: 'uui-lock-symbol',
};

export const Overview = () =>
  html`
    <uui-lock-symbol
      @click=${(e: MouseEvent) => {
        (e.target as any).open = !(e.target as any).open;
      }}></uui-lock-symbol>
  `;
