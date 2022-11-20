#!/usr/bin/env node
const program = require("commander");
const { description, version } = require("../package.json");
const { get, display, post, del } = require("./commands");
// Welcome.display();

program.command("get").action(get);
// program.command("post").parse(process.argv).action(post(process.argv));
program.command("display").action(display);
program.command("delete").action(del);

program.description(description).version(version, "-v,--version");
// .parse(process.argv);
program.parse();
if (!process.argv.slice(2).length) program.outputHelp();
