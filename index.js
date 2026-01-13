const { Client, GatewayIntentBits, Events } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildScheduledEvents
  ],
});

// 🔧 CONFIG
const EVENT_CHANNEL_ID = '1456593469207347282';
const BOT_TOKEN = 'client.login(process.env.DISCORD_TOKEN);';

client.once(Events.ClientReady, () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

// Fires when a scheduled event is created
client.on(Events.GuildScheduledEventCreate, async (event) => {
  console.log('Event detected:', event.name);

  try {
    const channel = await client.channels.fetch(EVENT_CHANNEL_ID);
    if (!channel) {
      console.log('Channel not found');
      return;
    }

    const eventLink = `https://discord.com/events/${event.guildId}/${event.id}`;

    await channel.send(
      `📢 **New Event Created!**\n**${event.name}**\n🔗 ${eventLink}`
    );

  } catch (error) {
    console.error('Error posting event link:', error);
  }
});

client.login(BOT_TOKEN);
