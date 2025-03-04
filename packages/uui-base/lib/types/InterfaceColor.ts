export const UUIInterfaceColorValues: Readonly<UUIInterfaceColor[]> = [
  'default',
  'positive',
  'warning',
  'danger',
  'invalid',
] as const;

export type UUIInterfaceColor =
  | ''
  | 'default'
  | 'positive'
  | 'warning'
  | 'danger'
  | 'invalid';
