const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require("discord.js");

function row(selected) {
    return new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('selected')
                .setPlaceholder('Nothing selected')
                .addOptions([
                    {
                        label: 'Scheduling',
                        description: 'Manage your wars',
                        value: 'scheduling',
                        default: selected === 'scheduling'
                    },
                    {
                        label: 'Settings',
                        description: 'Customize the bot to your needs',
                        value: 'settings',
                        default: selected === 'settings'
                    },
                    {
                        label: 'Other',
                        description: 'Other commands',
                        value: 'other',
                        default: selected === 'other'
                    },
                ]),
        );
}

function settingsRow(selected, disabled) {
    return new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('sub_selected')
                .setPlaceholder(disabled ? "Settings options" : "Nothing selected")
                .setDisabled(disabled)
                .addOptions([
                    {
                        label: 'channelName',
                        value: 'settings_channelName',
                        default: selected === 'channelName'
                    },
                    {
                        label: 'warChannel',
                        value: 'settings_warChannel',
                        default: selected === 'warChannel'
                    },
                    {
                        label: 'preJoinTimer',
                        value: 'settings_preJoinTimer',
                        default: selected === 'preJoinTimer'
                    },
                    {
                        label: 'firstCallTimer',
                        value: 'settings_firstCallTimer',
                        default: selected === 'firstCallTimer'
                    },
                    {
                        label: 'callRate',
                        value: 'settings_callRate',
                        default: selected === 'callRate'
                    },
                    {
                        label: 'timeZone',
                        value: 'settings_timeZone',
                        default: selected === 'timeZone'
                    },
                ]),
        );
}

function handleHelp(msg) {


    const embed = new MessageEmbed()
        .setDescription(
            "Please choose a category in the dropdown menu"
        )
        .setColor('AQUA')
        .setTitle("Help")
    msg.reply({
        embeds: [embed],
        components: [row(""), settingsRow("", true)]
    });
}

function helpScheduling(interaction) {
    const embed = new MessageEmbed()
        .setDescription(
            "Commands for managing wars"
        )
        .setColor('AQUA')
        .setTitle("Scheduling")
        .addFields([
            {
                name: `\`rt!scheduleWar <HH:MM>\``,
                value: 'Schedule a war at given time (HH:MM).',
            },
            {
                name: `\`rt!startWar <MM:SS>\``,
                value: 'Schedule a war which starts at given time (MM:SS)',
            },
            {
                name: `\`rt!leaveWar\``,
                value: 'Manually make the bot leave the war channel',
            },
            {
                name: `\`rt!list\``,
                value: 'List all scheduled wars',
            },
            {
                name: `\`rt!unscheduleWar <HH:MM>\``,
                value: 'Unschedule a war at time (HH:MM) specified by \`rt!list\`.',
            },
        ])
    interaction.update({
        embeds: [embed],
        components: [row("scheduling"), settingsRow(undefined, true)]
    })
}

function helpSettings(interaction, option) {
    const embed = new MessageEmbed()
        .setDescription(
            `${option ? option.description : `Commands for customizing the bot. To view examples, select an option from the dropdown below.`} Values containing spaces have to be put in \"qoutes\".`
        ).setTitle("Settings")
        .setColor('AQUA')
        .addFields([
            {
                name: `\`rt!settings get ${option ? option.name : '<OPTION>'}\``,
                value: `Get the settings of ${option ? ` the ${option.name} option` : `the specified option`}.`,
            },
            {
                name: `\`rt!settings set ${option ? option.name : '<OPTION>'} ${option ? option.value : '<VALUE>'}\``,
                value: `Set ${option ? option.name : `an option`} to ${option ? option.value : `a specified value`}.`,
            },
        ])
    interaction.update({
        embeds: [embed],
        components: [row("settings"), settingsRow(option?.name, false)]
    })
}

function helpOther(interaction) {
    const embed = new MessageEmbed()
        .setDescription(
            "Other commands"
        ).setTitle("Other")
        .setColor('AQUA')
        .addFields([
            {
                name: `\`rt!stats\``,
                value: 'Get the total number of wars',
            }
        ])
    interaction.update({
        embeds: [embed],
        components: [row("other"), settingsRow(undefined, true)]
    })
}

exports.handleHelp = handleHelp;
exports.helpScheduling = helpScheduling;
exports.helpSettings = helpSettings;
exports.helpOther = helpOther;