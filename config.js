require("dotenv").config();

module.exports = {
  token: process.env.TOKEN || "",
  prefix: process.env.PREFIX || "",
  ownerId: process.env.OWNERID?.split(',') || [""],
}