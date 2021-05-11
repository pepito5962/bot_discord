const { prefix } = require('../../config/config.json');

module.exports = {
  name: "help",
  description:
    "Liste toutes les commandes disponibles, ou affiche la description d'une commande spécifiée.",
  aliases: ["commands"],
  usage: "[command name]",
  cooldown: 5,
  execute(message, args) {
    const data = [];
    const { commands } = message.client;

    if (!args.length) {
      data.push("Voici la liste de toutes les commandes : ");
      data.push(commands.map((command) => command.name).join(", "));
      data.push(
        `\nTu peux taper \`${prefix}help [nom de la commande]\` pour afficher les informations sur une commande spécifique`
      );

      return message.author
        .send(data, { split: true })
        .then(() => {
          if (message.channel.type === "dm") return;
          message.reply(
            "Je t'ai envoyé un message privé avec toutes mes commandes !"
          );
        })
        .catch((error) => {
          console.error(
            `Could not send help DM to ${message.author.tag}.\n`,
            error
          );
          message.reply(
            "On dirait que je ne peux pas te contacter en privé ..."
          );
        });
    }

    const name = args[0].toLowerCase();
    const command =
      commands.get(name) ||
      commands.find((c) => c.aliases && c.aliases.includes(name));

    if (!command) {
      return message.reply("Ce n'est pas une commande valide !");
    }

    data.push(`**Nom:** ${command.name}`);

    if (command.aliases)
      data.push(`**Aliases:** ${command.aliases.join(", ")}`);
    if (command.description)
      data.push(`**Description:** ${command.description}`);
    if (command.usage)
      data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

    data.push(`**Cooldown:** ${command.cooldown || 3} seconde(s)`);

    message.channel.send(data, { split: true });
  },
};
