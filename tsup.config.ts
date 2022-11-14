import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["lib/index.ts"],
  sourcemap: true,
  clean: true,
  minify: true,
  dts: true,
  format: ["cjs", "esm"],
});
