import React, { useState, useEffect } from "react";
import InteractionModal, { InteractionModalHeader, InteractionModalBody } from ".";
import { InputGroup, Button, FormControl, Row, Col } from "react-bootstrap";
import NumericalInput from "../NumericalInput";
import { PoolTokenType, ApprovalType } from "../../impermax-router/interfaces";
import RiskMetrics from "../RiskMetrics";
import { formatFloat, formatToDecimals } from "../../utils/format";
import InputAmount, { InputAmountMini } from "../InputAmount";
import InteractionButton, { ButtonState } from "../InteractionButton";
import BorrowFee from "./TransactionRecap/BorrowFee";
import { decimalToBalance } from "../../utils/ether-utils";
import useApprove from "../../hooks/useApprove";
import useLeverage from "../../hooks/useLeverage";
import { BigNumber } from "ethers";
import { useSymbol, useDecimals, useDepositedUSD, useDeadline, useMaxLeverage, useCurrentLeverage, useLeverageAmounts, useToBigNumber } from "../../hooks/useData";


export interface LeverageInteractionModalProps {
  show: boolean;
  toggleShow(s: boolean): void;
}

function LeverageInteractionModalContainer({props, children}: {props: LeverageInteractionModalProps, children: any}) {
  return (
    <InteractionModal show={props.show} onHide={() => props.toggleShow(false)}>
      <>
        <InteractionModalHeader value="Leverage" />
        <InteractionModalBody>{children}</InteractionModalBody>
      </>
    </InteractionModal>
  );
}

export default function LeverageInteractionModal({show, toggleShow}: LeverageInteractionModalProps) {
  const [val, setVal] = useState<number>(0);
  const [slippage, setSlippage] = useState<number>(2);

  const changeAmounts = useLeverageAmounts(val, slippage);
  const minLeverage = useCurrentLeverage();
  const maxLeverage = useMaxLeverage();
  const symbolA = useSymbol(PoolTokenType.BorrowableA);
  const symbolB = useSymbol(PoolTokenType.BorrowableB);
  const depositedUSD = useDepositedUSD();
  const deadline = useDeadline();
  
  useEffect(() => {
    setVal(Math.ceil(minLeverage * 1000) / 1000);
  }, [minLeverage]);

  const amountA = useToBigNumber(changeAmounts.bAmountA, PoolTokenType.BorrowableA);
  const amountB = useToBigNumber(changeAmounts.bAmountB, PoolTokenType.BorrowableB);
  const amountAMin = useToBigNumber(changeAmounts.bAmountAMin, PoolTokenType.BorrowableA);
  const amountBMin = useToBigNumber(changeAmounts.bAmountBMin, PoolTokenType.BorrowableB);
  const invalidInput = val < minLeverage || val > maxLeverage;
  const [approvalStateA, onApproveA, permitDataA] = useApprove(ApprovalType.BORROW, amountA, invalidInput, PoolTokenType.BorrowableA, deadline);
  const [approvalStateB, onApproveB, permitDataB] = useApprove(ApprovalType.BORROW, amountB, invalidInput, PoolTokenType.BorrowableB, deadline);
  const [leverageState, onLeverage] = useLeverage(approvalStateA, approvalStateB, invalidInput, amountA, amountB, amountAMin, amountBMin, permitDataA, permitDataB);

  if (depositedUSD < 1) return (
    <LeverageInteractionModalContainer props={{show, toggleShow}}>
      You need to deposit the {symbolA}-{symbolB} LP first in order to leverage it.
    </LeverageInteractionModalContainer>
  );

  return (
    <LeverageInteractionModalContainer props={{show, toggleShow}}>
      <RiskMetrics changeBorrowedA={changeAmounts.bAmountA} changeBorrowedB={changeAmounts.bAmountB} changeCollateral={changeAmounts.cAmount} />
      <InputAmount 
        val={val}
        setVal={setVal}
        suffix={'x'}
        maxTitle={'Max leverage'}
        max={maxLeverage}
        min={minLeverage}
      />
      <div className="transaction-recap">
        <Row>
          <Col xs={6} style={{lineHeight: '30px'}}>Max slippage:</Col>
          <Col xs={6} className="text-right"><InputAmountMini val={slippage} setVal={setSlippage} suffix={'%'} /></Col>
        </Row>
        <Row>
          <Col xs={6}>You will borrow at most:</Col>
          <Col xs={6} className="text-right">{formatFloat(changeAmounts.bAmountA)} {symbolA}</Col>
        </Row>
        <Row>
          <Col xs={6}>You will borrow at most:</Col>
          <Col xs={6} className="text-right">{formatFloat(changeAmounts.bAmountB)} {symbolB}</Col>
        </Row>
        <BorrowFee amount={changeAmounts.bAmountA} symbol={symbolA} />
        <BorrowFee amount={changeAmounts.bAmountB} symbol={symbolB} />
        <Row>
          <Col xs={6}>You will get at least:</Col>
          <Col xs={6} className="text-right">{formatFloat(changeAmounts.cAmountMin)} {symbolA}-{symbolB}</Col>
        </Row>
      </div>
      <Row className="interaction-row">
        <Col xs={6}>
          <InteractionButton name={"Approve " + symbolA} onCall={onApproveA} state={approvalStateA} />
        </Col>
        <Col xs={6}>
          <InteractionButton name={"Approve " + symbolB} onCall={onApproveB} state={approvalStateB} />
        </Col>
      </Row>
      <Row className="interaction-row">
        <Col>
          <InteractionButton name="Leverage"  onCall={onLeverage} state={leverageState} />
        </Col>
      </Row>
    </LeverageInteractionModalContainer>
  );
}