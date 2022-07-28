import axios from "axios";
import { getAuth } from "../auth/auth";
import config from "../config";

// functions
import { getCookie } from "../utils/auth";

/**
 * @returns The response from the server.
 */
export const fetchAll = async () => {
  const response = await axios.get(
    // @ts-ignore
    `${config.apiUrl}course/`,
    {
      headers: getAuth,
    }
  );
  const data = await response.data;
  return data;
};

/**
 * Takes a user object and sends it to the backend to be authenticated
 * @param {string} user - the user name
 * @param {string} courseName - the course name
 * @returns The response from the server.
 */
export const fetchCourse = async (user, courseName) => {
  const response = await axios.get(
    // @ts-ignore
    `${config.apiUrl}course/fetch?user=${user}&courseName=${courseName}`,
    {
      headers: getAuth,
    }
  );
  const data = await response.data;
  return data;
};

/**
 * Takes a user object and sends it to the backend to be authenticated
 * @param {string} user - the user name
 * @param {string} courseName - the course name
 * @param {object[]} course - the course list
 * @param {string[]} types - the type list
 * @returns The response from the server.
 */
export const saveCourse = async (user, courseName, course, types) => {
  const response = await axios.post(
    // @ts-ignore
    `${config.apiUrl}course/save`,
    { user, courseName, course, types },
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
