const Gov = artifacts.require("EVIGov");
const CallR = artifacts.require("CallReceiverMock");



const tokenName = 'EVIToken';
const tokenSymbol = 'EVI';
const name = 'EVI-Governor';


module.exports = function (deployer) {
  deployer.deploy(Gov, name, "0xD98f6Fb780A60f8993997a1F492A52A09F8b50AC", 4, 16, 10);
  deployer.deploy(CallR);
};
