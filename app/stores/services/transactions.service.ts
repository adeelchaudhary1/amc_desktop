import axios from "axios";
import Config from "./../../config/index";

/**
 * @param email
 */
const getNatureOfTx = async (email: string) => {
    const url = `${Config.baseUrl}/mastertxn/not?email=${email}`;
    const result: any = await axios.get(url);
    return result;
};
/**
 * @param email
 */
const getModeOfTx = async (email: string) => {
    const url = `${Config.baseUrl}/mastertxn/tot?email=${email}`;
    const result: any = await axios.get(url);
    return result;
};
/**
 * @param email
 */
const getModeOfPayments = async (email: string) => {
    const url = `${Config.baseUrl}/mastertxn/mop?email=${email}`;
    const result: any = await axios.get(url);
    return result;
};

/**
 * 
 * @param email 
 */
const getAllPendingTransactions = async (email: string, status: string, search_value: string, created_by: string = '', page_number: string = '') => {
    const url = `${Config.baseUrl}/transaction?email=${email}&status=${status}&search_value=${search_value}&created-by=${created_by}&page_number=${page_number}&page_size=1000`;
    const result: any = await axios.get(url);
    return result;
}

const updateTransactionStatus = async (email: string, status: string, trx_id: string, note: string) => {
    const url = `${Config.baseUrl}/transaction/update-status`;
    const result: any = await axios.put(url,
        { email, status, trx_id, note });
    return result;
}

/**
 * 
 * @param email 
 * @param fund 
 * @param account_no 
 * @param type_of_transaction 
 * @param instrument_no 
 * @param instrument_type 
 * @param gross_amount 
 * @param net_amount 
 * @param amc_name 
 */
const addNCCPLTransaction = async (
    email: string,
    fund: string,
    account_no: string,
    type_of_transaction: string,
    instrument_no: string,
    instrument_type: string,
    gross_amount: string,
    net_amount: string,
    amc_name: string,
    trx_id: string) => {
    const url = `${Config.baseUrl}/transaction/nccpl/`;
    const result: any = await axios.post(url,
        { email, fund, account_no, type_of_transaction, instrument_no, instrument_type, gross_amount, net_amount, amc_name, trx_id });
    return result;
}
const addProfitTransaction = async (
    email: string,
    fund: string,
    account_no: string,
    type_of_transaction: string,
    nature_of_transaction: string,
    instrument_type: string,
    gross_amount: string,
    net_amount: string,
    amc_name: string,
    trx_id: string) => {
    const url = `${Config.baseUrl}/transaction/profit/`;
    const result: any = await axios.post(url,
        { email, fund, account_no, type_of_transaction, nature_of_transaction, instrument_type, gross_amount, net_amount, amc_name, trx_id });
    return result;
}

const addCashDividientTransaction = async (
    email: string,
    amc_name: string,
    fund: string,
    account_no: string,
    mode_of_payment: string,
    name_of_beneficiary: string,
    instrument_date: string,
    instrument_no: string,
    instrument_type: string,
    gross_amount: string,
    type_of_transaction: string,
    beneficiary: string,
    wht: string,
    zakat: string,
    net_amount: string,
    // file: string,
    beneficiary_bank: string,
    beneficiary_branch: string,
    beneficiary_account: string,
    trx_id: string,
    folio_no: string,
) => {
    const url = `${Config.baseUrl}/transaction/cash-dividend/`;
    const result: any = await axios.post(url,
        { email, amc_name, fund, account_no, mode_of_payment, name_of_beneficiary, instrument_date, instrument_no, instrument_type, gross_amount, type_of_transaction, beneficiary, wht, zakat, net_amount, beneficiary_bank, beneficiary_branch, beneficiary_account, trx_id, folio_no });
    return result;
}

const addRedemptionTransaction = async (
    email: string,
    amc_name: string,
    fund: string,
    account_no: string,
    date_of_redemption: string,
    mode_of_payment: string,
    folio_no: string,
    nav: string,
    total_unit: string,
    unit_redeemed: string,
    remain_unit: string,
    name_of_beneificiary: string,
    beneificiary_bank: string,
    beneificiary_branch: string,
    beneificiary_account_title: string,
    instrument_date: string,
    instrument_no: string,
    instrument_type: string,
    gross_amount: string,
    cgt: string,
    beneificiary_name: string,
    back_load: string,
    zakat: string,
    net_amount: string,
    trx_id: string
    // file: string, 
) => {
    const url = `${Config.baseUrl}/transaction/redemption-bank/`;
    const result: any = await axios.post(url,
        { email, amc_name, fund, account_no, date_of_redemption, mode_of_payment, folio_no, nav, total_unit, unit_redeemed, remain_unit, name_of_beneificiary, beneificiary_bank, beneificiary_branch, beneificiary_account_title, instrument_date, instrument_no, instrument_type, gross_amount, cgt, beneificiary_name, back_load, zakat, net_amount, trx_id });
    return result;
}

const addInFlowTransaction = async (
    email: string,
    fund: string,
    txnr: string,
    account_no: string,
    type_of_transaction: string,
    instrument_type: string,
    name_of_beneficiary: string,
    beneficiary_bank: string,
    beneficiary_branch: string,
    beneficiary_account: string,
    instrument_date: string,
    instrument_no: string,
    gross_amount: string,
    description: string,
    net_amount: string,
    amc_name: string,
    trx_id: string,
    folio_no: string,
) => {
    const url = `${Config.baseUrl}/transaction/inflow/`;
    const result: any = await axios.post(url,
        { email, fund, txnr, account_no, type_of_transaction, instrument_type, name_of_beneficiary, beneficiary_bank, beneficiary_branch, beneficiary_account, instrument_date, instrument_no, gross_amount, description, net_amount, amc_name, trx_id, folio_no });
    return result;
}

//outflow transcation 
const addOutFlowTransaction = async (
    email: string,
    fund: string,
    txnr: string,
    account_no: string,
    type_of_transaction: string,
    instrument_type: string,
    name_of_beneficiary: string,
    beneficiary_bank: string,
    beneficiary_branch: string,
    beneficiary_account: string,
    instrument_date: string,
    instrument_no: string,
    gross_amount: string,
    description: string,
    net_amount: string,
    amc_name: string,
    trx_id: string,
    folio_no: string,
) => {
    const url = `${Config.baseUrl}/transaction/outflow/`;
    const result: any = await axios.post(url,
        { email, fund, txnr, account_no, type_of_transaction, instrument_type, name_of_beneficiary, beneficiary_bank, beneficiary_branch, beneficiary_account, instrument_date, instrument_no, gross_amount, description, net_amount, amc_name, trx_id, folio_no });
    return result;
}

//add moneny market settlement treansaction 
const addMoneyMerketTransaction = async (
    email: string,
    amc_name: string,
    account_no: string,
    fund: string,
    type_of_transaction: string,
    counter_party_name: string,
    broker: string,
    instrument_date: string,
    instrument_type: string,
    counter_party_bank: string,
    counter_party_sgl_ips: string,
    instrument_no: string,
    type_of_secuirty: string,
    maturity_date: string,
    coupon: string,
    settelment_date: string,
    net_amount: string,
    issue_date: string,
    face_value: string,
    price: string,
    settelment_amount: string,
    trx_id: string
) => {
    const url = `${Config.baseUrl}/transaction/money-market-settlement/`;
    const result: any = await axios.post(url,
        { email, amc_name, account_no, fund, type_of_transaction, counter_party_name, broker, instrument_date, instrument_type, counter_party_bank, counter_party_sgl_ips, instrument_no, type_of_secuirty, maturity_date, coupon, settelment_date, net_amount, issue_date, face_value, price, settelment_amount, trx_id });
    return result;
}

//add Gain realization treansaction 
const addGainRealizationTransaction = async (
    email: string,
    account_no: string,
    amc_name: string,
    fund: string,
    folio_no: string,
    beneficiary_name: string,
    beneficiary_branch: string,
    beneficiary_bank: string,
    beneficiary_account_no: string,
    instrument_type: string,
    instrument_no: string,
    instrument_date: string,
    transaction_type: string,
    redemtion_date: string,
    unit_redeemed: string,
    nav: string,
    frontend_load: string,
    gross_amount: string,
    cgt: string,
    zakat: string,
    wht: string,
    backend_load: string,
    sale_date: string,
    unit_purchased: string,
    net_amount: string,
    trx_id: string
) => {
    const url = `${Config.baseUrl}/transaction/gain-realization/`;
    const result: any = await axios.post(url,
        { email, account_no, amc_name, fund, folio_no, beneficiary_name, beneficiary_branch, beneficiary_bank, beneficiary_account_no, instrument_type, instrument_no, instrument_date, transaction_type, redemtion_date, unit_redeemed, nav, frontend_load, gross_amount, cgt, zakat, wht, backend_load, sale_date, unit_purchased, net_amount, trx_id });
    return result;
}

//add Conversion unit  treansaction 
const addConversionUnitTransaction = async (
    email: string,
    account_no: string,
    amc_name: string,
    fund: string,
    folio_no: string,
    beneficiary_name: string,
    beneficiary_branch: string,
    beneficiary_bank: string,
    beneficiary_account_no: string,
    instrument_type: string,
    instrument_no: string,
    instrument_date: string,
    transaction_type: string,
    redemtion_date: string,
    unit_redeemed: string,
    nav: string,
    frontend_load: string,
    gross_amount: string,
    cgt: string,
    zakat: string,
    wht: string,
    backend_load: string,
    sale_date: string,
    unit_purchased: string,
    net_amount: string,
    trx_id: string
) => {
    const url = `${Config.baseUrl}/transaction/unit-conversion/`;
    const result: any = await axios.post(url,
        { email, account_no, amc_name, fund, folio_no, beneficiary_name, beneficiary_branch, beneficiary_bank, beneficiary_account_no, instrument_type, instrument_no, instrument_date, transaction_type, redemtion_date, unit_redeemed, nav, frontend_load, gross_amount, cgt, zakat, wht, backend_load, sale_date, unit_purchased, net_amount, trx_id });
    return result;
}

//cgt transcation 
const addCgtTransaction = async (
    email: string,
    fund: string,
    account_no: string,
    beneficiary_name: string,
    transaction_type: string,
    instrument_date: string,
    instrument_no: string,
    instrument_type: string,
    gross_amount: string,
    net_amount: string,
    amc_name: string,
    trx_id: string,
    folio_no: string,
) => {
    const url = `${Config.baseUrl}/transaction/cgt/`;
    const result: any = await axios.post(url,
        { email, fund, account_no, beneficiary_name, transaction_type, instrument_date, instrument_no, instrument_type, gross_amount, net_amount, amc_name, trx_id, folio_no });
    return result;
}


//sale of unit  transcation 
const addSaleUnitTransaction = async (
    email: string,
    amc_name: string,
    fund: string,
    account_no: string,
    transaction_type: string,
    folio_no: string,
    nav: string,
    instrument_date: string,
    instrument_no: string,
    instrument_type: string,
    cheque_realised_date: string,
    sale_booking_date: string,
    total_unit: string,
    unit_issued: string,
    sale_lead: string,
    gross_amount: string,
    net_amount: string,
    trx_id: string
) => {
    const url = `${Config.baseUrl}/transaction/sale-unit/`;
    const result: any = await axios.post(url,
        { email, amc_name, fund, account_no, transaction_type, folio_no, nav, instrument_date, instrument_no, instrument_type, cheque_realised_date, sale_booking_date, total_unit, unit_issued, sale_lead, gross_amount, net_amount, trx_id });
    return result;
}

//Fee Payment  transcation 
const addFeePaymentTransaction = async (
    email: string,
    amc_name: string,
    fund: string,
    account_no: string,
    type_of_transaction: string,
    name_of_beneficiary: string,
    instrument_date: string,
    instrument_no: string,
    instrument_type: string,
    gross_amount: string,
    nature_of_transaction: string,
    wht12: string,
    sst13: string,
    net_amount: string,
    sst20: string,
    trx_id: string,
    folio_no: string,

) => {
    const url = `${Config.baseUrl}/transaction/fee-payment/`;
    const result: any = await axios.post(url,
        { email, amc_name, fund, account_no, type_of_transaction, name_of_beneficiary, instrument_date, instrument_no, instrument_type, gross_amount, nature_of_transaction, wht12, sst13, net_amount, sst20, trx_id, folio_no });
    return result;
}
// refund payment
const addRefundPaymentTransaction = async (
    email: string,
    fund: string,
    account_no: string,
    name_of_beneficiary: string,
    instrument_no: string,
    transaction_type: string,
    instrument_date: string,
    instrument_type: string,
    gross_amount: string,
    net_amount: string,
    amc_name: string,
    trx_id: string,
    folio_no: string,
) => {
    const url = `${Config.baseUrl}/transaction/refund-payment/`;
    const result: any = await axios.post(url,
        { email, fund, account_no, name_of_beneficiary, instrument_no, transaction_type, instrument_date, instrument_type, gross_amount, net_amount, amc_name, trx_id, folio_no });
    return result;
}
// add brokerage Fee
const addBrokerageTransaction = async (
    email: string,
    fund: string,
    account_no: string,
    name_of_beneficiary: string,
    instrument_date: string,
    instrument_no: string,
    instrument_type: string,
    gross_amount: string,
    sst13: string,
    sst20: string,
    wht12: string,
    net_amount: string,
    amc_name: string,
    trx_id: string,
    folio_no: string,
) => {
    const url = `${Config.baseUrl}/transaction/brokage-fee/`;
    const result: any = await axios.post(url,
        { email, fund, account_no, name_of_beneficiary, instrument_date, instrument_no, instrument_type, gross_amount, sst13, sst20, wht12, net_amount, amc_name, trx_id, folio_no });
    return result;
}

// add Equity
const addEquityTransaction = async (
    email: string,
    fund: string,
    account_no: string,
    name_of_beneficiary: string,
    beneficiary_bank: string,
    beneficiary_branch: string,
    beneficiary_account: string,
    instrument_date: string,
    symbol: string,
    instrument_no: string,
    instrument_type: string,
    type_of_transaction: string,
    trade_type: string,
    brokage: string,
    gross_amount: string,
    fed: string,
    trade_date: string,
    sst: string,
    commission: string,
    settlement_date: string,
    net_amount: string,
    broker_code: string,
    broker_name: string,
    volume: string,
    avg_rate: string,
    amc_name: string,
    folio_no: string,
    nav: string,
    total_units: string,
    unit_redeemed: string,
    remain_units: string,
    trx_id: string
) => {
    const url = `${Config.baseUrl}/transaction/equity-settlement/`;
    const result: any = await axios.post(url,
        { email, fund, account_no, name_of_beneficiary, beneficiary_bank, beneficiary_branch, beneficiary_account, instrument_date, symbol, instrument_no, instrument_type, type_of_transaction, trade_type, brokage, gross_amount, fed, trade_date, sst, commission, settlement_date, net_amount, broker_code, broker_name, volume, avg_rate, amc_name, folio_no, nav, total_units, unit_redeemed, remain_units, trx_id });
    return result;
}

//add Maturity treansaction 
const addMaturityTransaction = async (
    email: string,
    fund: string,
    account_no: string,
    beneficiary_name: string,
    beneficiary_bank: string,
    beneficiary_branch: string,
    beneficiary_account: string,
    instrument_date: string,
    instrument_no: string,
    instrument_type: string,
    type_of_transaction: string,
    transaction_nature: string,
    security_type: string,
    issue_date: string,
    maturity_date: string,
    coupon_maturity_date: string,
    coupon: string,
    price: string,
    face_value: string,
    gross_amount: string,
    wht: string,
    net_amount: string,
    amc_name: string,
    trx_id: string,
    folio_no: string,
) => {
    const url = `${Config.baseUrl}/transaction/maturity/`;
    const result: any = await axios.post(url,
        { email, fund, account_no, beneficiary_name, beneficiary_bank, beneficiary_branch, beneficiary_account, instrument_date, instrument_no, instrument_type, type_of_transaction, transaction_nature, security_type, issue_date, maturity_date, coupon_maturity_date, coupon, price, face_value, gross_amount, wht, net_amount, amc_name, trx_id, folio_no });
    return result;
}

//add fund transfer treansaction 
const addFundTransferTransaction = async (
    email: string,
    fund: string,
    account_no: string,
    mode_of_transaction: string,
    instrument_no: string,
    instrument_type: string,
    sender_bank_name: string,
    sender_branch: string,
    sender_account_no: string,
    receiver_bank_name: string,
    receiver_branch: string,
    receiver_account_no: string,
    net_amount: string,
    amc_name: string,
    trx_id: string) => {
    const url = `${Config.baseUrl}/transaction/maturity/`;
    const result: any = await axios.post(url,
        { email, fund, account_no, mode_of_transaction, instrument_no, instrument_type, sender_bank_name, sender_branch, sender_account_no, receiver_bank_name, receiver_branch, receiver_account_no, net_amount, amc_name, trx_id });
    return result;
}
//display type 
const getCaptype = async () => {
    const url = `${Config.baseUrl}/transaction/txntypes`;
    const result: any = await axios.get(url);
    return result;
};

export { getCaptype, addFundTransferTransaction, updateTransactionStatus, getNatureOfTx, addMaturityTransaction, addEquityTransaction, addBrokerageTransaction, addRefundPaymentTransaction, addFeePaymentTransaction, addSaleUnitTransaction, addCgtTransaction, addConversionUnitTransaction, addGainRealizationTransaction, addMoneyMerketTransaction, addOutFlowTransaction, addInFlowTransaction, addRedemptionTransaction, addNCCPLTransaction, getModeOfTx, getModeOfPayments, addProfitTransaction, addCashDividientTransaction, getAllPendingTransactions };
