import type { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

function cleanBaseUrl(value: string | undefined) {
  return value?.replace(/^https?:\/\//, "").replace(/\/$/, "")
}

const baseUrl =
  cleanBaseUrl(process.env.QUARTZ_BASE_URL) ??
  cleanBaseUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
  cleanBaseUrl(process.env.VERCEL_URL) ??
  "localhost:8080"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "Learning Machine Lessons",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "en-US",
    baseUrl,
    ignorePatterns: [".obsidian", ".trash", "templates"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#f8fafc",
          lightgray: "#dbe4f0",
          gray: "#7b8797",
          darkgray: "#263241",
          dark: "#0a0f1c",
          secondary: "#2457d6",
          tertiary: "#527dff",
          highlight: "rgba(36, 87, 214, 0.12)",
          textHighlight: "#dbe8ff",
        },
        darkMode: {
          light: "#090b12",
          lightgray: "#1d2433",
          gray: "#8b95a7",
          darkgray: "#d8dee9",
          dark: "#f5f7fb",
          secondary: "#6f9dff",
          tertiary: "#a8c2ff",
          highlight: "rgba(111, 157, 255, 0.18)",
          textHighlight: "#214a9a",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
