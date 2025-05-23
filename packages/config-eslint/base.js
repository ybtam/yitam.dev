import * as depend from 'eslint-plugin-depend';
import sonarjs from "eslint-plugin-sonarjs";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import perfectionist from "eslint-plugin-perfectionist";
import turboConfig from 'eslint-config-turbo/flat';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default tseslint.config(
  eslint.configs.recommended,
  // tseslint.configs.recommended,
  perfectionist.configs['recommended-natural'],
  // importPlugin.flatConfigs.recommended,
  depend.configs['flat/recommended'],
  {
    ...sonarjs.configs.recommended,
  },
  ...turboConfig,
  eslintPluginPrettierRecommended,
  {
    rules: {
      'sonarjs/todo-tag': 'warn',
      'sonarjs/no-nested-conditional': 'warn',
    }
  }
);
