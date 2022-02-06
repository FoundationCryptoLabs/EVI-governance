const gov = artifacts.require("governor")
const token2 = artifacts.require("MyToken")

web3=require('web3')
ethers=require('ethers')

//RSK Testnet Deployed Addresses:
_Oracle ="0x6fAF06e91a6aDB799d6211551fA09BB276a4c5E3";
_Coin ="0x53c7eC0675885769a01E0FA351af0b3E61E8FE07";

//_Oracle="0x29e30dC86578E336a0930012315aed2d398802b4"
const userA = "0x2BEF69424286E4EC7AB2F69fA5434CF77bFaBFF1"
const userB = "0x7D4b9E4CccA323d0761f450163bAf15B664f5284"
const userC = "0x6969Da04250d934f62fb6A469A6cFBf0A33F43A3"
const admin = "0xea19f9cf7E6bF1b63B2EDD703F28a3B310153bd3"
const tokABI  = JSON.parse(token2);
const govABI  = JSON.parse(gov);
const governanceToken = new ethers.Contract("0x1cB0AFA8F8ad1d32752097d613be248b97667654", tokABI)
const governor = new ethers.Contract("0x7e310F76ce70f67874eEaB15a6834772bfD06ba0", govABI)

contract("governor", (accounts) => {
it("Proposal - give grant to team", async function () {


// Distribute governance tokens
const votes = ethers.utils.parseUnits("100.0", 18);
await governanceToken.connect(userA).testmint(userA, votes);
await governanceToken.connect(userB).testmint(userB, votes);
await governanceToken.connect(userC).testmint(userC, votes);

// Create new proposal
const grant = ethers.utils.parseUnits("500.0", 18);
const newProposal = {
            grantAmount: grant,
            transferCalldata: governanceToken.interface.encodeFunctionData('mint', [admin, grant]),
            descriptionHash: ethers.utils.id("Proposal #2: Give admin some tokens")
};

const proposeTx = await governor.connect(userA).propose(
            [governanceToken.address],
            [0],
            [newProposal.transferCalldata],
            newProposal.descriptionHash,
);

const tx = await proposeTx.wait();
await network.provider.send('evm_mine'); // wait 1 block before opening voting
const proposalId = tx.events.find((e) => e.event == 'ProposalCreated').args.proposalId;

// Let's vote
await governor.connect(userA).castVote(proposalId, VoteType.For);
await governor.connect(userB).castVote(proposalId, VoteType.For);
await governor.connect(userC).castVote(proposalId, VoteType.Against);
await governor.connect(admin).castVote(proposalId, VoteType.Abstain);

const votes2 = await governor.proposalVotes(proposalId);
assert(votes2.forVotes.eq(2), "Vote count mismatch"); // < FAILS votes is an array and all its members, "forVotes", "againstVotes", etc are all 0

// Exec
await governor.execute(
            [governanceToken.address],
            [0],
            [newProposal.transferCalldata],
            newProposal.descriptionHash,
);
})});
