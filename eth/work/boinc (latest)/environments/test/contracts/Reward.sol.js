// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":false,"inputs":[{"name":"memberad","type":"address"},{"name":"amount","type":"uint256"}],"name":"gotMember","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"MemberGot","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"organizer","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"}],"name":"rewardMember","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"destroy","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"DepositFund","outputs":[{"name":"success","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"quota","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"numRegistrants","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"OrgDeposit","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"inputs":[],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_from","type":"address"},{"indexed":false,"name":"_amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_to","type":"address"},{"indexed":false,"name":"_amount","type":"uint256"}],"name":"Refund","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_to","type":"address"},{"indexed":false,"name":"_amount","type":"uint256"}],"name":"WasSent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_to","type":"address"},{"indexed":false,"name":"_amount","type":"uint256"}],"name":"MemberDepo","type":"event"}],
    binary: "606060405260008054600160a060020a031916331781556003556102a9806100276000396000f3606060405236156100775760e060020a60003504631f4690d6811461007957806326358418146100e657806361203265146100fe578063746d961e1461011057806383197ef0146101f5578063ab225edc1461021f578063cebe09c914610273578063ec3a6f731461027c578063f0dc2dd914610285575b005b610077600435602435600160a060020a0382166000818152600160208181526040808420869055600290915291829020849055600380549091019055606091825260808390527f918cdff2159e453789d3f554c700c81ab1b7557711d801553b066d7b0576f00891a15050565b61029d60043560016020526000908152604090205481565b61029d600054600160a060020a031681565b610077600435602435600160a060020a0382166000908152600160205260408120548214156101f0575030600160a060020a038116318290106101f057600160a060020a038316600083606082818181858883f193505050505060006001600050600085600160a060020a03168152602001908152602001600020600050819055506003600081815054809291906001900391905055507fc1169ab1d4852c18133393229b971cada51425b2cc17849add3b05a4f67ff89783836040518083600160a060020a031681526020018281526020019250505060405180910390a15b505050565b610077600054600160a060020a03908116339190911614156102a757600054600160a060020a0316ff5b33600160a060020a03166000818152600260205260408082203490819055606093845260805261029d927fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c9190a150600190565b61029d60045481565b61029d60035481565b61029d60043560026020526000908152604090205481565b6060908152602090f35b56",
    unlinked_binary: "606060405260008054600160a060020a031916331781556003556102a9806100276000396000f3606060405236156100775760e060020a60003504631f4690d6811461007957806326358418146100e657806361203265146100fe578063746d961e1461011057806383197ef0146101f5578063ab225edc1461021f578063cebe09c914610273578063ec3a6f731461027c578063f0dc2dd914610285575b005b610077600435602435600160a060020a0382166000818152600160208181526040808420869055600290915291829020849055600380549091019055606091825260808390527f918cdff2159e453789d3f554c700c81ab1b7557711d801553b066d7b0576f00891a15050565b61029d60043560016020526000908152604090205481565b61029d600054600160a060020a031681565b610077600435602435600160a060020a0382166000908152600160205260408120548214156101f0575030600160a060020a038116318290106101f057600160a060020a038316600083606082818181858883f193505050505060006001600050600085600160a060020a03168152602001908152602001600020600050819055506003600081815054809291906001900391905055507fc1169ab1d4852c18133393229b971cada51425b2cc17849add3b05a4f67ff89783836040518083600160a060020a031681526020018281526020019250505060405180910390a15b505050565b610077600054600160a060020a03908116339190911614156102a757600054600160a060020a0316ff5b33600160a060020a03166000818152600260205260408082203490819055606093845260805261029d927fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c9190a150600190565b61029d60045481565b61029d60035481565b61029d60043560026020526000908152604090205481565b6060908152602090f35b56",
    address: "0x5437876329bb34a812f6a2601b3912ee373ff3c8",
    generated_with: "2.0.9",
    contract_name: "Reward"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("Reward error: Please call load() first before creating new instance of this contract.");
    }

    Contract.Pudding.apply(this, arguments);
  };

  Contract.load = function(Pudding) {
    Contract.Pudding = Pudding;

    Pudding.whisk(contract_data, Contract);

    // Return itself for backwards compatibility.
    return Contract;
  }

  Contract.new = function() {
    if (Contract.Pudding == null) {
      throw new Error("Reward error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("Reward error: Please call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("Reward error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.Reward = Contract;
  }

})();
