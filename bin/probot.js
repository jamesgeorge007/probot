#!/usr/bin/env node

const semver = require('semver')
const program = require('commander')
const pkg = require('../package')

if (!semver.satisfies(process.version, pkg.engines.node)) {
  console.log(`Node.js version ${pkg.engines.node} is required. You have ${process.version}.`)
  process.exit(1)
}

program
  .version(pkg.version)
  .usage('<command> [options]')
  .command('run', 'run the bot')
  .command('receive', 'Receive a single event and payload')
  .on('command:*', (cmd) => {
    if (!program.commands.find(c => c._name == cmd[0])) {
      console.error(`Invalid command: ${program.args.join(' ')}\n`);
      program.outputHelp()
      process.exit(1);
    }
  })

program
  .parse(process.argv)
