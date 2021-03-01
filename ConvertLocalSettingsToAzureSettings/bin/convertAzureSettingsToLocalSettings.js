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
    "ConvertAzureSettingsToLocalSettings -a AzureFunction.json -l local.settings.json"
  ).argv;

const obj = { IsEncrypted: false, Values: {}, Host: { CORS: "*" } };
var ignoreValues = [
  "ConnectionStrings__AzureWebJobsStorage",
  "FUNCTIONS_EXTENSION_VERSION",
  "FUNCTIONS_WORKER_RUNTIME",
  "WEBSITE_CONTENTAZUREFILECONNECTIONSTRING",
  "WEBSITE_CONTENTSHARE",
  "WEBSITE_RUN_FROM_PACKAGE",
];
var replaceValues = {
  AzureWebJobsDashboard: "UseDevelopmentStorage=true",
  AzureWebJobsStorage: "UseDevelopmentStorage=true",
};
fs.readFile(yargsOptions.pathAzure, "utf-8", (err, data) => {
  if (err) {
    throw err;
  }
  const jsonData = JSON.parse(data.toString());
  var patt = new RegExp("^AzureWebJobs.*.Disabled$");
  jsonData.forEach((element) => {
    if (!ignoreValues.includes(element.name) && !patt.test(element.name)) {
      if (element.name in replaceValues) {
        obj.Values[element.name] = replaceValues[element.name];
      } else {
        obj.Values[element.name] = element.value;
      }
    }
  });

  const result = JSON.stringify(obj);
  fs.writeFile(yargsOptions.pathLocal, result, "utf8", (err) => {
    if (err) {
      throw err;
    }
  });
});
console.log("File is saved.");
