const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = (client) => {
  return async () => {
    const username = 'b.thirimanna'; 
    const password = 'temporairement retiré'; 

    const response = await fetch('https://api.ecoledirecte.com/v3/login.awp', {
      method: 'POST',
      body: JSON.stringify({ identifiant: username, motdepasse: password, verbe: 'POST' }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();

    if (!data.token) {
      console.error('Impossible de se connecter à EcoleDirecte. Veuillez vérifier vos identifiants.');
      return;
    }

    const token = data.token;

    const url = `https://api.ecoledirecte.com/v3/eleves/${token}/cahierdetexte.awp?verbe=GET`;
    const response2 = await fetch(url);
    const data2 = await response2.json();

    const messagesFiltres = [];
    for (const message of data2.data.cahierdetexte) {
      if (message.statut === 'filtre' && ['M. PRAUD', 'Mme PICARD', 'Mme LEGROS'].includes(message.matiere.nomComplet)) {
        messagesFiltres.push(message);
      }
    }

    const channel = client.channels.cache.get('1099995077075538011'); // Remplacez CHANNEL_ID par l'ID du canal où vous voulez envoyer les messages filtrés
    for (const message of messagesFiltres) {
      const embed = new Discord.MessageEmbed()
        .setTitle(message.titre)
        .setDescription(message.contenu)
        .setColor('BLUE')
        .setAuthor('Notre Dame des Oiseaux', 'https://uploads-ssl.webflow.com/5ffda6c01e12607d88559b7c/60015fe35dc32d29dad2f34a_Notre-Dame%20des%20Oiseaux.png');
      await channel.send({ embeds: [embed] });
    }
  };
};
