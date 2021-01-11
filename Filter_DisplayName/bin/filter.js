#!/usr/bin/env node

const { PythonShell } = require("python-shell");
const yargs = require("yargs");
const yargsOptions = yargs
  .usage("theVaji.com - Usage: -t <type> -n <name> -p <path>")
  .option("t", {
    alias: "type",
    describe: "Type which should be filtered",
    type: "string",
    demandOption: true,
  })
  .option("n", {
    alias: "name",
    describe: "Foldername",
    type: "string",
    demandOption: true,
  })
  .option("p", {
    alias: "path",
    describe: "Path to folder",
    type: "string",
    demandOption: true,
  }).argv;

const PysthonSehllOptions = {
  mode: "text",
  encoding: "utf8",
  pythonPath: "C:/Python38/python.exe",
  pythonOptions: ["-u"], // get print results in real-time
  scriptPath: "C:/GIT/myCLI/hello-cli/scripts",
  args: [yargsOptions.path, yargsOptions.name, yargsOptions.type],
};
PythonShell.run("FilterFiles.py", PysthonSehllOptions, function (err, results) {
  if (err) throw err;
  // results is an array consisting of messages collected during execution
  console.log(results[0]);
});
