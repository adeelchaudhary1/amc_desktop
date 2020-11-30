import React from 'react';
import Header from './../components/Header';
import { useState } from 'react';
import { getAccountByAmc } from './../stores/services/account.service';
import { getAmc } from './../stores/services/amc.service';
import { getFundByAmc } from './../stores/services/funds.service';
import { getNatureOfTx, getModeOfTx, getModeOfPayments, addProfitTransaction } from './../stores/services/transactions.service';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import ReactTooltip from 'react-tooltip';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BankChanges = () => {
  const [amcName, setAmcName] = useState('');
  const [fund, setFund] = useState('');
  const [accNo, setAccNo] = useState('');
  const [modeofPayment, setModeofPayment] = useState('');
  const [modeOfTx, setModeOfTx] = useState('');
  const [NatureofTx, setNatureofTx] = useState('');
  const [grossAmount, setGrossAmount] = useState('');
  const [netAmount, setNetAmount] = useState('');
  const email = sessionStorage.getItem('email') || '';

  // for errors
  const [amcNameError, setAmcError] = useState('');
  const [fundError, setFundError] = useState('');
  const [accNoError, setAccNoError] = useState('');
  const [modeofPaymentError, setModeofPaymentError] = useState('');
  const [modeOfTxError, setModeOfTxError] = useState('');
  const [NatureofTxError, setNatureofTxError] = useState('');
  const [grossAmountError, setGrossAmountError] = useState('');
  const [netAmountError, setNetAmountError] = useState('');
  const [Loading, setLoading] = useState(false);
  //for dropdown data
  const [amcdata, setAmcdata] = useState<any>([]);
  const [accountData, setAccountData] = useState<any>([]);
  const [allModeTxData, setAllModeTxData] = useState<any>([]);
  const [allModePayData, setAllModePayData] = useState<any>([]);
  const [allFunds, setAllFunds] = useState<any>([]);
  const [allTxData, setAllTxData] = useState<any>([]);
  React.useEffect(() => {
    const fetchAmc = async () => {
      accountData.length = 0;
      setAccountData(accountData)
      //get all Amc for dropdown
      try {
        const amcResponse = await getAmc(email);
        setAmcdata(amcResponse.data.data);
      } catch (error) { }
      //get tx nature data for dropdown
      try {
        const response = await getNatureOfTx(email);
        setAllTxData(response.data.data);
      } catch (error) { }
      try {
        const response = await getModeOfTx(email);
        setAllModeTxData(response.data.data);
      } catch (error) { }
      try {
        const response = await getModeOfPayments(email);
        setAllModePayData(response.data.data);
      } catch (error) { }
    };
    fetchAmc();
  }, []);
  const getfundAndAccountByAmcCode = async (code: string) => {
    allFunds.length = 0;
    setAllFunds(allFunds)
    //get funds by amc for dropdown
    try {
      const response = await getFundByAmc(email, code);
      setAllFunds(response.data.data);
    } catch (error) { }
    try {
      const accResponse = await getAccountByAmc(email, code);
      setAccountData(accResponse.data.data);
    } catch (error) { }
  }
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
    return accountData.map((item: any, index: string) => {
      return (
        <option key={index} value={item.account_no} >{item.account_no}</option>
      );
    });
  }
  //render dropdown for branch name data
  const renderModeOfTxDropdown = () => {
    return allModeTxData.map((item: any, index: string) => {
      return (
        <option key={index} value={item.name}>{item.name}</option>
      );
    });
  }
  const renderModeOfPayDropdown = () => {
    return allModePayData.map((item: any, index: string) => {
      return (
        <option key={index} value={item.name}>{item.name}</option>
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
  //render dropdown for nature of transaction data
  const renderNatureOfTxDropdown = () => {
    return allTxData.map((item: any, index: string) => {
      return (
        <option key={index} value={item.name}>{item.name}</option>
      );
    });
  }
  const validate = () => {
    let amcNameErr, fundErr, accNoErr, modeofPaymentErr, modeOfTxErr, NatureofTxErr, grossAmountErr, netAmountErr = "";

    amcName.trim() === '' ? amcNameErr = "Required" : amcNameErr = "";
    fund.trim() === '' ? fundErr = "Required" : fundErr = "";
    accNo.trim() === '' ? accNoErr = "Required" : accNoErr = "";
    modeofPayment.trim() === '' ? modeofPaymentErr = "Required" : modeofPaymentErr = "";
    modeOfTx.trim() === '' ? modeOfTxErr = "Required" : modeOfTxErr = "";
    NatureofTx.trim() === '' ? NatureofTxErr = "Required" : NatureofTxErr = "";
    grossAmount.trim() === '' ? grossAmountErr = "Required" : grossAmountErr = "";
    netAmount.trim() === '' ? netAmountErr = "Required" : netAmountErr = "";
    if (amcNameErr || fundErr || accNoErr || modeofPaymentErr || modeOfTxErr || NatureofTxErr || grossAmountErr || netAmountErr) {
      setAmcError(amcNameErr)
      setFundError(fundErr)
      setAccNoError(accNoErr)
      setModeofPaymentError(modeofPaymentErr)
      setModeOfTxError(modeOfTxErr)
      setNatureofTxError(NatureofTxErr)
      setGrossAmountError(grossAmountErr)
      setNetAmountError(netAmountErr)
      return false;
    } else {
      return true;
    }
  }
  const addBankTransaction = async () => {
    const isValid = validate();
    if (isValid) {
      setLoading(true);
      try {
        const response = await addProfitTransaction(email, fund, accNo, modeofPayment, NatureofTx, modeOfTx, grossAmount, netAmount, amcName);
        setAmcName('')
        setFund('')
        setAccNo('')
        setModeofPayment('')
        setModeOfTx('')
        setNatureofTx('')
        setGrossAmount('')
        setNetAmount('')
        toast.success('Transaction successfully added');
      } catch (error) {
        console.log(error.response.data.message[0]);
        toast.error(error.response.data.message[0]);
      }
      setLoading(false);
    } else {
      setLoading(false);
    }
  }
  console.log('amc data ===>', amcdata)
  return (
    <>
      <Container fluid>
        <ToastContainer limit={1} />
        <Header />
        <div className="body-pad">
          <h1 className="mb-1">Bank Charges / Profit</h1>
          {/* <h1>Transaction</h1> */}
          <div className="form-holder">
            <div className="title-row">
            </div>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">AMC Name</p>
                  <div className="input-1">
                    <select className="input-1" defaultValue={amcName} onChange={(e) => {
                      console.log(e.target)
                      let value = amcdata.filter((item: any) => {
                        return item.amc_code === e.target.value;
                      })
                      setAmcName(value[0].name);
                      setAmcError('');
                      getfundAndAccountByAmcCode(e.target.value);
                    }}>
                      <option value="" defaultChecked hidden> Select An AMC</option>
                      {renderAmcDropdown()}
                    </select>
                    {amcNameError ? <p className="error-labels error-message2">{amcNameError}</p> : ''}
                  </div>
                </div>
              </Col>
              <Col md="6">
                <div className="input-holder right">
                  <p className="label">Fund Name</p>
                  <ReactTooltip textColor='white' backgroundColor='#1c5556' effect="float" />
                  <div className="input-1" data-tip="First Select Amc">
                    <select className="input-1" value={fund} onChange={(e) => { setFundError(''); setFund(e.target.value) }}>
                      <option value="" defaultChecked hidden> Select Fund</option>
                      {renderFundsDropdown()}
                    </select>
                    {fundError ? <p className="error-labels error-message">{fundError}</p> : ''}
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Account No</p>
                  <div className="input-1" data-tip="First Select Amc">
                    <select className="input-1" value={accNo} onChange={(e) => { setAccNoError(''); setAccNo(e.target.value) }}>
                      <option value="" defaultChecked hidden> Select Account</option>
                      {renderAccountNoDropdown()}
                    </select>
                    {accNoError ? <p className="error-labels error-message2">{accNoError}</p> : ''}
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
                    <select className="input-1" value={modeofPayment} onChange={(e) => { setModeofPaymentError(''); setModeofPayment(e.target.value) }}>
                      <option value="" defaultChecked hidden> Select Payment</option>
                      {renderModeOfPayDropdown()}
                    </select>
                    {modeofPaymentError ? <p className="error-labels error-message2">{modeofPaymentError}</p> : ''}
                  </div>
                </div>
              </Col>
              <Col md="6">
                <div className="input-holder right">
                  <p className="label">Instrument Type</p>
                  <div className="input-1">
                    <select className="input-1" value={modeOfTx} onChange={(e) => { setModeOfTxError(''); setModeOfTx(e.target.value) }}>
                      <option value="" defaultChecked hidden> Select Mode</option>
                      {renderModeOfTxDropdown()}
                    </select>
                    {modeOfTxError ? <p className="error-labels error-message">{modeOfTxError}</p> : ''}
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Nature of Transaction</p>
                  <div className="input-1">
                    <select className="input-1" value={NatureofTx} onChange={(e) => { setNatureofTxError(''); setNatureofTx(e.target.value) }}>
                      <option value="" defaultChecked hidden> Select Nature</option>
                      {renderNatureOfTxDropdown()}
                    </select>
                    {NatureofTxError ? <p className="error-labels error-message2">{NatureofTxError}</p> : ''}
                  </div>
                </div>
              </Col>
              <Col md="6">
                <div className="input-holder right">
                  <p className="label">Gross Amount</p>
                  <div className="input-1">
                    <input type="text" className="input-1" value={grossAmount} onChange={(e) => {
                      setGrossAmount(e.target.value);
                      setGrossAmountError('');
                    }}
                    />
                    {grossAmountError ? <p className="error-labels error-message">{grossAmountError}</p> : ''}
                  </div>
                </div>
              </Col>
            </Row>
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

            <button className="btn-3" onClick={addBankTransaction} disabled={Boolean(Loading)}>
              {Loading ? <><span className="spinner-border login-txt spinner-border-sm" role="status" aria-hidden="true"></span>
                <span className="login-txt"> Loading...</span></> : <p>Create</p>}
            </button>
          </div>

        </div>
      </Container>
    </>
  )
};

export default BankChanges;