#!/usr/bin/env node
const program = require("commander");
const { description, version } = require("../package.json");
const { get, display, post, del, put } = require("./commands");
// Welcome.display();

program.command("get").action(get);
program.command("display").action(display);
program.command("delete").action(del);
program.command("put").action(put);
program.command("post").parse(process.argv).action(post);

// .parse(process.argv);
// program.description(description).version(version, "-v,--version");
program.parse();
if (!process.argv.slice(2).length) program.outputHelp();
