#!/usr/bin/env node
/**
 * Converts @open-wc/testing test files to vitest-browser-lit.
 * Run: node scripts/convert-tests.mjs
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

function findTestFiles(dir) {
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) results.push(...findTestFiles(full));
    else if (entry.name.endsWith('.test.ts')) results.push(full);
  }
  return results;
}

const skip = ['button/button.test.ts', 'input/input.test.ts'];
const files = findTestFiles('src/components').filter(
  f => !skip.some(s => f.endsWith(s)),
);

let converted = 0;
let warnings = [];

for (const file of files) {
  let content = readFileSync(file, 'utf-8');
  const original = content;
  content = convertFile(content, file);
  if (content !== original) {
    writeFileSync(file, content);
    converted++;
    console.log(`  ✓ ${file}`);
  } else {
    console.log(`  - ${file} (no changes)`);
  }
}
console.log(`\nConverted ${converted}/${files.length} files`);
if (warnings.length) {
  console.log('\nWarnings:');
  warnings.forEach(w => console.log(`  ⚠ ${w}`));
}

function convertFile(content, filePath) {
  let needsRender = false;
  let needsLitHtml = false;
  let needsAxeRun = false;
  let needsOneEvent = false;
  let needsSleep = false;
  let hadDefineCE = false;
  let hadUnsafeStatic = false;

  // 1. Parse @open-wc/testing imports
  const owcRegex =
    /import\s*\{([^}]*)\}\s*from\s*['"]@open-wc\/testing['"];?\n?/;
  const owcMatch = content.match(owcRegex);
  if (owcMatch) {
    const imports = owcMatch[1]
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
    if (imports.includes('html')) needsLitHtml = true;
    if (imports.includes('fixture')) needsRender = true;
    if (imports.includes('oneEvent')) needsOneEvent = true;
    if (imports.includes('aTimeout')) needsSleep = true;
    if (imports.includes('defineCE')) hadDefineCE = true;
    if (imports.includes('unsafeStatic')) hadUnsafeStatic = true;
    content = content.replace(owcRegex, '');
  }

  // Remove @web/test-runner-commands import
  content = content.replace(
    /import\s*\{[^}]*\}\s*from\s*['"]@web\/test-runner-commands['"];?\n?/g,
    '',
  );

  // Check for accessible assertions
  if (content.includes('.to.be.accessible')) needsAxeRun = true;

  // 2. Build new imports
  const newImports = [];
  if (needsLitHtml) {
    // Check if lit is already imported (e.g. for LitElement)
    const litImportRegex = /import\s*\{([^}]*)\}\s*from\s*['"]lit['"];?/;
    const litMatch = content.match(litImportRegex);
    if (litMatch && !litMatch[1].includes('html')) {
      // Add html to existing lit import
      content = content.replace(litImportRegex, (m, imports) => {
        return m.replace(imports, imports.trimEnd() + ', html');
      });
    } else if (!litMatch) {
      newImports.push("import { html } from 'lit';");
    }
  }
  if (needsRender) {
    newImports.push("import { render } from 'vitest-browser-lit';");
  }
  if (needsAxeRun) {
    newImports.push("import { axeRun } from '../../internal/test/a11y.js';");
  }
  if (hadUnsafeStatic) {
    newImports.push(
      "import { unsafeStatic, html as staticHtml } from 'lit/static-html.js';",
    );
  }

  // Insert after first import
  if (newImports.length > 0) {
    const firstImportIdx = content.indexOf('import ');
    if (firstImportIdx !== -1) {
      const lineEnd = content.indexOf('\n', firstImportIdx);
      content =
        content.slice(0, lineEnd + 1) +
        newImports.join('\n') +
        '\n' +
        content.slice(lineEnd + 1);
    }
  }

  // 3. Replace fixture calls
  content = replaceFixtures(content, filePath);

  // 4. Replace accessibility assertions
  content = content.replace(
    /await\s+expect\(([^)]+)\)(?:\.shadowDom)?\.to\.be\.accessible\(\)/g,
    'expect(await axeRun($1)).toHaveNoViolations()',
  );

  // 5. Replace Chai assertions
  content = replaceAssertions(content);

  // 6. Replace elementUpdated
  content = content.replace(
    /await\s+elementUpdated\(([^)]+)\)/g,
    'await $1.updateComplete',
  );

  // 7. Handle .timeout(N) → { timeout: N } in it() calls
  content = content.replace(
    /\}\)\.timeout\((\d+)\)\s*;/g,
    '}, { timeout: $1 });',
  );

  // 8. Inject helpers
  const helperInsertPoint = findHelperInsertPoint(content);

  if (needsOneEvent) {
    const helper = `
/** Helper: one-shot event listener as a Promise. */
function oneEvent(el: EventTarget, event: string): Promise<Event> {
  return new Promise(resolve => {
    el.addEventListener(event, resolve, { once: true });
  });
}
`;
    content =
      content.slice(0, helperInsertPoint) +
      helper +
      content.slice(helperInsertPoint);
    // Remove third parameter from oneEvent calls
    content = content.replace(
      /oneEvent\(([^,]+),\s*([^,)]+),\s*(?:true|false)\)/g,
      'oneEvent($1, $2)',
    );
  }

  if (needsSleep) {
    const insertPt = findHelperInsertPoint(content);
    const helper = `
function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
`;
    content =
      content.slice(0, insertPt) + helper + content.slice(insertPt);
    content = content.replace(/\baTimeout\b/g, 'sleep');
  }

  if (hadDefineCE) {
    const insertPt = findHelperInsertPoint(content);
    const helper = `
let __defineCECounter = 0;
function defineCE(klass: CustomElementConstructor): string {
  const name = \`test-\${__defineCECounter++}-\${Date.now()}\`;
  customElements.define(name, klass);
  return name;
}
`;
    content =
      content.slice(0, insertPt) + helper + content.slice(insertPt);
  }

  // For unsafeStatic: replace html` with staticHtml` in fixture/render calls that use ${tag}
  if (hadUnsafeStatic) {
    // Replace render(html` that contain ${tag} with render(staticHtml`
    content = content.replace(
      /render\(html`([\s\S]*?\$\{tag\}[\s\S]*?)`\)/g,
      'render(staticHtml`$1`)',
    );
  }

  // Clean up: remove duplicate blank lines
  content = content.replace(/\n{3,}/g, '\n\n');

  return content;
}

function replaceFixtures(content, filePath) {
  // Match fixture calls - handles single and multi-line templates
  const fixtureRegex =
    /(\s*)((?:const\s+)?(\w+))\s*=\s*(?:\(\s*)?await\s+fixture\(\s*(?:html|staticHtml)`([\s\S]*?)`\s*,?\s*\)(?:\s*\)\s*as\s+(\w+))?\s*;/g;

  return content.replace(
    fixtureRegex,
    (match, indent, fullVar, varName, template, castType) => {
      // Extract root tag from template
      const tagMatch = template.match(/<([a-z][-a-z0-9]*)/);
      if (!tagMatch) {
        // Dynamic tag like <${tag}> - can't auto-convert
        warnings.push(`${filePath}: dynamic tag in fixture, needs manual fix`);
        return match;
      }
      const tagName = tagMatch[1];
      const isUUI = tagName.startsWith('uui-');

      const isConst = fullVar.startsWith('const ');
      const varDecl = isConst ? `const ${varName}` : varName;
      const castSuffix = castType ? ` as ${castType}` : '';

      // Check if template uses dynamic interpolation that changes the tag
      const useStaticHtml =
        template.includes('${') && template.match(/\$\{tag/);
      const htmlTag = useStaticHtml ? 'staticHtml' : 'html';

      // Inline render().container.querySelector() to avoid screen variable conflicts
      let result = `${indent}${varDecl} = render(${htmlTag}\`${template}\`).container.querySelector('${tagName}')!${castSuffix};`;
      if (isUUI) {
        result += `\n${indent}await ${varName}.updateComplete;`;
      }

      return result;
    },
  );
}

function replaceAssertions(content) {
  // Replace more specific patterns first

  // .to.not.have.attribute(X)
  content = content.replace(
    /expect\(([^)]+)\)\.to\.not\.have\.attribute\(([^)]+)\)/g,
    'expect($1.hasAttribute($2)).toBe(false)',
  );

  // .to.have.attribute(X, Y) - with value
  // Use [^,)]+  for the first arg to prevent matching across lines/statements
  content = content.replace(
    /expect\(([^)]+)\)\.to\.have\.attribute\(([^,)]+),\s*([^)]+)\)/g,
    'expect($1.getAttribute($2)).toBe($3)',
  );

  // .to.have.attribute(X) - existence only
  content = content.replace(
    /expect\(([^)]+)\)\.to\.have\.attribute\(([^)]+)\)/g,
    'expect($1.hasAttribute($2)).toBe(true)',
  );

  // .to.have.attr(X, Y) - use [^,)]+ for first arg
  content = content.replace(
    /expect\(([^)]+)\)\.to\.have\.attr\(([^,)]+),\s*([^)]+)\)/g,
    'expect($1.getAttribute($2)).toBe($3)',
  );

  // .to.have.attr(X)
  content = content.replace(
    /expect\(([^)]+)\)\.to\.have\.attr\(([^)]+)\)/g,
    'expect($1.hasAttribute($2)).toBe(true)',
  );

  // .to.have.class(X)
  content = content.replace(
    /expect\(([^)]+)\)\.to\.have\.class\(([^)]+)\)/g,
    'expect($1.classList.contains($2)).toBe(true)',
  );

  // .to.have.text(X)
  content = content.replace(
    /expect\(([^)]+)\)\.to\.have\.text\(([^)]+)\)/g,
    'expect($1.textContent).toBe($2)',
  );

  // .to.be.displayed
  content = content.replace(/\.to\.be\.displayed/g, '.toBeVisible()');

  // .to.be.equal(X) → .toBe(X)
  content = content.replace(/\.to\.be\.equal\(/g, '.toBe(');

  // .to.not.equal(X) → .not.toBe(X)
  content = content.replace(/\.to\.not\.equal\(/g, '.not.toBe(');

  // .to.equal(X) → .toBe(X)
  content = content.replace(/\.to\.equal\(/g, '.toBe(');

  // .to.have.lengthOf(N) → .toHaveLength(N)
  content = content.replace(/\.to\.have\.lengthOf\(/g, '.toHaveLength(');

  // .to.have.property(X).that.is.a('function') → .toHaveProperty(X) (drop chain)
  content = content.replace(
    /\.to\.have\.property\(([^)]+)\)\.that\.is\.a\([^)]+\)/g,
    '.toHaveProperty($1)',
  );

  // .not.to.have.property(X) → .not.toHaveProperty(X)
  content = content.replace(/\.not\.to\.have\.property\(/g, '.not.toHaveProperty(');

  // .to.have.property(X) → .toHaveProperty(X)
  content = content.replace(/\.to\.have\.property\(/g, '.toHaveProperty(');

  // .to.not.be.null
  content = content.replace(/\.to\.not\.be\.null/g, '.not.toBeNull()');

  // .to.be.null
  content = content.replace(/\.to\.be\.null/g, '.toBeNull()');

  // .to.not.be.undefined
  content = content.replace(
    /\.to\.not\.be\.undefined/g,
    '.not.toBeUndefined()',
  );

  // .to.be.undefined
  content = content.replace(/\.to\.be\.undefined/g, '.toBeUndefined()');

  // .to.be.true
  content = content.replace(/\.to\.be\.true/g, '.toBe(true)');

  // .to.be.false
  content = content.replace(/\.to\.be\.false/g, '.toBe(false)');

  // .to.be.instanceOf(X) → .toBeInstanceOf(X)
  content = content.replace(/\.to\.be\.instanceOf\(/g, '.toBeInstanceOf(');

  // .to.be.lessThan(X) → .toBeLessThan(X)
  content = content.replace(/\.to\.be\.lessThan\(/g, '.toBeLessThan(');

  // .to.be.greaterThan(X) → .toBeGreaterThan(X)
  content = content.replace(/\.to\.be\.greaterThan\(/g, '.toBeGreaterThan(');

  // .to.not.include(X) → .not.toContain(X)
  content = content.replace(/\.to\.not\.include\(/g, '.not.toContain(');

  // .to.contain(X) → .toContain(X)
  content = content.replace(/\.to\.contain\(/g, '.toContain(');

  // .to.exist (including multiline .to\n  .exist)
  content = content.replace(/\.to\s*\n\s*\.exist/g, '.toBeDefined()');
  content = content.replace(/\.to\.exist/g, '.toBeDefined()');

  // Clean up leftover .that.is.a('function') chains after toHaveProperty
  content = content.replace(/\.that\.is\.a\([^)]+\)/g, '');

  return content;
}

function findHelperInsertPoint(content) {
  // Find the line after the last top-level import
  const lines = content.split('\n');
  let lastImportLine = -1;
  for (let i = 0; i < lines.length; i++) {
    if (
      lines[i].startsWith('import ') ||
      lines[i].match(/^\}\s*from\s+['"]/)
    ) {
      lastImportLine = i;
    }
  }
  if (lastImportLine === -1) return 0;

  // Return the character offset after this line
  let offset = 0;
  for (let i = 0; i <= lastImportLine; i++) {
    offset += lines[i].length + 1; // +1 for \n
  }
  return offset;
}
