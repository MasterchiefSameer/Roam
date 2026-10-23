# 01 · Set up NativeWind v5

Status: done

## Goal
Install and configure NativeWind v5 RC (`nativewind@5.0.0-rc.0` with `react-native-css@3.1.0-rc.0`) and Tailwind CSS v4 in the project, allowing styling via `className` across components.

## Decisions
- Follow official NativeWind v5 specifications from `https://www.nativewind.dev/v5/llms-full.txt`.
- Pin `nativewind@5.0.0-rc.0` and `react-native-css@3.1.0-rc.0` exact versions.
- Pin dev dependencies: `tailwindcss@4.1.12`, `@tailwindcss/postcss@4.1.12`, `postcss`, and `lightningcss@1.30.1`.
- Add `overrides` in `package.json` for `"lightningcss": "1.30.1"` as required to prevent deserialization issues.
- Create `postcss.config.mjs` exporting `@tailwindcss/postcss`.
- Create `global.css` with the split layered Tailwind CSS v4 imports (`tailwindcss/theme.css`, `tailwindcss/preflight.css`, `tailwindcss/utilities.css`, and `nativewind/theme`).
- Configure `metro.config.js` wrapping `getDefaultConfig(__dirname)` with `withNativewind(config)`.
- Import `global.css` in `src/app/_layout.tsx`.
- Create `nativewind-env.d.ts` with `/// <reference types="react-native-css/types" />`.
- Verify by styling `src/app/index.tsx` using `className` with Tailwind v4 utilities.

## Out of scope
- Migrating or building domain screens or complex design tokens beyond the NativeWind setup.

## Steps

### 1. Install dependencies and configure package.json overrides
Add `lightningcss: "1.30.1"` to `overrides` in `package.json`.
Install:
- `nativewind@5.0.0-rc.0`
- `react-native-css@3.1.0-rc.0`
- `tailwindcss@4.1.12`
- `@tailwindcss/postcss@4.1.12`
- `postcss`
- `lightningcss@1.30.1`

### 2. Configure PostCSS and Tailwind CSS
Create `postcss.config.mjs`:
```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```
Create `global.css`:
```css
@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/preflight.css" layer(base);
@import "tailwindcss/utilities.css";

@import "nativewind/theme";
```

### 3. Configure Metro
Create `metro.config.js`:
```js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativewind } = require("nativewind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

module.exports = withNativewind(config);
```

### 4. Configure TypeScript declarations and Root Layout import
- Create `nativewind-env.d.ts`:
  ```ts
  /// <reference types="react-native-css/types" />
  ```
- In `src/app/_layout.tsx`, import `../../global.css`.

### 5. Verify styling with className in Index screen
Update `src/app/index.tsx` to verify `className="flex-1 items-center justify-center bg-white"` and `<Text className="text-xl font-bold text-blue-500">`.

## Verification
- Run `npx tsc --noEmit` to verify type checking passes without errors.
- Run `npx eslint .` to verify linting passes cleanly.
- Verify configuration files exist and match NativeWind v5 specifications.

## Result
NativeWind v5 RC and Tailwind CSS v4 are fully installed, configured, and verified with zero TypeScript errors and zero lint errors.

## AGENTS.md updates
- Documented NativeWind v5 styling support and configuration in AGENTS.md.