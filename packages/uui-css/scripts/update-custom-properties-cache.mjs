import { CacheCustomProperties } from './cache-custom-properties.mjs';
import path from 'path';

const mainStylePath = path.resolve('./dist/custom-properties.css');

CacheCustomProperties(mainStylePath, true);
