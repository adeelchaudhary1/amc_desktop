import React from 'react';
import Header from './../components/Header';
import { useState } from 'react';
import { getAmc } from './../stores/services/amc.service';
import { getFundByAmc, getInstrumentType } from './../stores/services/funds.service';
import { addFundTransferTransaction, getModeOfTx } from './../stores/services/transactions.service';
import { getAccountByAmc } from './../stores/services/account.service';
import { getAllUnitHolderByFolioNo } from './../stores/services/unit-holder.service';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import ReactTooltip from 'react-tooltip';
import 'react-toastify/dist/ReactToastify.css';
const TransferFund = () => {
  //hooks for getting all inputs from user
  const [amcName, setAmcName] = useState('');
  const [fund, setFund] = useState('')
  const [accNo, setAccNo] = useState('');
  const [instrumentType, setInstrumentType] = useState('');
  const [instrumentNo, setInstrumentNo] = useState('');
  const [mot, SetMot] = useState('');
  const [netAmount, setNetAmount] = useState('');
  const [fromBank, setFromBank] = useState('');
  const [fromBranch, setFromBranch] = useState('');
  const [fromAccNo, setFromAccNo] = useState('');
  const [toBank, setToBank] = useState('');
  const [toBranch, setToBranch] = useState('');
  const [toAccNo, setToAccNo] = useState('');

  const [trx_id, setTrx_id] = useState<string>('')
  React.useEffect(() => {
    const txName = sessionStorage.getItem('rejectedTxName') || '';
    const flag = sessionStorage.getItem('rejectedFlag') || false;
    if (flag && txName === 'fundtransfer') {
      const obj = JSON.parse(sessionStorage.getItem('rejectedTxObj') || "");
      setInstrumentType(obj.instrument_type);

      setTrx_id(obj.txn_id)
      setInstrumentNo(obj.instrument_no)
      setFund(obj.fund);
      setAccNo(obj.account_no);
      setAmcName(obj.amc_name);

      const fetchAmcFirst = async () => {
        try {
          const amcResponse = await getAmc(email);
          setAmcdata(amcResponse.data.data);
          amcResponse.data.data.map((amc: any) => {
            if (amc.name === obj.amc_name) {
              getfundAndAccountByAmcCode(amc.amc_code)
            }
          });
        } catch (error) { }
      };
      fetchAmcFirst();
    }
  }, [])
  // const [fileUpload, setFileUpload] = useState('');
  const email = sessionStorage.getItem('email') || '';
  //error getting hooks 
  const [fromBankError, setFromBankError] = useState('');
  const [fromBranchError, setFromBranchError] = useState('');
  const [fromAccNoError, setFromAccNoError] = useState('');
  const [toBankError, setToBankError] = useState('');
  const [toBranchError, setToBranchError] = useState('');
  const [toAccNoError, setToAccNoError] = useState('');

  const [motError, SetMotError] = useState('');
  const [amcNameError, setAmcError] = useState('');
  const [fundError, setFundError] = useState('');
  const [accNoError, setAccNoError] = useState('');
  const [instrumentTypeError, setInstrumentTypeError] = useState('');
  const [instrumentNoError, setInstrumentNoError] = useState('');
  const [netAmountError, setNetAmountError] = useState('');
  // const [fileUploadError, setFileUploadError] = useState('');
  const [Loading, setLoading] = useState(false);
  //for dropdown data
  const [amcdata, setAmcdata] = useState<any>([]);
  const [allFunds, setAllFunds] = useState<any>([]);
  const [accountNoData, setAccountNoData] = useState<any>([]);
  const [MOPData, setMOPData] = useState<any>([]);
  const [iTypeData, setITypeData] = useState<any>([]);
  const [accFundLoading, setAccFundLoading] = useState<boolean>(false)
  const getfundAndAccountByAmcCode = async (code: string) => {
    setAccFundLoading(true);
    allFunds.length = 0;
    setAllFunds(allFunds)
    //get funds by amc for dropdown
    try {
      const response = await getFundByAmc(email, code);
      setAllFunds(response.data.data);
    } catch (error) { }
    try {
      const accResponse = await getAccountByAmc(email, code);
      setAccountNoData(accResponse.data.data);
    } catch (error) { }
    setAccFundLoading(false);
  }

  React.useEffect(() => {
    const fetchAmc = async () => {
      amcdata.length = 0;
      setAmcdata(amcdata);
      MOPData.length = 0;
      setMOPData(MOPData)
      //get all Amc for dropdown
      try {
        const amcResponse = await getAmc(email);
        setAmcdata(amcResponse.data.data);
      } catch (error) { }
      //get InstrumentType data
      try {
        const inTypeResponse = await getInstrumentType(email);
        setITypeData(inTypeResponse.data.data);
      } catch (error) { }
      //get mot data
      try {
        const motResponse = await getModeOfTx(email);
        setMOTData(motResponse.data.data);
      } catch (error) { }
    };
    fetchAmc();
  }, []);
  //render dropdown for amc data
  const renderAmcDropdown = () => {
    return amcdata.map((item: any, index: number) => {
      return (
        <option key={index} value={item.amc_code}>{item.name}</option>
      );
    });
  }
  //render dropdown for account no data
  const renderAccountNoDropdown = () => {
    return accountNoData.map((item: any, index: string) => {
      return (
        <option key={index} value={item.account_no}>{item.account_no}</option>
      );
    });
  }
  const renderFundsDropdown = () => {
    return allFunds.map((item: any, index: string) => {
      return (
        <option key={index} value={item.fund_name}>{item.fund_name}</option>
      );
    });
  }
  //render dropdown for iTypeData data
  const renderiTypeDataDropdown = () => {
    return iTypeData.map((item: any, index: string) => {
      return (
        <option key={index} value={item.name}>{item.name}</option>
      );
    });
  }
  const [MOTData, setMOTData] = useState<any>([]);
  //render dropdown for nature of transaction data
  const renderMOTDropdown = () => {
    return MOTData.map((item: any, index: string) => {
      return (
        <option key={index} value={item.name}>{item.name}</option>
      );
    });
  }
  const tx = sessionStorage.getItem('rejectedTxName') || '';

  const validate = () => {
    let amcErr, fundErr, accNoErr, iTypeErr, toBankErr, toBranchErr, toAccErr = "";
    let iNoErr, netErr, fromBankErr, fromBranchErr, fromAccErr = "";
    amcName.trim() === '' ? amcErr = "Required" : amcErr = "";
    fund.trim() === '' ? fundErr = "Required" : fundErr = "";
    accNo.trim() === '' ? accNoErr = "Required" : accNoErr = "";
    instrumentType.trim() === '' ? iTypeErr = "Required" : iTypeErr = "";
    instrumentNo.trim() === '' ? iNoErr = "Required" : iNoErr = "";
    netAmount.trim() === '' ? netErr = "Required" : netErr = "";
    fromBank.trim() === '' ? fromBankErr = "Required" : fromBankErr = "";
    fromBranch.trim() === '' ? fromBranchErr = "Required" : fromBranchErr = "";
    fromAccNo.trim() === '' ? fromAccErr = "Required" : fromAccErr = "";
    toBank.trim() === '' ? toBankErr = "Required" : toBankErr = "";
    toBranch.trim() === '' ? toBranchErr = "Required" : toBranchErr = "";
    toAccNo.trim() === '' ? toAccErr = "Required" : toAccErr = "";
    if (amcErr || fundErr || accNoErr || iTypeErr || iNoErr || netErr ||
      fromBankErr || fromBranchErr || fromAccErr || toBankErr || toBranchErr || toAccErr) {
      setAmcError(amcErr);
      setFundError(fundErr);
      setAccNoError(accNoErr);
      setInstrumentTypeError(iTypeErr);
      setInstrumentNoError(iNoErr)
      setNetAmountError(netErr);
      setFromBankError(fromBankErr)
      setFromBranchError(fromBranchErr)
      setFromAccNoError(fromAccErr)
      setToBankError(toBankErr)
      setToBranchError(toBranchErr)
      setToAccNoError(toAccErr)
      return false;
    } else {
      return true;
    }
  }
  const AddTransferFundtx = async () => {
    const isValid = validate();
    if (isValid) {
      setLoading(true);
      try {
        const response = await addFundTransferTransaction(email, fund, accNo, mot, instrumentNo, instrumentType, fromBank, fromBranch, fromAccNo, toBank, toBranch, toAccNo, netAmount, amcName, trx_id);
        setAmcName('');
        setFund('');
        setAccNo('');
        setInstrumentNo('');
        setInstrumentType('');
        setNetAmount('');
        toast.success(response.data.message);
        sessionStorage.removeItem('rejectedTxObj');
        sessionStorage.removeItem('rejectedTxName');
        sessionStorage.removeItem('rejectedFlag');
      } catch (error) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message);
      }
      setLoading(false);
    } else {
      setLoading(false);
    }
  }
  return (
    <>
      <Container fluid>
        <ToastContainer limit={1} />
        <Header />
        <div className="body-pad">
          <h1>{tx === 'fundtransfer' ? 'Edit - Transfer of Fund' : 'Transfer of Fund (Under Development)'}</h1>
          <div className="form-holder">
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Account No</p>
                  <div className="input-1" >
                    {accFundLoading ?
                      <div className="input-1">
                        <div className="ml-2">Account Loading</div>
                        <img src="assets/spin-loader.svg" className="ml-auto pb-2 center" alt="" width={40} height={70} />
                      </div>
                      :
                      <select className="input-1" value={accNo} onChange={(e) => { setAccNoError(''); setAccNo(e.target.value) }}>
                        <option value="" defaultChecked hidden> Select Account</option>
                        {renderAccountNoDropdown()}
                      </select>}
                    {accNoError ? <p className="error-labels error-message2">{accNoError}</p> : ''}
                  </div>
                </div>
              </Col>
              <Col md="6">
                <div className="input-holder right">
                  <p className="label">Fund Name</p>
                  <div className="input-1">
                    {accFundLoading ?
                      <div className="input-1">
                        <div className="ml-2">Fund Loading</div>
                        <img src="assets/spin-loader.svg" className="ml-auto pb-2 center" alt="" width={40} height={70} />
                      </div>
                      :
                      <select className="input-1" value={fund} onChange={(e) => { setFundError(''); setFund(e.target.value) }}>
                        <option value="" defaultChecked hidden> Select Fund</option>
                        {renderFundsDropdown()}
                      </select>}
                    {fundError ? <p className="error-labels error-message">{fundError}</p> : ''}
                  </div>
                </div>
              </Col>
            </Row>
            <div className="line"></div>
            <p className="t-3 mb-2">Concerned Officer</p>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Type of Transaction</p>
                  <div className="input-1">
                    <select className="input-1" value={mot} onChange={(e) => { SetMotError(''); SetMot(e.target.value) }}>
                      <option value="" defaultChecked hidden>Payment</option>
                      {renderMOTDropdown()}
                    </select>
                    {motError ? <p className="error-labels error-message2">{motError}</p> : ''}
                  </div>
                </div>
              </Col>
              <Col md="6">
                <div className="input-holder right">
                  <p className="label">Instrument No</p>
                  <input type="text" className="input-1" value={instrumentNo} onChange={(e) => {
                    setInstrumentNo(e.target.value);
                    setInstrumentNoError('');
                  }}
                  />
                  {instrumentNoError ? <p className="error-labels error-message">{instrumentNoError}</p> : ''}
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Instrument Type</p>
                  <div className="input-1">
                    <select className="input-1" value={instrumentType} onChange={(e) => { setInstrumentTypeError(''); setInstrumentType(e.target.value) }}>
                      <option value="" defaultChecked hidden> Select Type</option>
                      {renderiTypeDataDropdown()}
                    </select>
                    {instrumentTypeError ? <p className="error-labels error-message2">{instrumentTypeError}</p> : ''}
                  </div>
                </div>
              </Col>
            </Row>
            <div className="line"></div>
            <p className="t-3 mb-2">Transfer From</p>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Account No</p>
                  <ReactTooltip textColor='white' backgroundColor='#1c5556' effect="float" />
                  <div className="input-1" data-tip="First Select Amc">
                    {accFundLoading ?
                      <div className="input-1">
                        <div className="ml-2">Account Loading</div>
                        <img src="assets/spin-loader.svg" className="ml-auto pb-2 center" alt="" width={40} height={70} />
                      </div>
                      :
                      <select className="input-1" value={accNo} onChange={(e) => { setAccNoError(''); setAccNo(e.target.value) }}>
                        <option value="" defaultChecked hidden> Select Account</option>
                        {renderAccountNoDropdown()}
                      </select>}
                    {accNoError ? <p className="error-labels error-message2">{accNoError}</p> : ''}
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              {/* <Col md="6">
                <div className="input-holder left">
                  <p className="label">Bank Name</p>
                  <ReactTooltip textColor='white' backgroundColor='#1c5556' effect="float" />
                  <input type="text" className="input-1 disable-input" data-tip="Add Folio Number" placeholder={beneDataError ? 'SelectAccount' : ''} value={beneData.account_name ? beneData.account_name : ''} readOnly />
                </div>
              </Col>
              <Col md="6">
                <div className="input-holder right">
                  <p className="label">Branch Name</p>
                  <ReactTooltip textColor='white' backgroundColor='#1c5556' effect="float" />
                  <input type="text" className="input-1 disable-input" data-tip="Add Folio Number" placeholder={beneDataError ? 'Add Folio Number' : ''} value={beneData.account_name ? beneData.account_name : ''} readOnly />
                </div>
              </Col> */}
              {/* <Col md="6">
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
              </Col> */}
            </Row>

            <div className="line"></div>
            <p className="t-3 mb-2">Transfer To</p>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Account No</p>
                  <ReactTooltip textColor='white' backgroundColor='#1c5556' effect="float" />
                  <div className="input-1" data-tip="First Select Amc">
                    {accFundLoading ?
                      <div className="input-1">
                        <div className="ml-2">Account Loading</div>
                        <img src="assets/spin-loader.svg" className="ml-auto pb-2 center" alt="" width={40} height={70} />
                      </div>
                      :
                      <select className="input-1" value={accNo} onChange={(e) => { setAccNoError(''); setAccNo(e.target.value) }}>
                        <option value="" defaultChecked hidden> Select Account</option>
                        {renderAccountNoDropdown()}
                      </select>}
                    {accNoError ? <p className="error-labels error-message2">{accNoError}</p> : ''}
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              {/* <Col md="6">
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
              </Col> */}
              {/* <Col md="6">
                <div className="input-holder left">
                  <p className="label">Bank Name</p>
                  <ReactTooltip textColor='white' backgroundColor='#1c5556' effect="float" />
                  <input type="text" className="input-1 disable-input" data-tip="Add Folio Number" placeholder={beneDataError ? 'Add Folio Number' : ''} value={beneData.account_name ? beneData.account_name : ''} readOnly />
                </div>
              </Col> */}
              {/* <Col md="6">
                <div className="input-holder right">
                  <p className="label">Branch Name</p>
                  <ReactTooltip textColor='white' backgroundColor='#1c5556' effect="float" />
                  <input type="text" className="input-1 disable-input" data-tip="Add Folio Number" placeholder={beneDataError ? 'Add Folio Number' : ''} value={beneData.account_name ? beneData.account_name : ''} readOnly />
                </div>
              </Col> */}
            </Row>
            <div className="line"></div>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Net Amount</p>
                  <div className="input-1">
                    <input type="text" className="input-1" value={netAmount} onChange={(e) => {
                      setNetAmount(e.target.value);
                      setNetAmountError('');
                    }}
                    />
                    {netAmountError ? <p className="error-labels error-message2">{netAmountError}</p> : ''}
                  </div>
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
            <div className="hov">
              <button className="btn-3" onClick={AddTransferFundtx} disabled={Boolean(Loading)}>
                {Loading ? <><span className="spinner-border login-txt spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className="login-txt"> Loading...</span></> : <p>{tx === 'fundtransfer' ? 'Edit' : 'Create'}</p>}
              </button>
            </div>
          </div>

        </div>
      </Container>
    </>
  )
};

export default TransferFund;