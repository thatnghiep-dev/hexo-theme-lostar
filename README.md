# Hexo-Theme-LostStar

<p align="center">
  <a href="README_CN.md">中文</a> | English
</p>

> A concise Hexo theme, inherited from [ParticleX](https://github.com/theme-particlex/hexo-theme-particlex) and [Particle](https://github.com/korilin/hexo-theme-particle).

<!-- TODO: Add demo screenshot here -->
<!-- ![LostStar Preview](screenshot.png) -->

## Features

- Clean, minimalist design
- Built with EJS templates
- [Font Awesome 6](https://fontawesome.com) icons
- Code highlighting via [Highlight.js](https://highlightjs.org)
- Math rendering via [KaTeX](https://katex.org)
- Image preview (lightbox)
- Article encryption (AES)
- Local search
- Multiple comment systems: [Giscus](https://giscus.app), [Gitalk](https://github.com/gitalk/gitalk), [Waline](https://waline.js.org), [Twikoo](https://twikoo.js.org)
- Polyfill.io for browser compatibility

## Installation

Clone this repository into your Hexo `themes` directory:

```bash
cd your-hexo-site
git clone https://github.com/thatnghiep-dev/hexo-theme-loststar.git themes/loststar
```

Then set the theme in your site's `_config.yml`:

```yaml
theme: loststar
```

### Disable Built-in Code Highlighting

LostStar uses Highlight.js for code highlighting. You must disable Hexo's built-in highlighter.

For **Hexo < 7.0**:

```yaml
highlight:
  enable: false
prismjs:
  enable: false
```

For **Hexo >= 7.0**:

```yaml
syntax_highlighter:
highlight:
  enable: false
prismjs:
  enable: false
```

If you use Pandoc as the renderer, also add `no-highlight` to your Pandoc arguments.

### Disable Yearly/Monthly Archives

To keep the archive page clean, disable yearly and monthly grouping:

```yaml
archive_generator:
  enabled: true
  per_page: 0
  yearly: false
  monthly: false
  daily: false
```

Then run `hexo clean` to clear the cache.

## Configuration

All configuration is done in the theme's `_config.yml` file (located at `themes/loststar/_config.yml`).

### Basic

| Option       | Default                                                   | Description                                 |
| ------------ | --------------------------------------------------------- | ------------------------------------------- |
| `avatar`     | `/images/avatar.jpg`                                      | Path to your avatar image                   |
| `background` | `[/images/background.jpg]`                                | List of background images for the home page |
| `loading`    | `/images/loading.gif`                                     | Loading animation image                     |
| `colors`     | `["#ffa2c4", "#00bcd4", "#03a9f4", "#00a596", "#ff7d73"]` | Colors used for categories and tags         |

### Navigation Menu

The theme uses [Font Awesome 6](https://fontawesome.com) icons. Each menu item has a `name` (icon name), `theme` (icon style), and `link`.

```yaml
menu:
  Home:
    name: house
    theme: solid
    link: /
  About:
    name: id-card
    theme: solid
    link: /about
  Archives:
    name: box-archive
    theme: solid
    link: /archives
  Categories:
    name: bookmark
    theme: solid
    link: /categories
  Tags:
    name: tags
    theme: solid
    link: /tags
```

### Sidebar Card

```yaml
card:
  enable: true
  description: |
    Your description here
    Supports multiple lines
  iconLinks:
    # name: link
  friendLinks:
    # name: link
```

| Option             | Default | Description                                     |
| ------------------ | ------- | ----------------------------------------------- |
| `card.enable`      | `true`  | Show or hide the sidebar card                   |
| `card.description` | -       | Multi-line description text (supports Markdown) |
| `card.iconLinks`   | -       | Social media / icon links (key-value pairs)     |
| `card.friendLinks` | -       | Friend site links (key-value pairs)             |

### Footer

```yaml
footer:
  since: 2022
  ICP:
    enable: false
    code:
    link:
```

| Option              | Default | Description                                   |
| ------------------- | ------- | --------------------------------------------- |
| `footer.since`      | `2022`  | Starting year for the copyright notice        |
| `footer.ICP.enable` | `false` | Show ICP filing info (for China-hosted sites) |
| `footer.ICP.code`   | -       | ICP filing number                             |
| `footer.ICP.link`   | -       | Link to ICP verification page                 |

### Features

#### Polyfill

```yaml
polyfill:
  enable: true
  features:
    - default
```

Provides cross-browser compatibility via [Polyfill.io](https://polyfill.io).

#### Code Highlighting

```yaml
highlight:
  enable: true
  style: github
```

Powered by [Highlight.js](https://highlightjs.org). Browse available styles at the [Highlight.js demo page](https://highlightjs.org/demo).

#### Math Rendering

```yaml
math:
  enable: false
```

Enables [KaTeX](https://katex.org) for rendering LaTeX math formulas.

#### Image Preview

```yaml
preview:
  enable: true
```

Click on images in articles to view them in a lightbox overlay.

#### Article Encryption

```yaml
crypto:
  enable: false
```

Requires the `hexo-helper-crypto` plugin. Add a `secret` field in your post's front-matter to encrypt it:

```yaml
---
title: My Secret Post
secret: your-password-here
---
```

#### Search

```yaml
search:
  enable: false
```

Enables local search in the archives page. Currently searches by post title only.

### Comments

LostStar supports 4 comment systems. Enable only **one** at a time.

#### Giscus

Uses [GitHub Discussions](https://docs.github.com/en/discussions) as a comment backend.

```yaml
giscus:
  enable: false
  src: https://giscus.app/client.js
  repo:
  repoID:
  category:
  categoryID:
  mapping: pathname
  strict: 0
  reactionsEnabled: 1
  emitMetadata: 0
  inputPosition: bottom
  theme: preferred_color_scheme
  lang:
```

Visit [giscus.app](https://giscus.app) to generate your configuration.

#### Gitalk

Uses [GitHub Issues](https://docs.github.com/en/issues) as a comment backend.

```yaml
gitalk:
  enable: false
  clientID:
  clientSecret:
  repo:
  owner:
  admin:
  language:
  proxy:
```

> **Note:** Gitalk requires a CORS proxy. See the [Gitalk documentation](https://github.com/gitalk/gitalk) for setup details.

#### Waline

A simple, safe comment system with a backend.

```yaml
waline:
  enable: false
  serverURL:
  locale:
  commentCount: true
  pageview: false
  emoji:
    - https://unpkg.com/@waline/emojis@1.2.0/weibo
    - https://unpkg.com/@waline/emojis@1.2.0/alus
    - https://unpkg.com/@waline/emojis@1.2.0/bilibili
    - https://unpkg.com/@waline/emojis@1.2.0/qq
    - https://unpkg.com/@waline/emojis@1.2.0/tieba
    - https://unpkg.com/@waline/emojis@1.2.0/tw-emoji
  meta:
    - nick
    - mail
    - link
  requiredMeta:
    - nick
  lang:
  wordLimit: 0
  login: enable
  pageSize: 10
```

See [Waline documentation](https://waline.js.org) for server setup.

#### Twikoo

A simple, safe, free comment system.

```yaml
twikoo:
  enable: false
  envID:
  region:
  path: location.pathname
  lang:
```

See [Twikoo documentation](https://twikoo.js.org) for deployment.

## Writing Tips

### Post Excerpt

Use `<!-- more -->` in your post to define where the excerpt ends on the home page:

```markdown
This is the excerpt shown on the home page.

<!-- more -->

This content is only visible in the full post.
```

Alternatively, set `description` in the post's front-matter:

```yaml
---
title: My Post
description: This text will be used as the excerpt.
---
```

### Pinned Posts

Add `pinned: true` to a post's front-matter to pin it to the top of the home page:

```yaml
---
title: Important Announcement
pinned: true
---
```

### Encrypted Posts

With `crypto.enable: true` in the theme config, add `secret` to a post's front-matter:

```yaml
---
title: Private Post
secret: my-password
---
```

Readers must enter the password to view the content.

## Credits

This theme is based on **[ParticleX](https://github.com/theme-particlex/hexo-theme-particlex)** by [Argvchs](https://github.com/argvchs), which itself is a modernized version of the original **[Particle](https://github.com/korilin/hexo-theme-particle)** theme by [korilin](https://github.com/korilin). Both upstream projects are licensed under MIT.

## License

[MIT](LICENSE)
