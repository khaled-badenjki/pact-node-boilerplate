module.exports = {
    "env": {
        "commonjs": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "rules": {
        "semi": ["off", "always"],
        "quotes": ["error", "double"],
        "no-unused-vars": ["warn", "always"]
    }
}
