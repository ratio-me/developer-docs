require('dotenv').config()

// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Ratio Developer Docs',
  tagline: 'API documentation, guides and utilities for Ratio developers',
  url: 'https://developer.ratio.me/',
  baseUrl: '/developer-docs/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'ratio-me',
  projectName: 'developer-docs',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      //yarn add @docusaurus/theme-search-algolia https://docusaurus.io/docs/search
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve('./sidebars.js'),
          docLayoutComponent: "@theme/DocPage",
          docItemComponent: "@theme/ApiItem" 
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
    [
      'redocusaurus',
      {
        // Plugin Options for loading OpenAPI files
        specs: [
          {
            spec: `${process.env.RATIO_API_URL}/v1/api-docs`,
            route: '/ratio-api-redoc/',
          },
        ],
        // Theme Options for modifying how redoc renders them
        theme: {
          // Change with your site colors
          primaryColor: '#1890ff',
        },
      },
    ],
  ],
  plugins: [
    [
      "docusaurus-plugin-openapi-docs",
      {
        id: "openapi",
        docsPluginId: "classic",
        config: {
          ratio: {
            specPath: `${process.env.RATIO_API_URL}/v1/api-docs`,
            outputDir: "docs/ratio",
            sidebarOptions: {
              groupPathsBy: "tag",
              categoryLinkSource: "tag",
            },
            // template: "api.mustache", // Customize API MDX with mustache template
          },
        },
      },
    ],
    [
      "@docusaurus/plugin-pwa",
      {
        debug: true,
        offlineModeActivationStrategies: [
          "appInstalled",
          "standalone",
          "queryString",
        ],
        pwaHead: [
          {
            tagName: "link",
            rel: "icon",
            href: "/img/docusaurus-openapi-docs-logo.svg",
          },
          {
            tagName: "link",
            rel: "manifest",
            href: "/manifest.json", // your PWA manifest
          },
          {
            tagName: "meta",
            name: "theme-color",
            content: "rgb(37, 194, 160)",
          },
        ],
      },
    ],
  ],

  themes: ["docusaurus-theme-openapi-docs"],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      docs: {
        sidebar: {
          hideable: true,
        },
      },
      navbar: {
        title: 'Docs',
        logo: {
          alt: 'Ratio Docs',
          src: 'img/logo-black.svg',
          srcDark: 'img/logo-white.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'guides',
            position: 'left',
            label: 'Guides',
          },{
            position: "left",
            label: "API Reference (PAN)",
            to: "/ratio-api-pan",
          },
          {to: '/ratio-api-redoc', label: 'API Reference (Redoc)', position: 'left'},
          {
            href: 'https://github.com/ratio-me/developer-docs',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Guides',
                to: '/intro',
              },
              {
                label: 'API Reference',
                to: '/ratio-api-redoc',
              },
              {
                label: 'API Reference',
                to: '/ratio-api-pan',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Twitter',
                href: 'https://twitter.com/Ratiodotme',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/ratio-me',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["ruby", "csharp", "php"],
      },
      languageTabs: [
        {
          highlight: "bash",
          language: "curl",
          logoClass: "bash",
        },
        {
          highlight: "python",
          language: "python",
          logoClass: "python",
        },
        {
          highlight: "go",
          language: "go",
          logoClass: "go",
        },
        {
          highlight: "javascript",
          language: "nodejs",
          logoClass: "nodejs",
        },
        // {
        //   highlight: "ruby",
        //   language: "ruby",
        //   logoClass: "ruby",
        // },
        {
          highlight: "csharp",
          language: "csharp",
          logoClass: "csharp",
        },
        // {
        //   highlight: "php",
        //   language: "php",
        //   logoClass: "php",
        // },
      ],
    }),
};

module.exports = config;
