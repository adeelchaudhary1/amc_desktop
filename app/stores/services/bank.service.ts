import axios from "axios";
import Config from "./../../config/index";

/**
 * 
 * @param name 
 * @param code 
 * @param email 
 */
const addBank = async (
    name: string,
    code: string, 
    email: string) => {
    const url = `${Config.baseUrl}/bank/`;
    const result: any = await axios.post(url, { name, code, email });
    return result;
};

/**
 * @param email
 */
const getAllBanks = async (email: string) => {
    const url = `${Config.baseUrl}/bank?email=${email}`;
    const result: any = await axios.get(url);
    return result;
};

const getCities = async () => {
    const url = `${Config.baseUrl}/bank/cities`;
    const result: any = await axios.get(url);
    return result;
};
/**
 * @param email
 * @param code
 */
const getBankByCode = async (email: string, code: string) => {
    const url = `${Config.baseUrl}/bank/get-by-code?email=${email}&code=${code}`;
    const result: any = await axios.get(url);
    return result;
};

/**
 * 
 * @param email 
 * @param code 
 * @param status 
 */
const updateBankStatus = async (email: string, code: string, status: string) => {
    const url = `${Config.baseUrl}/bank/update-status`;
    const result: any = await axios.post(url, { email, code, status });
    return result;
};

export { addBank, getAllBanks, getBankByCode, updateBankStatus ,getCities };