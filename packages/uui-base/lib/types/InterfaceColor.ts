export const UUIInterfaceColorValues: Readonly<UUIInterfaceColor[]> = [
  'default',
  'positive',
  'warning',
  'danger',
] as const;

export type UUIInterfaceColor =
  | ''
  | 'default'
  | 'positive'
  | 'warning'
  | 'danger'
  | 'invalid';
