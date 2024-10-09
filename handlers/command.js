const { readdirSync, existsSync } = require("fs");
const path = require("path");

module.exports = (client) => {
    const basePath = path.resolve("./commands/");
    const isExist = existsSync(basePath);

    if (isExist) {
        const loadCommands = (dir) => {
            const files = readdirSync(dir);

            files.forEach((file) => {
                const filePath = path.join(dir, file);
                const isCommandFile = path.extname(file) === '.js';

                if (isCommandFile) {
                    const command = require(filePath);

                    if (command.data) {
                        client.slashCommands.set(command.data.name, command);
                    } else if (command.name) {
                        client.commands.set(command.name, command);
                    }
                }
                else {
                    loadCommands(filePath);
                }
            });
        };

        loadCommands(basePath);
    }
};