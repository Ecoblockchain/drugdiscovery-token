contract('Reward', function(accounts) {
  it("Initial reward settings should match", function(done) {
    var reward = Reward.at(Reward.deployed_address);
    // same as previous example up to here
    Reward.new({ from: accounts[0] }).then(
      function(reward) {
        reward.numRegistrants.call().then( function(num) {
          assert.equal(num, 0, "Registrants should be zero!");
          return reward.organizer.call();
        }).then( function(organizer) {
          assert.equal(organizer, accounts[0], "Owner doesn't match!");
          done(); // to stop these tests earlier, move this up
        }).catch(done);
    }).catch(done);
  });
  it ("Should lt you deposit funds to a contract", function(done){
     var reward = Reward.at(Reward.deployed_address);
     Reward.new({ from: accounts[0] }).then(
      function(reward) {
    var RewardFund = web3.toWei(.05, 'ether');
    var initialBalance = web3.eth.getBalance(reward.address).toNumber();
    reward.DepositFund({ from: accounts[2], value: RewardFund })
      .then(
        function() {
         var newBalance = web3.eth.getBalance(reward.address).toNumber();
         var difference = newBalance - initialBalance;
         assert.equal(difference, RewardFund, "Difference should be what was sent");
         done();
        }).catch(done);
      }).catch(done);
  });
  it("Should let you got a Member", function(done){
  var reward = Reward.at(Reward.deployed_address);
  Reward.new({from: accounts[0] }).then(
   function (reward) {
   var rewardAmount = web3.toWei(.05, 'ether');
    reward.gotMember(accounts[1], rewardAmount, {from: accounts[0]}).then (function(){
  //  reward.gotMember(accounts[1], rewardAmount).then (function(){
    return reward.MemberGot.call(accounts[1]);
  }).then (function(amount){
     assert.equal(amount.toNumber(),rewardAmount, "Member is not listed!");
     done();
    }).catch(done);
   }).catch(done);
  });
  it("Should let you reward Member", function(done) {
  var reward = Reward.at(Reward.deployed_address);
  Reward.new({ from: accounts[0] }).then(
  function(reward) {
    
    var RewardFund = web3.toWei(.05, 'ether');
    var rewardAmount = web3.toWei(.05, 'ether');
    var initialBalance = web3.eth.getBalance(reward.address).toNumber();

    reward.gotMember(accounts[1], rewardAmount, {from: accounts[0]}).then (function(){
    return reward.MemberGot.call(accounts[1]);
  }).then (function(amount){
     assert.equal(amount.toNumber(),rewardAmount, "Member is not listed!");
 }).then( function() {
    
   
   return reward.DepositFund({ from: accounts[2], value: RewardFund })
     }).then(
        function() {
         var newBalance = web3.eth.getBalance(reward.address).toNumber();
        var difference = newBalance - initialBalance;
         assert.equal(difference, RewardFund, "Difference should be what was sent(1)");
   }).then (function (){
    
    return reward.rewardMember( accounts[1], rewardAmount, { from: accounts[0]});
    }).then(function() {
   // var newBalance = web3.eth.getBalance(reward.address).toNumber();
    //     var difference = newBalance - initialBalance;
      //   assert.equal(difference, rewardAmount, "Difference should be what was sent(2)");
  //}).then( function() {
       var postRefundBalance = web3.eth.getBalance(reward.address).toNumber();
       assert.equal(postRefundBalance, initialBalance, "Balance should be initial balance");
    done();
   }).catch(done);
  }).catch(done);
 });
});

