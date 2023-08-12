const {
	SlashCommandSubcommandBuilder,
	SlashCommandRoleOption,
	SlashCommandStringOption,
	PermissionsBitField
} = require("discord.js");
const { ephemeralMessage } = require("../../utils");

module.exports = {
	data: new SlashCommandSubcommandBuilder()
		.setName("rename")
		.setDescription("역할의 이름을 바꿉니다.")
		.addRoleOption(
			new SlashCommandRoleOption()
				.setName("role")
				.setDescription("이름을 바꿀 역할")
				.setRequired(true)
		)
		.addStringOption(
			new SlashCommandStringOption()
				.setName("new_name")
				.setDescription("역할의 새로운 이름")
				.setRequired(true)
		),
	async execute(interaction) {
		const role = interaction.options.getRole("role");
		const oldName = role.name;
		const newName = interaction.options.getString("new_name");

		if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
			await interaction.reply(
				ephemeralMessage(
					`<@${interaction.member.id}> 님에게 역할을 관리할 권한이 없습니다.`
				)
			);
			return;
		}

		await role.edit({ name: newName });
		await interaction.reply(
			`<@&${role.id}> 역할의 이름이 바뀌었습니다. \`(${oldName} -> ${newName})\``
		);
	}
};
