const rlp = require("rlp");
const keccak = require("keccak");

var nonce = 0x00; //The nonce must be a hex literal!
var sender = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"; //Requires a hex string as input!

var input_arr = [sender, nonce];
var rlp_encoded = rlp.encode(input_arr);

var contract_address_long = keccak("keccak256")
  .update(rlp_encoded)
  .digest("hex");

var contract_address = contract_address_long.substring(24); //Trim the first 24 characters.
console.log("contract_address: " + contract_address);