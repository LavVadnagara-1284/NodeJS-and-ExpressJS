const { REST, Routes } = require('discord.js');

const commands = [
    {
        name: 'ping',
        description: 'Replies with Pong!',
    },
];

const rest = new REST({ version: '10' }).setToken('MTM0NDI1Mjk1NTQ0Mzk4NjUyMw.GB21de.qaBkJJ0ahOflopQGjr5nZkXiUJC1GUzuCJNHgY');

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationCommands('1344252955443986523'), { body: commands });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();