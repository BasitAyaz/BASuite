import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";

const packageJson = require("./package.json");

export default [
    {
        input: "src/index.ts",
        output: [
            {
                file: packageJson.main,
                format: "cjs",
                sourcemap: true,
            },
            {
                file: packageJson.module,
                format: "esm",
                sourcemap: true,
            },
        ],
        plugins: [
            resolve({
                extensions: [".js", ".ts", ".tsx"],
            }),
            typescript({
                tsconfig: "./tsconfig.json",
            }),
            postcss()
        ],
        external: [
            "react",
            "react-dom",
            "react/jsx-runtime",
            "antd",
            "@ant-design/icons",
            "axios",
            "dayjs",
            "react-number-format",
            "tailwindcss",
            "xlsx"
        ]
    },
    {
        input: "src/index.ts",
        output: [{ file: packageJson.types }],
        plugins: [dts.default()],
        external: [/\.css/]
    }
]