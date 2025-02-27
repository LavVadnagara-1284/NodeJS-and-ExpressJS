require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

// BOT_TOKEN = MTM0NDI1Mjk1NTQ0Mzk4NjUyMw.GB21de.qaBkJJ0ahOflopQGjr5nZkXiUJC1GUzuCJNHgY

// CLIENT_ID = 1344252955443986523

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.on('messageCreate', (message) => {
    if (message.author.bot) return;
    message.reply({
        content: 'Hi from bot'
    })
})

client.on('interactionCreate', (interaction) => {
    console.log(interaction);
    interaction.reply('pong!')
})

client.login('MTM0NDI1Mjk1NTQ0Mzk4NjUyMw.GB21de.qaBkJJ0ahOflopQGjr5nZkXiUJC1GUzuCJNHgY');

