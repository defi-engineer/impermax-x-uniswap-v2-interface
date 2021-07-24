
import gql from 'graphql-tag';

import apolloFetcher from './apollo-fetcher';
import { IMX_STAKING_SUBGRAPH_URL } from 'config/web3/subgraph';

interface StakingUserData {
  ximxBalance: string;
  lastExchangeRate: string;
  totalEarned: string;
}

const getStakingUserData = async (chainID: number, account: string): Promise<StakingUserData> => {
  const query = gql`{
    user(id: "${account.toLowerCase()}") {
      ximxBalance
      lastExchangeRate
      totalEarned
    }
  }`;

  const impermaxSubgraphURL = IMX_STAKING_SUBGRAPH_URL[chainID];
  const result = await apolloFetcher(impermaxSubgraphURL, query);

  return result.data.user;
};

export default getStakingUserData;
