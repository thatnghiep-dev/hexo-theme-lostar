/**
 * Mood helper for hexo-theme-loststar
 *
 * Resolves a post's tags to a mood object { name, bg, text, chip }
 * using the moods config in _config.yml.
 *
 * Usage in EJS: <% const mood = getMood(post.tags.data) %>
 */
hexo.extend.helper.register("getMood", function (tags) {
	const moods = this.theme.moods;
	if (!moods || !moods.list) return null;

	// Collect tag names from Hexo tag objects or strings
	const tagNames = (tags || []).map((t) =>
		typeof t === "string" ? t : t.name,
	);

	// Find first matching mood by checking if any post tag is in a mood's tags list
	for (const [moodName, moodConfig] of Object.entries(moods.list)) {
		const moodTags = moodConfig.tags || [];
		const match = tagNames.some((name) => moodTags.includes(name));
		if (match) {
			return {
				name: moodName,
				bg: moodConfig.bg,
				text: moodConfig.text,
				chip: moodConfig.chip,
			};
		}
	}

	// Fall back to default mood
	const defaultName = moods.default;
	if (defaultName && moods.list[defaultName]) {
		const d = moods.list[defaultName];
		return { name: defaultName, bg: d.bg, text: d.text, chip: d.chip };
	}

	return null;
});
