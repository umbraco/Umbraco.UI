#!/bin/bash
# Single-package spike build script
# Builds the prototype @umbraco-ui/uui single package from src/

set -e

echo "==> Cleaning dist/"
rm -rf dist
rm -f tsconfig.spike.tsbuildinfo

echo "==> Building with Vite (library mode)..."
npx vite build --config vite.config.spike.ts

echo "==> Generating type declarations..."
npx tsc -p tsconfig.spike.json

echo "==> Copying CSS files..."
mkdir -p dist/styles/custom-properties dist/styles/typography
cp src/styles/*.css dist/styles/
cp src/styles/custom-properties/*.css dist/styles/custom-properties/
cp src/styles/typography/*.css dist/styles/typography/

echo "==> Build complete!"
echo ""
echo "dist/index.js  - ES module bundle ($(wc -c < dist/index.js | tr -d ' ') bytes)"
echo "dist/**/*.d.ts - Type declarations ($(find dist -name '*.d.ts' | wc -l | tr -d ' ') files)"
echo ""
echo "To pack: npm pack"
