// TODO: <
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// TODO: >

import React, {
  createContext,
  useEffect,
  useState
} from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import ImpermaxRouter from 'impermax-router';
import {
  useRouterAddress,
  useWETH,
  useFactoryAddress,
  useSimpleUniswapOracleAddress,
  useAirdropUrl,
  useIMX,
  useMerkleDistributorAddress,
  useClaimAggregatorAddress,
  useUniswapV2FactoryAddress
} from 'hooks/useNetwork';
import useSubgraph from 'hooks/useSubgraph';

export interface ImpermaxRouterContextI {
  impermaxRouter?: ImpermaxRouter;
  routerAccount?: string;
  routerUpdate?: number;
  // eslint-disable-next-line @typescript-eslint/ban-types
  doUpdate?: Function;
  priceInverted?: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  togglePriceInverted?: Function;
}

export const ImpermaxRouterContext = createContext<ImpermaxRouterContextI>({});

export const ImpermaxRouterProvider: React.FC = ({ children }) => {
  const {
    account,
    chainId,
    library
  } = useWeb3React<Web3Provider>();
  const subgraph = useSubgraph();
  const routerAddress = useRouterAddress();
  const factoryAddress = useFactoryAddress();
  const uniswapV2FactoryAddress = useUniswapV2FactoryAddress();
  const simpleUniswapOracleAddress = useSimpleUniswapOracleAddress();
  const merkleDistributorAddress = useMerkleDistributorAddress();
  const claimAggregatorAddress = useClaimAggregatorAddress();
  const WETH = useWETH();
  const IMX = useIMX();
  const airdropUrl = useAirdropUrl();
  const [impermaxRouter, setImpermaxRouter] = useState<ImpermaxRouter>();
  const [routerAccount, setRouterAccount] = useState<string>();
  const [routerUpdate, setRouterUpdate] = useState<number>(0);
  const [priceInverted, setPriceInverted] = useState<boolean>(false);
  // ray test touch <
  const doUpdate = () => {
    if (!impermaxRouter) return;
    impermaxRouter.cleanCache();
    impermaxRouter.subgraph.cleanCache();
    setRouterUpdate(routerUpdate + 1);
  };
  // ray test touch >
  const togglePriceInverted = () => {
    if (!impermaxRouter) return;
    impermaxRouter.setPriceInverted(!priceInverted);
    setPriceInverted(!priceInverted);
  };

  useEffect(() => {
    // TODO: double-check
    if (!IMX) return;
    if (!WETH) return;
    if (!airdropUrl) return;
    if (!chainId) return;
    if (!claimAggregatorAddress) return;
    if (!factoryAddress) return;
    if (!merkleDistributorAddress) return;
    // if (!impermaxRouter) return;
    // if (!priceInverted) return;
    if (!routerAddress) return;
    if (!simpleUniswapOracleAddress) return;
    if (!subgraph) return;
    if (!uniswapV2FactoryAddress) return;
    if (!library) return;

    if (!impermaxRouter) {
      const impermaxRouter = new ImpermaxRouter({
        subgraph,
        library,
        web3,
        chainId,
        routerAddress,
        factoryAddress,
        uniswapV2FactoryAddress,
        simpleUniswapOracleAddress,
        merkleDistributorAddress,
        claimAggregatorAddress,
        WETH,
        IMX,
        airdropUrl,
        priceInverted
      });
      if (account) {
        impermaxRouter.unlockWallet(library, account);
        setRouterAccount(account);
      }
      setImpermaxRouter(impermaxRouter);
    } else if (account) {
      impermaxRouter.unlockWallet(library, account);
      setRouterAccount(account);
    }
  }, [
    account,
    // TODO: double-check
    IMX,
    WETH,
    airdropUrl,
    chainId,
    claimAggregatorAddress,
    factoryAddress,
    impermaxRouter,
    merkleDistributorAddress,
    priceInverted,
    routerAddress,
    simpleUniswapOracleAddress,
    subgraph,
    uniswapV2FactoryAddress,
    library
  ]);

  return (
    <ImpermaxRouterContext.Provider
      value={{
        impermaxRouter,
        routerAccount,
        routerUpdate,
        doUpdate,
        priceInverted,
        togglePriceInverted
      }}>
      {children}
    </ImpermaxRouterContext.Provider>
  );
};
