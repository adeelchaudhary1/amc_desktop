import axios from "axios";
import Config from "./../../config/index";
/**
 * 
 * @param email 
 * @param bank_name 
 * @param branch_name 
 * @param city 
 * @param area 
 * @param branch_code 
 * @param branch_address 
 * 
 */
const addBranch = async (
    email: string,
    bank_name: string,
    branch_name: string,
    city: string,
    area: string,
    branch_code: string,
    branch_address: string
) => {
    const url = `${Config.baseUrl}/branch/`;
    const result: any = await axios.post(url, { email, bank_name, branch_name, city, area, branch_code, branch_address });
    return result;
};

/**
 * @param email
 */
const getAllBranchs = async (email: string) => {
    const url = `${Config.baseUrl}/branch?email=${email}`;
    const result: any = await axios.get(url);
    return result;
};

/**
 * 
 * @param email
 * @param bankName
 *  
 */
const getBranchByBankName = async (email: string, bankName: string) => {
    const url = `${Config.baseUrl}/branch?email=${email}&bank_name=${bankName}`;
    const result: any = await axios.get(url);
    return result;
};

/**
 * 
 * @param email 
 * @param code 
 * @param status 
 */
const updateBranchStatus = async (email: string, code: string, status: string) => {
    const url = `${Config.baseUrl}/branch/update-status`;
    const result: any = await axios.post(url, { email, code, status });
    return result;
};


export { addBranch, getAllBranchs,updateBranchStatus, getBranchByBankName };