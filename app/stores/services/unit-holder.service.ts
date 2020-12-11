import axios from "axios";
import Config from "./../../config/index";

/**
 * 
 * @param email 
 * @param folio_no 
 * @param account_name 
 * @param account_no 
 * @param bank_name 
 * @param client_name 
 * @param balance_update 
 * @param cnic 
 * @param mobile 
 * @param city 
 * @param registration_date 
 * @param account_title 
 * @param nature 
 * @param branch_name 
 * @param amc_name 
 * @param client_code 
 * @param type 
 * @param ntn 
 * @param address 
 * @param country 
 */
const addUnitHolder = async (
    email: string,
    folio_no: string,
    account_name: string,
    account_no: string,
    bank_name: string,
    fund_name : string,
    balance_unit: string,
    cnic: string,
    mobile: string,
    city: string,
    registration_date: string,
    account_title: string,
    nature: string,
    branch_name: string,
    amc_name: string,
    client_code: string,
    type: string,
    ntn: string,
    address: string,
    country: string
) => {
    const url = `${Config.baseUrl}/unit-holder/`;
    const result: any = await axios.post(url, { email, folio_no, account_name, account_no, bank_name, client_code,fund_name , balance_unit, cnic, mobile, city, registration_date, account_title, nature, branch_name, amc_name, type, ntn, address, country });
    return result;
};

/**
 * 
 * @param email 
 */
const getAllUnitHolders = async (
    email: string
) => {
    const url = `${Config.baseUrl}/unit-holder?email=${email}`;
    const result: any = await axios.get(url);
    return result;
};

/**
 * 
 * @param email 
 * @param folio_no 
 * @param status 
 */
const updateUnitHolderStatus = async (
    email: string,
    folio_no: string, 
    status: string
) => {
    const url = `${Config.baseUrl}/unit-holder?email=${email}&folio_no=${folio_no}&status=${status}`;
    const result: any = await axios.put(url);
    return result;
};
const getAllUnitHolderByFolioNo = async (
    email: string,
    folioNo : string
) => {
    const url = `${Config.baseUrl}/unit-holder/by-folio?email=${email}&folio_no=${folioNo}`;
    const result: any = await axios.get(url);
    return result;
};
export { addUnitHolder, getAllUnitHolders,getAllUnitHolderByFolioNo, updateUnitHolderStatus };