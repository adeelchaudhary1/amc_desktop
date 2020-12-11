import axios from "axios";
import Config from "./../../config/index";



const getAccounts = async (email: string) => {
    const url = `${Config.baseUrl}/account?email=${email}`;
    const result: any = await axios.get(url);
    return result;
};
const getAccountByAmc = async (email: string , amcCode : string) => {
    const url = `${Config.baseUrl}/account/by-amc-code?email=${email}&amc_code=${amcCode}`;
    const result: any = await axios.get(url);
    return result;
};


export { getAccounts ,getAccountByAmc };