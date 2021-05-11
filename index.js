const Discord = require("discord.js");
const fs = require("fs");
const { prefix, token } = require("./config/config.json");

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands/lol")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/lol/${file}`);
  bot.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

bot.once("ready", () => {
  console.info(`Connecté en tant que ${bot.user.tag}!`);
});

bot.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    bot.commands.get(commandName) ||
    bot.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );

  if (!command) return;

  if (command.guildOnly && message.channel.type === "dm") {
    return message.reply("Je ne peux pas exécuter cette commande en privé !");
  }

  if (command.args && !args.length) {
    let reply = `Tu n'as renseigné aucun argument ${message.author}`;

    if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    }

    return message.channel.send(reply);
  }

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `Attends encore ${timeLeft.toFixed(1)} secondes avant de réutiliser \`${
          command.name
        }\``
      );
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply(
      "Une erreur est survenue pendant l'execution de cette commande..."
    );
  }
});

bot.login(token);
