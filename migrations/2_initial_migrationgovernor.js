const governor = artifacts.require("EVIgovernor");

module.exports = function (deployer) {
  deployer.deploy(governor, "0xE508D19C808A4ad553592bfC6cd3fb5B95200655");
};
