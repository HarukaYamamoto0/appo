#!/usr/bin/env node

const yargs = require("yargs");

yargs
  .command("test", "test command", () => console.log("Hello Word"))
  .wrap(yargs.terminalWidth())
  .demandCommand(1, "Please specify a command")
  .help()
  .strict()
  .recommendCommands().argv;