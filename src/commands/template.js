import Command from "../structures/Command.js";
import inquirer from "inquirer";
import fs from "fs";
import exec from "../utils/exec.js";

class Template extends Command {
  constructor() {
    super();
    this.command = "template [template] [projectName]";
    this.describe = "creates a new project using a template";
  }

  builder(yargs) {
    return yargs.option({
      git: {
        alias: "g",
        describe: "start a repo with git init",
        type: "boolean",
        default: false,
      },
      install: {
        alias: "i",
        describe: "install all dependencies",
        type: "boolean",
        default: false,
      },
    });
  }

  async handler(args) {
    const templateList = await getTemplates();
    const answers = await basicQuestions(args);
    await downloadProject(answers);

    console.log("Project created successfully!");

    async function getTemplates() {
      const templateListFile = await fs.readFileSync(
        new URL("../utils/templates.json", import.meta.url)
      );
      return JSON.parse(templateListFile);
    }

    async function basicQuestions(options) {
      const questions = [];

      if (!options.template) {
        questions.push({
          type: "list",
          name: "template",
          message: "Which template will you use?",
          choices: Object.keys(templateList),
          default: "JavaScript",
        });
      }

      if (!options.name) {
        questions.push({
          type: "input",
          name: "name",
          message: "What is the name of your project?",
          default: "default",
        });
      }

      if (!options.git) {
        questions.push({
          type: "confirm",
          name: "git",
          message: "Initialize a git repository?",
          default: false,
        });
      }

      if (!options.install) {
        questions.push({
          type: "confirm",
          name: "install",
          message: "Do you want to install the dependencies?",
          default: true,
        });
      }

      const answersToQuestions = await inquirer.prompt(questions);

      return {
        template: options.template || answersToQuestions.template,
        name: options.name ?? answersToQuestions.name,
        git: options.git || answersToQuestions.git,
        install: options.install || answersToQuestions.install,
      };
    }

    async function downloadProject(options) {
      const projectName = options.template;
      const commandPath = `cd ./${options.name} && `;

      const commands = [
        `git clone ${templateList[projectName]} ./${options.name}`,
        commandPath + "git init",
        commandPath + "npm install",
      ];

      await exec(commands[0]);
      if (options.git) await exec(commands[1]);
      if (options.install) await exec(commands[2]);
    }
  }
}

export default new Template();
