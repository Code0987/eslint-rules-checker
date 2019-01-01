## eslint Rules Checker

A simple nodejs script to check for removed, deprecated, current and unused rules in a `eslint` enabled project or file.

### Install

```
git clone https://github.com/Code0987/eslint-rules-checker
cd eslint-rules-checker

npm install
```

### Test

```
npm run sample

or 

node index.js -i ./sample/.eslintrc -o ./sample/eslint-report.txt 
```

The output will be logged to console and a file `sample/eslint-report.txt`.
The sample is updated with already run output at `sample/eslint-report.txt`.

### Use (local)

```
node index.js -help
```