import React from 'react';
import Header from './../components/Header';
import { 
  Container,
  Row,
  Col,
} from 'reactstrap'; 

const TransferFund = () => {
  return(
    <>
      <Container fluid>
        <Header/>
        <div className="body-pad">
          <h1>Transfer of Fund</h1>
          <div className="form-holder">
            <Row>
            <Col md="6">
                <div className="input-holder left">
                  <p className="label">Name of AMC</p>
                  <div className="input-1">
                    <p>Select AMC</p>
                    <div className="icon"><img src="assets/arrow-down.svg" alt="" width="14" /></div>
                  </div>
                </div>
              </Col>
              <Col md="6">
                <div className="input-holder right">
                  <p className="label">Fund / Client</p>
                  <div className="input-1">
                    <p>Fund From</p>
                    <div className="icon"><img src="assets/arrow-down.svg" alt="" width="14" /></div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Account No</p>
                  <div className="input-1">
                    <p>Select Account No</p>
                    <div className="icon"><img src="assets/arrow-down.svg" alt="" width="14" /></div>
                  </div>  
                </div>
              </Col>
            </Row>
            <div className="line"></div>
            <p className="t-3 mb-2">Concerned Officer</p>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Mode of Transaction</p>
                  <div className="input-1">
                    <p>SAME DAY</p>
                    <div className="icon"><img src="assets/arrow-down.svg" alt="" width="14" /></div>
                  </div>
                </div>
              </Col>
              <Col md="6">
                <div className="input-holder right">
                  <p className="label">Instrument No</p>
                  <div className="input-1"></div>  
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Instrument Type</p>
                  <div className="input-1">
                    <p>CHEQUE</p>
                    <div className="icon"><img src="assets/arrow-down.svg" alt="" width="14" /></div>
                  </div>  
                </div>
              </Col>
            </Row>
            <div className="line"></div>
            <p className="t-3 mb-2">Transfer From</p>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Bank Name</p>
                  <div className="input-1">
                    <p>Select Bank</p>
                    <div className="icon"><img src="assets/arrow-down.svg" alt="" width="14" /></div>
                  </div>  
                </div>
              </Col>
              <Col md="6">
                <div className="input-holder right">
                  <p className="label">Select Branch</p>
                  <div className="input-1">
                    <p>Select Branch Name</p>
                    <div className="icon"><img src="assets/arrow-down.svg" alt="" width="14" /></div>
                  </div>  
                </div>
              </Col>
            </Row>
            <Row>
            <Col md="6">
                <div className="input-holder left">
                  <p className="label">Account No</p>
                  <div className="input-1">
                    <p>Select</p>
                    <div className="icon"><img src="assets/arrow-down.svg" alt="" width="14" /></div>
                  </div>  
                </div>
              </Col>
            </Row>
            <div className="line"></div>
            <p className="t-3 mb-2">Transfer To</p>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Bank Name</p>
                  <div className="input-1">
                    <p>Select Bank</p>
                    <div className="icon"><img src="assets/arrow-down.svg" alt="" width="14" /></div>
                  </div>  
                </div>
              </Col>
              <Col md="6">
                <div className="input-holder right">
                  <p className="label">Select Branch</p>
                  <div className="input-1">
                    <p>Select Branch Name</p>
                    <div className="icon"><img src="assets/arrow-down.svg" alt="" width="14" /></div>
                  </div>  
                </div>
              </Col>
            </Row>
            <Row>
            <Col md="6">
                <div className="input-holder left">
                  <p className="label">Account No</p>
                  <div className="input-1">
                    <p>Select</p>
                    <div className="icon"><img src="assets/arrow-down.svg" alt="" width="14" /></div>
                  </div>  
                </div>
              </Col>
            </Row>
            <div className="line"></div>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Net Amount</p>
                  <div className="input-1"></div>
                </div>
              </Col>
              <Col md="6">
                <div className="input-holder right">
                  <p className="label">Using File Upload</p>
                  <div className="multi-input">
                    <div className="input-2"><p>Select File</p></div>
                    <div className="icon"><img src="assets/upload.svg" alt="" width="20" /></div>
                  </div>
                </div>
              </Col>
            </Row>
            
            <div className="btn-3">
              <p>Create</p>
            </div>
          </div>
          
        </div>
      </Container>
    </>
  )
};

export default TransferFund;