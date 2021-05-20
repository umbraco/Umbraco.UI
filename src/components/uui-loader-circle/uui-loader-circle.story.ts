import { html } from 'lit-html';
import {
  InterfaceLookNames,
  InterfaceLookType,
} from '../../type/InterfaceLook';
import './index';

export default {
  title: 'Symbols/Loader Circle',
  component: 'uui-loader-circle',
};

export const Overview = () =>
  html`
    <span>Size S</span
    ><uui-loader-circle progress=${10} size="s"></uui-loader-circle
    ><uui-loader-circle progress=${30} size="s"></uui-loader-circle
    ><uui-loader-circle progress=${70} size="s"></uui-loader-circle
    ><uui-loader-circle progress=${100} size="s"></uui-loader-circle>
    <br />
    <span>Size M</span
    ><uui-loader-circle progress=${10} size="m"></uui-loader-circle
    ><uui-loader-circle progress=${30} size="m"></uui-loader-circle
    ><uui-loader-circle progress=${70} size="m"></uui-loader-circle
    ><uui-loader-circle progress=${100} size="m"></uui-loader-circle>
    <br />
    <span>Size L</span
    ><uui-loader-circle progress=${10} size="l"></uui-loader-circle
    ><uui-loader-circle progress=${30} size="l"></uui-loader-circle
    ><uui-loader-circle progress=${70} size="l"></uui-loader-circle
    ><uui-loader-circle progress=${100} size="l"></uui-loader-circle>
    <br />
    <span>Size XL</span
    ><uui-loader-circle progress=${10} size="xl"></uui-loader-circle
    ><uui-loader-circle progress=${30} size="xl"></uui-loader-circle
    ><uui-loader-circle progress=${70} size="xl"></uui-loader-circle
    ><uui-loader-circle progress=${100} size="xl"></uui-loader-circle>
  `;

export const WithNumber = () =>
  html`
    <span>Size S</span
    ><uui-loader-circle
      show-progress
      progress=${10}
      size="s"
    ></uui-loader-circle
    ><uui-loader-circle
      show-progress
      progress=${30}
      size="s"
    ></uui-loader-circle
    ><uui-loader-circle
      show-progress
      progress=${70}
      size="s"
    ></uui-loader-circle
    ><uui-loader-circle
      show-progress
      progress=${100}
      size="s"
    ></uui-loader-circle>
    <br />
    <span>Size M</span
    ><uui-loader-circle
      show-progress
      progress=${10}
      size="m"
    ></uui-loader-circle
    ><uui-loader-circle
      show-progress
      progress=${30}
      size="m"
    ></uui-loader-circle
    ><uui-loader-circle
      show-progress
      progress=${70}
      size="m"
    ></uui-loader-circle
    ><uui-loader-circle
      show-progress
      progress=${100}
      size="m"
    ></uui-loader-circle>
    <br />
    <span>Size L</span
    ><uui-loader-circle
      show-progress
      progress=${10}
      size="l"
    ></uui-loader-circle
    ><uui-loader-circle
      show-progress
      progress=${30}
      size="l"
    ></uui-loader-circle
    ><uui-loader-circle
      show-progress
      progress=${70}
      size="l"
    ></uui-loader-circle
    ><uui-loader-circle
      show-progress
      progress=${100}
      size="l"
    ></uui-loader-circle>
    <br />
    <span>Size XL</span
    ><uui-loader-circle
      show-progress
      progress=${10}
      size="xl"
    ></uui-loader-circle
    ><uui-loader-circle
      show-progress
      progress=${30}
      size="xl"
    ></uui-loader-circle
    ><uui-loader-circle
      show-progress
      progress=${70}
      size="xl"
    ></uui-loader-circle
    ><uui-loader-circle
      show-progress
      progress=${100}
      size="xl"
    ></uui-loader-circle>
  `;
export const Indefinite = () =>
  html`
    <uui-loader-circle indefinite size="s"></uui-loader-circle>
    <uui-loader-circle indefinite size="m"></uui-loader-circle>
    <uui-loader-circle indefinite size="l"></uui-loader-circle>
    <uui-loader-circle indefinite size="xl"></uui-loader-circle>
  `;
