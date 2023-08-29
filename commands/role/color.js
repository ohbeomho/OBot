const {
	SlashCommandSubcommandBuilder,
	SlashCommandRoleOption,
	SlashCommandStringOption,
	PermissionsBitField
} = require("discord.js");
const { ephemeralMessage } = require("../../utils");

module.exports = {
	data: new SlashCommandSubcommandBuilder()
		.setName("color")
		.setDescription("역할의 색을 변경합니다.")
		.addRoleOption(
			new SlashCommandRoleOption()
				.setName("role")
				.setDescription("색을 변경할 역할")
				.setRequired(true)
		)
		.addStringOption(
			new SlashCommandStringOption()
				.setName("color")
				.setDescription("역할의 새로운 색 (#rrggbb 형식)")
				.setRequired(true)
		),
	async execute(interaction) {
		const role = interaction.options.getRole("role");
		let color = interaction.options.getString("color");
		const previousColor = "#" + role.color.toString(16);

		if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
			await interaction.reply(
				ephemeralMessage(
					`<@${interaction.member.id}> 님에게 역할을 관리할 권한이 없습니다.`
				)
			);
			return;
		}

		if (!color.startsWith("#") || color.length !== 7) {
			await interaction.reply(
				ephemeralMessage(
					"색은 `#rrggbb` (hex string) 형식으로 입력되어야 합니다.\n예시: 빨강 = `#ff0000`"
				)
			);
			return;
		}

		await role.edit({ color });
		await interaction.reply(
			`역할 <@&${role.id}> 의 색을 변경하였습니다. \`(${previousColor} -> ${color})\``
		);
	}
};
