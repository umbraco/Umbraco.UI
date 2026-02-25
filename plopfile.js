const kebabCase = str =>
  str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();

export default function (plop) {
  // name of custom element tag
  plop.setPartial('tagnamePartial', 'uui-{{name}}');
  // name of LitElement class
  plop.setHelper('className', function (name) {
    const camel = name.replace(/-([a-z])/g, g => g[1].toUpperCase());
    return `UUI${camel.charAt(0).toUpperCase() + camel.substring(1)}Element`;
  });
  // name used as title in storybook and documentation
  plop.setHelper('displayName', function (name) {
    const spaced = name.replace(/-([a-z])/g, g => ` ${g[1].toUpperCase()}`);
    return spaced.charAt(0).toUpperCase() + spaced.substring(1);
  });
  plop.setGenerator('component', {
    description: 'application controller logic',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message:
          'UUI element name (i.e. color-area). uui- prefix will be added automatically',
        validate: answer => {
          if (answer.length < 1) {
            return "There is no way we're moving forward without a name for your component.";
          } else return true;
        },
        // Convert the input into kebab case if not provided as such and strip prefix
        filter: response => kebabCase(response.replace(/^uui-/, '')),
      },
    ],
    actions: [
      {
        type: 'add',
        path: './src/components/{{name}}/{{name}}.ts',
        templateFile: './templates/plop-templates/index.ts.hbs',
      },
      {
        type: 'add',
        path: './src/components/{{name}}/{{name}}.element.ts',
        templateFile: './templates/plop-templates/component.ts.hbs',
      },
      {
        type: 'add',
        path: './src/components/{{name}}/{{name}}.test.ts',
        templateFile: './templates/plop-templates/test.ts.hbs',
      },
      {
        type: 'add',
        path: './src/components/{{name}}/{{name}}.story.ts',
        templateFile: './templates/plop-templates/stories.ts.hbs',
      },
      {
        type: 'add',
        path: './src/components/{{name}}/README.md',
        templateFile: './templates/plop-templates/README.md.hbs',
      },
      {
        type: 'append',
        path: './src/index.ts',
        template: "export * from './components/{{name}}/{{name}}.js';",
      },
    ],
  });
}
