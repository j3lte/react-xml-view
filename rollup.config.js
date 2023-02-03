import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import analyze from "rollup-plugin-analyzer";
import externals from "rollup-plugin-node-externals";
import babel from "@rollup/plugin-babel";
import del from "rollup-plugin-delete";
import terser from '@rollup/plugin-terser';
import url from "rollup-plugin-url";
import json from "@rollup/plugin-json";

const packageJson = require("./package.json");
const banner = `/**
* @preserve
* ${packageJson.name} v${packageJson.version}
* ${packageJson.description}
* ${packageJson.homepage}
* (c) ${new Date().getFullYear()} ${packageJson.author.name} <${packageJson.author.email}>
* @license ${packageJson.license}
*/`

export default {
  input: "src/index.ts",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true,
      banner,
    },
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: true,
      banner,
    },
  ],
  plugins: [
    del({ targets: "build/*" }),
    // devDependenciesnd and peerDependencies wont be included in the bundle
    // if you want to also exculde dependencies, change deps to true
    externals({ deps: false, devDeps: true, peerDeps: true }),
    resolve(),
    commonjs(),
    typescript({
      useTsconfigDeclarationDir: true,
      tsconfigOverride: {
        exclude: ["**/__tests__", "**/*.test.tsx", "**/*.stories.tsx"]
      }
    }),
    babel({
      babelHelpers: "runtime",
      exclude: "**/node_modules/**",
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    }),
    postcss(),
    terser({
      format: {
        comments: (node, comment) => {
          const text = comment.value;
          const type = comment.type;
          if (type == "comment2") {
            // multiline comment
            return /@preserve|@license|@cc_on/i.test(text);
          }
        },
      },
    }),
    analyze(),
    url(),
    json(),
  ],
};
