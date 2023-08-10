const { SlashCommandBuilder } = require("discord.js");
const create = require("./create.js");
const del = require("./delete.js");
const add = require("./add.js");
const remove = require("./remove.js");
const list = require("./list.js");
const color = require("./color.js");
const subcommands = [create, del, add, remove, list, color];
const functions = new Map();

const exportData = {
	data: new SlashCommandBuilder()
		.setName("role")
		.setDescription("역할을 관리하는 명령어 입니다."),
	async execute(interaction) {
		const commandName = interaction.options.getSubcommand();
		functions.get(commandName)(interaction);
	}
};

subcommands.forEach((command) => {
	functions.set(command.data.name, command.execute);
	exportData.data.addSubcommand(command.data);
});

module.exports = exportData;
