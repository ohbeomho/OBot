const { SlashCommandSubcommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

function ephemeralMessage(content) {
	return { content, ephemeral: true };
}

function loadCommands(commandsPath) {
	return fs
		.readdirSync(commandsPath)
		.map((fileName) => require(path.join(commandsPath, fileName)))
		.filter((command) => !(command.data instanceof SlashCommandSubcommandBuilder));
}

function loadSubcommands(commandsPath, excludeFileName) {
	return fs
		.readdirSync(commandsPath)
		.filter((fileName) => fileName !== excludeFileName)
		.map((fileName) => require(path.join(commandsPath, fileName)))
		.filter((command) => command.data instanceof SlashCommandSubcommandBuilder);
}

module.exports = { ephemeralMessage, loadCommands, loadSubcommands };
