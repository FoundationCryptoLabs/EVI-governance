const Gov = artifacts.require("EVIGov");
const Tok = artifacts.require("EVIToken");
const CallR = artifacts.require("CallReceiverMock");


const tokenName = 'EVIToken';
const tokenSymbol = 'EVI';
const name = 'EVI-Governor';


module.exports = function (deployer) {
  deployer.deploy(Tok, tokenName, tokenSymbol);
  deployer.deploy(Gov, name, "0x7D4b9E4CccA323d0761f450163bAf15B664f5284", 4, 16, 10);
  deployer.deploy(CallR);
};
