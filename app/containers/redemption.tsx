import React from 'react';
import Header from './../components/Header';
import { useState } from 'react';
import { getAmc } from './../stores/services/amc.service';
import { getFundByAmc, getInstrumentType } from './../stores/services/funds.service';
import { getModeOfPayments } from './../stores/services/transactions.service';
import { addRedemptionTransaction } from './../stores/services/transactions.service';
import { getAccountByAmc } from './../stores/services/account.service';
import { getAllUnitHolderByFolioNo } from './../stores/services/unit-holder.service';
import ReactTooltip from 'react-tooltip';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Redemption = () => {
  //hooks for getting all inputs from user
  const [amcName, setAmcName] = useState('');
  const [fund, setFund] = useState('')
  const [accNo, setAccNo] = useState('');
  const [mop, SetMop] = useState('');
  const [folioNo, setFilioNo] = useState('');
  const [beneData, setBeneData] = useState<any>({});
  const [instrumentType, setInstrumentType] = useState('');
  const [instrumentNo, setInstrumentNo] = useState('');
  const [instrumentDate, setInstrumentDate] = useState('');
  const [grossAmount, setGrossAmount] = useState('');
  const [netAmount, setNetAmount] = useState('');
  const [zakat, setZakat] = useState('');

  const [redDate, setRedDate] = useState('');
  const [nav, setNav] = useState('');
  const [unitRed, setUnitRed] = useState('');
  const [cgt, setCgt] = useState('');
  const [backLoad, setBackLoad] = useState('');

  const [trx_id, setTrx_id] = useState<string>('')
  const tx = sessionStorage.getItem('rejectedTxName') || '';
  React.useEffect(() => {
    const txName = sessionStorage.getItem('rejectedTxName') || '';
    const flag = sessionStorage.getItem('rejectedFlag') || false;
    if (flag && txName === 'redemptionbank') {
      const obj = JSON.parse(sessionStorage.getItem('rejectedTxObj') || "");
      const beneobj = {
        'account_name': obj.name_of_beneficiary,
        'bank_name': obj.beneficiary_bank,
        'branch_name': obj.beneficiary_branch,
        'account_title': obj.beneficiary_account,
        'balance_unit': obj.total_units
      }
      setCgt(obj.cgt);
      setBackLoad(obj.back_load)
      setUnitRed(obj.units_redeemed)
      setRedDate(obj.date_of_redemption)
      setNav(obj.nav);

      setZakat(obj.zakat);
      setBeneData(beneobj);
      setInstrumentDate(obj.instrument_date);
      setInstrumentType(obj.instrument_type);
      setFilioNo('123XYZ');
      SetMop(obj.mode_of_payment)
      setTrx_id(obj.txn_id)
      setInstrumentNo(obj.instrument_no)
      setGrossAmount(obj.gross_amount)
      setNetAmount(obj.net_amount)
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
  const [amcNameError, setAmcError] = useState('');
  const [fundError, setFundError] = useState('');
  const [accNoError, setAccNoError] = useState('');
  const [mopError, SetMopError] = useState('');
  const [folioNoError, setFilioNoError] = useState('');
  const [beneDataError, setBeneDataError] = useState('');
  const [instrumentTypeError, setInstrumentTypeError] = useState('');
  const [instrumentNoError, setInstrumentNoError] = useState('');
  const [instrumentDateError, setInstrumentDateError] = useState('');
  const [grossAmountError, setGrossAmountError] = useState('');
  const [netAmountError, setNetAmountError] = useState('');
  const [zakatError, setZakatError] = useState('');

  const [redDateError, setRedDateError] = useState('');
  const [navError, setNavError] = useState('');
  const [unitRedError, setUnitRedError] = useState('');
  const [cgtError, setCgtError] = useState('');
  const [backLoadError, setBackLoadError] = useState('');
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
  //render dropdown for mop data
  const renderModeOfPayments = () => {
    return MOPData.map((item: any, index: string) => {
      return (
        <option key={index} value={item.name} >{item.name}</option>
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

  const validate = () => {
    let amcErr, fundErr, accNoErr, redDateErr, mopErr, folioErr, navErr, unitRedErr, dataErr, iTypeErr = "";
    let iNoErr, iDateErr, grossErr, cgtErr, zakatErr, backLoadErr, netErr = "";
    console.log("amc name =====>", amcName)
    amcName.trim() === '' ? amcErr = "Required" : amcErr = "";
    fund.trim() === '' ? fundErr = "Required" : fundErr = "";
    accNo.trim() === '' ? accNoErr = "Required" : accNoErr = "";
    redDate.trim() === '' ? redDateErr = "Required" : redDateErr = "";
    mop.trim() === '' ? mopErr = "Required" : mopErr = "";
    folioNo.trim() === '' ? folioErr = "Required" : folioErr = "";
    nav.trim() === '' ? navErr = "Required" : navErr = "";
    unitRed.trim() === '' ? unitRedErr = "Required" : unitRedErr = "";
    beneData.length === 0 ? dataErr = "Required" : dataErr = "";
    instrumentType.trim() === '' ? iTypeErr = "Required" : iTypeErr = "";
    instrumentNo.trim() === '' ? iNoErr = "Required" : iNoErr = "";
    instrumentDate.trim() === '' ? iDateErr = "Required" : iDateErr = "";
    grossAmount.trim() === '' ? grossErr = "Required" : grossErr = "";
    cgt.trim() === '' ? cgtErr = "Required" : cgtErr = "";
    zakat.trim() === '' ? zakatErr = "Required" : zakatErr = "";
    backLoad.trim() === '' ? backLoadErr = "Required" : backLoadErr = "";
    netAmount.trim() === '' ? netErr = "Required" : netErr = "";

    if (amcErr || fundErr || accNoErr || redDateErr || mopErr || folioErr || navErr || unitRedErr || dataErr ||
      iTypeErr || iNoErr || iDateErr || grossErr || cgtErr || zakatErr || backLoadErr || netErr) {
      setAmcError(amcErr);
      setFundError(fundErr);
      setAccNoError(accNoErr);
      setRedDateError(redDateErr);
      SetMopError(mopErr);
      setFilioNoError(folioErr);
      setNavError(navErr);
      setUnitRedError(unitRedErr);
      setBeneDataError(dataErr);
      setInstrumentTypeError(iTypeErr);
      setInstrumentNoError(iNoErr)
      setInstrumentDateError(iDateErr);
      setGrossAmountError(grossErr);
      setCgtError(cgtErr)
      setBackLoadError(backLoadErr)
      setZakatError(zakatErr)
      setNetAmountError(netErr);
      return false;
    } else {
      return true;
    }
  }

  const addRedemption = async () => {
    const isValid = validate();
    if (isValid) {
      setLoading(true);
      try {
        const response = await addRedemptionTransaction(email, amcName, fund, accNo, redDate, mop, folioNo, nav, beneData.balance_unit, unitRed, (+beneData.balance_unit - +unitRed).toString(), beneData.account_name, beneData.bank_name, beneData.branch_name, beneData.account_title, instrumentDate, instrumentNo, instrumentType, grossAmount, cgt, beneData.account_name, backLoad, zakat, netAmount, trx_id);
        setAmcName('');
        setFund('');
        setAccNo('');
        setRedDate('');
        SetMop('');
        setNav('');
        setCgt('')
        setBackLoad('');
        setUnitRed('');
        setFilioNo('');
        let array = {};
        setBeneData(array)
        setTrx_id('');
        setInstrumentDate('');
        setInstrumentNo('');
        setInstrumentType('');
        setGrossAmount('');
        setZakat('');
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
          <h1>{tx === 'redemptionbank' ? 'Edit Redemption' : 'Redemption'}</h1>
          <div className="form-holder">
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
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Mode Of Payment</p>
                  <div className="input-1">
                    <select className="input-1" value={mop} onChange={(e) => { SetMopError(''); SetMop(e.target.value) }}>
                      <option value="" defaultChecked hidden> Select Payment</option>
                      {renderModeOfPayments()}
                    </select>
                    {mopError ? <p className="error-labels error-message2">{mopError}</p> : ''}
                  </div>
                </div>
              </Col>
              <Col md="6">
                <div className="input-holder right">
                  <p className="label">Date of Redemption</p>
                  <div className="input-1">
                    <input type="date" className="input-1" value={redDate} onChange={(e) => {
                      setRedDate(e.target.value);
                      setRedDateError('');
                    }}
                    />
                    {redDateError ? <p className="error-labels error-message">{redDateError}</p> : ''}
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
                  <p className="label">Total Units</p>
                  <input type="text" className="input-1" placeholder={beneDataError ? 'Add Folio Number' : ''} value={beneData.balance_unit ? beneData.balance_unit : ''} readOnly />
                </div>
              </Col>
              <Col md="6">
                <div className="input-holder right">
                  <p className="label">Units Redeemed</p>
                  <div className="input-1">
                    <input type="text" className="input-1" value={unitRed} onChange={(e) => {
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
                  <input type="text" className="input-1" placeholder={beneDataError ? 'Add Folio Number' : ''} value={beneData.balance_unit ? (+beneData.balance_unit - +unitRed) : ''} readOnly />
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
            {/* <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Bank Account Title</p>
                  <div className="input-1"></div>
                </div>
              </Col>
            </Row> */}

            <div className="line"></div>
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
              <Col md="6">
                <div className="input-holder right">
                  <p className="label">Instrument Date</p>
                  <input type="date" className="input-1" value={instrumentDate} onChange={(e) => {
                    setInstrumentDate(e.target.value);
                    setInstrumentDateError('');
                  }}
                  />
                  {instrumentDateError ? <p className="error-labels error-message">{instrumentDateError}</p> : ''}
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
            <div className="line"></div>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Gross Amount</p>
                  <div className="input-1">
                    <input type="text" className="input-1" value={grossAmount} onChange={(e) => {
                      setGrossAmount(e.target.value);
                      setGrossAmountError('');
                    }}
                    />
                    {grossAmountError ? <p className="error-labels error-message2">{grossAmountError}</p> : ''}
                  </div>
                </div>
              </Col>
              <Col md="6">
                <div className="input-holder right">
                  <p className="label">CGT</p>
                  <div className="input-1">
                    <input type="text" className="input-1" value={cgt} onChange={(e) => {
                      setCgt(e.target.value);
                      setCgtError('');
                    }}
                    />
                    {cgtError ? <p className="error-labels error-message">{cgtError}</p> : ''}
                  </div>
                </div>
              </Col>
            </Row>
            {/* <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Instrument No</p>
                  <div className="input-1"></div>
                </div>
              </Col>
              <Col md="6">
                <div className="input-holder right">
                  <p className="label">Beneficiary</p>
                  <div className="input-1"></div>
                </div>
              </Col>
            </Row> */}
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Zakat</p>
                  <input type="text" className="input-1" value={zakat} onChange={(e) => {
                    setZakat(e.target.value);
                    setZakatError('');
                  }}
                  />
                  {zakatError ? <p className="error-labels error-message2">{zakatError}</p> : ''}
                </div>
              </Col>
              <Col md="6">
                <div className="input-holder right">
                  <p className="label">Back Load</p>
                  <div className="input-1">
                    <input type="text" className="input-1" value={backLoad} onChange={(e) => {
                      setBackLoad(e.target.value);
                      setBackLoadError('');
                    }}
                    />
                    {backLoadError ? <p className="error-labels error-message">{backLoadError}</p> : ''}
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
              <button className="btn-3" onClick={addRedemption} disabled={Boolean(Loading)}>
                {Loading ? <><span className="spinner-border login-txt spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className="login-txt"> Loading...</span></> : <p>{tx === 'redemptionbank' ? 'Edit' : 'Create'}</p>}
              </button>
            </div>
          </div>

        </div>
      </Container>
    </>
  )
};

export default Redemption;