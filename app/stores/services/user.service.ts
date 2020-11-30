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
 * 
 * @param email
 * @param bankName
 * 
 */
const getOfficer = async (email: string, rolname: string) => {
    const url = `${Config.baseUrl}/user/get-all?email=${email}&role_name=${rolname}`;
    const result: any = await axios.get(url);
    return result;
};

/**
 * 
 * @param email 
 * @param name 
 * @param role 
 * @param description 
 * @param user_email 
 */
const addUser = async (email: string, name: string, role: number, description: string, user_email: string) => {
    const url = `${Config.baseUrl}/user/add`;
    const result: any = await axios.post(url, { email, name, role, description, user_email });
    return result;
};

/**
 * 
 * @param email 
 * @param name 
 * @param role 
 */
const editUser = async (email: string, name: string, role: string,) => {
    const url = `${Config.baseUrl}/user/update-info`;
    const result: any = await axios.post(url, { email, name, role });
    return result;
}

/**
 * 
 * @param email 
 */
const getAllUsers = async (email: string) => {
    const url = `${Config.baseUrl}/user/get-all?email=${email}`;
    const result: any = await axios.get(url);
    return result;
}

/**
 * 
 * @param email 
 * @param old_password 
 * @param new_password 
 */
const changePassword = async (email: string, old_password: string, new_password: string) => {
    const url = `${Config.baseUrl}/user/change-password`;
    const result: any = await axios.post(url, { email, old_password, new_password });
    return result;
}

/**
 * 
 * @param email 
 */
const updateUserStatus = async (email: string , user_email : string , status : string) => {
    const url = `${Config.baseUrl}/user/update-status`;
    const result: any = await axios.post(url ,{ email, user_email, status });
    return result;
}
export { addBranch ,updateUserStatus ,getOfficer, addUser, getAllUsers, changePassword, editUser };