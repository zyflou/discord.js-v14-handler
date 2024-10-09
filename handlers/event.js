const { readdirSync, existsSync } = require("fs");
const path = require("path");

module.exports = (client) => {
    const basePath = "./events/";

    const isExist = existsSync(basePath);
    if (isExist) {
        const folders = readdirSync(basePath, { withFileTypes: true })
            .filter((dirent) => dirent.isDirectory())
            .map((dirent) => dirent.name);

        folders.forEach((folder) => {
            const folderPath = path.join(basePath, folder);
            const files = readdirSync(folderPath).filter((f) => f.endsWith(".js"));

            files.forEach((fileName) => {
                const event = require(path.join("..", folderPath, fileName));
                if (event.name && event.exec) {
                    client.on(event.name, (...args) => event.exec(client, ...args));
                }
            });
        });
    }
}