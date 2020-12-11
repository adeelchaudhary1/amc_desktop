import axios from "axios";
import Config from "./../../config/index";


/**
 * 
 * @param email 
 */
const getAmc = async (email: string) => {
    const url = `${Config.baseUrl}/amc?email=${email}`;
    const result: any = await axios.get(url);
    return result;
};


const getAmcByCode = async (email: string, code: string) => {
    const url = `${Config.baseUrl}/amc/by-code?email=${email}&code=${code}`;
    const result: any = await axios.get(url);
    return result;
};


export { getAmc, getAmcByCode };