const { SlashCommandBuilder, EmbedBuilder, CategoryChannel } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("serverinfo")
		.setDescription("서버의 정보를 출력합니다."),
	async execute(interaction) {
		const guild = interaction.guild;
		const botCount = (await guild.members.fetch()).filter((member) => member.user.bot).size;
		const embed = new EmbedBuilder()
			.setTitle(guild.name)
			.setDescription(
				`서버 주인: <@${guild.ownerId}>
서버 생성: \`${guild.createdAt.toLocaleString("ko-KR")}\`
멤버 \`${guild.memberCount}\`명 (봇: \`${botCount}\`)
채널 \`${
					guild.channels.cache
						.toJSON()
						.filter((channel) => !(channel instanceof CategoryChannel)).length
				}\`개
역할 \`${guild.roles.cache.size - 1}\`개
`
			)
			.setThumbnail(guild.iconURL());

		await interaction.reply({ embeds: [embed] });
	}
};
