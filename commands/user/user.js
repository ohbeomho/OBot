const { SlashCommandBuilder } = require("discord.js");
const { loadSubcommands } = require("../../utils");

const functions = new Map();
const subcommands = loadSubcommands(__dirname, "user.js");

const exportData = {
	data: new SlashCommandBuilder().setName("user").setDescription("사용자 관련 명령어 입니다."),
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
