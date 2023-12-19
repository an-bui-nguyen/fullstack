module.exports = {
  "env": {
      "browser": true,
      "jest/globals": true,
      "es2021": true,
      "node": true,
      "cypress/globals": true
  },
  "extends": [
      "eslint:recommended",
      "plugin:react/recommended"
  ],
  "overrides": [
      {
          "env": {
              "node": true
          },
          "files": [
              ".eslintrc.{js,cjs}"
          ],
          "parserOptions": {
              "sourceType": "script"
          }
      }
  ],
  "parserOptions": {
      "ecmaVersion": "latest",
      "sourceType": "module"
  },
  "plugins": [
      "react", "jest", "cypress"
  ],
  "globals": {
    "$": true,
    "require": true,
    "process": true,
    "module": true,
    "console": true,
  },
  "rules": {
    "react/prop-types": 0
  }
}
