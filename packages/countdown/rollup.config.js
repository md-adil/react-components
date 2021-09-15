import typescript from "@rollup/plugin-typescript";
import external from "rollup-plugin-peer-deps-external";
export default {
    input: "./src/index.tsx",
    output: {
        file: "./dist/index.js",
    },
    plugins: [typescript({ tsconfig: "./tsconfig.json" }), external()],
};
