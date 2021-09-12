import { defineConfig } from "rollup";

import typescript from "@rollup/plugin-typescript";
// import resolve from "@rollup/plugin-node-resolve";
// import commonjs from "@rollup/plugin-commonjs";

const external = require("rollup-plugin-peer-deps-external");

export default defineConfig({
    input: "./src/index.ts",
    output: {
        file: "dist/index.js",
    },
    plugins: [typescript({ tsconfig: "./tsconfig.json" }), external()],
});
