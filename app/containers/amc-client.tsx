import React, { useState, useRef } from 'react';
import Header from './../components/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import ConfirmModal from "./signatories-popup";
import { getOfficer } from './../stores/services/user.service';
import { Link } from 'react-router-dom'
const Setup = () => {
  const [showModal, setShowModal] = useState(false);
  const myRef1 = useRef<HTMLInputElement>(null);
  const myRef2 = useRef<HTMLInputElement>(null)
  const myRef3 = useRef<HTMLInputElement>(null)
  const emailRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$");
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
  const [AmcBar, setAmcBar] = useState('');
  const [listSig, setListSig] = useState('');
  const [txExe, setTxExe] = useState('');
  const email = sessionStorage.getItem('email') || '';
  //foor Errors 
  const [amcNameError, setAmcNameError] = useState('');
  const [amcCodeError, setAmcCodeError] = useState('');
  const [focalPerEmailError, setFocalPerEmailError] = useState('');
  const [focalPerNameError, setFocalPerNameError] = useState('');
  const [amcSigError, setAmcSigError] = useState('');
  const [amcAudError, setAmcAudError] = useState('');
  const [taxAdvError, setTaxAdvError] = useState('');
  const [conOffericerError, setConOfficerError] = useState('');
  const [SuboffericerError, setSubOffericerError] = useState('');
  const [txCreaterError, setTxCreaterError] = useState('');
  const [fromError, setFromErrorError] = useState('');
  const [toError, setToErrorError] = useState('');
  const [AmcBarError, setAmcBarError] = useState('');
  const [listSigError, setListSigError] = useState('');
  const [txExeError, setTxExeError] = useState('');
  console.log(AmcBar)
  const validate = () => {
    let amcErr, codeErr, personErr, perName, sigErr, audErr, taxAdvErr, offErr = "";
    let subOffErr, txCreaterErr, fromErr, toErr, barErr, listErr, txExeErr = "";
    amcName.trim() === '' ? amcErr = "Required" : amcErr = "";
    amcCode.trim() === '' ? codeErr = "Required" : codeErr = "";
    focalPerEmail.trim() === '' ? personErr = "Required" : emailRegex.test(focalPerEmail) !== true ? personErr = 'Invalid Email' : personErr = "";
    focalPerName.trim() === '' ? perName = "Required" : perName = "";
    amcSig.trim() === '' ? sigErr = "Required" : sigErr = "";
    amcAud.trim() === '' ? audErr = "Required" : audErr = "";
    taxAdv.trim() === '' ? taxAdvErr = "Required" : taxAdvErr = "";
    conOffericer.trim() === '' ? offErr = "Required" : offErr = "";
    Suboffericer.trim() === '' ? subOffErr = "Required" : subOffErr = "";
    txCreater.trim() === '' ? txCreaterErr = "Required" : txCreaterErr = "";
    from.trim() === '' ? fromErr = "Required" : fromErr = '';
    to.trim() === '' ? toErr = "Required" : toErr = "";
    !AmcBar ? barErr = "Required" : barErr = "";
    !listSig ? listErr = "Required" : listErr = '';
    !txExe ? txExeErr = "Required" : txExeErr = '';

    if (amcErr || codeErr || personErr || perName || sigErr || audErr || taxAdvErr || offErr || subOffErr || txCreaterErr
      || fromErr || toErr || barErr || listErr || txExeErr) {
      setAmcNameError(amcErr);
      setAmcCodeError(codeErr);
      setFocalPerEmailError(personErr);
      setFocalPerNameError(perName)
      setAmcSigError(sigErr);
      setAmcAudError(audErr);
      setTaxAdvError(taxAdvErr);
      setConOfficerError(offErr);
      setSubOffericerError(subOffErr)
      setTxCreaterError(txCreaterErr);
      setFromErrorError(fromErr);
      setToErrorError(toErr);
      setAmcBarError(barErr)
      setListSigError(listErr);
      setTxExeError(txExeErr);
      return false;
    } else {
      return true;
    }
  }
  //   const createAmc = async () => {
  //     const isValid = validate();
  //     if (isValid) {
  //       setLoading(true);
  //       try {
  //         const response = await addAmc(email, amcCode, amcName, focalPerEmail, focalPerName, amcSig, taxAdv, conOffericer, Suboffericer, amcAud, from, to, txCreater, txExe, listSig, AmcBar);
  //         setAmcName('');
  //         setAmcCode('');
  //         setFocalPerEmail('');
  //         setFocalPerName('');
  //         setAmcSig('');
  //         setAmcAud('');
  //         setTaxAdv('')
  //         setConOfficer('')
  //         setSubOffericer('');
  //         setTxCreater('');
  //         setFrom('')
  //         setTo('')
  //         setFocalPerName('')
  //         setAmcBar('')
  //         setListSig('');
  //         setTxExe('');
  //         setFile1Name('');
  //         setFile2Name('');
  //         setFile3Name('');
  //         toast.success(response.data.message);
  //       } catch (error) {
  //         console.log(error.response.data.message);
  //         toast.error(error.response.data.message);
  //       }
  //       setLoading(false);
  //     }
  //   }

  const [officerData, setOfficerData] = useState<any>([]);
  React.useEffect(() => {
    const fetchAmc = async () => {
      officerData.length = 0;
      setOfficerData(officerData);
      //get all officers for dropdown
      try {
        const amcResponse = await getOfficer(sessionStorage.getItem('email') || '', 'CONCERNED_OFFICER');
        setOfficerData(amcResponse.data.data);
      } catch (error) { }
    };
    fetchAmc();
  }, []);
  const [Loading, setLoading] = useState(false);
  //render dropdown for amc data
  const renderofficersDropdown = () => {
    return officerData.map((item: any, index: string) => {
      return (
        <option key={index} value={item.name}>{item.name}</option>
      );
    });
  }
  //render dropdown for amc data
  const renderSubOfficerDropdown = () => {
    return officerData.map((item: any, index: string) => {
      return (
        <option key={index} value={item.name}>{item.name}</option>
      );
    });
  }
  const renderComponents = () => {
    switch (showModal) {
      case true:
        return <ConfirmModal setShowModal={setShowModal} setAmcSig={setAmcSig} amcSig={amcSig} setAmcSigError={setAmcSigError} />;
      default:
        return '';
    }
  };
  const uploadAmcBarFile = (e: any) => {
    let file = e?.target.files[0];
    setFile1Name(file.name);
    setAmcBar(file);
    setAmcBarError('');
  }
  const uploadSignatoriesFile = (e: any) => {
    let file = e?.target.files[0];
    setFile2Name(file.name);
    setListSig(file);
    setListSigError('');
  }
  const uploadExemptionFile = (e: any) => {
    let file = e?.target.files[0];
    setFile3Name(file.name);
    setTxExe(file);
    setTxExeError('');
  }
  const [filename1, setFile1Name] = useState('');
  const [filename2, setFile2Name] = useState('');
  const [filename3, setFile3Name] = useState('');

  return (
    <>
      <Container fluid>
        <ToastContainer limit={1} />
        <Header />
        <div className="body-pad">
          <h1>Setup - AMC</h1>
          <div className="form-holder">
            <div className="title-row">
              <Link to="/setup/view-all" className="t-3 ml-auto">View All</Link>
            </div>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Account Name</p>
                  <input type="text" className="input-1" value={amcName} onChange={(e) => {
                    setAmcName(e.target.value);
                    setAmcNameError('');
                  }} />
                  {amcNameError ? <p className="error-labels error-message2">{amcNameError}</p> : ''}
                </div>
              </Col>
              <Col md="6">
                <div className="input-holder right">
                  <p className="label">Account Title</p>
                  <input type="text" className="input-1" value={amcCode} onChange={(e) => {
                    setAmcCode(e.target.value);
                    setAmcCodeError('');
                  }} />
                  {amcCodeError ? <p className="error-labels error-message">{amcCodeError}</p> : ''}
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Client Name</p>
                  <input type="text" className="input-1" defaultValue={focalPerEmail} onChange={(e) => {
                    setFocalPerEmail(e.target.value);
                    setFocalPerEmailError('');
                  }} />
                  {focalPerEmailError ? <p className="error-labels error-message2">{focalPerEmailError}</p> : ''}
                </div>
              </Col>
              <Col md="6">
                <div className="input-holder right">
                  <p className="label">Client Code</p>
                  <input type="text" className="input-1" defaultValue={focalPerEmail} onChange={(e) => {
                    setFocalPerEmail(e.target.value.toLowerCase());
                    setFocalPerEmailError('');
                  }} />
                  {focalPerEmailError ? <p className="error-labels error-message">{focalPerEmailError}</p> : ''}
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Type</p>
                  <select className="input-1" value={Suboffericer} onChange={(e) => {
                    setSubOffericer(e.target.value);
                    setSubOffericerError('');
                  }} >
                    <option value="" defaultChecked hidden>Select Type</option>
                    <option value="Individual">Individual</option>
                    <option value="Corporate">Corporate</option>
                  </select>
                  {SuboffericerError ? <p className="error-labels error-message2">{SuboffericerError}</p> : ''}
                </div>
              </Col>

              <Col md="6">
                <div className="input-holder right">
                  <p className="label">CNIC</p>
                  <input type="text" value={txCreater} className="input-1" onChange={(e) => {
                    setTxCreater(e.target.value.toUpperCase());
                    setTxCreaterError('');
                  }} />
                  {txCreaterError ? <p className="error-labels error-message">{txCreaterError}</p> : ''}
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">NTN</p>
                  <input type="text" className="input-1" value={focalPerName} onChange={(e) => {
                    setFocalPerName(e.target.value.toUpperCase());
                    setFocalPerNameError('');
                  }} />
                  {focalPerNameError ? <p className="error-labels error-message2">{focalPerNameError}</p> : ''}
                </div>
              </Col>
              <Col md="6">
                <div className="input-holder right">
                  <p className="label">Mobile</p>
                  <input type="text" className="input-1" value={amcAud} onChange={(e) => {
                    setAmcAud(e.target.value.toUpperCase());
                    setAmcAudError('');
                  }} />
                  {amcAudError ? <p className="error-labels error-message">{amcAudError}</p> : ''}
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Address</p>
                  <input type="text" className="input-1" value={focalPerName} onChange={(e) => {
                    setFocalPerName(e.target.value);
                    setFocalPerNameError('');
                  }} />
                  {focalPerNameError ? <p className="error-labels error-message2">{focalPerNameError}</p> : ''}
                </div>
              </Col>
              <Col md="6">
                <div className="input-holder right">
                  <p className="label">City</p>
                  <input type="text" className="input-1" value={amcAud} onChange={(e) => {
                    setAmcAud(e.target.value);
                    setAmcAudError('');
                  }} />
                  {amcAudError ? <p className="error-labels error-message">{amcAudError}</p> : ''}
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Country</p>
                  <input type="text" className="input-1" value={taxAdv} onChange={(e) => {
                    setTaxAdv(e.target.value);
                    setTaxAdvError('');
                  }} />
                  {taxAdvError ? <p className="error-labels error-message2">{taxAdvError}</p> : ''}
                </div>
              </Col>
              <Col md="6">
                <div className="input-holder right">
                  <p className="label">registration Date</p>
                  <input type="date" className="input-1" value={taxAdv} onChange={(e) => {
                    setTaxAdv(e.target.value);
                    setTaxAdvError('');
                  }} />
                  {taxAdvError ? <p className="error-labels error-message">{taxAdvError}</p> : ''}
                </div>
              </Col>

            </Row>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Upload</p>
                  <div className="multi-input" onClick={() => myRef3?.current?.click()}>
                    <div className="input-2">{filename3 ? filename3 : 'Select File'}</div>
                    <input type="file" ref={myRef3}
                      style={{ display: 'none' }}
                      onChange={(e) => { uploadExemptionFile(e) }}
                    />
                    <div className="icon" ><img src="assets/upload.svg" alt="" width="20" /></div>
                    {txExeError ? <p className="error-labels error-message2">{txExeError}</p> : ''}
                  </div>
                </div>
              </Col>
            </Row>
            <div className="hov">
              <button className="btn-3" disabled={Boolean(Loading)}>
                {Loading ? <><span className="spinner-border login-txt spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className="login-txt"> Loading...</span></> : <p>Create</p>}
              </button>
            </div>
          </div>
          {renderComponents()}
        </div>
      </Container>
    </>
  )
};

export default Setup;