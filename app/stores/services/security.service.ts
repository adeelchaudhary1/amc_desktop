import axios from "axios";
import Config from "./../../config/index";

/**
 * 
 * @param email 
 * @param name 
 * @param code 
 * @param companies 
 */
const addSecurity = async (
    email: string, 
    name: string, 
    code: string, 
    companies: any) => {
    const url = `${Config.baseUrl}/security/`;
    const fd = new FormData();
    fd.set('name', name);
    fd.set('email', email);
    fd.set('code', code);
    fd.set('companies', companies);
    const result: any = await axios.post(url, fd);
    return result;
};

/**
 * 
 * @param email 
 */
const getAllSecurities = async (email: string) => {
    const url = `${Config.baseUrl}/security?email=${email}`;
    const result: any = await axios.get(url);
    return result;
};

export { addSecurity, getAllSecurities };