const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder().setName("help").setDescription("명령어 목록을 출력합니다."),
	async execute(interaction, commands) {
		const embed = new EmbedBuilder()
			.setTitle("명령어 목록")
			.setDescription(
				commands
					.map((command) => `**${command.data.name}** - ${command.data.description}`)
					.join("\n")
			);

		await interaction.reply({ embeds: [embed] });
	}
};
