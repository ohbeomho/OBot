const fs = require("fs");
const path = require("path");
const { loadCommands } = require("../utils/index");
const commands = [];

// 명령어 불러오기
const commandFolders = fs.readdirSync(__dirname).filter((f) => f !== "index.js");

commandFolders.forEach((folder) => {
	const commandsPath = path.join(__dirname, folder);
	commands.push(...loadCommands(commandsPath));
});

module.exports = commands;
