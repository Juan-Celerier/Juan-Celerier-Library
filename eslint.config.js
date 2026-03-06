import tseslint from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-plugin-prettier";

export default [
  {
    files: ["**/*.ts", "**/*.tsx"],
    ignores: ["dist", "node_modules"],

    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },

    plugins: {
      "@typescript-eslint": tseslint,
      react,
      "react-hooks": reactHooks,
      prettier,
    },

    rules: {
      "prettier/prettier": "error",
      "react/react-in-jsx-scope": "off",
    },
  },
];
