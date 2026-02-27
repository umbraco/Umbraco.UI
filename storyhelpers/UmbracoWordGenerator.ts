import isChromatic from 'chromatic/isChromatic';

export const UmbracoWords: Readonly<string[]> = [
  'Unicorn',
  'ModelsBuilder',
  'ContentApps',
  'Placeholder',
  'The Rabbit',
  'Content Editor',
  'Flipped car',
  'Candid Contributions',
  '#H5YR',
  'ICanBeDirty',
  'Office hours',
  'Infinite Editing',
  'Umbraco Socks',
  '24 days in Umbraco',
  'Spark',
  'Package Manifest Podcast',
  'Skrift.io',
  'UmbrCoach',
  'Slave & Eagle',
  'Community Teams',
  'IRememberBeingDirty',
  'Media Picker v3',
  'Dependency Injection',
  'umbraCoffee',
  'Community Corner',
  'VS Code',
  'Super Tak',
  'Paul Seal',
  'The Friendly CMS',
  'Block List Editor',
  'ImageSharp',
  'ContentService',
  'ContentFlow',
  'Package Migrations',
  'Documentation',
  'Planting trees',
  'V9',
  'Matryoshka',
  'NuGet All The Things',
  'Hijacked Route',
  'Unicorns',
  'Content App',
  'Dashboard',
  'Angular',
  'ModelsBuilder',
  'Heartcore',
  'MVPs',
  'Umbraco Awards',
  'Azure',
  'The Grid',
  'umb-overlay',
  'Hack Make Do',
  'Section',
  'IUrlProvider',
  'The Friendly CMS',
  'Long term support',
  'Code of conduct',
  'Surface Controller',
  'GitHub',
  'Variants',
  'Property Value Converter',
  'Starter Kits',
  'TLA (Three Letter Acronym)',
  'UmbracoContext',
  'Automagically',
  'IPublishedContent',
  'Contentment',
  'Merge conflict',
  'Flipped Car',
  'UmbracoAuthorizedJsonController',
  'Swag Store',
  'IContentFinder',
  'ISearchableTree',
  'Virtual Codegarden',
  'Blazor',
];

const randomWordGenerator = (function* GenerateRandomWord() {
  for (let i = 0; ; i = (i + 1) % UmbracoWords.length) {
    yield UmbracoWords[i];
  }
})();

export function GetRandomUmbracoWord(): string {
  if (isChromatic()) {
    return randomWordGenerator.next().value ?? 'No more words';
  }

  return UmbracoWords[Math.floor(Math.random() * UmbracoWords.length)];
}

export function ArrayOfUmbracoWords(arrayLength: number): string[] {
  return [...new Array(arrayLength)].map(() => GetRandomUmbracoWord());
}
