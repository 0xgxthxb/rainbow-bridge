require('@nomiclabs/hardhat-ethers');
require('solidity-coverage');

require('dotenv').config();

const ETH_PRIVATE_KEY = process.env.ETH_PRIVATE_KEY || '11'.repeat(32);
const INFURA_API_KEY = process.env.INFURA_API_KEY || '';

task('upgrade-provers-bridge-address-to', 'Upgrades the provided prover to use the bridge at the provided address')
    .addParam('prover', 'Prover address')
    .addParam('newBridge', 'The address of the new bridge')
    .addParam('ledgerKeyPath', 'The ledger key path to sign transactions', undefined, undefined, true)
    .setAction(async (taskArgs, hre) => {
        const { upgradeProversBridgeAddressTo } = require('./utils/upgrade_bridge_address.js');
        await upgradeProversBridgeAddressTo(hre.ethers.provider, taskArgs.prover, taskArgs.newBridge, taskArgs.ledgerKeyPath);
    });

task('get-provers-bridge-address', 'Returns the current bridge address used in the prover at the provided address')
    .addParam('prover', 'Prover address')
    .setAction(async taskArgs => {
        const { getProversBridgeAddress } = require('./utils/upgrade_bridge_address.js');
        const bridgeAddress = await getProversBridgeAddress(taskArgs.prover);
        console.log(`Prover address: ${taskArgs.prover}`);
        console.log(`Current bridge address: ${bridgeAddress}`);
    });

task('upgrade-near-on-eth-client-admin-to', 'Upgrades the admin address on NearOnEthClient to the provided address')
    .addParam('nearOnEthClientAddress', 'NearOnEthClient address')
    .addParam('newAdmin', 'The address of the new admin of NearOnEthClient')
    .addParam('ledgerKeyPath', 'The ledger key path to sign transactions', undefined, undefined, true)
    .setAction(async (taskArgs, hre) => {
        const { upgradeNearOnEthClientAdminTo } = require('./utils/upgrade_near_on_eth_client_admin.js');
        await upgradeNearOnEthClientAdminTo(hre.ethers.provider, taskArgs.nearOnEthClientAddress, taskArgs.newAdmin, taskArgs.ledgerKeyPath);
    });

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    solidity: {
        version: '0.8.3',
        settings: {
            optimizer: {
                enabled: true,
                runs: 1000
            }
        }
    },
    networks: {
        ropsten: {
            url: `https://ropsten.infura.io/v3/${INFURA_API_KEY}`,
            accounts: [`0x${ETH_PRIVATE_KEY}`],
            gasPrice: 50000000000,
            gasMultiplier: 2,
        },
        mainnet: {
            url: `https://mainnet.infura.io/v3/${INFURA_API_KEY}`,
            accounts: [`0x${ETH_PRIVATE_KEY}`],
        },
        goerli: {
            url: `https://goerli.infura.io/v3/${INFURA_API_KEY}`,
            accounts: [`0x${ETH_PRIVATE_KEY}`],
            gasPrice: 50000000000,
            gasMultiplier: 2,
        },
    }
};
