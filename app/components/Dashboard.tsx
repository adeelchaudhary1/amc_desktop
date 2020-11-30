import React from 'react';
import Header from './../components/Header';
import { 
  Container,
  Row,
  Col,
} from 'reactstrap'; 

const Dash = () => {
  return(
    <>
      <Container fluid>
        <Header/>
        <div className="body-pad">
          <h1>Dashboard</h1>
          <Row className="stat-row">
            <Col sm="4">
              <div className="stat-box">
                <p className="title">Transactions Completed</p>
                <p className="value">40</p>
              </div>
            </Col>
            <Col sm="4">
              <div className="stat-box">
                <p className="title">Total AMC</p>
                <p className="value">20</p>
              </div>
            </Col>
            <Col sm="4">
              <div className="stat-box">
                <p className="title">Pending Transactions</p>
                <p className="value">20</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm="4">
              <div className="filter-box">
                <p>Select Date</p>
                <div className="input-3">
                  <p></p>
                  <div className="date">
                    <img src="assets/date.svg" alt="" width="18" />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="">
            <Col sm="4">
              <div className="stat-box">
                <p className="title">Total Locked Transactions</p>
                <p className="value">20</p>
              </div>
            </Col>
            <Col sm="4">
              <div className="stat-box">
                <p className="title">Daily Processed Transactions</p>
                <p className="value">30</p>
              </div>
            </Col>
            
          </Row>
          <h1 className="mt-5">Accepted Transactions</h1>
          <div className="placeholder-box">

          </div>
        </div>
      </Container>
    </>
  )
};

export default Dash;