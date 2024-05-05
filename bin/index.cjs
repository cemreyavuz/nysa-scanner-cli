#!/usr/bin/env node
const { config } = require("dotenv");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const { scan } = require("./scan.cjs");

config();

yargs(hideBin(process.argv))
  .command(
    "scan [projectRoot] [srcDirPath] [pkgJsonPath]",
    "scan the repository",
    (yargs) => {
      return yargs
        .option("projectRoot", {
          describe: "project root",
          default: "./",
          type: "string",
        })
        .option("apiKey", {
          describe: "api key to use in API requests",
          type: "string",
        })
        .option("projectExternalId", {
          describe: "external id of the project to write the report",
          type: "string",
        })
        .option("serverUrl", {
          type: "string",
          deprecated: true,
        });
    },
    (argv) => {
      scan({
        projectRoot: argv.projectRoot,
        apiKey: argv.apiKey ?? process.env.NYSA_SCANNER_API_KEY,
        projectExternalId:
          argv.projectExternalId ??
          process.env.NYSA_SCANNER_PROJECT_EXTERNAL_ID,
        serverUrl: argv.serverUrl ?? process.env.NYSA_SCANNER_SERVER_URL,
        logLevel: argv.logLevel,
      });
    }
  )
  .option("logLevel", {
    type: "number",
    description: "log level",
    default: 1,
  })
  .parse();
