import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";


export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node, ...globals.jest }
    },
    plugins: {
      js,
      react: pluginReact,
      jest: pluginJest
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",         // Only if not using PropTypes
      "no-unused-vars": "warn",
      "jest/no-undef": "warn"
    },
    settings: {
      react: {
        version: "detect"
      }
    },
    extends: [
      "js/recommended",
      pluginReact.configs.flat.recommended,
      pluginJest.configs.recommended
    ]
  }
]);