const {
	SlashCommandBuilder,
	SlashCommandUserOption,
	SlashCommandStringOption,
	PermissionsBitField
} = require("discord.js");
const { ephemeralMessage } = require("../../utils");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("kick")
		.setDescription("사용자를 추방시킵니다.")
		.addUserOption(
			new SlashCommandUserOption()
				.setName("user")
				.setDescription("추방시킬 사용자")
				.setRequired(true)
		)
		.addStringOption(
			new SlashCommandStringOption()
				.setName("reason")
				.setDescription("(선택) 추방시킨 이유")
				.setRequired(false)
		),
	async execute(interaction) {
		const member = interaction.options.getMember("user");
		const reason = interaction.options.getString("reason") || undefined;

		if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
			await interaction.reply(
				ephemeralMessage(
					`<@${interaction.member.id}> 님에게 사용자를 추방시킬 권한이 없습니다.`
				)
			);
		} else if (member.user.id === interaction.user.id) {
			await interaction.reply(ephemeralMessage("자기 자신을 추방시킬 수 없습니다."));
		} else if (interaction.member.role.highest.comparePositionTo(member.role.highest) < 0) {
			await interaction.reply(
				ephemeralMessage(
					`<@${member.id}> 님이 더 높은 권한을 가지고 있어 추방시킬 수 없습니다.`
				)
			);
		} else if (!member.kickable) {
			await interaction.reply(ephemeralMessage(`<@${member.id}> 님을 추방시킬 수 없습니다.`));
		}

		if (interaction.replied) {
			return;
		}

		await member.kick(reason);
		await interaction.reply(`<@${member.id}> 님을 추방시켰습니다.`);
	}
};
