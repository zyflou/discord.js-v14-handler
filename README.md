## Discord.js v14 Command Handler

A simple and efficient command handler for your Discord bot built using [discord.js](https://discord.js.org/). This setup organizes commands and events for better maintainability and scalability.

# Features

- Organized command and event handling.
- Auto-loading commands and events from respective directories.
- Modular structure for easy expansion.

# Prerequisites

- [node.js](https://nodejs.org/) v16.6.0 or higher
- [discord.js](https://discord.js.org/) v14.x.x or higher

# Installation

1. **Clone the repository:**
```bash
git clone https://github.com/zyflou/discord.js-v14-handler
cd discord.js-v14-handler
```

2. **Install dependencies:**
```bash
npm install discord.js dotenv
```

3. **Configure the bot:** Create a .env file in the root directory and add the following values:
```bash
TOKEN:your-bot-token
PREFIX:your-bot-prefix
OWNERID:your-id
GUILDID:your-guild-id
```

4. **Run the bot:**
```bash
npm run start 
```

# Commands

All command files are stored in the `commands/` folder. Each command is organized into categories (folders). A command file typically looks like this:

```javascript
module.exports = {
  name: "ping",
  description: "Ping command",
  category: "utility",
  async exec(client, message, args) {
  message.channel.send('Pong!')
  }
}
```

# Events

Events are stored in the `events/ folder`, and organized into `client/` and `guild/` sub-folders. The event handler will automatically register all events from these directories.

# Event Handler
**(`handler/event.js`)**

```javascript
const { readdirSync, existsSync } = require("fs");
const path = require("path");

module.exports = (client) => {
    const basePath = "./events/";

    if (existsSync(basePath)) {
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
};
```

# Example Events
**(`events/client/ready.js`)**

This event triggers when the bot is ready.

```javascript
module.exports = {
    name: "ready",
    exec: async (client) => {
        console.log(`Logged in as ${client.user.tag}!`);
    },
};
```

# License

This project is licensed under the ISC License.