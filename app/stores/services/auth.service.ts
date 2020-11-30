import axios from "axios";
import Config from "./../../config/index";

/**
 * 
 * @param email 
 * @param password 
 */
const login = async (email: string, password: string) => {
    const url = `${Config.baseUrl}/user/login`;
    const result: any = await axios.post(url, { email, password });
    return result;
};

/**
 * 
 * @param email 
 */
const forgotPassword = async (email: string) => {
    const url = `${Config.baseUrl}/user/forgot-password`;
    const result: any = await axios.post(url, { email });
    return result;
};

/**
 * 
 * @param email 
 * @param two_fa_code 
 */
const twoFALogin = async (email: string, two_fa_code: string) => {
    const url = `${Config.baseUrl}/user/login/2fa`;
    const result: any = await axios.post(url, { email, two_fa_code });
    return result;
};

/**
 * 
 * @param email 
 */
const getTwoFACode = async (email: string) => {
    const url = `${Config.baseUrl}/user/get-2fa-code`;
    const result: any = await axios.post(url, { email });
    return result;
};

/**
 * 
 * @param email 
 * @param two_fa_code 
 * @param two_fa_enabled 
 */
const enableDisableTwoFA = async (email: string, two_fa_code: string, two_fa_enabled: string) => {
    const url = `${Config.baseUrl}/user/enable-disable-2fa`;
    const result: any = await axios.post(url, { email, two_fa_code, two_fa_enabled });
    return result;
};

/**
 * 
 * @param email 
 * @param status 
 */
const updateUserStatus = async (email: string, status: string) => {
    const url = `${Config.baseUrl}/user/update-status`;
    const result: any = await axios.post(url, { email, status });
    return result;
};

/**
 * 
 * @param email 
 */
const getUserInfo = async (email: string) => {
    const url = `${Config.baseUrl}/user/get-user-info`;
    const result: any = await axios.post(url, { email });
    return result;
};

export { login, forgotPassword, twoFALogin, getTwoFACode, enableDisableTwoFA, updateUserStatus, getUserInfo };
