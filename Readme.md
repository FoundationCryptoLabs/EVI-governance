# EVI DAO Governance Contracts

This library is forked from the OpenZeppelin Governor Module: [https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/governance]

Voting power is defined using the GovernorVotes module, which hooks to an ERC20Votes instance to determine the voting power of an account based on the token balance they hold when a proposal becomes active.

Quorum is set to 4% and is set by GovernorVotesQuorumFraction which works together with ERC20Votes to define quorum as a percentage of the total supply at the block a proposal’s voting power is retrieved.

Voters are offered 3 options by GovernorCountingSimple: For, Against, and Abstain, and where only For and Abstain votes are counted towards quorum.
Proposal Threshold is set to 10,000 EVI tokens. Block time has been set to 30s based on RSK averages.


Three contracts handle the governance process:
1. EVIGovernor.sol [RSK Testnet - 0x7E6d5340e848F218F157d6A6bc0B156f55454099]: This snapshots EVI token balances for voting, allows a proposal to be created, and then voted upon after a specified timelock. Based on the Governor template from openzepplin.
2. EVIToken.sol [RSK Testnet -0xD98f6Fb780A60f8993997a1F492A52A09F8b50AC]: This is the contract for the EVI token. Based on the ERC20Votes template from openzepplin, this is used by the Governor contract to determine the voting power of each address for purposes of voting.
3. Executor.sol : This is the contract called by governor whenever a particular proposal is approved - it will have the permissions to modify interest rate in the CDPTracker, or disburse funds from the Treasury, as the case may be.
