#!/usr/bin/env node

const chalk = require("chalk");
const boxen = require("boxen");
const yargs = require("yargs");
const options = yargs
  .usage("Usage: -m <männlich>")
  .option("m", {
    alias: "männlich",
    describe: "männlich",
    type: "string",
    demandOption: false,
  })
  .option("w", {
    alias: "weiblich",
    describe: "weiblich",
    type: "string",
    demandOption: false,
  }).argv;

let person = "";

if (options.männlich == undefined) {
  person = "Livia Barmet";
} else {
  person = "Daniel Pauli";
}

const greeting = chalk.white(`${person}!`);

const boxenOptions = {
  padding: 1,
  margin: 1,
  borderColor: "#005293",
  backgroundColor: "#555555",
};
const msgBox = boxen(greeting, boxenOptions);

console.log(msgBox);
