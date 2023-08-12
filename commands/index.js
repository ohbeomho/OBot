const fs = require("fs");
const path = require("path");
const commands = [];

// 명령어 불러오기
const commandFolders = fs.readdirSync(__dirname).filter((f) => f !== "index.js");

for (let folder of commandFolders) {
	const commandsPath = path.join(__dirname, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"));

	for (let file of commandFiles) {
		const command = require(path.join(commandsPath, file));
		commands.push(command);
	}
}

module.exports = commands;
