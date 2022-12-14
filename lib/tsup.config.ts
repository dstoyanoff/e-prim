import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["index.ts"],
  sourcemap: true,
  clean: true,
  minify: true,
  dts: true,
  format: ["cjs", "esm"],
});
