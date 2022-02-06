const governor2 = artifacts.require("governor")
const token2 = artifacts.require("MyToken")

web3=require('web3')
ethers=require('ethers')

//RSK Testnet Deployed Addresses:
_Oracle ="0x6fAF06e91a6aDB799d6211551fA09BB276a4c5E3";
_Coin ="0x53c7eC0675885769a01E0FA351af0b3E61E8FE07";

//_Oracle="0x29e30dC86578E336a0930012315aed2d398802b4"


contract("governor", (accounts) => {
it("give grant to team", async function () {
    const tokenAddress = "0xE508D19C808A4ad553592bfC6cd3fb5B95200655";
    //const token = await ethers.getContractAt(token2, tokenAddress);
    const token = await token2.new(tokenAddress);
    const governor = await governor2.new();
    const ABI  = JSON.parse(token2);
    const teamAddress = "0xf702839A388a3C93A6e4f4424E706b95fbe973b7";
    const grantAmount = "10000";
    //const transferCalldata = token.interface.encodeFunctionData(‘transfer’, [teamAddress, grantAmount]);
    var functionDef = new SolidityFunction('', _.find(ABI, { name: 'transfer' }), '');
    var transferCalldata = functionDef.toPayload([teamAddress, grantAmount]).data;
    //const governor_ = await governor.propose;
    await governor.propose(
        [tokenAddress],
        [0],
        [transferCalldata],
        “Proposal : Give grant to team”,
)});
}
    





});
