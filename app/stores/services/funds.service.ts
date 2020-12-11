import axios from "axios";
import Config from "./../../config/index";

/**
 * 
 * @param email 
 * @param amc_name 
 * @param type_of_fund 
 * @param date_of_incorporation 
 * @param fund_name 
 * @param symbol_code 
 * @param date_of_revocation 
 * @param psx_listing 
 */
const addFund = async (
    email: string,
    amc_name: string,
    type_of_fund: string,
    date_of_incorporation: string,
    fund_name: string,
    symbol_code: string,
    date_of_revocation: string,
    psx_listing: string) => {
    const url = `${Config.baseUrl}/fund/`;
    const result: any = await axios.post(url, { email, amc_name, type_of_fund, date_of_incorporation, fund_name, symbol_code, date_of_revocation, psx_listing });
    return result;
};

/**
 * @param email
 */
const getFunds = async (email: string) => {
    const url = `${Config.baseUrl}/fund?email=${email}`;
    const result: any = await axios.get(url);
    return result;
};
/**
 * @param email
 */
const getFundByAmc = async (email: string, amcCode: string) => {
    const url = `${Config.baseUrl}/fund/by-amc-code?email=${email}&amc_code=${amcCode}`;
    const result: any = await axios.get(url);
    return result;
};

/**
 * 
 * @param email 
 * @param amc_name 
 * @param type_of_fund 
 * @param date_of_incorporation 
 * @param fund_name 
 * @param symbol_code 
 * @param date_of_revocation 
 * @param psx_listing 
 */
const updateFunds = async (
    email: string,
    amc_name: string,
    type_of_fund: string,
    date_of_incorporation: string,
    fund_name: string,
    symbol_code: string,
    date_of_revocation: string,
    psx_listing: string) => {
    const url = `${Config.baseUrl}/fund/`;
    const result: any = await axios.put(url, { email, amc_name, type_of_fund, date_of_incorporation, fund_name, symbol_code, date_of_revocation, psx_listing });
    return result;
};

/**
 * 
 * @param email 
 * @param symbol_code 
 */
const deleteFund = async (
    email: string,
    symbol_code: string) => {
    const url = `${Config.baseUrl}/fund/delete-fund/`;
    const result: any = await axios.put(url, { email, symbol_code });
    return result;
};

/**
 * 
 * @param email 
 */
const getFundType = async (email: string) => {
    const url = `${Config.baseUrl}/mastertxn/mop/?email=${email}`;
    const result: any = await axios.get(url);
    return result;
};

/**
 * 
 * @param email 
 * @param name 
 * @param code 
 */
const addModeOfPayment = async (email: string, name: string, code: string) => {
    const url = `${Config.baseUrl}/mastertxn/mop/`;
    const result: any = await axios.post(url, { email, name, code });
    return result;
}

/**
 * 
 * @param email 
 * @param name 
 * @param code 
 */
const addNatureOfTransaction = async (email: string, name: string, code: string) => {
    const url = `${Config.baseUrl}/mastertxn/not/`;
    const result: any = await axios.post(url, { email, name, code });
    return result;
}

/**
 * 
 * @param email 
 * @param name 
 * @param code 
 */
const addModeOfTransaction = async (email: string, name: string, code: string) => {
    const url = `${Config.baseUrl}/mastertxn/tot/`;
    const result: any = await axios.post(url, { email, name, code });
    return result;
}

/**
 * 
 * @param email 
 * @param name 
 * @param code 
 */
const addInstrumentType = async (email: string, name: string, code: string) => {
    const url = `${Config.baseUrl}/mastertxn/it/`;
    const result: any = await axios.post(url, { email, name, code });
    return result;
}
/**
 * 
 * @param email 
 */
const getInstrumentType = async (email: string) => {
    const url = `${Config.baseUrl}/mastertxn/it?email=${email}`;
    const result: any = await axios.get(url);
    return result;
}
export { addFund, getFundByAmc, getFunds, getInstrumentType, updateFunds, deleteFund, getFundType, addModeOfPayment, addNatureOfTransaction, addModeOfTransaction, addInstrumentType };