import React, { useContext, useState, useCallback, useEffect } from "react";
import { LanguageContext } from "../../contexts/Language";
import phrases from './translations';
import { Row, Col } from "react-bootstrap";
import { AccountData } from "../../impermax-router/interfaces";
import usePairAddress from "../../hooks/usePairAddress";
import { useRouterCallback, useTogglePriceInverted, usePriceInverted } from "../../hooks/useImpermaxRouter";
import { formatUSD, formatFloat, formatLeverage } from "../../utils/format";
import LiquidationPrices from "../LiquidationPrices";
import DetailsRow from "../DetailsRow";
import CurrentPrice from "../CurrentPrice";


/**
 * Generates lending pool aggregate details.
 */
export default function AccountLendingPoolDetails() {
  const languages = useContext(LanguageContext);
  const language = languages.state.selected;
  const t = (s: string) => (phrases[s][language]);

  const uniswapV2PairAddress = usePairAddress();
  const [accountData, setAccountData] = useState<AccountData>();
  const [symbols, setSymbols] = useState<string>();
  const priceInverted = usePriceInverted();
  const togglePriceInverted = useTogglePriceInverted();
  useRouterCallback((router) => {
    if (!router.account) return setAccountData(null);
    router.getAccountData(uniswapV2PairAddress).then((data) => {
      setAccountData(data);
      if (!priceInverted) setSymbols(data.symbolA + '/' + data.symbolB);
      else setSymbols(data.symbolB + '/' + data.symbolA);
    });
  });

  if (!accountData) return (<div>
    Loading
  </div>);

  return (<>
    <Row className="account-lending-pool-details">
      <Col sm={12} md={6}>
        <DetailsRow name={t("Account Equity")} value={formatUSD(accountData.equityUSD)} />
        <DetailsRow name={t("Total Balance")} value={formatUSD(accountData.balanceUSD)} />
        <DetailsRow name={t("Total Debt")} value={formatUSD(accountData.debtUSD)} />
      </Col>
      <Col sm={12} md={6}>
        <DetailsRow name={t("Current Leverage")} value={formatLeverage(accountData.riskMetrics.leverage)} />
        <DetailsRow name={t("Liquidation Prices")}>
          <LiquidationPrices riskMetrics={accountData.riskMetrics} />
        </DetailsRow>
        <CurrentPrice riskMetrics={accountData.riskMetrics} symbolA={accountData.symbolA} symbolB={accountData.symbolB} />
      </Col>
    </Row>
  </>);
}