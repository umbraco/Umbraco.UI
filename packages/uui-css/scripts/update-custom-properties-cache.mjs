import { extractCustomProperties } from '../../../scripts/extract-custom-properties.mjs';
import path from 'path';

const mainStylePath = path.resolve('./dist/custom-properties.css');

extractCustomProperties(mainStylePath, true);
