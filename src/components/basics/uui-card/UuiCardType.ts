export type CardType =
  | 'file'
  | 'image'
  | 'audio'
  | 'video'
  | 'node'
  | 'package'
  | 'user'
  | null;

export const CardTypeNames: Readonly<CardType[]> = [
  'file',
  'image',
  'audio',
  'video',
  'node',
  'package',
  'user',
] as const;
