import React from 'react';
import Header from './Header';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';

const TXNType = () => {
  const history = useHistory();
  const clearTransactiionHistory = () => {
    sessionStorage.removeItem('rejectedTxObj');
    sessionStorage.removeItem('rejectedTxName');
    sessionStorage.removeItem('rejectedFlag');
  }
  return (
    <>
      <Container fluid>
        <Header />
        <div className="body-pad">
          <h1>Master Transactions</h1>
          <div className="form-holder">
            <div className="title-row">
              <h3 className="mb-1">Transaction Types</h3>
            </div>
            <p className="t-3 mb-2 text-center">Select Transaction Type</p>
            <Row className="mt-4">
              {/* <Col md="3" onClick={() => {
                clearTransactiionHistory();
                history.replace('/feepayment')
              }}>
                <div className="txn-box">
                  Fee Payment
                </div>
              </Col> */}
              <Col md="3" onClick={() => {
                clearTransactiionHistory();
                history.replace('/cashdividend')
              }}>
                <div className="txn-box">
                  Cash Dividend
                </div>
              </Col>
              <Col md="3" onClick={() => {
                clearTransactiionHistory();
                history.replace('/maturity')
              }}>
                <div className="txn-box">
                  Maturity
                </div>
              </Col>
              <Col md="3" onClick={() => {
                clearTransactiionHistory();
                history.replace('/refundpayment')
              }}>
                <div className="txn-box">
                  Refund Payment
                </div>
              </Col>
              <Col md="3" onClick={() => {
                clearTransactiionHistory();
                history.replace('/equitysettlement')
              }}>
                <div className="txn-box">
                  Equity Settlement
                </div>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col md="3" onClick={() => {
                clearTransactiionHistory();
                history.replace('/inflow')
              }}>
                <div className="txn-box">
                  Inflow
                </div>
              </Col>
              <Col md="3" onClick={() => {
                clearTransactiionHistory();
                history.replace('/redemptionbank')
              }}>
                <div className="txn-box">
                  Redemption Bank
                </div>
              </Col>
              {/* <Col md="3" onClick={() => {
                clearTransactiionHistory();
                history.replace('/brokagefee')
              }}>
                <div className="txn-box">
                  Brokerage Fee
                </div>
              </Col> */}
              <Col md="3" onClick={() => {
                clearTransactiionHistory();
                history.replace('/nccpl')
              }}>
                <div className="txn-box">
                  NCCPL Transactions
                </div>
              </Col>
              <Col md="3" onClick={() => {
                clearTransactiionHistory();
                history.replace('/unitconversion')
              }}>
                <div className="txn-box">
                  Conversion of Units
                </div>
              </Col>
            </Row>
            
            <Row className="mt-4">
              <Col md="3" onClick={() => {
                clearTransactiionHistory();
                history.replace('/moneymarketsettlement')
              }}>
                <div className="txn-box">
                  Money Market Settlement
                </div>
              </Col>
              <Col md="3" onClick={() => {
                clearTransactiionHistory();
                history.replace('/outflow')
              }}>
                <div className="txn-box">
                  Outflow
                </div>
              </Col>
              <Col md="3" onClick={() => {
                clearTransactiionHistory();
                history.replace('/profit')
              }}>
                <div className="txn-box">
                  Bank Charges / Profit
                </div>
              </Col>
              <Col md="3" onClick={() => {
                clearTransactiionHistory();
                history.replace('/fundtransfer')
              }}>
                <div className="txn-box">
                  Fund Transfer
                </div>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col md="3" onClick={() => {
                clearTransactiionHistory();
                history.replace('/cgt')
              }}>
                <div className="txn-box">
                  CGT/WHT/SST
                </div>
              </Col>
              <Col md="3" onClick={() => {
                clearTransactiionHistory();
                history.replace('/saleofunit')
              }}>
                <div className="txn-box">
                  Sale of Unit
                </div>
              </Col>
              <Col md="3" onClick={() => {
                clearTransactiionHistory();
                history.replace('/gainrealization')
              }}>
                <div className="txn-box">
                  Gain Realization
                </div>
              </Col>

            </Row>
          </div>

        </div>
      </Container>
    </>
  )
};

export default TXNType;