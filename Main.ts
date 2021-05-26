import "reflect-metadata";
import { Client } from "@typeit/discord";
import { Intents } from "discord.js";

export class Main {
  private static _client: Client;

  static get Client(): Client {
    return this._client;
  }

  static async start() {
    this._client = new Client({
      intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_VOICE_STATES
      ],
      // Uncomment to set the GuildID globaly
      // slashGuilds: ["693401527494377482"],
      classes: [
        `${__dirname}/discords/*.ts`,
        `${__dirname}/discords/*.js` 
      ],
      requiredByDefault: true,
    });

    await this._client.login("YOUR_TOKEN");

    this._client.once("ready", async () => {
      // Uncomment to clear the Slashes from Discord at startup
      // await this._client.clearSlashes();
      // await this._client.clearSlashes("693401527494377482");
      await this._client.initSlashes();

      console.log("Bot started");
    });

    this._client.on("interaction", async (interaction) => {
      // Uncomment to use interaction defer
      // if (!interaction.isCommand()) return;
      // await interaction.defer();

      this._client.executeSlash(interaction);
    });

    // Uncomment to log the debug infos from discord.js
    // this._client.on("debug", console.log);
  }
}

Main.start();
