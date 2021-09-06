import { defineConfig } from "rollup";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";

// import typescript from "@rollup/plugin-typescript";
// import resolve from "@rollup/plugin-node-resolve";
// import commonjs from "@rollup/plugin-commonjs";

const external = require("rollup-plugin-peer-deps-external");

export default defineConfig({
  input: "./src/index.tsx",
  output: {
    file: "./dist/index.js",
    format: "cjs",
  },
  plugins: [
    typescript(),
    postcss({
      minimize: true,
      modules: true,
      plugins: [],
    }),
    external()
  ],
});
