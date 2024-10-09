require("dotenv").config();

module.exports = {
  token: process.env.TOKEN || "",
  prefix: process.env.PREFIX || "m.",
  ownerId: process.env.OWNERID?.split(',') || ["707254056535588924"],
  guildId: process.env.GUILDID || "",
}