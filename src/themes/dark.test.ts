import darkTheme from './dark.css?inline';

const COLORS = [
  'default',
  'selected',
  'current',
  'warning',
  'danger',
  'invalid',
  'positive',
] as const;

const SURFACES = ['surface', 'surface-alt'] as const;

function resolveToken(name: string): string {
  const probe = document.createElement('span');
  probe.style.color = `var(--uui-color-${name})`;
  document.body.append(probe);
  const value = getComputedStyle(probe).color;
  probe.remove();
  return value;
}

function relativeLuminance(rgb: string): number {
  const [r, g, b] = rgb
    .match(/[\d.]+/g)!
    .slice(0, 3)
    .map(channel => {
      const c = Number(channel) / 255;
      return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(foreground: string, background: string): number {
  const [light, dark] = [
    relativeLuminance(resolveToken(foreground)),
    relativeLuminance(resolveToken(background)),
  ].sort((a, b) => b - a);
  return (light + 0.05) / (dark + 0.05);
}

describe('dark theme colour tokens', () => {
  let style: HTMLStyleElement;

  beforeAll(() => {
    style = document.createElement('style');
    style.textContent = darkTheme;
    document.head.append(style);
  });

  afterAll(() => style.remove());

  describe.each(COLORS)('%s', color => {
    it('-contrast text reaches 4.5:1 on the fill and on its emphasis', () => {
      expect(contrast(`${color}-contrast`, color)).toBeGreaterThanOrEqual(4.5);
      expect(
        contrast(`${color}-contrast`, `${color}-emphasis`),
      ).toBeGreaterThanOrEqual(4.5);
    });

    it.each(SURFACES)('the fill reaches 3:1 as a graphic on %s', surface => {
      expect(contrast(color, surface)).toBeGreaterThanOrEqual(3);
    });

    it.each(SURFACES)('-standalone reaches 4.5:1 as text on %s', surface => {
      expect(contrast(`${color}-standalone`, surface)).toBeGreaterThanOrEqual(
        4.5,
      );
    });
  });

  it.each([...SURFACES, 'background', 'header-surface'])(
    'focus reaches 3:1 against %s',
    background => {
      expect(contrast('focus', background)).toBeGreaterThanOrEqual(3);
    },
  );
});
