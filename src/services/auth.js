import axios from "axios";
import { getAuth } from "../auth/auth";
import config from "../config";

// functions
import { getCookie } from "../utils/auth";

import md5 from "md5";

/**
 *
 * @param {string} password
 * @returns
 */
export const savePassword = async (password) => {
  const response = await axios.post(
    // @ts-ignore
    `${config.apiUrl}course/save`,
    { password: md5(password) },
    {
      headers: {
        ...getAuth,
        Authorization: `Bearer ${getCookie(config.basicKey)}`,
      },
    }
  );
  const data = await response.data;
  return data;
};

export const validateBasicKey = async () => {
  const response = await axios.post(
    // @ts-ignore
    `${config.apiUrl}user/validate`,
    {},
    {
      headers: {
        ...getAuth,
        Authorization: `Bearer ${getCookie(config.basicKey)}`,
      },
    }
  );
  const data = await response.data;
  if (data.data.message) return true;
  return false;
};

/**
 * Takes a user object and sends it to the backend to be authenticated
 * @param {string} user - the user name
 * @param {string} password - the user password
 * @returns The response from the server.
 */
export const login = async (user, password) => {
  const response = await axios.post(
    // @ts-ignore
    `${config.apiUrl}user/login`,
    { user, password: md5(password) },
    {
      headers: getAuth,
    }
  );
  const data = await response.data;
  return data;
};
