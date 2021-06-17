import { css, unsafeCSS } from 'lit';

//this works and seems to be a good way to make keyframes reusable

export const UUIBlinkKeyframes = css`
  @-webkit-keyframes uui-blink {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes uui-blink {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
`;

export const UUIBlinkAnimationValue = unsafeCSS('uui-blink 0.9s infinite both');
