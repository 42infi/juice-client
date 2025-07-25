const rpc = require("discord-rpc");
const { version } = require("../../package.json");

class DiscordRPC {
  constructor() {
    this.clientId = "1384666682261246184";
    this.startTimestamp = Date.now();
    this.client = new rpc.Client({ transport: "ipc" });
    this.init();
  }

  init() {
    this.client.on("ready", () => this.setActivity());
    this.client.on("disconnected", () => this.login());
    this.login();
  }

  login() {
    this.client.login({ clientId: this.clientId }).catch(console.error);
  }

  setActivity(activity = this.defaultActivity()) {
    this.client.setActivity(activity).catch(console.error);
  }

  setState(state) {
    const activity = this.defaultActivity();
    activity.state = state;
    this.setActivity(activity);
  }

  defaultActivity() {
    return {
      startTimestamp: this.startTimestamp,
      state: "In the lobby",
      largeImageKey: "coke",
      largeImageText: `Coke Client v${version}`,
      instance: false,
    };
  }
}

module.exports = DiscordRPC;
