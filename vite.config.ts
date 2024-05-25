import { defineConfig } from "vite"
import path, { resolve } from "node:path"
const root = resolve(__dirname, "src")
export default defineConfig({
  base: "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: resolve(__dirname, "dist"),
    target:"es2022",
    rollupOptions: {
      
      
      input: {
        main: resolve("index.html"),
        login: resolve(root, "pages/auth/login/login.html"),
        signup: resolve(root, "pages/auth/signup/signup.html"),
        "fav-pharmacies": resolve(
          root,
          "pages/favourites/pharmacy/pharmacies.html",
        ),
        medicines: resolve(root, "pages/favourites/medicines.html"),
        map: resolve(root, "pages/map/map.html"),
        settings: resolve(root, "pages/profile/setting.html"),
      },
    },
  },
})
