const Discord = require('discord.js');
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });
const ecoledirecte = require('./ecoledirecte.js')(client);
const { prefix, token } = require('./config.json');
const { registerCommands, registerEvents } = require('./utils/registry');

(async () => {
  // Enregistrement des commandes et des événements
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');

  // Connexion du client
  await client.login(token);

  console.log(`Logged in as ${client.user.tag}!`);
  ecoledirecte();
  client.channels.cache.get('1099995077075538011').send('Le bot est en ligne !');
})();
