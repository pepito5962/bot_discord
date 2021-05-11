module.exports = {
  name: "reload",
  description: "Reload une commande.",
  args: true,
  execute(message, args) {
    const commandName = args[0].toLowerCase();
    const command =
      message.client.commands.get(commandName) ||
      message.client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
      );

    if (!command) {
      return message.channel.send(
        `Il n'y a pas de commande ayant pour nom ou alias \`${commandName}\`, ${message.author}!`
      );
    }

    delete require.cache[require.resolve(`./${command.name}.js`)];

    try {
      const newCommand = require(`./${command.name}.js`);
      message.client.commands.set(newCommand.name, newCommand);
      message.channel.send(
        `La commande \`${command.name}\` a bien été reload !`
      );
    } catch (error) {
      console.log(error);
      message.channel.send(
        `Une erreur a été rencontrée lors du reload de la commande \`${command.name}\` :\n\`${error.message}\``
      );
    }
  },
};
