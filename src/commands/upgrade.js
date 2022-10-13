import Command from "../structures/Command.js";
import exec from "../utils/exec.js";

class Upgrade extends Command {
  constructor() {
    super();
    this.command = "upgrade";
    this.describe = "update me to the latest version";
  }

  async handler(args) {
    const cwd = new URL("../../", import.meta.url);
    
    await exec("git remote update", { cwd });
    await exec("git reset --hard origin/mmain", { cwd });
    await exec("npm install", { cwd });

    console.log("successfully updated");
  }
}

export default new Upgrade();