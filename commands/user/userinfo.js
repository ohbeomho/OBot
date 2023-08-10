const { SlashCommandBuilder, EmbedBuilder, SlashCommandUserOption } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("userinfo")
		.setDescription("사용자 정보 출력")
		.addUserOption(
			new SlashCommandUserOption()
				.setName("user")
				.setDescription("(선택) 정보를 가져올 대상")
				.setRequired(false)
		),
	async execute(interaction) {
		const member = interaction.options.getMember("user") || interaction.member;

		const embed = new EmbedBuilder();
		embed.setTitle(member.user.tag);
		embed.setDescription(`디스코드 계정 생성: \`${member.user.createdAt.toLocaleString(
			"ko-KR"
		)}\`
서버 가입: \`${member.joinedAt.toLocaleString("ko-KR")}\`

**역할 목록**
${member.roles.cache.map((_, roleId) => `<@&${roleId}>`).join("\n")}`);
		embed.setThumbnail(member.user.avatarURL());

		await interaction.reply({ embeds: [embed] });
	}
};