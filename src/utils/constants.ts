import { Networks } from './connections';

export type NetworkIndex = {
  [key in Networks]: any
};

export type Address = string;

export type DistributorDetails = {
  claimableAddress: Address,
  name: string,
}

export const IMPERMAX_SUBGRAPH_URL: NetworkIndex = {
  [Networks.Ropsten]: 'https://api.thegraph.com/subgraphs/name/impermax-finance/impermax-x-uniswap-v2-ropsten',
  [Networks.Mainnet]: 'https://api.thegraph.com/subgraphs/name/impermax-finance/impermax-x-uniswap-v2',
};

export const NETWORK_URL: NetworkIndex = {
  [Networks.Ropsten]: 'wss://ropsten.infura.io/ws/v3/2644163ee7bc4f2eb8dae1f58642d158',
  [Networks.Mainnet]: 'wss://mainnet.infura.io/ws/v3/2644163ee7bc4f2eb8dae1f58642d158',
};

export const ROUTER: NetworkIndex = {
  [Networks.Ropsten]: '0xbFf4acF789297A8507Eb7493AE18EB2C3A3A9632',
  [Networks.Mainnet]: '0x5e169082fff23cee6766062b96051a78c543127d',
};

export const FACTORY: NetworkIndex = {
  [Networks.Ropsten]: '0x3fdB4b27e1b4be9b27514C643a8Baef95Cf9b549',
  [Networks.Mainnet]: '0x8C3736e2FE63cc2cD89Ee228D9dBcAb6CE5B767B',
};

export const UNISWAP_V2_FACTORY: NetworkIndex = {
  [Networks.Ropsten]: '0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f',
  [Networks.Mainnet]: '0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f',
};

export const SIMPLE_UNISWAP_ORACLE: NetworkIndex = {
  [Networks.Ropsten]: '0xc53bb18028feA1B413057e2b2474F9838c465Fc3',
  [Networks.Mainnet]: '0x5671B249391cA5E6a8FE28CEb1e85Dc41c12Ba7D',
};

export const IMX: NetworkIndex = {
  [Networks.Ropsten]: '0xa813AFf9082fd8856Ba6F087982881A4C55Ef451',
  [Networks.Mainnet]: '',
};
export const IMX_PAIR: NetworkIndex = {
  [Networks.Ropsten]: '0x0Efc0766F46E1AD825CE18F54F0793dd6814a947',
  [Networks.Mainnet]: '',
};

export const WETH: NetworkIndex = {
  [Networks.Ropsten]: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
  [Networks.Mainnet]: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
};

export const CLAIM_AGGREGATOR: NetworkIndex = {
  [Networks.Ropsten]: '0x8DFF9cEA94a03Ad4b84b7CA3aEECEF295b05Eeb5',
  [Networks.Mainnet]: '',
};

export const MERKLE_DISTRIBUTOR: NetworkIndex = {
  [Networks.Ropsten]: '0x1F0DFee1f932fDA1e95aa82f588F2828c3F192bd',
  [Networks.Mainnet]: '',
};

export const AIRDROP_URL: NetworkIndex = {
  [Networks.Ropsten]: 'https://shiny-union-6fc6.impermax.workers.dev',
  [Networks.Mainnet]: '',
};

export const DISTRIBUTORS: NetworkIndex = {
  [Networks.Ropsten]: [
    { claimableAddress: "0x59db24c7FD730D7e5a7425cAa2Ad6961c77919A0", name: "Private Sale" },
  ],
  [Networks.Mainnet]: '',
};

/*export const ROPSTEN_ETH_IMX: Address = '0x0Efc0766F46E1AD825CE18F54F0793dd6814a947';
export const ROPSTEN_ETH_DAI: Address = '0x1c5DEe94a34D795f9EEeF830B68B80e44868d316';
export const ROPSTEN_ETH_UNI: Address = '0x4E99615101cCBB83A462dC4DE2bc1362EF1365e5';
export const ROPSTEN_ETH_USDC: Address = '0x681A4164703351d6AceBA9D7038b573b444d3353';

export const MAINNET_ETH_WBTC: Address = '0xBb2b8038a1640196FbE3e38816F3e67Cba72D940';
export const MAINNET_ETH_USDC: Address = '0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc';
export const MAINNET_USDT_USDC: Address = '0x3041CbD36888bECc7bbCBc0045E3B1f144466f5f';
export const MAINNET_DUCK_ETH: Address = '0xc5Ed7350E0FB3f780c756bA7d5d8539dc242a414';

export const LISTED_PAIRS: NetworkIndex = {
  [Networks.Ropsten]: [
    ROPSTEN_ETH_IMX,
    ROPSTEN_ETH_DAI,
    ROPSTEN_ETH_UNI,
    //ROPSTEN_ETH_USDC,
  ],
  [Networks.Mainnet]: [
    MAINNET_ETH_WBTC,
    MAINNET_ETH_USDC,
    MAINNET_USDT_USDC,
    MAINNET_DUCK_ETH,
  ]
};*/