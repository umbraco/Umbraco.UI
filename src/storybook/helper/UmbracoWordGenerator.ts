export const UmbracoWords: Readonly<string[]> = [
  'Unicorn',
  'ModelsBuilder',
  'ContentApps',
  'Placeholder',
  'The Rabbit',
  'Content Editor',
  'Flipped car',
] as const;

export function GetRandomUmbracoWord(): string {
  return UmbracoWords[Math.floor(Math.random() * UmbracoWords.length)];
}
export function ArrayOfUmbracoWords(arrayLength: number): string[] {
  return [...Array(arrayLength)].map(() => GetRandomUmbracoWord());
}
