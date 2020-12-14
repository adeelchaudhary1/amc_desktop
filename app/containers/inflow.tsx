import React from 'react';
import Header from './../components/Header';
import { useState } from 'react';
import { getAmc } from './../stores/services/amc.service';
import { getFundByAmc, getInstrumentType } from './../stores/services/funds.service';
import { getModeOfTx } from './../stores/services/transactions.service';
import { addInFlowTransaction } from './../stores/services/transactions.service';
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
const Inflow = () => {
  //hooks for getting all inputs from user
  const [amcName, setAmcName] = useState('');
  const [fund, setFund] = useState('')
  const [accNo, setAccNo] = useState('');
  const [mot, SetMot] = useState('');
  const [folioNo, setFilioNo] = useState('');
  const [beneData, setBeneData] = useState<any>({});
  const [instrumentType, setInstrumentType] = useState('');
  const [instrumentNo, setInstrumentNo] = useState('');
  const [instrumentDate, setInstrumentDate] = useState('');
  const [grossAmount, setGrossAmount] = useState('');
  const [netAmount, setNetAmount] = useState('');
  const [des, setDes] = useState('');
  const [trx_id, setTrx_id] = useState<string>('')
  React.useEffect(() => {
    const txName = sessionStorage.getItem('rejectedTxName') || '';
    const flag = sessionStorage.getItem('rejectedFlag') || false;
    if (flag && txName === 'inflow') {
      const obj = JSON.parse(sessionStorage.getItem('rejectedTxObj') || "");
      const beneobj = {
        'account_name': obj.name_of_beneficiary,
        'bank_name': obj.beneficiary_bank,
        'branch_name': obj.beneficiary_branch,
        'account_title': obj.beneficiary_account
      }
      setDes(obj.description)
      setBeneData(beneobj);
      setInstrumentDate(obj.instrument_date);
      setInstrumentType(obj.instrument_type);
      setFilioNo(obj.folio_no)
      setTrx_id(obj.txn_id)
      setInstrumentNo(obj.instrument_no)
      setGrossAmount(obj.gross_amount)
      setNetAmount(obj.net_amount)
      setFund(obj.fund);
      setAccNo(obj.account_no);
      setAmcName(obj.amc_name);
      SetMot(obj.type_of_transaction)
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
  // const [fileUpload, setFileUpload] = useState('');
  const email = sessionStorage.getItem('email') || '';
  //error getting hooks 
  const [amcNameError, setAmcError] = useState('');
  const [fundError, setFundError] = useState('');
  const [accNoError, setAccNoError] = useState('');
  const [motError, SetMotError] = useState('');
  const [folioNoError, setFilioNoError] = useState('');
  const [beneDataError, setBeneDataError] = useState('');
  const [instrumentTypeError, setInstrumentTypeError] = useState('');
  const [instrumentNoError, setInstrumentNoError] = useState('');
  const [instrumentDateError, setInstrumentDateError] = useState('');
  const [grossAmountError, setGrossAmountError] = useState('');
  const [netAmountError, setNetAmountError] = useState('');
  const [desError, setDesError] = useState('');
  // const [fileUploadError, setFileUploadError] = useState('');
  const [Loading, setLoading] = useState(false);
  //for dropdown data
  const [amcdata, setAmcdata] = useState<any>([]);
  const [allFunds, setAllFunds] = useState<any>([]);
  const [accountNoData, setAccountNoData] = useState<any>([]);
  const [MOPData, setMOPData] = useState<any>([]);
  const [MOTData, setMOTData] = useState<any>([]);
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
  console.log('amc data ===>', amcdata)

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
  const validate = () => {
    let amcErr, fundErr, accNoErr, folioErr, dataErr, iTypeErr = "";
    let iNoErr, iDateErr, grossErr, motErr, desErr, netErr = "";
    console.log("amc name =====>", amcName)
    amcName.trim() === '' ? amcErr = "Required" : amcErr = "";
    fund.trim() === '' ? fundErr = "Required" : fundErr = "";
    accNo.trim() === '' ? accNoErr = "Required" : accNoErr = "";
    folioNo.trim() === '' ? folioErr = "Required" : folioErr = "";
    beneData.length === 0 ? dataErr = "Required" : dataErr = "";
    instrumentType.trim() === '' ? iTypeErr = "Required" : iTypeErr = "";
    instrumentNo.trim() === '' ? iNoErr = "Required" : iNoErr = "";
    instrumentDate.trim() === '' ? iDateErr = "Required" : iDateErr = "";
    grossAmount.trim() === '' ? grossErr = "Required" : grossErr = "";
    mot.trim() === '' ? motErr = "Required" : motErr = "";
    netAmount.trim() === '' ? netErr = "Required" : netErr = "";
    des.trim() === '' ? desErr = "Required" : desErr = "";
    if (amcErr || fundErr || accNoErr || folioErr || dataErr ||
      iTypeErr || iNoErr || iDateErr || grossErr || motErr || netErr || desErr) {
      setAmcError(amcErr);
      setFundError(fundErr);
      setAccNoError(accNoErr);
      setFilioNoError(folioErr);
      setBeneDataError(dataErr);
      setInstrumentTypeError(iTypeErr);
      setInstrumentNoError(iNoErr)
      setInstrumentDateError(iDateErr);
      setGrossAmountError(grossErr);
      SetMotError(motErr);
      setNetAmountError(netErr);
      setDesError(desErr)
      return false;
    } else {
      return true;
    }
  }
  const AddInFlowTransaction = async () => {
    const isValid = validate();
    if (isValid) {
      setLoading(true);
      try {
        const response = await addInFlowTransaction(email, fund, 'a', accNo, mot, instrumentType, beneData.account_name, beneData.bank_name, beneData.branch_name, beneData.account_title, instrumentDate, instrumentNo, grossAmount, des, netAmount, amcName, trx_id, folioNo);
        setAmcName('');
        setFund('');
        setAccNo('');
        setFilioNo('');
        let array = {};
        setBeneData(array)
        setInstrumentDate('');
        setInstrumentNo('');
        setInstrumentType('');
        setGrossAmount('');
        SetMot('');
        setDes('');
        setNetAmount('');
        setTrx_id('');
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
          <h1 className="mb-1">{tx === 'inflow' ? 'Edit Inflow' : 'Inflow'}</h1>
          {/* <h1>Transaction</h1> */}
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
                  <div className="input-1" >
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
                  <p className="label">Type of Transaction</p>
                  <div className="input-1">
                    <select className="input-1" value={mot} onChange={(e) => { SetMotError(''); SetMot(e.target.value) }}>
                      <option value="" defaultChecked hidden>Select Type</option>
                      {renderMOTDropdown()}
                    </select>
                    {motError ? <p className="error-labels error-message">{motError}</p> : ''}
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
            {/* <div className="line"></div>

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
                  <p className="label">Instrument Date</p>
                  <input type="date" className="input-1" value={instrumentDate} onChange={(e) => {
                    setInstrumentDate(e.target.value);
                    setInstrumentDateError('');
                  }}
                  />
                  {instrumentDateError ? <p className="error-labels error-message2">{instrumentDateError}</p> : ''}
                </div>
              </Col>

            </Row> */}

            <div className="line"></div>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Description</p>
                  <input type="text" className="input-1" value={des} onChange={(e) => {
                    setDes(e.target.value);
                    setDesError('');
                  }}
                  />
                  {desError ? <p className="error-labels error-message2">{desError}</p> : ''}
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
                  <div className="multi-input disable">
                    <div className="input-2"><p>Select File</p></div>
                    <div className="icon"><img src="assets/upload.svg" alt="" width="20" /></div>
                  </div>
                </div>
              </Col>

            </Row>
            <div className="hov">
              <button className="btn-3" onClick={AddInFlowTransaction} disabled={Boolean(Loading)}>
                {Loading ? <><span className="spinner-border login-txt spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className="login-txt"> Loading...</span></> : <p>{tx === 'inflow' ? 'Edit' : 'Create'}</p>}
              </button>
            </div>
          </div>

        </div>
      </Container>
    </>
  )
};

export default Inflow;