import axios from "axios";
import { getAuth } from "../auth/auth";
import config from "../config";

// functions
import { getCookie } from "../utils/auth";

/**
 * It fetches all courses from the database and returns the data.
 * @returns An array of objects.
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
 * It fetches a course from the database and returns the data.
 * @param {string} user - string
 * @param {string} courseName - "test"
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
 * It saves a course to the database.
 * @param {string} title - string
 * @param {string} url - https://www.udemy.com/course/the-complete-javascript-course/
 * @param {string} price - number
 * @param {string} description - "This is a test course"
 * @param {string} photo - photo url
 */
export const saveCourse = async (title, url, price, description, photo) => {
  const response = await axios.post(
    // @ts-ignore
    `${config.apiUrl}course/save`,
    { title, url, price, description, photo },
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
