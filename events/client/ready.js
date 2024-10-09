const { ActivityType } = require("discord.js");

module.exports = {
    name: "ready",
    exec: async (client) => {

        const botStatus = [
            `Your Status`,
        ];

        setInterval(function() {
            let status = botStatus[Math.floor(Math.random() * botStatus.length)];
            client.user.setActivity(status, { type: ActivityType.Custom });
        }, 7000);
        // Type for the bot status: Listening, Watching, Competing, Playing, Streaming, Custom
        // For Streaming must include a link: https://twitch.tv/username

        console.log(`${client.user.tag}  successfully executed ✅`);
    }
};