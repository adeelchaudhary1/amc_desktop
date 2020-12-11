import React from 'react';
import Header from './../components/Header';
import { 
  Container,
  Row,
  Col,
} from 'reactstrap'; 

const Compliance = () => {
  return(
    <>
      <Container fluid>
        <Header/>
        <div className="body-pad">
          <h1>Accept/Reject Transaction </h1>
          <div className="form-holder">
            <div className="title-row">
              <h3 className="mb-1">Compliance</h3>
            </div>
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
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Type of Transaction</p>
                  <div className="input-1">
                    <p>Fee Payment</p>
                    <div className="icon"><img src="assets/arrow-down.svg" alt="" width="14" /></div>
                  </div> 
                </div>
              </Col>
              <Col md="6">
                <div className="input-holder right">
                  <p className="label">Instrument Type</p>
                  <div className="input-1">
                    <p>CHEQUE</p>
                    <div className="icon"><img src="assets/arrow-down.svg" alt="" width="14" /></div>
                  </div> 
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Instruction Date</p>
                  <div className="input-1"></div>  
                </div>
              </Col>
              <Col md="6">
                <div className="input-holder right">
                  <p className="label">Instruction Receiving Date</p>
                  <div className="input-1"></div>  
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Name of Beneficiary</p>
                  <div className="input-1"></div>  
                </div>
              </Col>
              <Col md="6">
                <div className="input-holder right">
                  <p className="label">Beneficiary Bank</p>
                  <div className="input-1"></div>  
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Beneficiary Branch</p>
                  <div className="input-1"></div>  
                </div>
              </Col>
              <Col md="6">
                <div className="input-holder right">
                  <p className="label">Beneficiary Account</p>
                  <div className="input-1"></div>  
                </div>
              </Col>
            </Row>
            <Row>
            <Col md="6">
                <div className="input-holder left">
                  <p className="label">Instruction Date</p>
                  <div className="input-1"></div>  
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
                  <p className="label">Gross Amount</p>
                  <div className="input-1"></div>  
                </div>
              </Col>
              <Col md="6">
                <div className="input-holder right">
                  <p className="label">Net Amount</p>
                  <div className="input-1"></div>  
                </div>
              </Col>
            </Row>
            <div className="btn-3">
              <p>Create</p>
            </div>
            <div className="line"></div>
            {/* <h3 className="mb-1 mt-2">Proof of Transaction</h3> */}
            {/* <Row>
              <Col md="6">
                <div className="d-flex mt-4">
                  <img src="assets/file.svg" alt="" height="24" className="mr-3" />
                  <p>Preview</p>
                </div>
              </Col>
              <Col md="6" className="d-flex justify-content-end">
                <p className="mr-2">*</p>
                <div className="comment-box">
                  <p>I have Accepted the Transaction</p>
                </div>
              </Col>
            </Row> */}
           
            <Row>
              <Col md="6">
                <div className="d-flex">
                  <div className="btn-3 ">
                    <p>Accept</p>
                  </div>
                  <div className="btn-3 bg-negative ml-4">
                    <p>Reject</p>
                  </div>
                </div>
              </Col>
              {/* <Col md="6" className="d-flex justify-content-end">
                  <div className="btn-3 ">
                    <p>Add Comment</p>
                  </div>
              </Col> */}
            </Row>
            <div className="line"></div>
            <Row>
              <Col md="6">
                <div className="auth-box">
                  <p className="title">Authorizer A</p>
                  <p className="small mt-4">Status:</p>
                  <p className="accepted">Accepted</p>
                  <p className="small mt-4">Comment</p>
                  <p className="comment">I have accepted the transaction</p>
                </div>
              </Col>
              <Col md="6">
                <div className="auth-box">
                  <p className="title">Authorizer B</p>
                  <p className="small mt-4">Status:</p>
                  <p className="accepted">Accepted</p>
                  <p className="small mt-4">Comment</p>
                  <p className="comment">I have accepted the transaction</p>
                </div>
              </Col>
            </Row>
          </div>
          
        </div>
      </Container>
    </>
  )
};

export default Compliance;