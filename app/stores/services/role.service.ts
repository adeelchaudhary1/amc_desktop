import axios from "axios";
import Config from "./../../config/index";

/**
 * 
 * @param email 
 */
const getFeatures = async (email: string) => {
    const url = `${Config.baseUrl}/bank/features?email=${email}`;
    const result: any = await axios.get(url);
    return result;
};

/**
 * 
 * @param email 
 * @param role_name 
 * @param description 
 * @param features 
 */
const addRole = async (email: string, role_name: string, description: string, features: string) => {
    const url = `${Config.baseUrl}/role/`;
    const result: any = await axios.post(url, { role_name, description, email, features });
    return result;
}

const editRole = async (email: string, role_name: string, description: string, features: string) => {
    const url = `${Config.baseUrl}/role/`;
    const result: any = await axios.put(url, { role_name, description, email, features });
    return result;
}

/**
 * 
 * @param email 
 */
const getAllRoles = async (email: string) => {
    const url = `${Config.baseUrl}/role?email=${email}`;
    const result: any = await axios.get(url);
    return result;
}

const updateRoleStatus = async (email: string, role_name: string, description: string, features: string, status: string) => {
    const url = `${Config.baseUrl}/role/`;
    const result: any = await axios.put(url, { role_name, description, email, features, status });
    return result;
}

export { getFeatures, updateRoleStatus, addRole, getAllRoles, editRole };