/* eslint-disable no-unused-vars */

class Command {
  constructor() {
    this.command = "occult command";
    this.describe = "without description";
    this.deprecated = false;
    this.aliases = [];
  }

  builder(yargs) {
    return yargs;
  }

  handler(args) {
    console.log("Hello Word");
  }
}

export default Command;
