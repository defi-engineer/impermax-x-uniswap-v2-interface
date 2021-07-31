
import { CHAIN_IDS } from 'config/web3/chains';

const RESERVES_DISTRIBUTOR_ADDRESSES: {
  [chainId: number]: string;
} = {
  [CHAIN_IDS.ROPSTEN]: '0xC65D78707b1fbb8F3d65fc4B3E41B29EfCE40bEC',
  [CHAIN_IDS.KOVAN]: '0xC12E00DE204d58eAd5B5cE9054E94aeE7747fB6C',
  [CHAIN_IDS.ETHEREUM_MAIN_NET]: '0xa6f3c27f1b503221f3a3c9d34f587252ecfb3160'
};

export {
  RESERVES_DISTRIBUTOR_ADDRESSES
};