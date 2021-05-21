import { html } from 'lit-html';
import { Size, sizes } from '../../type/Size';
import './index';

export default {
  title: 'Symbols/Loader Circle',
  component: 'uui-loader-circle',
};

const colors = [
  '#F79C37',
  '#FAD634',
  '#F5C1BC',
  '#162335',
  '#1B264F',
  '#3544B1',
  '#2152A3',
  '#3879FF',
  '#D42054',
  '#25aa60',
  '#191715',
  '#2E2B29',
  '#332A24',
  '#9D8057',
  '#E2DAD4',
  '#d8d7d9',
  '#f3f3f5',
  '#FEFEFE',
  '#060606',
  '#C4C4C4',
  '#9B9B9B',
  '#3E3E3E',
];
const progress = [10, 25, 33, 50, 75, 100];

export const ShowProgressNumber = () =>
  html`
    ${sizes.map(
      size =>
        html`<span>Size ${size}</span>${progress.map(
            progress => html`<uui-loader-circle
              show-progress
              progress=${progress}
              size="${size as Size}"
            ></uui-loader-circle>`
          )}<br />`
    )} <br />
    <span>Number will not be visible with smaller sizes</span>
  `;

export const Overview = () => html`
  ${sizes.map(
    size =>
      html`<span>Size ${size}</span>${progress.map(
          progress => html`<uui-loader-circle
            progress=${progress}
            size="${size as Size}"
          ></uui-loader-circle>`
        )}<br />`
  )}
`;

export const IndefiniteSate = () =>
  html`
    ${sizes.map(
      size =>
        html`<uui-loader-circle
            indefinite
            size="${size as Size}"
          ></uui-loader-circle
          ><br />`
    )}
  `;

export const Colors = () =>
  html`
    ${colors.map(
      color =>
        html`<uui-loader-circle
          indefinite
          size="xl"
          style=${`--uui-loader-circle-color: ${color}`}
        ></uui-loader-circle>`
    )}<br />
    <span
      >Color of the spinner can be changes with --uui-loader-circle-color custom
      proprty</span
    >
  `;
