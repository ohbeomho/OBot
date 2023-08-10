const {
	SlashCommandSubcommandBuilder,
	SlashCommandRoleOption,
	SlashCommandStringOption,
	Colors,
	PermissionsBitField
} = require("discord.js");

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
				.setDescription("역할의 새로운 색")
				.setRequired(true)
		),
	async execute(interaction) {
		const role = interaction.options.getRole("role");
		let color = interaction.options.getString("color");

		if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
			await interaction.reply({
				content: `**${interaction.member.user.tag}**님에게 역할을 관리할 권한이 없습니다.`,
				ephemeral: true
			});
			return;
		}

		const errorMessage = {
			content: `올바르지 않은 색입니다.
https://old.discordjs.dev/#/docs/discord.js/main/typedef/ColorResolvable 여기를 참고해 주세요.`,
			ephemeral: true
		};

		if (color) {
			try {
				color = JSON.parse(color);
				if (Array.isArray(color) && color.length !== 3) {
					await interaction.reply(errorMessage);
				}
			} catch (err) {
				if (
					(color.startsWith("#") && ![4, 5, 7].includes(color.length)) ||
					(!color.startsWith("#") &&
						!Colors[color.charAt[0].toUpperCase() + color.substring(1)])
				) {
					await interaction.reply(errorMessage);
				}
			}
		}

		if (interaction.replied) {
			return;
		}

		await role.edit({ color });
		await interaction.reply(`역할 <@&${role.id}> 의 색을 변경하였습니다.`);
	}
};
