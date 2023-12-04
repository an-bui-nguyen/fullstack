module.exports = {
  "env": {
      "browser": true,
      "jest": true,
      "es2021": true,
      "node": true
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
      "react"
  ],
  "globals": {
    "$": true,
    "require": true,
    "process": true,
    "module": true,
    "console": true,
  },
  "rules": {
  }
}
