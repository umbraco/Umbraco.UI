import { extractCustomProperties } from './extract-custom-properties.mjs';
import path from 'path';

const mainStylePath = path.resolve('./out-css/index.css');

extractCustomProperties(mainStylePath, true);
