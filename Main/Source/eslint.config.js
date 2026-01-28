import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';

import { defineConfig } from 'eslint/config';
import prettier from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import ts from 'typescript-eslint';

import svelteConfig from './svelte.config.ts';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default defineConfig(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs.recommended,
	{
		plugins: {
			'simple-import-sort': simpleImportSort,
		},
		rules: {
			// override/add rules settings here, such as:
			// 'svelte/rule-name': 'error'
			'svelte/sort-attributes': [
				'error',
				{
					order: [
						// `this` property.
						'this',
						// `bind:this` directive.
						'bind:this',
						// `id` attribute.
						'id',
						// `name` attribute.
						'name',
						// `value` attribute.
						['value', '/^bind:value:/u'],
						// `bind:` directives (other then `bind:this`)
						['/^bind:/u', '!bind:this'],
						// `slot` attribute.
						'slot',
						// `--style-props` (Alphabetical order within the same group.)
						{ match: '/^--/u', sort: 'alphabetical' },
						// `style` attribute, and `style:` directives.
						['style', '/^style:/u'],
						// `class` attribute.
						'class',
						// `class:` directives. (Alphabetical order within the same group.)
						{ match: '/^class:/u', sort: 'alphabetical' },
						// other attributes. (Alphabetical order within the same group.)
						{
							match: ['!/:/u', '!/^(?:this|id|name|style|class)$/u', '!/^--/u', '!/^on/u'],
							sort: 'alphabetical',
						},
						// on event handlers - properties starting with on
						{ match: '/^on/u', sort: 'alphabetical' },
						// `use:` directives. (Alphabetical order within the same group.)
						{ match: '/^use:/u', sort: 'alphabetical' },
						// `transition:` directive.
						{ match: '/^transition:/u', sort: 'alphabetical' },
						// `in:` directive.
						{ match: '/^in:/u', sort: 'alphabetical' },
						// `out:` directive.
						{ match: '/^out:/u', sort: 'alphabetical' },
						// `animate:` directive.
						{ match: '/^animate:/u', sort: 'alphabetical' },
						// `let:` directives. (Alphabetical order within the same group.)
						{ match: '/^let:/u', sort: 'alphabetical' },
					],
				},
			],
			'simple-import-sort/imports': [
				'error',
				{
					groups: [
						// Style imports
						['^.+\\.s?css$'],
						// $lib imports
						['^\\$lib/types'],
						['^\\$lib/components'],
						['^\\$lib'],

						// svelte imports
						['^svelte'],

						// Packages starting with `@`
						['^@'],
						// Packages starting with `~`
						['^~'],
						// rest of the packages
						['^'],
						// Imports starting with `../`
						['^\\.\\.(?!/?$)', '^\\.\\./?$'],
						// Imports starting with `./`
						['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
						// Side effect imports
						['^\\u0000'],
					],
				},
			],
		},
	},

	prettier,
	...svelte.configs.prettier,
	{
		languageOptions: { globals: { ...globals.browser, ...globals.node } },

		rules: {
			// typescript-eslint strongly recommend that you do not use the no-undef lint rule on TypeScript projects.
			// see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
			'no-undef': 'off',
		},
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: ['.svelte'],
				parser: ts.parser,
				svelteConfig,
			},
		},
	},
	{
		ignores: ['build/', '.svelte-kit/', 'dist/', 'src/lib/server/db/generated'],
	},
	{
		/* location of your components where you would like to apply these rules  */
		// see: https://www.shadcn-svelte.com/docs/installation#eslint-configuration
		files: ['**/components/ui/button/button.svelte'],
		rules: { 'svelte/no-navigation-without-resolve': 'off' },
	}
);
