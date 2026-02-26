import { expect } from '@open-wc/testing';

describe('version', () => {
  let originalWarn: typeof console.warn;
  let warnCalls: string[];

  before(() => {
    // Pre-populate with a fake version to trigger the mismatch warning
    // when the module side effect runs on first import
    (globalThis as any).__uuiVersions = ['0.0.0-fake'];

    originalWarn = console.warn;
    warnCalls = [];
    console.warn = (...args: any[]) => {
      warnCalls.push(args.join(' '));
    };
  });

  after(() => {
    console.warn = originalWarn;
  });

  it('exports UUI_VERSION as a semver string', async () => {
    const { UUI_VERSION } = await import('./version');
    expect(UUI_VERSION).to.be.a('string');
    expect(UUI_VERSION).to.match(/^\d+\.\d+\.\d+/);
  });

  it('registers version on globalThis.__uuiVersions', async () => {
    const { UUI_VERSION } = await import('./version');
    const versions: string[] = (globalThis as any).__uuiVersions;
    expect(versions).to.be.an('array');
    expect(versions).to.include(UUI_VERSION);
  });

  it('warns when multiple different versions are detected', () => {
    expect(warnCalls.length).to.be.greaterThan(0);
    expect(warnCalls[0]).to.include('Multiple versions of Umbraco UI detected');
  });
});
