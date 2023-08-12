const { SlashCommandSubcommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandSubcommandBuilder()
		.setName("list")
		.setDescription("현재 서버의 역할 목록을 가져옵니다."),

	async execute(interaction) {
		const embed = new EmbedBuilder()
			.setTitle(`${interaction.guild.name} - 역할 목록`)
			.setDescription(
				interaction.guild.roles.cache
					.filter((_, roleId) => roleId !== interaction.guild.roles.everyone.id)
					.map((_, roleId) => `<@&${roleId}>`)
					.join("\n")
			);
		await interaction.reply({ embeds: [embed] });
	}
};
