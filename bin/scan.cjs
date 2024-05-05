const axios = require("axios");
const { scan: nysaScan } = require("nysa-scanner");
const { Logger, LOG_LEVEL } = require("./logger.cjs");

/**
 * @param {Object} argv
 * @param {string} argv.projectRoot
 * @param {string} argv.srcDirPath
 * @param {string} argv.pkgJsonPath
 * @param {LOG_LEVEL} argv.logLevel
 */
const scan = async ({
  projectRoot,
  logLevel,
  apiKey,
  projectExternalId,
  serverUrl,
}) => {
  const logger = new Logger(logLevel);
  logger.info("Starting to scan");

  const results = await nysaScan({
    projectRoot,
  });
  logger.info("Scan completed");

  logger.info(
    `Sending the report to ${serverUrl} for the project ${projectExternalId}`
  );
  axios.post(
    `${serverUrl}/reports`,
    {
      projectExternalId,
      details: results,
    },
    {
      headers: {
        apiKey,
      },
    }
  );
  logger.info("Report sent");
};

module.exports = {
  scan,
};
