import React from 'react';
import Header from './../components/Header';
import { useState } from 'react';
import { getAmc } from './../stores/services/amc.service';
import { getFundByAmc, getInstrumentType } from './../stores/services/funds.service';
import { getModeOfTx } from './../stores/services/transactions.service';
import { addMoneyMerketTransaction } from './../stores/services/transactions.service';
import { getAccountByAmc } from './../stores/services/account.service';
import { getAllSecurities } from './../stores/services/security.service';
import ReactTooltip from 'react-tooltip';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const MoneyMarket = () => {
  //hooks for getting all inputs from user
  const [amcName, setAmcName] = useState('');
  const [fund, setFund] = useState('')
  const [accNo, setAccNo] = useState('');
  const [mot, SetMot] = useState('');
  const [instrumentType, setInstrumentType] = useState('');
  const [instrumentNo, setInstrumentNo] = useState('');
  const [instrumentDate, setInstrumentDate] = useState('');
  const [cPartySgl, setCPartySgl] = useState('');
  const [cPartyName, setCPartyName] = useState('');
  const [cPartyBank, setCPartyBank] = useState('');
  const [broker, setBroker] = useState('');
  const [typeOfSecurity, setTypeOfSecurity] = useState('');
  const [issDate, setIssDate] = useState('');
  const [matDate, setMataDate] = useState('');
  const [faceValue, setfaceValue] = useState('');
  const [coupon, setCoupon] = useState('');
  const [price, setPrice] = useState('');
  const [settleDate, setSettleDate] = useState('');
  const [settleAmount, setSettleAmount] = useState('');
  const [netAmount, setNetAmount] = useState('');
  const [trx_id, setTrx_id] = useState<string>('')
  const tx = sessionStorage.getItem('rejectedTxName') || '';
  React.useEffect(() => {
    const txName = sessionStorage.getItem('rejectedTxName') || '';
    const flag = sessionStorage.getItem('rejectedFlag') || false;
    if (flag && txName === 'moneymarketsettlement') {
      const obj = JSON.parse(sessionStorage.getItem('rejectedTxObj') || "");
      setAmcName(obj.amc_name)
      setInstrumentDate(obj.instrument_date);
      setInstrumentType(obj.instrument_type);
      setTrx_id(obj.txn_id)
      setInstrumentNo(obj.instrument_no)
      setNetAmount(obj.net_amount)
      setFund(obj.fund);
      setAccNo(obj.account_no);
      setAmcName(obj.amc_name);
      setTypeOfSecurity(obj.type_of_security)
      SetMot(obj.type_of_transaction)

      setCPartySgl(obj.counter_party_sglacc);
      setCPartyName(obj.counter_party_name);
      setCPartyBank(obj.counter_party_bank);
      setBroker(obj.broker);
      setIssDate(obj.issue_date);
      setMataDate(obj.maturity_date);
      setfaceValue(obj.face_value);
      setCoupon(obj.coupon);
      setPrice(obj.price);
      setSettleDate(obj.settlement_date);
      setSettleAmount(obj.settlement_amount)
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
  const [amcNameError, setAmcError] = useState('');
  const [fundError, setFundError] = useState('');
  const [accNoError, setAccNoError] = useState('');
  const [motError, SetMotError] = useState('');
  const [instrumentTypeError, setInstrumentTypeError] = useState('');
  const [instrumentNoError, setInstrumentNoError] = useState('');
  const [instrumentDateError, setInstrumentDateError] = useState('');
  const [netAmountError, setNetAmountError] = useState('');
  const [cPartySglError, setCPartySglError] = useState('');
  const [cPartyNameError, setCPartyNameError] = useState('');
  const [cPartyBankError, setCPartyBankError] = useState('');
  const [brokerError, setBrokerErrorError] = useState('');
  const [typeOfSecurityError, setTypeOfSecurityError] = useState('');
  const [issDateError, setIssDateError] = useState('');
  const [matDateError, setMataDateError] = useState('');
  const [faceValueError, setfaceValueError] = useState('');
  const [couponError, setCouponError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [settleDateError, setSettleDateError] = useState('');
  const [settleAmountError, setSettleAmountError] = useState('');
  // const [fileUploadError, setFileUploadError] = useState('');
  const [Loading, setLoading] = useState(false);
  //for dropdown data
  const [amcdata, setAmcdata] = useState<any>([]);
  const [allFunds, setAllFunds] = useState<any>([]);
  const [accountNoData, setAccountNoData] = useState<any>([]);
  const [MOTData, setMOTData] = useState<any>([]);
  const [iTypeData, setITypeData] = useState<any>([]);
  const [securityTypeData, setSecurityTypeData] = useState<any>([]);
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
      //get all security data
      try {
        const motResponse = await getAllSecurities(email);
        setSecurityTypeData(motResponse.data.data);
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
  //render dropdown for nature of transaction data
  const renderMOTDropdown = () => {
    return MOTData.map((item: any, index: string) => {
      return (
        <option key={index} value={item.name}>{item.name}</option>
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
  //render dropdown for security data
  const renderSecurityDataDropdown = () => {
    return securityTypeData.map((item: any, index: string) => {
      return (
        <option key={index} value={item.name}>{item.name}</option>
      );
    });
  }
  const validate = () => {
    let amcErr, fundErr, accNoErr, iTypeErr, sglErr, cPartyNameErr, cPartyBankErr, brokerErr, typeOfSecurityErr, issDateErr, matDateErr = "";
    let iNoErr, iDateErr, motErr, netErr, faceValueErr, couponErr, priceErr, settleDateErr, settleAmountErr = "";
    console.log("amc name =====>", amcName)
    amcName.trim() === '' ? amcErr = "Required" : amcErr = "";
    fund.trim() === '' ? fundErr = "Required" : fundErr = "";
    accNo.trim() === '' ? accNoErr = "Required" : accNoErr = "";
    instrumentType.trim() === '' ? iTypeErr = "Required" : iTypeErr = "";
    instrumentNo.trim() === '' ? iNoErr = "Required" : iNoErr = "";
    instrumentDate.trim() === '' ? iDateErr = "Required" : iDateErr = "";
    mot.trim() === '' ? motErr = "Required" : motErr = "";
    cPartySgl.trim() === '' ? sglErr = "Required" : sglErr = "";
    cPartyName.trim() === '' ? cPartyNameErr = "Required" : cPartyNameErr = "";
    cPartyBank.trim() === '' ? cPartyBankErr = "Required" : cPartyBankErr = "";
    broker.trim() === '' ? brokerErr = "Required" : brokerErr = "";
    typeOfSecurity.trim() === '' ? typeOfSecurityErr = "Required" : typeOfSecurityErr = "";
    issDate.trim() === '' ? issDateErr = "Required" : issDateErr = "";
    matDate.trim() === '' ? matDateErr = "Required" : matDateErr = "";
    faceValue.trim() === '' ? faceValueErr = "Required" : faceValueErr = "";
    coupon.trim() === '' ? couponErr = "Required" : couponErr = "";
    price.trim() === '' ? priceErr = "Required" : priceErr = "";
    settleDate.trim() === '' ? settleDateErr = "Required" : settleDateErr = "";
    settleAmount.trim() === '' ? settleAmountErr = "Required" : settleAmountErr = "";
    netAmount.trim() === '' ? netErr = "Required" : netErr = "";
    if (amcErr || fundErr || accNoErr || sglErr || cPartyNameErr || cPartyBankErr || brokerErr || typeOfSecurityErr || issDateErr || matDateErr ||
      iTypeErr || iNoErr || iDateErr || motErr || netErr || faceValueErr || couponErr || priceErr || settleDateErr || settleAmountErr) {
      setAmcError(amcErr);
      setFundError(fundErr);
      setAccNoError(accNoErr);
      setInstrumentTypeError(iTypeErr);
      setInstrumentNoError(iNoErr)
      setInstrumentDateError(iDateErr);
      SetMotError(motErr);
      setCPartySglError(sglErr)
      setCPartyNameError(cPartyNameErr)
      setCPartyBankError(cPartyBankErr)
      setBrokerErrorError(brokerErr)
      setTypeOfSecurityError(typeOfSecurityErr)
      setIssDateError(issDateErr)
      setMataDateError(matDateErr)
      setfaceValueError(faceValueErr)
      setCouponError(couponErr)
      setPriceError(priceErr)
      setSettleDateError(settleDateErr)
      setSettleAmountError(settleAmountErr)
      setNetAmountError(netErr);
      return false;
    } else {
      return true;
    }
  }
  const AddMoneyMarketTransaction = async () => {
    const isValid = validate();
    if (isValid) {
      setLoading(true);
      try {
        const response = await addMoneyMerketTransaction(email, amcName, accNo, fund, mot, cPartyName, broker, instrumentDate, instrumentType, cPartyBank, cPartySgl, instrumentNo, typeOfSecurity, matDate, coupon, settleDate, netAmount, issDate, faceValue, price, settleAmount, trx_id);
        setAmcName('');
        setFund('');
        setAccNo('');
        setInstrumentDate('');
        setInstrumentNo('');
        setInstrumentType('');
        SetMot('');
        setCPartySgl('');
        setCPartyName('');
        setCPartyBank('');
        setBroker('');
        setTypeOfSecurity('');
        setIssDate('');
        setMataDate('');
        setfaceValue('');
        setTrx_id('');
        setCoupon('');
        setPrice('');
        setSettleDate('');
        setSettleAmount('')
        setNetAmount('');
        sessionStorage.removeItem('rejectedTxObj');
        sessionStorage.removeItem('rejectedTxName');
        sessionStorage.removeItem('rejectedFlag');
        toast.success(response.data.message);
      } catch (error) {
        console.log(error.response.data.message[0]);
        toast.error(error.response.data.message[0]);
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
          <h1 className="mb-1">{tx === 'moneymarketsettlement' ? 'Edit Money Market' : 'Money Market'}</h1>
          {/* <h1>Transaction</h1> */}
          <div className="form-holder">
            <div className="title-row">
            </div>
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
                  <p className="label">Counter Party SGL / IPS Acc</p>
                  <input type="text" className="input-1" value={cPartySgl} onChange={(e) => {
                    setCPartySgl(e.target.value);
                    setCPartySglError('');
                  }}
                  />
                  {cPartySglError ? <p className="error-labels error-message">{cPartySglError}</p> : ''}
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Counter Party Name</p>
                  <input type="text" className="input-1" value={cPartyName} onChange={(e) => {
                    setCPartyName(e.target.value);
                    setCPartyNameError('');
                  }}
                  />
                  {cPartyNameError ? <p className="error-labels error-message2">{cPartyNameError}</p> : ''}
                </div>
              </Col>
              <Col md="6">
                <div className="input-holder right">
                  <p className="label">Counter Party Bank Detail</p>
                  <input type="text" className="input-1" value={cPartyBank} onChange={(e) => {
                    setCPartyBank(e.target.value);
                    setCPartyBankError('');
                  }}
                  />
                  {cPartyBankError ? <p className="error-labels error-message">{cPartyBankError}</p> : ''}
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Broker</p>
                  <input type="text" className="input-1" value={broker} onChange={(e) => {
                    setBroker(e.target.value);
                    setBrokerErrorError('');
                  }}
                  />
                  {brokerError ? <p className="error-labels error-message2">{brokerError}</p> : ''}
                </div>
              </Col>
            </Row>
            <div className="line"></div>
            {/* <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Instrument Date</p>
                  <input type="date" className="input-1" value={instrumentDate} onChange={(e) => {
                    setInstrumentDate(e.target.value);
                    setInstrumentDateError('');
                  }}
                  />
                  {instrumentDateError ? <p className="error-labels error-message2">{instrumentDateError}</p> : ''}
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
            <div className="line"></div> */}
            <p className="t-3 mb-2">Security Info</p>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Type of Security</p>
                  <div className="input-1">
                    <select className="input-1" value={typeOfSecurity} onChange={(e) => { setTypeOfSecurityError(''); setTypeOfSecurity(e.target.value) }}>
                      <option value="" defaultChecked hidden> Select Account</option>
                      {renderSecurityDataDropdown()}
                    </select>
                    {typeOfSecurityError ? <p className="error-labels error-message2">{typeOfSecurityError}</p> : ''}
                  </div>
                </div>
              </Col>
              <Col md="6">
                <div className="input-holder right">
                  <p className="label">Issue Date</p>
                  <input type="date" className="input-1" value={issDate} onChange={(e) => {
                    setIssDate(e.target.value);
                    setIssDateError('');
                  }}
                  />
                  {issDateError ? <p className="error-labels error-message">{issDateError}</p> : ''}
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Maturity Date</p>
                  <input type="date" className="input-1" value={matDate} onChange={(e) => {
                    setMataDate(e.target.value);
                    setMataDateError('');
                  }}
                  />
                  {matDateError ? <p className="error-labels error-message2">{matDateError}</p> : ''}
                </div>
              </Col>
              <Col md="6">
                <div className="input-holder right">
                  <p className="label">Face Value</p>
                  <input type="text" className="input-1" value={faceValue} onChange={(e) => {
                    setfaceValue(e.target.value);
                    setfaceValueError('');
                  }}
                  />
                  {faceValueError ? <p className="error-labels error-message">{faceValueError}</p> : ''}
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Coupon / Yield</p>
                  <input type="text" className="input-1" value={coupon} onChange={(e) => {
                    setCoupon(e.target.value);
                    setCouponError('');
                  }}
                  />
                  {couponError ? <p className="error-labels error-message2">{couponError}</p> : ''}
                </div>
              </Col>
              <Col md="6">
                <div className="input-holder right">
                  <p className="label">Price</p>
                  <input type="text" className="input-1" value={price} onChange={(e) => {
                    setPrice(e.target.value);
                    setPriceError('');
                  }}
                  />
                  {priceError ? <p className="error-labels error-message">{priceError}</p> : ''}
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Settlement Date</p>
                  <input type="date" className="input-1" value={settleDate} onChange={(e) => {
                    setSettleDate(e.target.value);
                    setSettleDateError('');
                  }}
                  />
                  {settleDateError ? <p className="error-labels error-message2">{settleDateError}</p> : ''}
                </div>
              </Col>
              <Col md="6">
                <div className="input-holder right">
                  <p className="label">Settlement Amount</p>
                  <input type="text" className="input-1" value={settleAmount} onChange={(e) => {
                    setSettleAmount(e.target.value);
                    setSettleAmountError('');
                  }}
                  />
                  {settleAmountError ? <p className="error-labels error-message">{settleAmountError}</p> : ''}
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
                  <div className="multi-input disable">
                    <div className="input-2"><p>Select File</p></div>
                    <div className="icon"><img src="assets/upload.svg" alt="" width="20" /></div>
                  </div>
                </div>
              </Col>
            </Row>
            <div className="hov">
              <button className="btn-3" onClick={AddMoneyMarketTransaction} disabled={Boolean(Loading)}>
                {Loading ? <><span className="spinner-border login-txt spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className="login-txt"> Loading...</span></> : <p>{tx === 'moneymarketsettlement' ? 'Edit' : 'Create'}</p>}
              </button>
            </div>
          </div>

        </div>
      </Container>
    </>
  )
};

export default MoneyMarket;