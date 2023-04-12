const { ethers } = require('hardhat')
const fs = require('fs')

async function main() {
  const contract_name = 'Genesis'
  const taxFee = 0
  const Contract = await ethers.getContractFactory(contract_name)
  const contract = await Contract.deploy(taxFee)


// Changes to be made in performPayout regarding tax.
// Add the feature of multiple photos.
// Add the transparency of paying directly to the needy.
// AN APPROVAL METHOD.

  await contract.deployed()

  const address = JSON.stringify({ address: contract.address }, null, 4)
  fs.writeFile('./src/abis/contractAddress.json', address, 'utf8', (err) => {
    if (err) {
      console.error(err)
      return
    }
    console.log('Deployed contract address', contract.address)
  })
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})