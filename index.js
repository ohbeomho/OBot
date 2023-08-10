require("dotenv").config();

const { Client, Collection, GatewayIntentBits, Events, REST, Routes } = require("discord.js");
const commands = require("./commands");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const rest = new REST().setToken(process.env.BOT_TOKEN);

client.commands = new Collection();
commands.forEach((command) => client.commands.set(command.data.name, command));

client.once(Events.ClientReady, (c) => console.log(`${c.user.tag}(으)로 로그인됨.`));
client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isChatInputCommand()) {
		return;
	}

	const command = client.commands.get(interaction.commandName);

	if (!command) {
		await interaction.reply(`명령어 \`${interaction.commandName}\`는 존재하지 않습니다.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (err) {
		console.error(err);

		const options = {
			content: "명령어 실행 중 오류가 발생하였습니다.",
			ephemeral: true
		};

		if (interaction.replied || interaction.deferred) {
			await interaction.followUp(options);
		} else {
			await interaction.reply(options);
		}
	}
});

(async () => {
	try {
		console.log("슬래시 명령어 등록 시작.");

		await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
			body: commands.map((command) => command.data.toJSON())
		});

		console.log("슬래시 명령어 등록 완료.");
	} catch (err) {
		console.error(err);
	}
})();

client.login(process.env.BOT_TOKEN);

const express = require("express");
const app = express();

app.get("/", (_, res) => res.sendFile("./index.html"));
app.listen(process.env.PORT);
