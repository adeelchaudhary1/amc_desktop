import React, { useState } from 'react';
import Header from './../components/Header';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import { Link } from 'react-router-dom'
const ViewAmc = () => {
  const [amcName, setAmcName] = useState('');
  const [amcCode, setAmcCode] = useState('');
  const [focalPerEmail, setFocalPerEmail] = useState('');
  const [focalPerName, setFocalPerName] = useState('');
  const [amcSig, setAmcSig] = useState('');
  const [amcAud, setAmcAud] = useState('');
  const [taxAdv, setTaxAdv] = useState('');
  const [conOffericer, setConOfficer] = useState('');
  const [Suboffericer, setSubOffericer] = useState('');
  const [txCreater, setTxCreater] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [filename1, setFile1Name] = useState('');
  const [filename2, setFile2Name] = useState('');
  const [filename3, setFile3Name] = useState('');
  React.useEffect(() => { 
    const obj = JSON.parse(sessionStorage.getItem('amcObj') || "");
    setAmcName(obj.name);
    setAmcCode(obj.amc_code)
    setFocalPerEmail(obj.focal_person_email)
    setFocalPerName(obj.focal_person)
    setAmcSig(obj.amc_signatories)
    setAmcAud(obj.amc_auditor)
    setTaxAdv(obj.amc_tax_advisor)
    setConOfficer(obj.concerned_officer)
    setSubOffericer(obj.subtitute_concerned_officer)
    setTxCreater(obj.txn_creator_field)
    setFrom(obj.from)
    setTo(obj.to)
    setFile1Name(obj.amc_br)
    setFile2Name(obj.auth_amc_signatories)
    setFile3Name(obj.tax_exemption)
   }, [])
  return (
    <>
      <Container fluid>
        <Header />
        <div className="body-pad">
          <h1>View - AMC</h1>
          <div className="form-holder">
            <div className="title-row">
              <h3 className="mb-4">Master - AMC</h3>
              <Link to="/setup/view-all" className="t-3" replace>View All</Link>
            </div>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Name of AMC</p>
                  <input readOnly type="text" className="input-1" value={amcName} />
                </div>
              </Col>
              <Col md="6">
                <div className="input-holder right">
                  <p className="label">AMC Code</p>
                  <input readOnly type="text" className="input-1" value={amcCode} />
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">AMC Focal Person Email</p>
                  <input readOnly type="text" className="input-1" defaultValue={focalPerEmail} />
                </div>
              </Col>
              <Col md="6">
                <div className="input-holder right">
                  <p className="label">AMC BR</p>
                  <div className="multi-input">
                    <div className="input-2">{filename1.slice(0, 20)}</div>
                    <div className="icon"><img src="assets/upload.svg" alt="" width="20" /></div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">AMC Focal Person</p>
                  <input readOnly type="text" className="input-1" value={focalPerName} />
                </div>
              </Col>
              <Col md="6">
                <div className="input-holder right">
                  <p className="label">List of Authorized Signatories</p>
                  <div className="multi-input">
                    <div className="input-2">{filename2.slice(0, 20)}</div>
                    <div className="icon"><img src="assets/upload.svg" alt="" width="20" /></div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">AMC Signatories</p>
                  <div className="multi-input">
                    <input readOnly type="text" className="input-2" value={amcSig}
                    />
                    <div className="icon" ><img src="assets/add-user.svg" alt="" width="20" /></div>
                  </div>
                </div>
              </Col>
              <Col md="6">
                <div className="input-holder right">
                  <p className="label">AMC Auditor</p>
                  <input readOnly type="text" className="input-1" value={amcAud} />
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">AMC Tax Advisor</p>
                  <input readOnly type="text" className="input-1" value={taxAdv} />
                </div>
              </Col>
              <Col md="6">
                <div className="input-holder right">
                  <p className="label">Tax Exemption</p>
                  <div className="multi-input">
                    <div className="input-2">{filename3.slice(0, 20)}</div>
                    <div className="icon" ><img src="assets/upload.svg" alt="" width="20" /></div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Concerned Officer</p>
                  <select  className="input-1" value={conOffericer} >
                    <option  value="conOffericer" defaultChecked hidden>{conOffericer}</option>
                  </select>
                </div>
              </Col>
              <Col md="6">
                <div className="input-holder right">
                  <p className="label">From</p>
                  <input readOnly type="date" className="input-2" value={from} />
                  <p className="label">To</p>
                  <input readOnly type="date" className="input-2" value={to} />
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Substitute Concerned Officer</p>
                  <select className="input-1" value={Suboffericer}>
                    <option value={Suboffericer} defaultChecked hidden>{Suboffericer}</option>
                  </select>
                </div>
              </Col>
              <Col md="6">
                <div className="input-holder right">
                  <p className="label">Transaction Creator Field</p>
                  <input readOnly type="text" value={txCreater} className="input-1"/>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </Container>
    </>
  )
};

export default ViewAmc; 