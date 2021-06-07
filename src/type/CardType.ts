export type CardType =
  | 'file'
  | 'image'
  | 'audio'
  | 'video'
  | 'node'
  | 'package'
  | 'user'
  | 'mixed'
  | null;

export const CardTypeNames: Readonly<CardType[]> = [
  'file',
  'image',
  'audio',
  'video',
  'node',
  'package',
  'user',
  'mixed',
] as const;
