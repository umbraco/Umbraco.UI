import { html } from 'lit-html';
import '@umbraco-ui/uui-caret/lib/index';

export default {
  title: 'Symbols/Caret',
  component: 'uui-caret',
};

export const Overview = () =>
  html`
    <uui-caret
      @click=${(e: MouseEvent) => {
        console.log('Click');
        (e.target as any).open = !(e.target as any).open;
      }}></uui-caret>
  `;
