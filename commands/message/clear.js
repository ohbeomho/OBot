const {
	SlashCommandBuilder,
	SlashCommandIntegerOption,
	PermissionsBitField
} = require("discord.js");
const { ephemeralMessage } = require("../../utils");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("clear")
		.setDescription("메시지를 지정된 개수만큼 삭제시킵니다.")
		.addIntegerOption(
			new SlashCommandIntegerOption()
				.setName("count")
				.setDescription("(선택) 삭제할 메시지의 개수. 기본 10개")
		),
	async execute(interaction) {
		const count = interaction.options.getInteger("count") || 10;
		const deleteCount = (await interaction.channel.bulkDelete(count, true)).size;

		if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
			await interaction.reply(
				ephemeralMessage(
					`<@${interaction.member.id}> 님에게 메시지를 관리할 권한이 없습니다.`
				)
			);
			return;
		}

		await interaction.reply(
			ephemeralMessage(`\`${deleteCount}\`개의 메시지를 삭제하였습니다.`)
		);

		if (deleteCount < count) {
			await interaction.followUp(
				ephemeralMessage(
					`나머지 \`${
						count - deleteCount
					}\`개의 메시지는 14일보다 오래되어 삭제하지 못했습니다.`
				)
			);
		}

		setTimeout(() => interaction.deleteReply(), 2000);
	}
};
