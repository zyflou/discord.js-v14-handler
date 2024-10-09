const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "ping",
  description: "Ping command",
  category: "utility",
  async exec(client, message, args) {
    const msg = await message.channel.send("Pinging...");

    const ping = msg.createdTimestamp - message.createdTimestamp;
    const apiPing = client.ws.ping;
    const embed = new EmbedBuilder()
    .setTitle("Pong!")
    .setDescription(`Bot Latency: ${ping}ms\nAPI Latency: ${apiPing}ms`)
    .setColor("Random")
    .setTimestamp();
    msg.edit({ embeds: [embed] })
  }
}