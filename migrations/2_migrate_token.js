const EVItok = artifacts.require("EVIToken");


const tokenName = 'EVIToken';
const tokenSymbol = 'EVI';
const name = 'EVI-Governor';

module.exports = function (deployer) {
  // _CoinAdd = deployer.deploy(Coin, "Zero Volatility BTC","xBTC", "5777");
  // _OracleAdd = deployer.deploy(Oracle);
  deployer.deploy(EVItok, tokenName, tokenSymbol);
}
