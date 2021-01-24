import { css, unsafeCSS } from 'lit-element';

export const stateColorUtil = (
  property: string,
  tag: string,
  selector: string
) => {
  const states = [
    'ordinary',
    'primary',
    'secondary',
    'positive',
    'warning',
    'danger',
  ];

  const styles = states.map(state => {
    return `:host([color=${state}]) ${selector} {--${tag}-${property}: var(--uui-color-${state})}`;
  });

  const result = styles.join('');

  return css`
    ${unsafeCSS(result)}
  `;
};
