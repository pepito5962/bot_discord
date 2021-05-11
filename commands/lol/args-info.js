module.exports = {
  name: "args-info",
  description: "Informations sur l'argument renseigné.",
  args: true,
  execute(message, args) {
    if (args[0] === "foo") {
      return message.channel.send("bar");
    }

    message.channel.send(`Premier argument : ${args[0]}`);
  },
};
