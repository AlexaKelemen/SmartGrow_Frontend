import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import pluginJest from "eslint-plugin-jest";
import { defineConfig } from "eslint/config";
import pluginCypress from "eslint-plugin-cypress"; 

export default defineConfig([
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      js,
      react: pluginReact,
      jest: pluginJest,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "no-unused-vars": "warn",
      "react/no-unescaped-entities": "off",
      'no-undef': 'error',
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/prefer-to-have-length": "warn",
      "jest/valid-expect": "error",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
   
    extends: [
      "js/recommended",
      pluginReact.configs.flat.recommended
    ],
  },

  {
    files: ["cypress/e2e/**/*.cy.{js,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
        ...globals.mocha, 
        ...globals.cy,    
        cy: true,       
        Cypress: true,
      },
    },
    plugins: {
      cypress: pluginCypress,
    },
    rules: {
      "cypress/no-unnecessary-waiting": "warn",
    },
  },
]);
