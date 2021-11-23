import { unsafeCSS } from 'lit';
// @ts-ignore-start
// @typescript-eslint/ban-ts-comment // @ts-ignore
import css from '../dist/local-typography.css'; // eslint-disable-line no-use-before-define
// @ts-ignore-end

export const LocalTypography = unsafeCSS(css);
