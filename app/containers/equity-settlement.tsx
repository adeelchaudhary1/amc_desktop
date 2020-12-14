import React from 'react';
import Header from './../components/Header';
import { useState } from 'react';
import { getAmc } from './../stores/services/amc.service';
import { getFundByAmc, getInstrumentType } from './../stores/services/funds.service';
import { getModeOfPayments } from './../stores/services/transactions.service';
import { addEquityTransaction, getModeOfTx } from './../stores/services/transactions.service';
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
const EquitySettlement = () => {
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
  const [nav, setNav] = useState('');
  const [unitRed, setUnitRed] = useState('');
  const [tradeType, setTradeType] = useState('');
  const [brokage, setBrokage] = useState('');
  const [fed, setFed] = useState('');
  const [tradeDate, setTradeDate] = useState('');
  const [sst, setSst] = useState('');
  const [commission, setCommission] = useState('');
  const [settleDate, setSettleDate] = useState('');
  const [brokerCode, setBrokerCode] = useState('');
  const [brokerName, setBrokerName] = useState('');
  const [volume, setVolume] = useState('');
  const [avgRate, setAvgRate] = useState('');

  const [trx_id, setTrx_id] = useState<string>('')
  const tx = sessionStorage.getItem('rejectedTxName') || '';
  React.useEffect(() => {
    const txName = sessionStorage.getItem('rejectedTxName') || '';
    const flag = sessionStorage.getItem('rejectedFlag') || false;
    if (flag && txName === 'equitysettlement') {
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
      setSettleDate(obj.settlement_date);
      setFilioNo(obj.folio_no);
      const beneobj = {
        'account_name': obj.name_of_beneficiary,
        'bank_name': obj.beneficiary_bank,
        'branch_name': obj.beneficiary_branch,
        'account_title': obj.beneficiary_account,
        'balance_unit': obj.total_units
      }
      setBeneData(beneobj);
      setUnitRed(obj.unit_redeemed);
      setNav(obj.nav);
      setTypeOfSecurity(obj.symbol);
      setBrokage(obj.brokage);
      setFed(obj.fed);
      setSst(obj.sst);
      setGrossAmount(obj.gross_amount);
      setTradeDate(obj.trade_date)
      setTradeType(obj.trade_type);
      setCommission(obj.commission);
      setBrokerCode(obj.broker_code);
      setBrokerName(obj.broker_name);
      setVolume(obj.volume);
      setAvgRate(obj.avg_rate);
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
  const [typeOfSecurityError, setTypeOfSecurityError] = useState('');
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
  const [navError, setNavError] = useState('');
  const [unitRedError, setUnitRedError] = useState('');
  const [MOTData, setMOTData] = useState<any>([]);

  const [tradeTypeError, setTradeTypeError] = useState('');
  const [brokageError, setBrokageError] = useState('');
  const [fedError, setFedErrorError] = useState('');
  const [tradeDateError, setTradeDateError] = useState('');
  const [sstError, setSstError] = useState('');
  const [commissionError, setCommissionError] = useState('');
  const [settleDateError, setSettleDateError] = useState('');
  const [brokerCodeError, setBrokerCodeError] = useState('');
  const [brokerNameError, setBrokerNameError] = useState('');
  const [volumeError, setVolumeError] = useState('');
  const [avgRateError, setAvgRateError] = useState('');
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
    let amcErr, fundErr, accNoErr, folioErr, typeOfSecurityErr, navErr, unitRedErr, dataErr, iTypeErr = "";
    let iNoErr, iDateErr, grossErr, netErr, motErr, tradeErr, brokageErr, fedErr, tradeDateErr, sstErr, comErr, settleDateErr, brokerCodeErr, brokerNameErr, volumeErr, avgRateErr = "";
    console.log("amc name =====>", amcName)
    amcName.trim() === '' ? amcErr = "Required" : amcErr = "";
    typeOfSecurity.trim() === '' ? typeOfSecurityErr = "Required" : typeOfSecurityErr = "";
    fund.trim() === '' ? fundErr = "Required" : fundErr = "";
    accNo.trim() === '' ? accNoErr = "Required" : accNoErr = "";
    folioNo.trim() === '' ? folioErr = "Required" : folioErr = "";
    nav.trim() === '' ? navErr = "Required" : navErr = "";
    unitRed.trim() === '' ? unitRedErr = "Required" : unitRedErr = "";
    beneData.length === 0 ? dataErr = "Required" : dataErr = "";
    instrumentType.trim() === '' ? iTypeErr = "Required" : iTypeErr = "";
    instrumentNo.trim() === '' ? iNoErr = "Required" : iNoErr = "";
    instrumentDate.trim() === '' ? iDateErr = "Required" : iDateErr = "";
    grossAmount.trim() === '' ? grossErr = "Required" : grossErr = "";
    netAmount.trim() === '' ? netErr = "Required" : netErr = "";
    mot.trim() === '' ? motErr = "Required" : motErr = "";
    tradeType.trim() === '' ? tradeErr = "Required" : tradeErr = "";
    brokage.trim() === '' ? brokageErr = "Required" : brokageErr = "";
    fed.trim() === '' ? fedErr = "Required" : fedErr = "";
    tradeDate.trim() === '' ? tradeDateErr = "Required" : tradeDateErr = "";
    sst.trim() === '' ? sstErr = "Required" : sstErr = "";
    commission.trim() === '' ? comErr = "Required" : comErr = "";
    settleDate.trim() === '' ? settleDateErr = "Required" : settleDateErr = "";
    brokerCode.trim() === '' ? brokerCodeErr = "Required" : brokerCodeErr = "";
    brokerName.trim() === '' ? brokerNameErr = "Required" : brokerNameErr = "";
    volume.trim() === '' ? volumeErr = "Required" : volumeErr = "";
    avgRate.trim() === '' ? avgRateErr = "Required" : avgRateErr = "";

    if (amcErr || fundErr || accNoErr || folioErr || typeOfSecurityErr || navErr || unitRedErr || dataErr ||
      iTypeErr || iNoErr || iDateErr || grossErr || netErr || motErr || tradeErr || brokageErr || fedErr || tradeDateErr || sstErr || comErr || settleDateErr || brokerCodeErr || brokerNameErr || volumeErr || avgRateErr) {
      setAmcError(amcErr);
      setFundError(fundErr);
      setAccNoError(accNoErr);
      setFilioNoError(folioErr);
      setTypeOfSecurityError(typeOfSecurityErr)
      setNavError(navErr);
      setUnitRedError(unitRedErr);
      setTypeOfSecurity('');
      setBeneDataError(dataErr);
      setInstrumentTypeError(iTypeErr);
      setInstrumentNoError(iNoErr)
      setInstrumentDateError(iDateErr);
      setGrossAmountError(grossErr);
      setNetAmountError(netErr);
      SetMotError(motErr)
      setTradeTypeError(tradeErr)
      setBrokageError(brokageErr)
      setFedErrorError(fedErr)
      setTradeDateError(tradeDateErr)
      setSstError(sstErr)
      setCommissionError(comErr)
      setSettleDateError(settleDateErr)
      setBrokerCodeError(brokerCodeErr)
      setBrokerNameError(brokerNameErr)
      setVolumeError(volumeErr)
      setAvgRateError(avgRateErr)
      return false;
    } else {
      return true;
    }
  }

  const addEquitySettlementTransaction = async () => {
    const isValid = validate();
    if (isValid) {
      setLoading(true);
      try {
        const response = await addEquityTransaction(email, fund, accNo, beneData.account_name, beneData.bank_name, beneData.branch_name, beneData.account_title, instrumentDate, typeOfSecurity, instrumentNo, instrumentType, mot, tradeType, brokage, grossAmount, fed, tradeDate, sst, commission, settleDate, netAmount, brokerCode, brokerName, volume, avgRate, amcName, folioNo, nav, beneData.balance_unit, unitRed, (+beneData.balance_unit - +unitRed).toString(), trx_id);
        setAmcName('');
        setFund('');
        setAccNo('');
        setUnitRed('');
        setFilioNo('');
        let array = {};
        setBeneData(array)
        setInstrumentDate('');
        setInstrumentNo('');
        setInstrumentType('');
        setGrossAmount('');
        SetMot('');
        setNetAmount('');
        setTypeOfSecurity('');
        setTradeType('');
        setBrokage('');
        setFed('');
        setTradeDate('');
        setSst('');
        setNav('');
        setCommission('');
        setSettleDate('');
        setBrokerCode('');
        setTrx_id('');
        setBrokerName('');
        setVolume('');
        setAvgRate('');
        sessionStorage.removeItem('rejectedTxObj');
        sessionStorage.removeItem('rejectedTxName');
        sessionStorage.removeItem('rejectedFlag');
        toast.success(response.data.message);
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
          <h1>{tx === 'equitysettlement' ? 'Edit - Equity Settlement' : 'Equity Settlement'}</h1>
          <div className="form-holder">
            <Row>
              {/* <Col md="6">
                <div className="input-holder left">
                  <p className="label">AMC Name</p>
                  {tx === 'equitysettlement' ?
                    <input type="text" className="input-1 " style={{ opacity: '0.6' }} value={amcName} readOnly />
                    :
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
                    </div>}
                </div>
              </Col> */}
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
              <Col md="6">
                <div className="input-holder right">
                  <p className="label">NAV</p>
                  <div className="input-1">
                    <input type="text" className="input-1" value={nav} onChange={(e) => {
                      setNav(e.target.value);
                      setNavError('');
                    }}
                    />
                    {navError ? <p className="error-labels error-message">{navError}</p> : ''}
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <ReactTooltip textColor='white' backgroundColor='#1c5556' effect="float" />
                  <p className="label">Total Units</p>
                  <input type="text" className="input-1 disable-input" data-tip="Add Folio Number" placeholder={beneDataError ? 'Add Folio Number' : ''} value={beneData.balance_unit ? beneData.balance_unit : ''} readOnly />
                </div>
              </Col>
              <Col md="6">
                <div className="input-holder right">
                  <p className="label">Units Redeemed</p>
                  <ReactTooltip textColor='white' backgroundColor='#1c5556' effect="float" />
                  <div className="input-1">
                    <input type="text" className="input-1" data-tip="Add Folio Number" value={unitRed} onChange={(e) => {
                      setUnitRed(e.target.value);
                      setUnitRedError('');
                    }}
                    />
                    {unitRedError ? <p className="error-labels error-message">{unitRedError}</p> : ''}
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Remain Units</p>
                  <input type="text" className="input-1 disable-input" data-tip="Add Folio Number" placeholder={beneDataError ? 'Add Folio Number' : ''} value={beneData.balance_unit ? (+beneData.balance_unit - +unitRed) : ''} readOnly />
                </div>
              </Col>
            </Row>
            <div className="line"></div>
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
            {/* <div className="line"></div>
            <Row>
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
                  <p className="label">Instrument Type</p>
                  <div className="input-1">
                    <select className="input-1" value={instrumentType} onChange={(e) => { setInstrumentTypeError(''); setInstrumentType(e.target.value) }}>
                      <option value="" defaultChecked hidden> Select Type</option>
                      {renderiTypeDataDropdown()}
                    </select>
                    {instrumentTypeError ? <p className="error-labels error-message">{instrumentTypeError}</p> : ''}
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Instrument No</p>
                  <input type="text" className="input-1" value={instrumentNo} onChange={(e) => {
                    setInstrumentNo(e.target.value);
                    setInstrumentNoError('');
                  }}
                  />
                  {instrumentNoError ? <p className="error-labels error-message2">{instrumentNoError}</p> : ''}
                </div>
              </Col>

            </Row> */}

            <div className="line"></div>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Trade Type</p>
                  <div className="input-1">
                    <input type="text" className="input-1" value={tradeType} onChange={(e) => {
                      setTradeType(e.target.value);
                      setTradeTypeError('');
                    }}
                    />
                    {tradeTypeError ? <p className="error-labels error-message2">{tradeTypeError}</p> : ''}
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Type of Transaction</p>
                  <div className="input-1" >
                    <select className="input-1" value={mot} onChange={(e) => { SetMotError(''); SetMot(e.target.value) }}>
                      <option value="" defaultChecked hidden>Select</option>
                      {renderMotDropdown()}
                    </select>
                    {motError ? <p className="error-labels error-message2">{motError}</p> : ''}
                  </div>
                </div>
              </Col>
              <Col md="6">
                <div className="input-holder right">
                  <p className="label">Type of Security</p>
                  <div className="input-1">
                    <select className="input-1" value={typeOfSecurity} onChange={(e) => { setTypeOfSecurityError(''); setTypeOfSecurity(e.target.value) }}>
                      <option value="" defaultChecked hidden> Select Account</option>
                      {renderSecurityDataDropdown()}
                    </select>
                    {typeOfSecurityError ? <p className="error-labels error-message">{typeOfSecurityError}</p> : ''}
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Brokage</p>
                  <input type="text" className="input-1" value={brokage} onChange={(e) => {
                    setBrokage(e.target.value);
                    setBrokageError('');
                  }}
                  />
                  {brokageError ? <p className="error-labels error-message2">{brokageError}</p> : ''}
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
                  <p className="label">FED</p>
                  <input type="text" className="input-1" value={fed} onChange={(e) => {
                    setFed(e.target.value);
                    setFedErrorError('');
                  }}
                  />
                  {fedError ? <p className="error-labels error-message2">{fedError}</p> : ''}
                </div>
              </Col>
              <Col md="6">
                <div className="input-holder right">
                  <p className="label">Trade Date</p>
                  <input type="date" className="input-1" value={tradeDate} onChange={(e) => {
                    setTradeDate(e.target.value);
                    setTradeDateError('');
                  }}
                  />
                  {tradeDateError ? <p className="error-labels error-message">{tradeDateError}</p> : ''}
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">SST</p>
                  <input type="text" className="input-1" value={sst} onChange={(e) => {
                    setSst(e.target.value);
                    setSstError('');
                  }}
                  />
                  {sstError ? <p className="error-labels error-message2">{sstError}</p> : ''}
                </div>
              </Col>
              <Col md="6">
                <div className="input-holder right">
                  <p className="label">Commission</p>
                  <input type="text" className="input-1" value={commission} onChange={(e) => {
                    setCommission(e.target.value);
                    setCommissionError('');
                  }}
                  />
                  {commissionError ? <p className="error-labels error-message">{commissionError}</p> : ''}
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
                  <p className="label">Broker Code</p>
                  <input type="text" className="input-1" value={brokerCode} onChange={(e) => {
                    setBrokerCode(e.target.value);
                    setBrokerCodeError('');
                  }}
                  />
                  {brokerCodeError ? <p className="error-labels error-message2">{brokerCodeError}</p> : ''}
                </div>
              </Col>
              <Col md="6">
                <div className="input-holder right">
                  <p className="label">Broker Name</p>
                  <input type="text" className="input-1" value={brokerName} onChange={(e) => {
                    setBrokerName(e.target.value);
                    setBrokerNameError('');
                  }}
                  />
                  {brokerNameError ? <p className="error-labels error-message">{brokerNameError}</p> : ''}
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Volume</p>
                  <input type="text" className="input-1" value={volume} onChange={(e) => {
                    setVolume(e.target.value);
                    setVolumeError('');
                  }}
                  />
                  {volumeError ? <p className="error-labels error-message2">{volumeError}</p> : ''}
                </div>
              </Col>
              <Col md="6">
                <div className="input-holder right">
                  <p className="label">Avg Rate</p>
                  <input type="text" className="input-1" value={avgRate} onChange={(e) => {
                    setAvgRate(e.target.value);
                    setAvgRateError('');
                  }}
                  />
                  {avgRateError ? <p className="error-labels error-message">{avgRateError}</p> : ''}
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
              <button className="btn-3" onClick={addEquitySettlementTransaction} disabled={Boolean(Loading)}>
                {Loading ? <><span className="spinner-border login-txt spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className="login-txt"> Loading...</span></> : <p>{tx === 'equitysettlement' ? 'Edit' : 'Create'}</p>}
              </button>
            </div>
          </div>

        </div>
      </Container>
    </>
  )
};

export default EquitySettlement;