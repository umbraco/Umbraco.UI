import { CSSResult, unsafeCSS } from 'lit-element';

export const InterfaceLookNames: Readonly<InterfaceLookType[]> = [
  'primary',
  'secondary',
  'outline',
  'placeholder',
  'positive',
  'warning',
  'danger',
] as const;

export type InterfaceLookType =
  | ''
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'placeholder'
  | 'positive'
  | 'warning'
  | 'danger';

export const InterfaceLookDefaultValue = '';

export function InterfaceLookCSSCreator(
  loopMethod: (lookName: CSSResult) => CSSResult
): CSSResult[] {
  return InterfaceLookNames.map((lookName: InterfaceLookType) => {
    return loopMethod(unsafeCSS(lookName));
  });
}
