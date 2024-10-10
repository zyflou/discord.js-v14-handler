const Table = require('cli-table3');

async function logStatus(client) {
    const chalk = (await import('chalk')).default;
    
    const commandsTable = new Table({
        head: ['Commands', 'Stats'],
        colWidths: [20, 10]
    });

    client.commands.forEach(command => {
        commandsTable.push([command.name, chalk.green('✔')]);
    });

    const eventsTable = new Table({
        head: ['Events', 'Stats'],
        colWidths: [20, 10],
        style: { head: ['green'] }
    });

    client.eventNames().forEach(event => {
        eventsTable.push([event, chalk.green('✔')]);
    });

    console.log(commandsTable.toString());
    console.log(eventsTable.toString());
    console.log(chalk.bold(`Logged in as ${chalk.blue(client.user.tag)}!`));
}

module.exports = logStatus;