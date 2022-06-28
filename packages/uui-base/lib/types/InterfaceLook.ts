export const InterfaceLookValues: Readonly<InterfaceLook[]> = [
  'default',
  'primary',
  'secondary',
  'outline',
  'placeholder',
] as const;

export type InterfaceLook =
  | ''
  | 'default'
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'placeholder';
