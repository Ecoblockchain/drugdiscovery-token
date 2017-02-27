
//TODO : CONVERT FUNCTIOS.



// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import token_artifacts from '../../build/contracts/SimpleToken.json'



const request = require('request-promise') ;

// MetaCoin is our usable abstraction, which we'll use through the code below.
var Token = contract(token_artifacts);

//require syntax.
// Require our contract artifacts and turn them into usable abstractions.
//var json = require("./build/contracts/SimpleToken.json");

// Turn our contract into an abstraction
//var contract = require("truffle-contract");
//var SimpleToken = contract(json);

// Step 3: Provision the contract with a web3 provider
//SimpleToken.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));

/**
// Step 4: Use the contract!
SimpleToken.deployed().then(function(deployed) {
  return deployed.someFunction();
});
**/




// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;
var event


var balance;
// var tokend;
 var MyTokenInstance;

 var senderWei;
 var recipientWei;

 var deci;

 var am_root;
 var mroot;




window.App = {
  start: function() {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    Token.setProvider(web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];

        $("#transfer_to").val(accounts[1]);
        console.log("accounts1");
        console.log(accounts[1]);



  //    self.refreshBalance();



    });




      //Set deci
  //    deci=18;

      //Set rules of transform numbers
  //    DeciPow(deci);

          //Check Values
        //  checkValues();

          //Check Total Supply
        //  totalSup();

         //refresh Balance
        //  refreshBalance();

//        There must be a functions that will be work onload
          self.refreshAddress();
  },

  setStatus: function(message) {
    var status = document.getElementById("status");
    status.innerHTML = message;
  },

  setStatusPos: function (pos, msg){
  $(pos).html(msg);

  },

refreshAddress: function () {
  var self=this;
  var instance;
  var tok;
  Token.deployed().then(function(instance) {
    tok=instance;
    $("#tokdAddress").html(tok.address);
    console.log(tok.address);
    self.ShowSupply();
    self.hubBalance();
  });
},

  ShowSupply: function () {
    var self = this;
    var pos="#totalSup";
    var instance;
    var msg;
    var tok;
    Token.deployed().then(function(instance){
      tok=instance;
      msg="Wait..";
      self.setStatusPos(pos,msg);
       return tok.totalSupply.call()
        }).then(function (ts) {
    //     $("#totalSup").html(ts)
          console.log("ts:");
          console.log(ts);
        // Should I use msg=ts.valueOf(); ?
          msg=ts.valueOf();
          msg=web3.fromWei(msg);
          self.setStatusPos(pos,msg);
    });
  },


hubBalance: function () {
  var self=this;
  var pos="#balance";
  var instance;
  var msg;
  var tok;
  Token.deployed().then(function(instance){
    tok=instance;
    msg="Wait..";
    self.setStatusPos(pos,msg);
     return tok.balanceOf(account)
   }).then(function (tx) {
  //     $("#totalSup").html(ts)
        console.log("tx:");
        console.log(tx);
      // Should I use msg=ts.valueOf(); ?
        msg=tx.valueOf();
        msg=web3.fromWei(msg);
        self.setStatusPos(pos,msg);
  });

},

sendToken: function () {
  var self=this;
  var pos="#transfer_result";
  var instance;
  var msg;
  var tok;
  var val = $("#transfer_am").val();
  var to = $("#transfer_to").val();

  val=web3.toWei(val);
//  to=web3.toWei(val);


  Token.deployed().then(function(instance){
    tok=instance;
    msg="Wait..";
    /**
    console.log("instance:");
    console.log(instance);
    console.log("to:");
    console.log(to);
    console.log("val");
    console.log(val);
    console.log("account:");
    console.log(account);
    **/
     return tok.transfer(to, val, {from: account})
   }).then(function (tx) {
        console.log("tx:");
        console.log(tx);
        msg="Transaction complete";
        self.setStatusPos(pos,msg);
        self.refreshAddress();
  }).catch(function(e) {
      console.log(e);

     msg="Ошибка при отправке, смотри консоль";
     setStatusPos(pos,msg);
    });
},

getAll: function () {

  var self=this;
  var pos="#AllResult";
  var instance;
  var msg;
  var tok;


  const options = {
    method: 'GET',
    uri: 'https://boinc.drugdiscoveryathome.com/credits.php?appid=7&key=jjkcsd780987dschuds87'
  };

  request(options)
    .then(function (response) {
      // Request was successful, use the response object at will
      console.log(response);
    })
    .catch(function (err) {
      // Something bad happened, handle the error
      console.log(err);
    })


/**
  var xmlhttp = getXmlHttp()
  xmlhttp.open('GET', 'https://boinc.drugdiscoveryathome.com/credits.php?appid=7&key=jjkcsd780987dschuds87', true);
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4) {
       if(xmlhttp.status == 200) {
        // alert(xmlhttp.responseText);
        console.log(xmlhttp.responseText);
           }
    }
  };
  xmlhttp.send(null);
**/


/**
  $.post(
    "https://boinc.drugdiscoveryathome.com/credits.php?appid=7&key=jjkcsd780987dschuds87",
    parser
  );
  function parser(data) {
    console.log(data);
  };
**/

}









// End of window.App
};

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  App.start();
});

// old dummy:


/**

window.onload = function() {





    //Get address
      var token = MyAdvancedToken.at(MyAdvancedToken.deployed_address);


    //Set adress of deployed contract
    $("#tokdAddress").html(MyAdvancedToken.deployed_address);
    //Creating instance
     myTokenInstance=token;

console.log(myTokenInstance);


//Set deci
deci=18;

//Set rules of transform numbers
DeciPow(deci);

    //Check Values
  //  checkValues();

    //Check Total Supply
    totalSup();

   //refresh Balance
    refreshBalance();




//deci = myTokenInstance.decimals.call();
//deci=myTokenInstance.getDecimals.call();
//console.log('decimals:');
//console.log(deci);

   });
//




    //Warmig up UI
    $("#transfer").click(function() {
    		var val = $("#transfer_am").val();
        val=transformIn(val);
    //    console.log("transfer_val:");
    //    console.log(val);
    		var to = $("#transfer_to").val();
    		sendCoin(to, val);
    	});

//




//  var tokenDecl=
// function(token) {
//    console.log(token);
//      myTokenInstance = token;
  //    checkValues();
//  };
//  myTokenInstance = tokenDecl(token);
//  console.log(myTokenInstance);
//  tokenDecl(token);

  };

function setStatus(message) {
//  var status = document.getElementById("status");
//  status.innerHTML = message;
  $("#status").html(message);
};

function setStatusPos(pos, msg){
$(pos).html(msg);

};

function checkValues() {
  myTokenInstance.owner.call().then(

    function(organizer) {
      $("input#tokdOrganizer").val(organizer);
      return myTokenInstance.getBalance.call(account, {from: account});
  //    return myTokenInstance.numRegistrants.call();
  })
     .then(
       function(bal) {
         var be=bal.valueOf();
         $("#balance").html(be);
         return myTokenInstance.owner.call();

       });
}

function refreshBalance(){

 myTokenInstance.getBalance.call(account, {from: account}).then(function(value) {
   // be = balance_element
var be=value.valueOf();
//console.log("be:");
//console.log(be);
var be_val;
be_val=transformOut(be);
//console.log("be_val");
//.log(be_val);

// senderWei=web3.toWei(be);
//console.log('balance:');
//console.log(be);
$("#balance").html(be_val);
//console.log(value);
//console.log(be);
}).catch(function(e){
console.log(e);
setStatus("Error getting balance; see log.");

});
}

function difBalance(nacc, numa){
  myTokenInstance.getBalance.call(nacc, {from: account}).then(function(value) {
    // be = balance_element
 var be=value.valueOf();


 $(numa).html(be);
 //console.log(value);
 //console.log(be);
 }).catch(function(e){
 console.log(e);
 setStatus("Error getting balance; see log.");

 });
}



function totalSup(){
var msg="Инициализация";
var pos="#totalSup";
setStatusPos(msg, pos);
return myTokenInstance.totalSupply.call().then(
function (sup){
  val=sup.valueOf();
  msg=transformOut(val);
//msg=sup;
//console.log(sup);
//console.log(msg);
setStatusPos(pos, msg);

});

}

//Power to Decimals!
function DeciPow(deci) {
   mroot=Math.pow(10,deci);
   return mroot;

}



// to Wei
function transformIn(val) {
val=val*mroot;
//console.log("In:");
//console.log(val);
return val;


}

//from Wei
function transformOut(val) {

  // var am_prime=val;
   val=val/mroot;
//console.log("Out:");
//.log(val);
   return val;


}


 function sendCoin(to, val) {
//  var meta = MetaCoin.deployed();


//console.log(to);
//console.log(val);

var msg;
var pos = "#transfer_result";
var msg_transfer;
setStatus("Initiating transaction... (please wait)");
// msg_transfer="Инициализация (пожалуйста,подождите)";
// $("#transfer_result").html(msg_transfer);
msg="Инициализация (пожалуйста,подождите)";
setStatusPos(pos,msg);
// getBalSenderWei();
//getBalRecipientWei(to);
myTokenInstance.transfer(to, val, { from: account}).then(
  function (){
   setStatus("Transaction complete!");

  // msg_transfer="Транзакция выполнена";
  // $("#transfer_result").html(msg_transfer);
  msg="Транзакция выполнена";
  setStatusPos(pos,msg);
   refreshBalance();
 }).catch(function(e) {
     console.log(e);
     setStatus("Error sending coin; see log.");
    // msg_transfer="Ошибка при отправке, смотри консоль";
    // $("#transfer_result").html(msg_transfer);
    msg="Ошибка при отправке, смотри консоль";
    setStatusPos(pos,msg);
   });
  }

**/
