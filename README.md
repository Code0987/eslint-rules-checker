## eslint Rules Checker

A simple nodejs script to check for removed, deprecated, current and unused rules in a `eslint` enabled project or file.

### Install/Use (Test)

```
git clone https://github.com/Code0987/eslint-rules-checker
cd eslint-rules-checker

npm install

npm run sample
or 
node cli.js -i ./sample/.eslintrc -o ./sample/eslint-report.txt 
```
The output will be logged to console and a file [sample/eslint-report.txt](sample/eslint-report.txt).
The sample is updated with already run output at [sample/eslint-report.txt](sample/eslint-report.txt).

### Install/Use (npm Package)

```
npm install Code0987/eslint-rules-checker --save-dev
```
```
"node_modules/.bin/eslint-rules-checker.cmd" --help
```
```
Options:
  --version         Show version number                                [boolean]
  -i, --input       eslintrc file or eslintrc project dir
  -o, --output      output file
  -r, --removed     removed rules                                      [boolean]
  -d, --deprecated  deprecated rules                                   [boolean]
  -c, --current     current rules                                      [boolean]
  -u, --unused      unused rules                                       [boolean]
  -p, --print       print report                                       [boolean]
  -h, --help        Show help                                          [boolean]
```
```
"node_modules/.bin/eslint-rules-checker.cmd" -i .eslintrc
```
The script will be installed as a npm package.
You can then call it on current project having `eslint` as shown above.