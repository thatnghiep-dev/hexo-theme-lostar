/**
 * Taxonomy Style Helper
 *
 * Config-driven color resolver for categories and tags.
 * Category drives post background/text. Each category/tag can
 * define its own palette and optional text effects (outline, spark).
 *
 * Config path: theme.taxonomy_styles
 *
 * Helpers registered:
 *   getTxStyle(post)      → full resolved style for a post
 *   getTxCategoryStyle(categoryName) → style for a category chip
 *   getTxTagStyle(tagName, categoryName?) → style for a tag chip
 */

hexo.extend.helper.register("getTxStyle", function (post) {
	const ts = this.theme.taxonomy_styles;
	if (!ts || !ts.enable) return null;

	const defaults = ts.defaults || {};
	const categoriesMap = ts.categories || {};

	// Resolve first category name
	const cats = post.categories ? post.categories.data || post.categories : [];
	const firstCat =
		cats.length > 0
			? typeof cats[0] === "string"
				? cats[0]
				: cats[0].name
			: null;

	// Category config (or empty)
	const catConfig = firstCat ? categoriesMap[firstCat] || {} : {};

	// Resolve tag overrides: check if any tag has full style config
	const tagsMap = ts.tags || {};
	const postTags = post.tags ? post.tags.data || post.tags : [];
	let tagOverride = null;
	for (const t of postTags) {
		const tName = typeof t === "string" ? t : t.name;
		const tConfig = tagsMap[tName];
		if (tConfig && (tConfig.post || tConfig.title || tConfig.heading)) {
			tagOverride = tConfig;
			break;
		}
	}

	// Post palette: tag override → category override → defaults
	const postStyle = {
		bg:
			(tagOverride && tagOverride.post && tagOverride.post.bg) ||
			(catConfig.post && catConfig.post.bg) ||
			(defaults.post && defaults.post.bg) ||
			"#fffdfa",
		text:
			(tagOverride && tagOverride.post && tagOverride.post.text) ||
			(catConfig.post && catConfig.post.text) ||
			(defaults.post && defaults.post.text) ||
			"#1e3e3f",
	};

	// Title + heading colors: tag override → category override → defaults
	const titleColor =
		(tagOverride && tagOverride.title && tagOverride.title.color) ||
		(catConfig.title && catConfig.title.color) ||
		(defaults.title && defaults.title.color) ||
		null;
	const headingColor =
		(tagOverride && tagOverride.heading && tagOverride.heading.color) ||
		(catConfig.heading && catConfig.heading.color) ||
		(defaults.heading && defaults.heading.color) ||
		null;

	// Category chip palette
	const categoryChip = {
		bg:
			(catConfig.category && catConfig.category.bg) ||
			(defaults.category && defaults.category.bg) ||
			"#eef2f7",
		text:
			(catConfig.category && catConfig.category.text) ||
			(defaults.category && defaults.category.text) ||
			"#4f6370",
	};

	// Effects: category effects → defaults effects
	const defEffects = defaults.effects || {};
	const catEffects = catConfig.effects || {};

	const outline = mergeEffect(defEffects.outline, catEffects.outline);
	const spark = mergeEffect(defEffects.spark, catEffects.spark);

	return {
		category: firstCat,
		post: postStyle,
		categoryChip: categoryChip,
		titleColor,
		headingColor,
		tagDefault: catConfig.tag_default ||
			defaults.tag || { bg: "#eef2f7", text: "#4f6370" },
		effects: { outline, spark },
	};
});

hexo.extend.helper.register("getTxCategoryStyle", function (categoryName) {
	const ts = this.theme.taxonomy_styles;
	if (!ts || !ts.enable) return null;

	const defaults = ts.defaults || {};
	const categoriesMap = ts.categories || {};
	const catConfig = categoryName ? categoriesMap[categoryName] || {} : {};

	return {
		bg:
			(catConfig.category && catConfig.category.bg) ||
			(defaults.category && defaults.category.bg) ||
			"#eef2f7",
		text:
			(catConfig.category && catConfig.category.text) ||
			(defaults.category && defaults.category.text) ||
			"#4f6370",
	};
});

hexo.extend.helper.register("getTxTagStyle", function (tagName, categoryName) {
	const ts = this.theme.taxonomy_styles;
	if (!ts || !ts.enable) return null;

	const defaults = ts.defaults || {};
	const tagsMap = ts.tags || {};
	const categoriesMap = ts.categories || {};

	// Priority: explicit tag override → category's tag_default → global default
	if (tagsMap[tagName]) {
		return { bg: tagsMap[tagName].bg, text: tagsMap[tagName].text };
	}

	if (
		categoryName &&
		categoriesMap[categoryName] &&
		categoriesMap[categoryName].tag_default
	) {
		const td = categoriesMap[categoryName].tag_default;
		return { bg: td.bg, text: td.text };
	}

	return {
		bg: (defaults.tag && defaults.tag.bg) || "#eef2f7",
		text: (defaults.tag && defaults.tag.text) || "#4f6370",
	};
});

/**
 * Merge effect config: base defaults, then category overrides.
 */
function mergeEffect(base, override) {
	base = base || {};
	override = override || {};
	return {
		enable:
			override.enable !== undefined ? override.enable : base.enable || false,
		color: override.color || base.color || "#00000033",
		width: override.width || base.width || "1px",
		blur: override.blur || base.blur || "8px",
		opacity:
			override.opacity !== undefined
				? override.opacity
				: base.opacity !== undefined
					? base.opacity
					: 0.35,
		duration: override.duration || base.duration || "2.6s",
	};
}
