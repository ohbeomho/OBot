const { SlashCommandBuilder } = require("discord.js");
const { loadSubcommands } = require("../../utils");

const functions = new Map();
const subcommands = loadSubcommands(__dirname, "role.js");

const exportData = {
	data: new SlashCommandBuilder()
		.setName("role")
		.setDescription("역할을 관리하는 명령어 입니다."),
	async execute(interaction) {
		const subcommandName = interaction.options.getSubcommand();
		functions.get(subcommandName)(interaction);
	}
};

subcommands.forEach((subcommand) => {
	functions.set(subcommand.data.name, subcommand.execute);
	exportData.data.addSubcommand(subcommand.data);
});

module.exports = exportData;
