import React from 'react';
import Header from './../components/Header';
import { useState } from 'react';
import { getAmc } from './../stores/services/amc.service';
import { getFundByAmc, getInstrumentType } from './../stores/services/funds.service';
import { getModeOfTx, addSaleUnitTransaction } from './../stores/services/transactions.service';
import { getAccountByAmc } from './../stores/services/account.service';
import {
    Container,
    Row,
    Col,
} from 'reactstrap';
import ReactTooltip from 'react-tooltip';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SaleOfUnit = () => {
    //hooks for getting all inputs from user
    const [amcName, setAmcName] = useState('');
    const [fund, setFund] = useState('')
    const [accNo, setAccNo] = useState('');
    const [mot, SetMot] = useState('');
    const [instrumentType, setInstrumentType] = useState('');
    const [folioNo, setFilioNo] = useState('');
    const [instrumentNo, setInstrumentNo] = useState('');
    const [instrumentDate, setInstrumentDate] = useState('');
    const [grossAmount, setGrossAmount] = useState('');
    const [netAmount, setNetAmount] = useState('');
    const [nav, setNav] = useState('');
    const [chequeReDate, setChequeRelDate] = useState('');
    const [saleDate, setSaleDate] = useState('');
    const [totalUnit, setTotalUnit] = useState('');
    const [saleLoad, setSaleLoad] = useState('');
    const [unitIssued, setUnitIssued] = useState('');

    const [trx_id, setTrx_id] = useState<string>('')
    const tx = sessionStorage.getItem('rejectedTxName') || '';
    React.useEffect(() => {
        const txName = sessionStorage.getItem('rejectedTxName') || '';
        const flag = sessionStorage.getItem('rejectedFlag') || false;
        if (flag && txName === 'saleofunit') {
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
            SetMot(obj.type_of_transaction);
            setFilioNo(obj.folio_no);
            setNav(obj.nav);
            setChequeRelDate(obj.cheque_release_date);
            setSaleDate(obj.sale_booking_date);
            setTotalUnit(obj.total_units);
            setUnitIssued(obj.unit_issued);
            setGrossAmount(obj.gross_amount);
            setSaleLoad(obj.sale_load)
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
        };
        fetchAmc();
    }, []);
    //error getting hooks 
    const [amcNameError, setAmcError] = useState('');
    const [fundError, setFundError] = useState('');
    const [accNoError, setAccNoError] = useState('');
    const [motError, SetMotError] = useState('');
    const [folioNoError, setFilioNoError] = useState('');
    const [instrumentTypeError, setInstrumentTypeError] = useState('');
    const [instrumentNoError, setInstrumentNoError] = useState('');
    const [instrumentDateError, setInstrumentDateError] = useState('');
    const [grossAmountError, setGrossAmountError] = useState('');
    const [netAmountError, setNetAmountError] = useState('');
    const [navError, setNavError] = useState('');
    const [chequeReDateError, setChequeRelDateError] = useState('');
    const [saleDateError, setSaleDateError] = useState('');
    const [totalUnitError, setTotalUnitError] = useState('');
    const [saleLoadError, setSaleLoadError] = useState('');
    const [unitIssuedError, setUnitIssuedError] = useState('');
    // const [fileUploadError, setFileUploadError] = useState('');
    const [Loading, setLoading] = useState(false);
    //for dropdown data
    const [amcdata, setAmcdata] = useState<any>([]);
    const [allFunds, setAllFunds] = useState<any>([]);
    const [accountNoData, setAccountNoData] = useState<any>([]);
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
        let amcErr, fundErr, accNoErr, folioErr, iTypeErr, navErr, chequeReDateErr, saleDateErr = "";
        let iNoErr, iDateErr, grossErr, motErr, netErr, totalUnitErr, saleLoadErr, unitissuedErr = "";
        console.log("amc name =====>", amcName)
        amcName.trim() === '' ? amcErr = "Required" : amcErr = "";
        fund.trim() === '' ? fundErr = "Required" : fundErr = "";
        accNo.trim() === '' ? accNoErr = "Required" : accNoErr = "";
        folioNo.length === 0 ? folioErr = "Required" : folioErr = "";
        instrumentType.trim() === '' ? iTypeErr = "Required" : iTypeErr = "";
        instrumentNo.trim() === '' ? iNoErr = "Required" : iNoErr = "";
        instrumentDate.trim() === '' ? iDateErr = "Required" : iDateErr = "";
        grossAmount.trim() === '' ? grossErr = "Required" : grossErr = "";
        mot.trim() === '' ? motErr = "Required" : motErr = "";
        netAmount.trim() === '' ? netErr = "Required" : netErr = "";
        nav.trim() === '' ? navErr = "Required" : navErr = "";
        chequeReDate.trim() === '' ? chequeReDateErr = "Required" : chequeReDateErr = "";
        saleDate.trim() === '' ? saleDateErr = "Required" : saleDateErr = "";
        totalUnit.trim() === '' ? totalUnitErr = "Required" : totalUnitErr = "";
        saleLoad.trim() === '' ? saleLoadErr = "Required" : saleLoadErr = "";
        unitIssued.trim() === '' ? unitissuedErr = "Required" : unitissuedErr = "";
        if (amcErr || fundErr || accNoErr || folioErr || navErr || chequeReDateErr || saleDateErr || totalUnitErr ||
            iTypeErr || iNoErr || iDateErr || grossErr || motErr || netErr || saleLoadErr || unitissuedErr) {
            setAmcError(amcErr);
            setFundError(fundErr);
            setAccNoError(accNoErr);
            setFilioNoError(folioErr);
            setInstrumentTypeError(iTypeErr);
            setInstrumentNoError(iNoErr)
            setInstrumentDateError(iDateErr);
            setGrossAmountError(grossErr);
            SetMotError(motErr);
            setNetAmountError(netErr);
            setNavError(navErr)
            setChequeRelDateError(chequeReDateErr)
            setSaleDateError(saleDateErr)
            setTotalUnitError(totalUnitErr)
            setSaleLoadError(saleLoadErr)
            setUnitIssuedError(unitissuedErr)
            return false;
        } else {
            return true;
        }
    }
    const addSaleOfUnitTx = async () => {
        const isValid = validate();
        if (isValid) {
            setLoading(true);
            try {
                const response = await addSaleUnitTransaction(email, amcName, fund, accNo, mot, folioNo, nav, instrumentDate, instrumentNo, instrumentType, chequeReDate, saleDate, totalUnit, unitIssued, saleLoad, grossAmount, netAmount, trx_id);
                setAmcName('');
                setFund('');
                setAccNo('');
                setFilioNo('');
                setInstrumentDate('');
                setInstrumentNo('');
                setInstrumentType('');
                setGrossAmount('');
                SetMot('');
                setTrx_id('');
                setNav('');
                setChequeRelDate('');
                setSaleDate('');
                setTotalUnit('');
                setSaleLoad('');
                setUnitIssued('');
                setNetAmount('');
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
                    <h1 className="mb-1">{tx === 'saleofunit' ? 'Edit - Sale of Unit' : 'Sale of Unit'}</h1>
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
                                        }}
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
                        </Row>
                        <div className="line"></div>
                        <Row>
                            <Col md="6">
                                <div className="input-holder left">
                                    <p className="label">Cheque Realised Date</p>
                                    <div className="input-1">
                                        <input type="date" className="input-1" value={chequeReDate} onChange={(e) => {
                                            setChequeRelDate(e.target.value);
                                            setChequeRelDateError('');
                                        }}
                                        />
                                        {chequeReDateError ? <p className="error-labels error-message2">{chequeReDateError}</p> : ''}
                                    </div>
                                </div>
                            </Col>
                            <Col md="6">
                                <div className="input-holder right">
                                    <p className="label">Sale Booking Date</p>
                                    <div className="input-1">
                                        <input type="date" className="input-1" value={saleDate} onChange={(e) => {
                                            setSaleDate(e.target.value);
                                            setSaleDateError('');
                                        }}
                                        />
                                        {saleDateError ? <p className="error-labels error-message">{saleDateError}</p> : ''}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <div className="line"></div>
                        <Row>
                            <Col md="6">
                                <div className="input-holder left">
                                    <p className="label">Total Unit</p>
                                    <div className="input-1">
                                        <input type="text" className="input-1" value={totalUnit} onChange={(e) => {
                                            setTotalUnit(e.target.value);
                                            setTotalUnitError('');
                                        }}
                                        />
                                        {totalUnitError ? <p className="error-labels error-message2">{totalUnitError}</p> : ''}
                                    </div>
                                </div>
                            </Col>
                            <Col md="6">
                                <div className="input-holder right">
                                    <p className="label">Sale Load</p>
                                    <div className="input-1">
                                        <input type="text" className="input-1" value={saleLoad} onChange={(e) => {
                                            setSaleLoad(e.target.value);
                                            setSaleLoadError('');
                                        }}
                                        />
                                        {saleLoadError ? <p className="error-labels error-message">{saleLoadError}</p> : ''}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <div className="input-holder left">
                                    <p className="label">Unit Issued</p>
                                    <div className="input-1">
                                        <input type="text" className="input-1" value={unitIssued} onChange={(e) => {
                                            setUnitIssued(e.target.value);
                                            setUnitIssuedError('');
                                        }}
                                        />
                                        {unitIssuedError ? <p className="error-labels error-message2">{unitIssuedError}</p> : ''}
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
                                    <p className="label">Upload</p>
                                    <div className="multi-input disable">
                                        <div className="input-2"><p>Select File</p></div>
                                        <div className="icon"><img src="assets/upload.svg" alt="" width="20" /></div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <div className="hov">
                            <button className="btn-3" onClick={addSaleOfUnitTx} disabled={Boolean(Loading)}>
                                {Loading ? <><span className="spinner-border login-txt spinner-border-sm" role="status" aria-hidden="true"></span>
                                    <span className="login-txt"> Loading...</span></> : <p>{tx === 'saleofunit' ? 'Edit' : 'Create'}</p>}
                            </button>
                        </div>
                    </div>

                </div>
            </Container>
        </>
    )
};

export default SaleOfUnit;