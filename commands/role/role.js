const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

const subcommands = [];
const functions = new Map();

// 하위 명령어 불러오기
const subcommandFiles = fs.readdirSync(__dirname).filter((file) => file !== "role.js");
subcommandFiles.forEach((file) => subcommands.push(require(path.join(__dirname, file))));

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
