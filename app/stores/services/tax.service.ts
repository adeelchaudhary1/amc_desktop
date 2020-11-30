import axios from "axios";
import Config from "./../../config/index";

const addTax = async (
    email: string,
    code: string,
    transaction_type: string,
    name: string,
    days: string,
    amount_from: string,
    fixed_charges: string,
    percentage: string,
    created_at: string,
    description: string,
    amount_to : string,
    rate : string
) => {
    const url = `${Config.baseUrl}/tax/`;
    const result: any = await axios.post(url, { email, code, transaction_type, name, days, amount_from, fixed_charges ,percentage, created_at , description ,amount_to ,rate });
    return result;
};


const getAllTax = async (email: string) => {
    const url = `${Config.baseUrl}/tax?email=${email}`;
    const result: any = await axios.get(url);
    return result;
};

export { addTax, getAllTax };