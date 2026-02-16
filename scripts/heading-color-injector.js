/**
 * Heading Color Injector
 *
 * Injects inline style="color:..." into h1-h6 tags inside post content
 * based on the taxonomy_styles heading color config.
 *
 * This bypasses CSS variable issues where var(--tx-heading-color) 
 * doesn't resolve properly in some rendering contexts.
 */

hexo.extend.filter.register("after_post_render", function (data) {
	const ts = this.theme.config.taxonomy_styles;
	if (!ts || !ts.enable) return data;

	const defaults = ts.defaults || {};
	const categoriesMap = ts.categories || {};

	// Resolve first category
	const cats = data.categories ? data.categories.data || data.categories : [];
	const firstCat =
		cats.length > 0
			? typeof cats[0] === "string"
				? cats[0]
				: cats[0].name
			: null;

	const catConfig = firstCat ? categoriesMap[firstCat] || {} : {};

	// Resolve tag overrides: check if any tag has heading config
	const tagsMap = ts.tags || {};
	const postTags = data.tags ? data.tags.data || data.tags : [];
	let tagOverride = null;
	for (const t of postTags) {
		const tName = typeof t === "string" ? t : t.name;
		const tConfig = tagsMap[tName];
		if (tConfig && (tConfig.post || tConfig.title || tConfig.heading)) {
			tagOverride = tConfig;
			break;
		}
	}

	// Resolve heading color: tag override → category → defaults
	const headingColor =
		(tagOverride && tagOverride.heading && tagOverride.heading.color) ||
		(catConfig.heading && catConfig.heading.color) ||
		(defaults.heading && defaults.heading.color) ||
		(tagOverride && tagOverride.title && tagOverride.title.color) ||
		(catConfig.title && catConfig.title.color) ||
		(defaults.title && defaults.title.color) ||
		null;

	if (!headingColor) return data;

	// Inject color into h1-h6 tags in content
	data.content = data.content.replace(
		/<(h[1-6])(\s[^>]*)?(>)/gi,
		function (match, tag, attrs, close) {
			attrs = attrs || "";
			// If already has inline style, append color
			if (/style\s*=/i.test(attrs)) {
				return `<${tag}${attrs.replace(
					/style\s*=\s*["']/i,
					`style="color:${headingColor};`
				)}${close}`;
			}
			// Otherwise add style attribute
			return `<${tag}${attrs} style="color:${headingColor}"${close}`;
		}
	);

	return data;
});
