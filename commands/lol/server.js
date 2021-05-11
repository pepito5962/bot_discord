module.exports = {
  name: "server",
  description: "Affiche les informations du serveur.",
  execute(message) {
    message.channel.send(
      `Serveur: ${message.guild.name}\nNombre de membres: ${message.guild.memberCount}`
    );
  },
};
