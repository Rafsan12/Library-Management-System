import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    ignores: ["dist/**/*"],
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    extends: [
      js.configs.recommended, // Use @eslint/js recommended config
      ...tseslint.configs.recommended, // TypeScript rules
    ],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
      sourceType: "module", // Enforce ESM
    },
    rules: {
      "@typescript-eslint/no-require-imports": "error", // Enforce no require()
    },
  },
  {
    files: ["**/*.cjs"],
    languageOptions: {
      sourceType: "commonjs",
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
]);
