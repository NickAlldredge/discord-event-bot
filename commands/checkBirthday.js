const { SlashCommandBuilder } = require('@discordjs/builders');
const { readBirthday } = require('../firebase/birthdays/readBirthday.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('check-birthday')
		.setDescription(`See what someone's birthday is!`)
        .addUserOption(option =>
            option.setName('user')
                .setDescription(`Whose birthday do you want to check?`)
                .setRequired(true)
        ),
	async execute(interaction) {
        const response = await readBirthday(interaction.options.getUser('user').id);
        let reply = '';
        if(response) {
            reply = `${response.username}'s birthday is ${response.month}/${response.day}`;
        } else {
            reply = `Sorry, I couldn't find a birthday for this user.`;
        }
		await interaction.reply({content: reply, ephemeral: true});
	},
};