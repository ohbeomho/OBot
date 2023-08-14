const {
	SlashCommandBuilder,
	SlashCommandUserOption,
	SlashCommandStringOption,
	PermissionsBitField
} = require("discord.js");
const { ephemeralMessage } = require("../../utils");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ban")
		.setDescription("사용자를 차단시킵니다.")
		.addUserOption(
			new SlashCommandUserOption()
				.setName("user")
				.setDescription("차단시킬 사용자")
				.setRequired(true)
		)
		.addStringOption(
			new SlashCommandStringOption()
				.setName("reason")
				.setDescription("(선택) 차단시킨 이유")
				.setRequired(false)
		),
	async execute(interaction) {
		const member = interaction.options.getMember("user");
		const reason = interaction.options.getString("reason") || undefined;

		if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
			await interaction.reply(
				ephemeralMessage(
					`<@${interaction.member.id}> 님에게 사용자를 차단시킬 권한이 없습니다.`
				)
			);
		} else if (member.user.id === interaction.user.id) {
			await interaction.reply(ephemeralMessage("자기 자신을 차단시킬 수 없습니다."));
		} else if (interaction.member.roles.highest.comparePositionTo(member.roles.highest) < 0) {
			await interaction.reply(
				ephemeralMessage(
					`<@${member.id}> 님이 더 높은 권한을 가지고 있어 차단시킬 수 없습니다.`
				)
			);
		} else if (!member.bannable) {
			await interaction.reply(ephemeralMessage(`<@${member.id}> 님을 차단시킬 수 없습니다.`));
		}

		if (interaction.replied) {
			return;
		}

		await member.ban(reason);
		await interaction.reply(`<@${member.id}> 님을 차단시켰습니다.`);
	}
};
