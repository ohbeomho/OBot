const {
	SlashCommandSubcommandBuilder,
	SlashCommandRoleOption,
	SlashCommandUserOption,
	PermissionsBitField
} = require("discord.js");
const { ephemeralMessage } = require("../../utils");

module.exports = {
	data: new SlashCommandSubcommandBuilder()
		.setName("remove")
		.setDescription("사용자에게서 역할을 제거합니다.")
		.addRoleOption(
			new SlashCommandRoleOption()
				.setName("role")
				.setDescription("사용자에게서 제거할 역할")
				.setRequired(true)
		)
		.addUserOption(
			new SlashCommandUserOption()
				.setName("user")
				.setDescription("역할을 제거할 사용자")
				.setRequired(true)
		),
	async execute(interaction) {
		const member = interaction.options.getMember("user");
		const role = interaction.options.getRole("role");

		if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
			await interaction.reply(
				ephemeralMessage(
					`<@${interaction.member.id}> 님에게 역할을 관리할 권한이 없습니다.`
				)
			);
		} else if (!member.roles.cache.toJSON().includes(role)) {
			await interaction.reply(
				ephemeralMessage(`<@${member.id}> 님에게 <@&${role.id}> 역할이 없습니다.`)
			);
			return;
		}

		await member.roles.remove(role);
		await interaction.reply(`<@${member.id}> 님에게서 <@&${role.id}> 역할을 삭제하였습니다.`);
	}
};
