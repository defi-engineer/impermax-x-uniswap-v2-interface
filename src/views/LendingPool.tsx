import React from 'react';
import View from '../components/View';
import { useParams } from 'react-router-dom';

import AccountLendingPool from '../components/AccountLendingPool';
import BorrowablesDetails from '../components/BorrowablesDetails';
import { Container } from 'react-bootstrap';
import PairAddressContext from '../contexts/PairAddress';
import { useDoUpdate } from '../hooks/useImpermaxRouter';
import useInterval from 'use-interval';
import LendingPoolPage from '../components/LendingPoolPage';

/**
 * LendingPool page view.
 */
export default function LendingPool() {
  const { uniswapV2PairAddress } = useParams<{ uniswapV2PairAddress: string }>();

  //const doUpdate = useDoUpdate();
  //useInterval(() => doUpdate(), 60000);

  return (<View>
    <Container className="lending-pool">
      <PairAddressContext.Provider value={uniswapV2PairAddress}>
        <LendingPoolPage />
      </PairAddressContext.Provider>
    </Container>
  </View>);
}