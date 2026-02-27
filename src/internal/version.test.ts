describe('version', () => {
  let originalWarn: typeof console.warn;
  let originalVersions: string[] | undefined;
  let warnCalls: string[];

  beforeAll(() => {
    // Capture and restore global state
    originalVersions = (globalThis as any).__uuiVersions;

    // Pre-populate with a fake version to trigger the mismatch warning
    // when the module side effect runs on first import
    (globalThis as any).__uuiVersions = ['0.0.0-fake'];

    originalWarn = console.warn;
    warnCalls = [];
    console.warn = (...args: any[]) => {
      warnCalls.push(args.join(' '));
    };
  });

  afterAll(() => {
    console.warn = originalWarn;
    (globalThis as any).__uuiVersions = originalVersions;
  });

  it('exports UUI_VERSION as a semver string', async () => {
    const { UUI_VERSION } = await import('./version.js');
    expect(typeof UUI_VERSION).toBe('string');
    expect(UUI_VERSION).toMatch(/^\d+\.\d+\.\d+/);
  });

  it('registers version on globalThis.__uuiVersions', async () => {
    const { UUI_VERSION } = await import('./version.js');
    const versions: string[] = (globalThis as any).__uuiVersions;
    expect(Array.isArray(versions)).toBe(true);
    expect(versions).toContain(UUI_VERSION);
  });

  it('warns when multiple different versions are detected', () => {
    expect(warnCalls.length).toBeGreaterThan(0);
    expect(warnCalls[0]).toContain('Multiple versions of Umbraco UI detected');
  });
});
