const {
	SlashCommandSubcommandBuilder,
	SlashCommandUserOption,
	SlashCommandBooleanOption,
	EmbedBuilder
} = require("discord.js");

module.exports = {
	data: new SlashCommandSubcommandBuilder()
		.setName("avatar")
		.setDescription("사용자의 아바타를 가져옵니다.")
		.addUserOption(
			new SlashCommandUserOption()
				.setName("user")
				.setDescription("아바타를 가져올 사용자")
				.setRequired(true)
		)
		.addBooleanOption(
			new SlashCommandBooleanOption()
				.setName("get_server_profile")
				.setDescription("(선택) 서버 프로필의 아바타를 가져올지 여부. 기본값은 False")
				.setRequired(false)
		),
	async execute(interaction) {
		const member = interaction.options.getMember("user");
		const getServerProfile = interaction.options.getBoolean("get_server_profile") || false;
		const avatar = (getServerProfile ? member : member.user).avatarURL();
		const embed = new EmbedBuilder()
			.setTitle(`${member.user.tag} 님의 아바타`)
			.setImage(avatar);

		await interaction.reply({ embeds: [embed] });
	}
};
