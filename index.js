#!/usr/bin/env node

const argv = require('yargs')

  .alias('i', 'input')
  .nargs('i', 1)
  .describe('i', 'eslintrc file or eslintrc project dir')

  .alias('o', 'output')
  .nargs('o', 1)
  .describe('o', 'output file')

  .boolean('r')
  .alias('r', 'removed')
  .describe('r', 'removed rules')

  .boolean('d')
  .alias('d', 'deprecated')
  .describe('d', 'deprecated rules')

  .boolean('c')
  .alias('c', 'current')
  .describe('c', 'current rules')

  .boolean('u')
  .alias('u', 'unused')
  .describe('u', 'unused rules')

  .boolean('p')
  .alias('p', 'print')
  .describe('p', 'print report')
  
  .help('h')
  .alias('h', 'help')

  .argv;

const checker = require("./checker");

checker.check(argv);