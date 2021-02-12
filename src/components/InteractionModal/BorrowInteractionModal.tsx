import React, { useCallback, useState } from "react";
import InteractionModal, { InteractionModalHeader, InteractionModalBody } from ".";
import { InputGroup, Button, FormControl, Row, Col } from "react-bootstrap";
import NumericalInput from "../NumericalInput";
import { PoolTokenType, ApprovalType } from "../../impermax-router/interfaces";
import usePoolToken from "../../hooks/usePoolToken";
import InputAmount from "../InputAmount";
import InteractionButton, { ButtonState } from "../InteractionButton";
import BorrowAPY from "./TransactionRecap/BorrowAPY";
import BorrowFee from "./TransactionRecap/BorrowFee";
import { decimalToBalance } from "../../utils/ether-utils";
import useApprove from "../../hooks/useApprove";
import useBorrow from "../../hooks/useBorrow";
import { useSymbol, useDecimals, useMaxBorrowable, useToBigNumber } from "../../hooks/useData";
import RiskMetrics from "../RiskMetrics";

/**
 * Props for the deposit interaction modal.
 * @property show Shows or hides the modal.
 * @property toggleShow A function to update the show variable to show or hide the Modal.
 */
export interface BorrowInteractionModalProps {
  show: boolean;
  toggleShow(s: boolean): void;
}

/**
 * Styled component for the norrow modal.
 * @param param0 any Props for component
 * @see BorrowInteractionModalProps
 */
export default function BorrowInteractionModal({show, toggleShow}: BorrowInteractionModalProps) {
  const poolTokenType = usePoolToken();
  const [val, setVal] = useState<number>(0);

  const symbol = useSymbol();
  const maxBorrowable = useMaxBorrowable();

  const amount = useToBigNumber(val);
  const [approvalState, onApprove, permitData] = useApprove(ApprovalType.BORROW, amount);
  const [borrowState, borrow] = useBorrow(approvalState, amount, permitData);
  const onBorrow = async () => {
    await borrow();
    setVal(0);
  }

  return (
    <InteractionModal show={show} onHide={() => toggleShow(false)}>
      <>
        <InteractionModalHeader value="Borrow" />
        <InteractionModalBody>
          <RiskMetrics
            changeBorrowedA={poolTokenType == PoolTokenType.BorrowableA ? val : 0}
            changeBorrowedB={poolTokenType == PoolTokenType.BorrowableB ? val : 0}
          />
          <InputAmount 
            val={val}
            setVal={setVal}
            suffix={symbol}
            maxTitle={'Available'}
            max={maxBorrowable}
          />
          <div className="transaction-recap">
            <BorrowFee amount={val} symbol={symbol} />
            <BorrowAPY />
          </div>
          <Row className="interaction-row">
            <Col xs={6}>
              <InteractionButton name="Approve" onCall={onApprove} state={approvalState} />
            </Col>
            <Col xs={6}>
              <InteractionButton name="Deposit" onCall={onBorrow} state={borrowState} />
            </Col>
          </Row>
        </InteractionModalBody>
      </>
    </InteractionModal>
  );
}