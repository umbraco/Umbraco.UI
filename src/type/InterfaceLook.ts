import { CSSResult, CSSResultArray, CSSResultGroup, unsafeCSS } from 'lit';

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
  loopMethod: (lookName: CSSResult) => CSSResultGroup
): CSSResultArray {
  return InterfaceLookNames.map((lookName: InterfaceLookType) => {
    return loopMethod(unsafeCSS(lookName));
  });
}
