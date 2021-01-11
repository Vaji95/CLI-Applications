#!/usr/bin/env node
const yargs = require("yargs");
const fs = require("fs");
const chalk = require("chalk");
const boxen = require("boxen");
const yargsOptions = yargs
  .usage("theVaji.com - Usage: -l <path> -a <path>")
  .option("l", {
    alias: "pathLocal",
    describe: "Path to local.settings.json",
    type: "string",
    demandOption: true,
  })
  .option("a", {
    alias: "pathAzure",
    describe: "Path to folder",
    type: "string",
    demandOption: true,
  })
  .example(
    "ConvertLocalSettingsToAzureSettings -l local.settings.json -a AzureFunction.json"
  ).argv;

var objResult = [];
const obj = (name, value) => {
  return {
    name: name,
    value: value,
    slotSetting: false,
  };
};
var ignoreValues = [
  "AzureWebJobsDashboard",
  "AzureWebJobsStorage",
  "ConnectionStrings__AzureWebJobsStorage",
  "FUNCTIONS_EXTENSION_VERSION",
  "FUNCTIONS_WORKER_RUNTIME",
  "WEBSITE_CONTENTAZUREFILECONNECTIONSTRING",
  "WEBSITE_CONTENTSHARE",
  "WEBSITE_RUN_FROM_PACKAGE",
];
fs.readFile(yargsOptions.pathLocal, "utf-8", (err, data) => {
  if (err) {
    throw err;
  }
  const user = JSON.parse(data.toString());
  for (const [key, value] of Object.entries(user.Values)) {
    if (!ignoreValues.includes(key)) {
      objResult.push(obj(key, value));
    } else {
      objResult.push(obj(key, "--REPLACE--"));
    }
  }

  const result = JSON.stringify(objResult);
  fs.writeFile(yargsOptions.pathAzure, result, "utf8", (err) => {
    if (err) {
      throw err;
    }
  });
});
console.log("File is saved.");
const greeting = chalk.white.bold(
  "Please change these values manually: \n\n" + ignoreValues.join("\n")
);
const boxenOptions = {
  padding: 1,
  margin: 1,
  borderStyle: "round",
  borderColor: "green",
  backgroundColor: "#555555",
};
const msgBox = boxen(greeting, boxenOptions);

console.log(msgBox);
