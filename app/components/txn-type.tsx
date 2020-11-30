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
  return(
    <>
      <Container fluid>
        <Header/>
        <div className="body-pad">
          <h1>Transactions</h1>
          <div className="form-holder">
            <div className="title-row">
              <h3 className="mb-1">Transaction Types</h3>      
            </div>
            <p className="t-3 mb-2 text-center">Select Transaction Type</p>
            <Row  className="mt-4">
            <Col md="3" onClick={() => {
                history.replace('/con-unit')
              }}>
                <div className="txn-box">
                  Conversion of Units
                </div>
              </Col>
              <Col md="3" onClick={() => {
                history.replace('/cash-dividend')
              }}>
                <div className="txn-box">
                  Cash Dividend
                </div>
              </Col>
              <Col md="3" onClick={() => {
                history.replace('/maturity')
              }}>
                <div className="txn-box">
                  Maturity
                </div>
              </Col>
              <Col md="3" onClick={() => {
                history.replace('/refund-payment')
              }}>
                <div className="txn-box">
                  Refund Payment
                </div>
              </Col>
            </Row> 
            <Row  className="mt-4">
              <Col md="3"  onClick={() => {
                history.replace('/inflow')
              }}>
                <div className="txn-box">
                  Inflow
                </div>
              </Col>
              <Col md="3" onClick={() => {
                history.replace('/redemption')
              }}>
                <div className="txn-box">
                  Redemption Bank 
                </div>
              </Col>
              <Col md="3" onClick={() => {
                history.replace('/gain-realization')
              }}>
                <div className="txn-box">
                  Gain Realization
                </div>
              </Col>
              <Col md="3" onClick={() => {
                history.replace('/sale-of-unit')
              }}>
                <div className="txn-box">
                   Sale of Unit
                </div>
              </Col>
            </Row> 
          
            <Row  className="mt-4"> 
              <Col md="3" onClick={() => {
                history.replace('/money-market')
              }}>
                <div className="txn-box">
                  Money Market Settlement
                </div>
              </Col>
              <Col md="3" onClick={() => {
                history.replace('/outflow')
              }}>
                <div className="txn-box">
                  Outflow
                </div>
              </Col>
              <Col md="3" onClick={() => {
                history.replace('/bank-charges')
              }}>
                <div className="txn-box">
                  Bank Charges / Profit
                </div>
              </Col>
              <Col md="3" onClick={() => {
                history.replace('/equity-settlement')
              }}>
                <div className="txn-box">
                  Equity Settlement
                </div>
              </Col>
            </Row> 
            <Row  className="mt-4"> 
              <Col md="3" onClick={() => {
                history.replace('/cgt-tax')
              }}>
                <div className="txn-box">
                  CGT/WHT/SST
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