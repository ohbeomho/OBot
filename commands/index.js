const fs = require("fs");
const path = require("path");
const commands = [];

// 명령어 불러오기
const commandFolders = fs.readdirSync(__dirname).filter((f) => f !== "index.js");

commandFolders.forEach((folder) => {
	const commandsPath = path.join(__dirname, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"));

	commandFiles.forEach((file) => {
		const command = require(path.join(commandsPath, file));
		commands.push(command);
	});
});

module.exports = commands;
