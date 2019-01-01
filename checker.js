const fs = require('fs');
const path = require('path');
const eslint = require('eslint');
const isAbsolute = require('path-is-absolute');

function _isDir(path) {
  try {
    var stat = fs.lstatSync(path);
    return stat.isDirectory();
  } catch (e) {
    // lstatSync throws an error if path doesn't exist
    return false;
  }
}

function resolveConfigFile(input) {
  if (input) {
    if (!_isDir(input)) {
      if (isAbsolute(input)) {
        return input;
      }
      return path.join(process.cwd(), input);
    }
    let main = require(path.join(path.join(process.cwd(), input), 'package.json')).main;
    let file = path.join(path.join(process.cwd(), input), main);
    return file;
  }
  let main = require(path.join(process.cwd(), 'package.json')).main;
  let file = path.join(process.cwd(), main);
  return file;
}

function getConfig(input) {
  if (input) {
    const cliEngine = new eslint.CLIEngine({
      useEslintrc: false,
      configFile: resolveConfigFile(input)
    });
    return cliEngine.getConfigForFile();
  } else {
    const cliEngine = new eslint.CLIEngine({
      useEslintrc: true
    });
    return cliEngine.getConfigForFile();
  }
}

function check(ops) {
  ops = Object.assign({}, {
    input: null,
    output: null,
    removed: true,
    deprecated: true,
    current: true,
    unused: true,
    print: true
  }, ops);

  const config = getConfig(ops.input);

  const allRules = new Map([...eslint.linter.getRules()]);

  let currentRuleNames = Object.keys(config.rules);
  let allRuleNames = [...allRules.keys()];

  const removedRuleNames =
    currentRuleNames.filter(x =>
      !allRules.get(x));

  const deprecatedRuleNames =
    currentRuleNames.filter(x =>
      allRules.get(x)
      && allRules.get(x).meta
      && allRules.get(x).meta.deprecated);

  const unusedRuleNames =
    allRuleNames.filter(x =>
      !(x in currentRuleNames));

  let report =
    "eslint Rules Checker Report"
    + "\n---"
    ;

  if (ops.removed) {
    report += "\n\nRemoved"
      + "\nTotal: " + removedRuleNames.length
      + "\n" + removedRuleNames.join(", ")
      ;
  }

  if (ops.deprecated) {
    report += "\n\nDeprecated"
      + "\nTotal: " + deprecatedRuleNames.length
      + "\n" + deprecatedRuleNames.join(", ")
      ;
  }

  if (ops.current) {
    report += "\n\nCurrent"
      + "\nTotal: " + currentRuleNames.length
      + "\n" + currentRuleNames.join(", ")
      ;
  }

  if (ops.unused) {
    report += "\n\nUnused"
      + "\nTotal: " + unusedRuleNames.length
      + "\n" + unusedRuleNames.join(", ")
      ;
  }

  if (ops.output) {
    require('fs').writeFile(
      ops.output,
      report,
      function (err) {
        if (err) {
          console.error(':(');
        }
      }
    );
  }

  if (ops.print) {
    console.log(report);
  }
}

module.exports = {
  check
};