import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(() => {
  const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
  const githubPagesBase =
    process.env.GITHUB_ACTIONS && repositoryName
      ? `/${repositoryName}/`
      : "/";

  return {
    base: githubPagesBase,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": `${import.meta.dirname}/src`,
      },
    },
    server: {
      host: process.env.DEV_SERVER_HOST || "0.0.0.0",
      port: parseInt(process.env.PORT || "8443"),
      strictPort: true,
    },
    preview: {
      host: process.env.DEV_SERVER_HOST || "0.0.0.0",
      port: parseInt(process.env.PORT || "8443"),
    },
  };
});
