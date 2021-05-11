module.exports = {
  name: "kick",
  description: "Tag un membre pour le kick.",
  guildOnly: true,
  execute(message) {
    if (!message.mentions.users.size) {
      return message.reply("Tu dois tag un utilisateur pour le kick !");
    }

    const taggedUser = message.mentions.users.first();

    message.channel.send(`Tu veux vraiment kick ${taggedUser.username} ??`);
  },
};
