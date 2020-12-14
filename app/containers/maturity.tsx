import React from 'react';
import Header from './../components/Header';
import { useState } from 'react';
import { getAmc } from './../stores/services/amc.service';
import { getFundByAmc, getInstrumentType } from './../stores/services/funds.service';
import { getModeOfPayments } from './../stores/services/transactions.service';
import { addMaturityTransaction, getNatureOfTx, getModeOfTx } from './../stores/services/transactions.service';
import { getAccountByAmc } from './../stores/services/account.service';
import { getAllUnitHolderByFolioNo } from './../stores/services/unit-holder.service';
import { getAllSecurities } from './../stores/services/security.service';
import ReactTooltip from 'react-tooltip';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Maturity = () => {
  //hooks for getting all inputs from user
  const [amcName, setAmcName] = useState('');
  const [fund, setFund] = useState('')
  const [accNo, setAccNo] = useState('');
  const [folioNo, setFilioNo] = useState('');
  const [beneData, setBeneData] = useState<any>({});
  const [instrumentType, setInstrumentType] = useState('');
  const [instrumentNo, setInstrumentNo] = useState('');
  const [instrumentDate, setInstrumentDate] = useState('');
  const [grossAmount, setGrossAmount] = useState('');
  const [netAmount, setNetAmount] = useState('');
  const [typeOfSecurity, setTypeOfSecurity] = useState('');
  const [issDate, setIssDate] = useState('');
  const [wht, setWht] = useState('');
  const [matDate, setMataDate] = useState('');
  const [faceValue, setfaceValue] = useState('');
  const [coupon, setCoupon] = useState('');
  const [price, setPrice] = useState('');
  const [natureTx, setNatureTx] = useState('');
  const [couponDate, setCoupondate] = useState('');
  const [trx_id, setTrx_id] = useState<string>('')
  React.useEffect(() => {
    const txName = sessionStorage.getItem('rejectedTxName') || '';
    const flag = sessionStorage.getItem('rejectedFlag') || false;
    if (flag && txName === 'maturity') {
      const obj = JSON.parse(sessionStorage.getItem('rejectedTxObj') || "");
      const beneobj = {
        'account_name': obj.name_of_beneficiary,
        'bank_name': obj.beneficiary_bank,
        'branch_name': obj.beneficiary_branch,
        'account_title': obj.beneficiary_account
      }
      setBeneData(beneobj);
      setInstrumentDate(obj.instrument_date);
      setInstrumentType(obj.instrument_type);
      setWht(obj.wht);
      setNatureTx(obj.nature_of_transaction);
      setFilioNo(obj.folio_no)
      setMataDate(obj.maturity_date)
      setTrx_id(obj.txn_id)
      setCoupon(obj.coupon)
      setCoupondate(obj.coupon_maturity_date)
      setIssDate(obj.issue_date)
      setTypeOfSecurity(obj.type_of_security)
      setInstrumentNo(obj.instrument_no)
      setGrossAmount(obj.gross_amount)
      setNetAmount(obj.net_amount)
      setFund(obj.fund);
      setPrice(obj.price);
      setfaceValue(obj.face_value)
      setAccNo(obj.account_no);
      setAmcName(obj.amc_name);
      SetMot(obj.type_of_transaction);
      getUnitHolderDetialByFolioNumber(obj.folio_no)
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
  const tx = sessionStorage.getItem('rejectedTxName') || '';

  //render dropdown for nature of transaction data
  const renderNatureOfTxDropdown = () => {
    return allTxData.map((item: any, index: string) => {
      return (
        <option key={index} value={item.name}>{item.name}</option>
      );
    });
  }
  // const [fileUpload, setFileUpload] = useState('');
  const email = sessionStorage.getItem('email') || '';
  //error getting hooks 
  const [couponDateError, setCoupondateError] = useState('');
  const [natureTxError, setNatureTxError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [couponError, setCouponError] = useState('');
  const [matDateError, setMataDateError] = useState('');
  const [faceValueError, setfaceValueError] = useState('');
  const [whtError, setWhtError] = useState('');
  const [typeOfSecurityError, setTypeOfSecurityError] = useState('');
  const [issDateError, setIssDateError] = useState('');
  const [amcNameError, setAmcError] = useState('');
  const [fundError, setFundError] = useState('');
  const [accNoError, setAccNoError] = useState('');
  const [folioNoError, setFilioNoError] = useState('');
  const [beneDataError, setBeneDataError] = useState('');
  const [instrumentTypeError, setInstrumentTypeError] = useState('');
  const [instrumentNoError, setInstrumentNoError] = useState('');
  const [instrumentDateError, setInstrumentDateError] = useState('');
  const [grossAmountError, setGrossAmountError] = useState('');
  const [netAmountError, setNetAmountError] = useState('');
  const [MOTData, setMOTData] = useState<any>([]);
  // const [fileUploadError, setFileUploadError] = useState('');
  const [Loading, setLoading] = useState(false);
  //for dropdown data
  const [amcdata, setAmcdata] = useState<any>([]);
  const [allFunds, setAllFunds] = useState<any>([]);
  const [accountNoData, setAccountNoData] = useState<any>([]);
  const [MOPData, setMOPData] = useState<any>([]);
  const [iTypeData, setITypeData] = useState<any>([]);
  const [mot, SetMot] = useState('');
  const [motError, SetMotError] = useState('');
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
  const getUnitHolderDetialByFolioNumber = async (code: string) => {
    //get funds by amc for dropdown
    try {
      const response = await getAllUnitHolderByFolioNo(email, code);
      if (response.data.status !== 400) {
        setBeneData(response.data.data);
        setFilioNoError('')
      } else {
        toast.error(response.data.message);
        setFilioNoError('Folio Number Not Exist')
        beneData.length = 0;
        setBeneData(beneData)
      }
    } catch (error) { }
  }

  const [allTxData, setAllTxData] = useState<any>([]);
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
      //get all getModeOfPayments list for dropdown
      try {
        const response = await getModeOfPayments(email);
        setMOPData(response.data.data);
      } catch (error) { }
      //get InstrumentType data
      try {
        const inTypeResponse = await getInstrumentType(email);
        setITypeData(inTypeResponse.data.data);
      } catch (error) { }
      //get mot data
      try {
        const inTypeResponse = await getModeOfTx(email);
        setMOTData(inTypeResponse.data.data);
      } catch (error) { }
      //get all security data
      try {
        const motResponse = await getAllSecurities(email);
        setSecurityTypeData(motResponse.data.data);
      } catch (error) { }
      try {
        const response = await getNatureOfTx(email);
        setAllTxData(response.data.data);
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
  //render dropdown for mot data
  const renderMotDropdown = () => {
    return MOTData.map((item: any, index: string) => {
      return (
        <option key={index} value={item.name}>{item.name}</option>
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
  //render dropdown for security data
  const renderSecurityDataDropdown = () => {
    return securityTypeData.map((item: any, index: string) => {
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

  const validate = () => {
    let amcErr, fundErr, accNoErr, folioNoErr, iTypeErr, typeOfSecurityErr, issDateErr, matDateErr, couponDateErr = "";
    let iNoErr, iDateErr, motErr, natureErr, netErr, whtErr, faceValueErr, couponErr, grossErr, priceErr, beneDataErr = "";
    amcName.trim() === '' ? amcErr = "Required" : amcErr = "";
    fund.trim() === '' ? fundErr = "Required" : fundErr = "";
    accNo.trim() === '' ? accNoErr = "Required" : accNoErr = "";
    folioNo.trim() === '' ? folioNoErr = "Required" : folioNoErr = "";
    instrumentType.trim() === '' ? iTypeErr = "Required" : iTypeErr = "";
    instrumentNo.trim() === '' ? iNoErr = "Required" : iNoErr = "";
    instrumentDate.trim() === '' ? iDateErr = "Required" : iDateErr = "";
    beneData.length === 0 ? beneDataErr = "Required" : beneDataErr = "";
    mot.trim() === '' ? motErr = "Required" : motErr = "";
    natureTx.trim() === '' ? natureErr = "Required" : natureErr = "";
    typeOfSecurity.trim() === '' ? typeOfSecurityErr = "Required" : typeOfSecurityErr = "";
    issDate.trim() === '' ? issDateErr = "Required" : issDateErr = "";
    wht.trim() === '' ? whtErr = "Required" : whtErr = "";
    matDate.trim() === '' ? matDateErr = "Required" : matDateErr = "";
    faceValue.trim() === '' ? faceValueErr = "Required" : faceValueErr = "";
    coupon.trim() === '' ? couponErr = "Required" : couponErr = "";
    price.trim() === '' ? priceErr = "Required" : priceErr = "";
    netAmount.trim() === '' ? netErr = "Required" : netErr = "";
    grossAmount.trim() === '' ? grossErr = "Required" : grossErr = "";
    couponDate.trim() === '' ? couponDateErr = "Required" : couponDateErr = "";
    if (amcErr || fundErr || accNoErr || folioNoErr || typeOfSecurityErr || issDateErr || matDateErr || grossErr || couponDateErr ||
      iTypeErr || iNoErr || iDateErr || motErr || natureErr || whtErr || netErr || faceValueErr || couponErr || priceErr || beneDataErr) {
      setAmcError(amcErr);
      setFundError(fundErr);
      setGrossAmountError(grossErr);
      setAccNoError(accNoErr);
      setFilioNoError(folioNoErr);
      setInstrumentTypeError(iTypeErr);
      setInstrumentNoError(iNoErr)
      setInstrumentDateError(iDateErr);
      SetMotError(motErr);
      setWhtError(whtErr);
      setNatureTxError(natureErr);
      setTrx_id('');
      setTypeOfSecurityError(typeOfSecurityErr)
      setIssDateError(issDateErr)
      setMataDateError(matDateErr)
      setfaceValueError(faceValueErr)
      setCouponError(couponErr)
      setPriceError(priceErr)
      setNetAmountError(netErr);
      setCoupondateError(couponDateErr)
      setBeneDataError(beneDataErr);
      return false;
    } else {
      return true;
    }
  }
  const AddMaturityTx = async () => {
    const isValid = validate();
    if (isValid) {
      setLoading(true);
      try {
        const response = await addMaturityTransaction(email, fund, accNo, beneData.account_name, beneData.bank_name, beneData.branch_name, beneData.account_title, instrumentDate, instrumentNo, instrumentType, mot, natureTx, typeOfSecurity, issDate, matDate, couponDate, coupon, price, faceValue, grossAmount, wht, netAmount, amcName, trx_id, folioNo);
        setAmcName('');
        setFund('');
        setAccNo('');
        setFilioNo('');
        let array = {};
        setBeneData(array)
        setInstrumentDate('');
        setInstrumentNo('');
        setInstrumentType('');
        SetMot('');
        setNatureTx('');
        setTypeOfSecurity('');
        setIssDate('');
        setMataDate('');
        setCoupondate('');
        setfaceValue('');
        setCoupon('');
        setPrice('');
        setNetAmount('');
        setGrossAmount('');
        setWht('');
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
          <h1 className="mb-1">{tx === 'maturity' ? 'Edit - Maturity - Transaction' : 'Maturity - Transaction'}</h1>
          {/* <h1>Maturity Transaction</h1> */}
          <div className="form-holder">
            <div className="title-row">
            </div>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Account No</p>
                  <div className="input-1">
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
                  <p className="label">Folio No</p>
                  <div className="input-1">
                    <input type="text" className="input-1" value={folioNo} onChange={(e) => {
                      setFilioNo(e.target.value.toUpperCase());
                      setFilioNoError('');
                      // getUnitHolderDetialByFolioNumber(e.target.value.toUpperCase())
                    }}
                      onBlur={() => { getUnitHolderDetialByFolioNumber(folioNo.toUpperCase()) }}
                    />
                    {folioNoError ? <p className="error-labels error-message2">{folioNoError}</p> : ''}
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Beneficiary Account Title</p>
                  <ReactTooltip textColor='white' backgroundColor='#1c5556' effect="float" />
                  <input type="text" className="input-1 disable-input" data-tip="Add Folio Number" placeholder={beneDataError ? 'Add Folio Number' : ''} value={beneData.account_name ? beneData.account_name : ''} readOnly />
                </div>
              </Col>
              <Col md="6">
                <div className="input-holder right">
                  <p className="label">Beneficiary Bank</p>
                  <input type="text" className="input-1 disable-input" data-tip="Add Folio Number" placeholder={beneDataError ? 'Add Folio Number' : ''} value={beneData.bank_name ? beneData.bank_name : ''} readOnly />
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Beneficiary Branch</p>
                  <input type="text" className="input-1 disable-input" data-tip="Add Folio Number" placeholder={beneDataError ? 'Add Folio Number' : ''} value={beneData.branch_name ? beneData.branch_name : ''} readOnly />
                </div>
              </Col>
              <Col md="6">
                <div className="input-holder right">
                  <p className="label">Beneficiary Bank Account Title</p>
                  <input type="text" className="input-1 disable-input" data-tip="Add Folio Number" placeholder={beneDataError ? 'Add Folio Number' : ''} value={beneData.account_title ? beneData.account_title : ''} readOnly />
                </div>
              </Col>
            </Row>
            <div className="line"></div>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Nature of Transaction</p>
                  <div className="input-1">
                    <select className="input-1" value={natureTx} onChange={(e) => { setNatureTxError(''); setNatureTx(e.target.value) }}>
                      <option value="" defaultChecked hidden>Select</option>
                      {renderNatureOfTxDropdown()}
                    </select>
                    {natureTxError ? <p className="error-labels error-message2">{natureTxError}</p> : ''}
                  </div>
                </div>
              </Col>
              <Col md="6">
                <div className="input-holder right">
                  <p className="label">Type of Transaction</p>
                  <div className="input-1" >
                    <select className="input-1" value={mot} onChange={(e) => { SetMotError(''); SetMot(e.target.value) }}>
                      <option value="" defaultChecked hidden>Select</option>
                      {renderMotDropdown()}
                    </select>
                    {motError ? <p className="error-labels error-message">{motError}</p> : ''}
                  </div>
                </div>
              </Col>
            </Row>
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

            </Row> */}

            <div className="line"></div>
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
                  <p className="label">Coupon Maturity Date</p>
                  <input type="date" className="input-1" value={couponDate} onChange={(e) => {
                    setCoupondate(e.target.value);
                    setCoupondateError('');
                  }}
                  />
                  {couponDateError ? <p className="error-labels error-message">{couponDateError}</p> : ''}
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
                  <p className="label">Face Value</p>
                  <input type="text" className="input-1" value={faceValue} onChange={(e) => {
                    setfaceValue(e.target.value);
                    setfaceValueError('');
                  }}
                  />
                  {faceValueError ? <p className="error-labels error-message2">{faceValueError}</p> : ''}
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
                  <p className="label">WHT</p>
                  <input type="text" className="input-1" value={wht} onChange={(e) => {
                    setWht(e.target.value);
                    setWhtError('');
                  }}
                  />
                  {whtError ? <p className="error-labels error-message2">{whtError}</p> : ''}
                </div>
              </Col>
              <Col md="6">
                <div className="input-holder right">
                  <p className="label">Net Amount</p>
                  <div className="input-1">
                    <input type="text" className="input-1" value={netAmount} onChange={(e) => {
                      setNetAmount(e.target.value);
                      setNetAmountError('');
                    }}
                    />
                    {netAmountError ? <p className="error-labels error-message">{netAmountError}</p> : ''}
                  </div>
                </div>
              </Col>
            </Row>

            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Using File Upload</p>
                  <div className="multi-input disable">
                    <div className="input-2"><p>Select File</p></div>
                    <div className="icon"><img src="assets/upload.svg" alt="" width="20" /></div>
                  </div>
                </div>
              </Col>
            </Row>
            <div className="hov">
              <button className="btn-3" onClick={AddMaturityTx} disabled={Boolean(Loading)}>
                {Loading ? <><span className="spinner-border login-txt spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className="login-txt"> Loading...</span></> : <p>{tx === 'maturity' ? 'Edit' : 'Create'}</p>}
              </button>
            </div>
          </div>

        </div>
      </Container>
    </>
  )
};

export default Maturity;