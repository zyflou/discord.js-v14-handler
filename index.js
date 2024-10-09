require("dotenv").config();
const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
require("./errorHandlers");
const constants = require("./util/constants");
const config = require("./config.js");

const intents = Object.values(constants.IntentsFlags).filter(
    (v) => typeof v === "number"
);
const client = new Client({
    disableEveryone: true,
    intents,
    ws: {
        properties: {
            browser: "Discord iOS"
        }
    }
});

client.commands = new Collection();
client.slashCommands = new Collection();
client.config = config;


const handlerFiles = readdirSync("./handlers/");
handlerFiles.forEach((fileName) => require(`./handlers/${fileName}`)(client));


client.login(config.token);