const governor = artifacts.require("governor")

web3=require('web3')

//RSK Testnet Deployed Addresses:
_Oracle ="0x6fAF06e91a6aDB799d6211551fA09BB276a4c5E3";
_Coin ="0x53c7eC0675885769a01E0FA351af0b3E61E8FE07";

//_Oracle="0x29e30dC86578E336a0930012315aed2d398802b4"


contract("governor", (accounts) => {
it("give grant to team", async function () {
    const governor_ = await governor.propose;
    await safe_.depositCollateral({from:accounts[0], value: web3.utils.toWei("12.5", "ether")});
    await governor.propose(
        [tokenAddress],
        [0],
        [transferCalldata],
        “Proposal #1: Give grant to team”,
)});
}
    





});
