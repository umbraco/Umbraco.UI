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
  const a = UmbracoWords[Math.floor(Math.random() * UmbracoWords.length)];
  console.log(a);
  return a;
}
export function ArrayOfUmbracoWords(arrayLength: number): string[] {
  const b = [...Array(arrayLength)].map(() => GetRandomUmbracoWord());
  console.log(b);
  return b;
}
