export const UUIInterfaceLookValues: Readonly<UUIInterfaceLook[]> = [
  'default',
  'primary',
  'secondary',
  'outline',
  'placeholder',
] as const;

export type UUIInterfaceLook =
  | ''
  | 'default'
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'placeholder';
