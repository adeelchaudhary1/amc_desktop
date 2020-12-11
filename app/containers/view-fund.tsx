import React from 'react';
import Header from './../components/Header';
import { useState } from 'react';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';

import { Link } from 'react-router-dom'

const ViewFund = () => {
  //hooks for getting all inputs from user 
  const [fundName, setFundName] = useState('');
  const [code, setCode] = useState('');
  const [amcName, setAmcName] = useState('');
  const [fundType, setFundType] = useState('')
  const [incorporationDate, setIncorporationDate] = useState('');
  const [revocationDate, setRevocationDate] = useState('');
  const [psxListing, setPsxListing] = useState('false');
 
  React.useEffect(() => {
    const obj = JSON.parse(sessionStorage.getItem('fundObj') || "");
    setFundName(obj.fund_name);
    setCode(obj.symbol_code)
    setAmcName(obj.amc_name)
    setFundType(obj.doc_type)
    setIncorporationDate(obj.date_of_incorporation)
    setRevocationDate(obj.date_of__revocation)
    setPsxListing(obj.psx_listing)
  }, []);
  
  return (
    <>
      <Container fluid>
        <Header />
        <div className="body-pad">
          <h1>Setup - Funds</h1>
          <div className="form-holder">
            <div className="title-row">
              <h3 className="mb-1">Master - Funds</h3>
              <Link to="/setup-funds/view-all" className="t-3" replace>View All</Link>
            </div>
            <p className="t-3 mb-2">Create Another Entity - Fund</p>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">AMC Name</p>
                  <div className="input-1">
                    <select className="input-1" value={amcName}>
                      <option value={amcName} defaultChecked hidden>{amcName}</option>
                    </select>
                  </div>
                </div>
              </Col>
              <Col md="6">
                <div className="input-holder right">
                  <p className="label">Fund Name</p>
                  <div className="input-1">
                    <input type="text" className="input-1" value={fundName} />
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Nature / Type of Fund</p>
                  <div className="input-1">
                    <input type="text" className="input-1" value={fundType}  />
                  </div>
                </div>
              </Col>
              <Col md="6">
                <div className="input-holder right">
                  <p className="label">Symbol Code</p>
                  <div className="input-1">
                    <input type="text" className="input-1" value={code}  />
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Date of Incorporation</p>
                  <div className="input-1">
                    <input type="date" className="input-1" value={incorporationDate} />
                  </div>
                </div>
              </Col>
              <Col md="6">
                <div className="input-holder right">
                  <p className="label">Date of Revocation</p>
                  <div className="input-1">
                    <input type="date" className="input-1" value={revocationDate} />
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">PSX Listing</p>
                  <div className="radio-holder">
                    <div>
                      <form action="">
                        <input type="radio" id="listed" name="listed" value="true" checked={true} /><label className="mr-5">{psxListing? 'Listed' : 'UnListed'}</label>
                      </form>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>

        </div>
      </Container>
    </>
  )
};

export default ViewFund;