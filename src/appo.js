#!/usr/bin/env node

import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

import template from "./commands/template.js";
import upgrade from "./commands/upgrade.js";

yargs(hideBin(process.argv))
  .version()
  .command(template)
  .command(upgrade)
  .wrap(null)
  .demandCommand(1, "Please specify a command")
  .help()
  .strict()
  .recommendCommands().argv;
