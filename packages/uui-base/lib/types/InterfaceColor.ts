export const InterfaceColorValues: Readonly<InterfaceColor[]> = [
  'default',
  'positive',
  'warning',
  'danger',
] as const;

export type InterfaceColor = '' | 'default' | 'positive' | 'warning' | 'danger';
