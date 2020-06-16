// generate from remix.eth.org
import web3 from './web3';
const address = "0xc44BC6bB5a8f870784bEc0E75f4d92508A1D6D7F"; //address of deployed smart contract!
const abi = [
    {
        "anonymous": false,
        "inputs": [],
        "name": "NewPost",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "getCounter",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_index",
                "type": "uint256"
            }
        ],
        "name": "getHash",
        "outputs": [
            {
                "internalType": "string",
                "name": "contracttitle",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "contracttext",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "signimg",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_contracttitle",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_contracttext",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_signimg",
                "type": "string"
            }
        ],
        "name": "sendHash",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]
export default new web3.eth.Contract(abi, address);