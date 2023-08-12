function ephemeralMessage(content) {
	return { content, ephemeral: true };
}

module.exports = { ephemeralMessage };
