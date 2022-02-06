// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract CDPTrackerLike{
  function setInterest(uint256 StabilityFee) external {}
}

contract CoinLike{
  mapping (address => uint256)                      public balanceOf;
  // Mapping of allowances
  mapping (address => mapping (address => uint256)) public allowance;
  // Mapping of nonces used for permits
  mapping (address => uint256)                      public nonces;
  function addAuthorization(address account) external {}
  function removeAuthorization(address account) external {}
  function transfer(address dst, uint256 amount) external returns (bool) {}
  function transferFrom(address src, address dst, uint256 amount)
        public returns (bool){}
  function mint(address usr, uint256 amount) external {}
  function burn(address usr, uint256 amount) external {}
  function approve(address usr, uint256 amount) external returns (bool) {}
  function push(address usr, uint256 amount) external {}
  function pull(address usr, uint256 amount) external {}
  function move(address src, address dst, uint256 amount) external {}
  function permit(
        address holder,
        address spender,
        uint256 nonce,
        uint256 expiry,
        bool allowed,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external
    {}
}

// Execution Contracts for Actions by EVI DAO - changing interest rate, and spending Treasury Surplus
// Only the EVI Governor Contract will be able to call the isAuthorized functions
// This contract will be authorised on the CDPTracker contract, so that it can modify global stability fee.
contract Executor {
  constructor() public {
    authorizedAccounts[msg.sender] = 1;
}
  event AddAuthorization(address account);
  event RemoveAuthorization(address account);

  mapping (address => uint256) public authorizedAccounts;

   address CDPaddress; //hardcoded value.
   address Coinaddr;
   function setCoin(address STABLE) external isAuthorized {
     Coinaddr = STABLE;
   }
   function setCDP(address CDPaddr) external isAuthorized {
     CDPaddress = CDPaddr;
   }



  function addAuthorization(address account) external isAuthorized {
      authorizedAccounts[account] = 1;
      emit AddAuthorization(account);
  }
  /**
   * @notice Remove auth from an account
   * @param account Account to remove auth from
   */
  function removeAuthorization(address account) external isAuthorized {
      authorizedAccounts[account] = 0;
      emit RemoveAuthorization(account);
  }
  /**
  * @notice Checks whether msg.sender can call an authed function
  **/
  modifier isAuthorized {
      require(authorizedAccounts[msg.sender] == 1, "Coin/account-not-authorized");
      _;
  }

  // Spend money from treasury
  function TransferFunds(address dest, uint256 amount) external isAuthorized payable returns (bool) {
      CoinLike Coin = CoinLike(Coinaddr);
      require(Coin.balanceOf(address(this))>=amount, "Insufficient Treasury Reserves");
      Coin.transfer(dest, amount);
      return true;
  }

// Set new xBTC Interest rate
  function setInterest(uint256 newInterest) external isAuthorized returns (bool){
    CDPTrackerLike CDP = CDPTrackerLike(CDPaddress);
    CDP.setInterest(newInterest);
    return true;
  }

  // Mock Functions below for testing

    string public sharedAnswer;

    event MockFunctionCalled();
    event MockFunctionCalledWithArgs(uint256 a, uint256 b);

    uint256[] private _array;

    function mockFunction() public payable returns (string memory) {
        emit MockFunctionCalled();

        return "0x1234";
    }

    function mockFunctionWithArgs(uint256 a, uint256 b) public payable returns (string memory) {
        emit MockFunctionCalledWithArgs(a, b);

        return "0x1234";
    }


    function mockFunctionNonPayable() public returns (string memory) {
        emit MockFunctionCalled();

        return "0x1234";
    }

    function mockStaticFunction() public pure returns (string memory) {
        return "0x1234";
    }

    function mockFunctionRevertsNoReason() public payable {
        revert();
    }

    function mockFunctionRevertsReason() public payable {
        revert("CallReceiverMock: reverting");
    }

    function mockFunctionThrows() public payable {
        assert(false);
    }

    function mockFunctionOutOfGas() public payable {
        for (uint256 i = 0; ; ++i) {
            _array.push(i);
        }
    }

    function mockFunctionWritesStorage() public returns (string memory) {
        sharedAnswer = "42";
        return "0x1234";
    }
}
