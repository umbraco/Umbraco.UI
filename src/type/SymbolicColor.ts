import { CSSResult, unsafeCSS } from 'lit-element';

export const SymbolicColorNames: Readonly<SymbolicColorType[]> = [
  'primary',
  'secondary',
  'outline',
  'positive',
  'warning',
  'danger',
] as const;

export type SymbolicColorType =
  | null
  | ''
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'positive'
  | 'warning'
  | 'danger';

export const SymbolicColorDefaultValue = '';

export function SymbolicColorCSSCreator(
  loopMethod: (symbolicName: CSSResult) => CSSResult
): CSSResult[] {
  return SymbolicColorNames.map((symbolicName: SymbolicColorType) => {
    return loopMethod(unsafeCSS(symbolicName));
  });
}
