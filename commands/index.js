const ping = require("./etc/ping.js");
const userinfo = require("./user/userinfo.js");
const kick = require("./user/kick.js");
const ban = require("./user/ban.js");
const role = require("./role/role.js");

module.exports = [ping, userinfo, kick, ban, role];
