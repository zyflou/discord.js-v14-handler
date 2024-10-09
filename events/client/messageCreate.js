module.exports = {
    name: "messageCreate",
    exec(client, message) {
        if (message.author.bot) return;

        const prefix = client.config.prefix;

        if (message.content.startsWith(prefix)) {
            const args = message.content.slice(prefix.length).trim().split(/ +/g);
            const commandName = args.shift().toLowerCase();

            const command = client.commands.get(commandName);
            if (!command) return;

            try {
                command.exec(client, message, args);
            } catch (error) {
                console.error(error);
                message.reply('An error occurred while executing this command.');
            }
        }
    }
};