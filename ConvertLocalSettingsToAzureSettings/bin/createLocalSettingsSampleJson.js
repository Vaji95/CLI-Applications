#!/usr/bin/env node
const yargs = require("yargs");
const fs = require("fs");
const yargsOptions = yargs
  .usage("theVaji.com - Usage: -p <path> -s <path>")
  .option("p", {
    alias: "path",
    describe: "Path to local.settings.json",
    type: "string",
    demandOption: true,
  })
  .option("s", {
    alias: "pathS",
    describe: "Save local.settings.sample to",
    type: "string",
    demandOption: true,
  })
  .example(
    "CreateLocalSettingsSampleJson -p local.settings.json -s local.settings.settings.json"
  ).argv;

var checkID = ["ClientId", "AppId"];
var checkSecret = ["Secret", "Password", "Passwort"];

fs.readFile(yargsOptions.path, "utf-8", (err, data) => {
  if (err) {
    throw err;
  }
  const jsonData = JSON.parse(data.toString());
  for (const [key, value] of Object.entries(jsonData.Values)) {
    checkID.forEach((element) => {
      if (key.toLowerCase().includes(element.toLowerCase())) {
        jsonData.Values[key] = "--GUID--";
      }
    });
    checkSecret.forEach((element) => {
      if (key.toLowerCase().includes(element.toLowerCase())) {
        jsonData.Values[key] = "--SECRET--";
      }
    });
  }

  const result = JSON.stringify(jsonData);
  fs.writeFile(yargsOptions.pathS, result, "utf8", (err) => {
    if (err) {
      throw err;
    }
  });
});
console.log("File is saved.");
