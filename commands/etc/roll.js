const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("roll")
		.setDescription("1부터 100까지의 수 중 무작위 숫자를 출력합니다."),
	async execute(interaction) {
		const randomNumber = Math.floor(Math.random() * 100 + 1);
		await interaction.reply(String(randomNumber));
	}
};
