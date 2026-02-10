# Hexo-Theme-LostStar

<p align="center">
  中文 | <a href="README.md">English</a>
</p>

> 一个简洁的 Hexo 主题，继承自 [ParticleX](https://github.com/theme-particlex/hexo-theme-particlex) 和 [Particle](https://github.com/korilin/hexo-theme-particle)。

<!-- TODO: 在此添加预览截图 -->
<!-- ![LostStar 预览](screenshot.png) -->

## 特性

- 简洁、极简的设计风格
- 基于 EJS 模板构建
- [Font Awesome 6](https://fontawesome.com) 图标
- [Highlight.js](https://highlightjs.org) 代码高亮
- [KaTeX](https://katex.org) 数学公式渲染
- 图片预览（灯箱效果）
- 文章加密（AES）
- 本地搜索
- 多种评论系统：[Giscus](https://giscus.app)、[Gitalk](https://github.com/gitalk/gitalk)、[Waline](https://waline.js.org)、[Twikoo](https://twikoo.js.org)
- Polyfill.io 浏览器兼容

## 安装

将本仓库克隆到 Hexo 站点的 `themes` 目录下：

```bash
cd your-hexo-site
git clone https://github.com/thatnghiep-dev/hexo-theme-loststar.git themes/loststar
```

然后在站点根目录的 `_config.yml` 中设置主题：

```yaml
theme: loststar
```

### 关闭内置代码高亮

LostStar 使用 Highlight.js 进行代码高亮，需要关闭 Hexo 自带的高亮功能。

**Hexo < 7.0**：

```yaml
highlight:
  enable: false
prismjs:
  enable: false
```

**Hexo >= 7.0**：

```yaml
syntax_highlighter:
highlight:
  enable: false
prismjs:
  enable: false
```

如果使用 Pandoc 作为渲染器，还需在 Pandoc 参数中添加 `no-highlight`。

### 关闭年度/月度归档

为了保持归档页面整洁，建议关闭按年、月分组：

```yaml
archive_generator:
  enabled: true
  per_page: 0
  yearly: false
  monthly: false
  daily: false
```

然后运行 `hexo clean` 清除缓存。

## 配置

所有配置均在主题的 `_config.yml` 文件中进行（位于 `themes/loststar/_config.yml`）。

### 基本配置

| 选项         | 默认值                                                    | 说明                 |
| ------------ | --------------------------------------------------------- | -------------------- |
| `avatar`     | `/images/avatar.jpg`                                      | 头像图片路径         |
| `background` | `[/images/background.jpg]`                                | 首页背景图片列表     |
| `loading`    | `/images/loading.gif`                                     | 加载动画图片         |
| `colors`     | `["#ffa2c4", "#00bcd4", "#03a9f4", "#00a596", "#ff7d73"]` | 分类和标签的显示颜色 |

### 导航菜单

主题使用 [Font Awesome 6](https://fontawesome.com) 图标。每个菜单项包含 `name`（图标名）、`theme`（图标样式）和 `link`（链接）。

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

### 侧边栏卡片

```yaml
card:
  enable: true
  description: |
    在此填写你的描述
    支持多行文本
  iconLinks:
    # 名称: 链接
  friendLinks:
    # 名称: 链接
```

| 选项               | 默认值 | 说明                          |
| ------------------ | ------ | ----------------------------- |
| `card.enable`      | `true` | 显示或隐藏侧边栏卡片          |
| `card.description` | -      | 多行描述文本（支持 Markdown） |
| `card.iconLinks`   | -      | 社交媒体/图标链接（键值对）   |
| `card.friendLinks` | -      | 友情链接（键值对）            |

### 页脚

```yaml
footer:
  since: 2022
  ICP:
    enable: false
    code:
    link:
```

| 选项                | 默认值  | 说明               |
| ------------------- | ------- | ------------------ |
| `footer.since`      | `2022`  | 版权声明的起始年份 |
| `footer.ICP.enable` | `false` | 显示 ICP 备案信息  |
| `footer.ICP.code`   | -       | ICP 备案号         |
| `footer.ICP.link`   | -       | ICP 备案查询链接   |

### 功能配置

#### Polyfill

```yaml
polyfill:
  enable: true
  features:
    - default
```

通过 [Polyfill.io](https://polyfill.io) 提供浏览器兼容性支持。

#### 代码高亮

```yaml
highlight:
  enable: true
  style: github
```

基于 [Highlight.js](https://highlightjs.org)。可在 [Highlight.js 演示页面](https://highlightjs.org/demo) 浏览可用样式。

#### 数学公式渲染

```yaml
math:
  enable: false
```

启用 [KaTeX](https://katex.org) 渲染 LaTeX 数学公式。

#### 图片预览

```yaml
preview:
  enable: true
```

点击文章中的图片可以在灯箱中查看大图。

#### 文章加密

```yaml
crypto:
  enable: false
```

需要安装 `hexo-helper-crypto` 插件。在文章的 front-matter 中添加 `secret` 字段即可加密：

```yaml
---
title: 我的加密文章
secret: your-password-here
---
```

#### 搜索

```yaml
search:
  enable: false
```

在归档页面启用本地搜索功能。目前仅支持按文章标题搜索。

### 评论配置

LostStar 支持 4 种评论系统，建议同时只启用**一种**。

#### Giscus

使用 [GitHub Discussions](https://docs.github.com/en/discussions) 作为评论后端。

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

访问 [giscus.app](https://giscus.app) 生成配置信息。

#### Gitalk

使用 [GitHub Issues](https://docs.github.com/en/issues) 作为评论后端。

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

> **注意：** Gitalk 需要 CORS 代理。详见 [Gitalk 文档](https://github.com/gitalk/gitalk)。

#### Waline

一个简洁、安全的评论系统。

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

服务端部署请参考 [Waline 文档](https://waline.js.org)。

#### Twikoo

一个简洁、安全、免费的评论系统。

```yaml
twikoo:
  enable: false
  envID:
  region:
  path: location.pathname
  lang:
```

部署方式请参考 [Twikoo 文档](https://twikoo.js.org)。

## 写作技巧

### 文章摘要

在文章中使用 `<!-- more -->` 标记摘要的结束位置：

```markdown
这是在首页显示的摘要内容。

<!-- more -->

这部分内容只在完整文章中可见。
```

也可以在 front-matter 中设置 `description`：

```yaml
---
title: 我的文章
description: 这段文字将作为摘要显示。
---
```

### 置顶文章

在 front-matter 中添加 `pinned: true` 即可将文章置顶：

```yaml
---
title: 重要公告
pinned: true
---
```

### 加密文章

在主题配置中启用 `crypto.enable: true` 后，在 front-matter 中添加 `secret`：

```yaml
---
title: 私密文章
secret: my-password
---
```

读者需要输入密码才能查看内容。

## 致谢

本主题基于 [Argvchs](https://github.com/argvchs) 开发的 **[ParticleX](https://github.com/theme-particlex/hexo-theme-particlex)** 主题，而 ParticleX 是 [korilin](https://github.com/korilin) 开发的 **[Particle](https://github.com/korilin/hexo-theme-particle)** 主题的现代化版本。两个上游项目均采用 MIT 协议。

## 许可证

[MIT](LICENSE)
