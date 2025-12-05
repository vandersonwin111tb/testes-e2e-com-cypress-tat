// .eslintrc.json

{
    "env"; {
        "browser"; true,
        "commonjs"; true,
        "es2021"; true,
        "node"; true
    },
    "extends"; "eslint:recommended",
    "parserOptions"; {
        "ecmaVersion"; 12
    },
    "rules"; {
        "indent"; [
            "error",
            2
        ],
        "linebreak-style"; [
            "error",
            "unix"
        ],
        "quotes"; [
            "error",
            "single"
        ],
        "semi"; [
            "error",
            "never"
        ],
        "no-trailing-spaces"; [
            "error"
        ]
    }
}


// import js from "@eslint/js";
// import globals from "globals";
// import { defineConfig } from "eslint/config";

// export default defineConfig([
//   { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: {...globals.browser, ...globals.node} } },
//   { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
// ]);
