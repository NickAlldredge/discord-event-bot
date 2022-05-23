const { SlashCommandBuilder } = require('@discordjs/builders');
const { writeBirthday } = require('../firebase/birthdays/writeBirthday.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add-birthday')
		.setDescription('Add (or update) your birthday!')
        .addIntegerOption(option => 
            option.setName('month')
                .setDescription('The month of the year')
                .setRequired(true)
                .addChoices(
                    { name: 'January', value: 1 },
                    { name: 'February', value: 2 },
                    { name: 'March', value: 3 },
                    { name: 'April', value: 4 },
                    { name: 'May', value: 5 },
                    { name: 'June', value: 6 },
                    { name: 'July', value: 7 },
                    { name: 'August', value: 8 },
                    { name: 'September', value: 9 },
                    { name: 'October', value: 10 },
                    { name: 'November', value: 11 },
                    { name: 'December', value: 12 }
                )
        )
        .addIntegerOption(option =>
            option.setName('day')
                .setDescription('The day of the year')
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(31)
        ),
	async execute(interaction) {
        await writeBirthday(
            interaction.user.id,
            interaction.user.username,
            interaction.options.getInteger('month'), 
            interaction.options.getInteger('day')
        );
		await interaction.reply({content: 'Thanks for adding your birthday!', ephemeral: true});
	},
};