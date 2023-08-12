const {
	SlashCommandSubcommandBuilder,
	SlashCommandRoleOption,
	PermissionsBitField
} = require("discord.js");

module.exports = {
	data: new SlashCommandSubcommandBuilder()
		.setName("delete")
		.setDescription("역할을 삭제합니다.")
		.addRoleOption(
			new SlashCommandRoleOption()
				.setName("role")
				.setDescription("삭제할 역할")
				.setRequired(true)
		),
	async execute(interaction) {
		const role = interaction.options.getRole("role");

		if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
			await interaction.reply({
				content: `<@${interaction.member.id}> 님에게 역할을 관리할 권한이 없습니다.`,
				ephemeral: true
			});
			return;
		} else if (interaction.member.roles.highest.comparePositionTo(role) < 0) {
			await interaction.reply({
				content: `역할 <@&${role.id}> 이(가) 당신이 가지고 있는 역할보다 권한이 높아 삭제할 수 없습니다.`,
				ephemeral: true
			});
			return;
		}

		await role.delete();
		await interaction.reply(`역할 **${role.name}**이(가) 삭제되었습니다.`);
	}
};
