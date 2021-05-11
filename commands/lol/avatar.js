module.exports = {
  name: "avatar",
  description: "Affiche l'avatar de l'utilisateur tagué, ou ton propre avatar.",
  aliases: ["icon", "pdp"],
  execute(message) {
    if (!message.mentions.users.size) {
      return message.channel.send(
        `Ton avatar : <${message.author.displayAvatarURL({ dynamic: true })}>`
      );
    }

    const avatarList = message.mentions.users.map((user) => {
      return `Avatar de ${user.username} : <${user.displayAvatarURL({
        dynamic: true,
      })}>`;
    });

    message.channel.send(avatarList);
  },
};
