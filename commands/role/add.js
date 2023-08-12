const {
	SlashCommandSubcommandBuilder,
	SlashCommandRoleOption,
	SlashCommandUserOption,
	PermissionsBitField
} = require("discord.js");

module.exports = {
	data: new SlashCommandSubcommandBuilder()
		.setName("add")
		.setDescription("사용자에게 역할을 추가합니다.")
		.addRoleOption(
			new SlashCommandRoleOption()
				.setName("role")
				.setDescription("사용자에게 추가할 역할")
				.setRequired(true)
		)
		.addUserOption(
			new SlashCommandUserOption()
				.setName("user")
				.setDescription("역할을 추가할 사용자")
				.setRequired(true)
		),
	async execute(interaction) {
		const member = interaction.options.getMember("user");
		const role = interaction.options.getRole("role");

		const ephemeralMessage = (content) => ({ content, ephemeral: true });

		if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
			await interaction.reply(
				ephemeralMessage(
					`**${interaction.member.user.tag}**님에게 역할을 관리할 권한이 없습니다.`
				)
			);
		} else if (member.roles.cache.toJSON().includes(role)) {
			await interaction.reply(
				ephemeralMessage(`<@${member.id}> 님에게 이미 <@&${role.id}> 역할이 있습니다.`)
			);
		}

		if (interaction.replied) {
			return;
		}

		await member.roles.add(role);
		await interaction.reply(`<@${member.id}> 님에게 <@&${role.id}> 역할을 추가하였습니다.`);
	}
};
