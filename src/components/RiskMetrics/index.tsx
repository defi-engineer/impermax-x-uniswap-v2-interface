import React, { useContext, useState, useCallback, useEffect } from "react";
import { LanguageContext } from "../../contexts/Language";
import phrases from './translations';
import { Row, Col } from "react-bootstrap";
import { PoolTokenType } from "../../impermax-router/interfaces";
import usePairAddress from "../../hooks/usePairAddress";
import useImpermaxRouter, { useRouterAccount, useRouterUpdate, useDoUpdate, useRouterCallback } from "../../hooks/useImpermaxRouter";
import { formatUSD, formatFloat, formatLeverage } from "../../utils/format";
import DetailsRow from "../DetailsRow";
import { useCurrentLeverage, useSymbol } from "../../hooks/useData";
import LiquidationPrices from "./LiquidationPrices";
import CurrentPrice from "./CurrentPrice";
import "./index.scss";

interface RiskMetricsProps {
  changeBorrowedA?: number;
  changeBorrowedB?: number;
  changeCollateral?: number;
}

/**
 * Generates lending pool aggregate details.
 */
export default function RiskMetrics({changeBorrowedA, changeBorrowedB, changeCollateral} : RiskMetricsProps) {
  const languages = useContext(LanguageContext);
  const language = languages.state.selected;
  const t = (s: string) => (phrases[s][language]);

  const changes = changeBorrowedA || changeBorrowedB || changeCollateral ? {
    changeBorrowedA: changeBorrowedA ? changeBorrowedA : 0, 
    changeBorrowedB: changeBorrowedB ? changeBorrowedB : 0, 
    changeCollateral: changeCollateral ? changeCollateral : 0,
  } : null;

  const currentLeverage = useCurrentLeverage();
  const newLeverage = useCurrentLeverage(changes);

  return (<div>
    { changes ? (
      <DetailsRow name={t("New Leverage")}>
        {formatLeverage(currentLeverage)}
        <i className="change-arrow" />
        {formatLeverage(newLeverage)}
      </DetailsRow>
    ) : (
      <DetailsRow name={t("Current Leverage")}>
        {formatLeverage(currentLeverage)}
      </DetailsRow>
    ) }
    { changes ? (
      <DetailsRow name={t("New Liquidation Prices")}>
        <LiquidationPrices /> 
        <i className="change-arrow" /> 
        <LiquidationPrices changes={changes} />
      </DetailsRow>
    ) : (
      <DetailsRow name={t("Liquidation Prices")}>
        <LiquidationPrices /> 
      </DetailsRow>
    ) }
    <CurrentPrice />
  </div>);
}