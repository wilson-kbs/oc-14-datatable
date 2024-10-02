import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  if (mode === "preview") {
    return {
      plugins: [tsconfigPaths(), react()],
      build: {
        outDir: "dist-preview",
        rollupOptions: {
          output: {
            assetFileNames: (assetInfo) => {
              if (assetInfo.name?.endsWith(".json")) {
                return "data/[name]-[hash][extname]";
              }
              return "assets/[name]-[hash][extname]";
            },
          },
        },
      },
      assetsInclude: ["**/*.json"],
      server: {
        open: true,
      },
    };
  }

  return {
    plugins: [
      tsconfigPaths(),
      react(),
      libInjectCss(),
      dts({
        tsconfigPath: "./tsconfig.lib.json",
      }),
    ],
    build: {
      lib: {
        entry: path.resolve(__dirname, "lib/index.ts"),
        name: "DataTable",
        fileName: (format) => `data-table.${format}.js`,
      },
      rollupOptions: {
        external: ["react", "react-dom"],
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
          },
        },
      },
    },
    server: {
      open: true,
    },
  };
});
