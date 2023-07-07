import {defineConfig} from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import {checker} from "vite-plugin-checker";
import stylelint from "vite-plugin-stylelint";
import svgr from "vite-plugin-svgr";

export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths(),
        checker({
            typescript: true,
            eslint: {
                lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
            },
        }),
        stylelint({
            lintInWorker: true,
            lintOnStart: true,
        }),
        svgr(),
    ],
});
