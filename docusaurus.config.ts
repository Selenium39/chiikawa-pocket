import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Chiikawa Pocket',
  tagline: '可爱的口袋吉伊卡哇游戏攻略站',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://chiikawa-pocket.me',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'chiikawa-pocket', // Usually your GitHub org/user name.
  projectName: 'chiikawa-pocket', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  // 添加 Google AdSense 脚本和 Umami 分析脚本
  scripts: [
    {
      src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3914969090265698',
      async: true,
      crossorigin: 'anonymous',
    },
    {
      src: 'https://umami.selenium39.me/script.js',
      defer: true,
      'data-website-id': '7c00bacb-d710-42ed-9eea-8ad402d072a0',
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'ignore',
          blogSidebarTitle: '所有动态',
          blogSidebarCount: 'ALL',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'G-S5BZM68LSK',
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/chiikawa-og.svg',
    keywords: ['Chiikawa Pocket 中文站', '吉伊卡哇', 'Chiikawa', 'Chiikawa Pocket', 'ChiikawaPocket', 'Chiikawa Pocket 攻略', 'Chiikawa Pocket 攻略站', 'Chiikawa Pocket 游戏攻略', 'Chiikawa Pocket 游戏攻略站'],
    metadata: [
      {
        name: 'og:image',
        content: 'img/chiikawa-og.svg',
      },
      {
        name: 'twitter:image',
        content: 'img/chiikawa-twitter.svg',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    ],
    navbar: {
      title: 'Chiikawa Pocket',
      logo: {
        alt: 'Chiikawa Pocket Logo',
        src: 'img/logo.png',
      },
      items: [
        {to: '/blog', label: '游戏攻略', position: 'left'},
        {to: '/gallery', label: '图片库', position: 'left'},
        {
          type: 'dropdown',
          label: 'Chiikawa 小游戏',
          position: 'left',
          items: [
            {
              label: 'Chiikawa 贪吃蛇',
              to: '/chiikawa-game/snake',
            },
            {
              label: 'Chiikawa 连连看',
              to: '/chiikawa-game/lianliankan',
            },
          ],
        },
        {to: '/about', label: '关于我们', position: 'left'}
      ],
    },
    footer: {
      links: [
        {
          title: '小游戏',
          items: [
            {
              label: 'Chiikawa 贪吃蛇',
              to: '/chiikawa-game/snake',
            },
            {
              label: 'Chiikawa 连连看',
              to: '/chiikawa-game/lianliankan',
            },
          ],
        },
        {
          title: '社交媒体',
          items: [
            {
              label: 'ChiikawaPocket中文站 - 小红书',
              href: 'https://www.xiaohongshu.com/user/profile/672a1000000000001d02cec6',
            },
            {
              label: '@ChiikawaPocket中文站 - 微博',
              href: 'https://weibo.com/chiikawapocket',
            },
            {
              label: '@ChiikawaPocket中文站 - X',
              href: 'https://x.com/chiikawa_pocket',
            },
          ],
        },
        {
          title: '更多',
          items: [
            {
              label: '游戏攻略',
              to: '/blog',
            },
            {
              label: '关于我们',
              to: '/about',
            },
            {
              label: '支持我们',
              href: 'https://ko-fi.com/selenium39',
            },
          ],
        },
        {
          title: '友情链接',
          items: [
            {
              label: 'Chiikawa 分享站',
              href: 'https://www.chiikawa.online',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Chiikawa Pocket 中文站.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
