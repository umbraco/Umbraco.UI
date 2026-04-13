import { version } from '../../package.json';

declare global {
  var __uuiVersions: string[] | undefined;
}

export const UUI_VERSION = version;

globalThis.__uuiVersions ??= [];
globalThis.__uuiVersions.push(UUI_VERSION);

const versions = globalThis.__uuiVersions;
if (versions.length > 1) {
  const unique = [...new Set(versions)];
  if (unique.length > 1) {
    console.warn(
      `Multiple versions of Umbraco UI detected: ${unique.join(', ')}. This is not supported and may cause issues.`,
    );
  } else {
    console.warn(
      `Multiple instances of Umbraco UI v${versions[0]} loaded. This may indicate duplicate bundles.`,
    );
  }
}
