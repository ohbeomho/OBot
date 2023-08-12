const {
	SlashCommandSubcommandBuilder,
	SlashCommandStringOption,
	SlashCommandBooleanOption,
	Colors,
	PermissionsBitField
} = require("discord.js");

module.exports = {
	data: new SlashCommandSubcommandBuilder()
		.setName("create")
		.setDescription("새로운 역할을 만듭니다.")
		.addStringOption(
			new SlashCommandStringOption()
				.setName("role_name")
				.setDescription("새로운 역할의 이름")
				.setRequired(true)
		)
		.addStringOption(
			new SlashCommandStringOption()
				.setName("color")
				.setDescription("(선택) 새로운 역할의 색")
				.setRequired(false)
		)
		.addBooleanOption(
			new SlashCommandBooleanOption()
				.setName("mentionable")
				.setDescription("(선택) 멘션 가능 여부")
				.setRequired(false)
		),
	async execute(interaction) {
		const roleName = interaction.options.getString("role_name");
		let color = interaction.options.getString("color");
		const mentionable = interaction.options.getBoolean("mentionable") || true;

		if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
			await interaction.reply(
				ephemeralMessage(
					`<@${interaction.member.id}> 님에게 역할을 관리할 권한이 없습니다.`
				)
			);
			return;
		} else if (!roleName) {
			await interaction.reply(ephemeralMessage("역할의 이름을 입력해 주세요"));
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

		const newRole = await interaction.guild.roles.create({
			name: roleName,
			color: color || "Default",
			mentionable
		});

		await interaction.reply(`새로운 역할 <@&${newRole.id}> 을(를) 생성하였습니다.`);
	}
};
