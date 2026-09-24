import { defineConfig } from "astro/config";

// GitHub Pages project sites live at /<repo>/, so base follows the repo name; renaming the repo needs no code change.
const repoSlug = process.env.GITHUB_REPOSITORY || "mostdesign01-sudo/grokbot-use-cases";
const [owner, repoName] = repoSlug.split("/");

export default defineConfig({
  site: `https://${owner}.github.io`,
  base: `/${repoName}`,
  trailingSlash: "always",
  vite: {
    define: {
      "import.meta.env.PUBLIC_REPO_SLUG": JSON.stringify(repoSlug),
    },
  },
});
