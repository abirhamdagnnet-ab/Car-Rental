import { defineConfig } from "vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
function assetResolver() {
  return {
    name: "asset-resolver",
    resolveId(id) {
      if (id.startsWith("app-asset/") || id.startsWith("figma:asset/")) {
        const filename = id.replace("app-asset/", "").replace("figma:asset/", "");
        return path.resolve(__dirname, "src/assets", filename);
      }
    }
  };
}
var stdin_default = defineConfig({
  base: "/Car-Rental/",
  plugins: [
    assetResolver(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      "@": path.resolve(__dirname, "./src")
    }
  },
  // File types t
  assetsInclude: ["**/*.svg", "**/*.csv"]
});
export {
  stdin_default as default
};
