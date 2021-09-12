import { defineConfig } from "rollup";
import postcss from "rollup-plugin-postcss";
import typescript from "@rollup/plugin-typescript";
import external from "rollup-plugin-peer-deps-external";

export default defineConfig({
    input: "./src/index.tsx",
    output: {
        file: "./dist/index.js",
    },
    plugins: [
        typescript({ tsconfig: "./tsconfig.json" }),
        postcss({
            minimize: true,
            modules: true,
            plugins: [],
        }),
        external(),
    ],
});
