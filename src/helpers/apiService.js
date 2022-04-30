import axios from "axios";
import { urls } from "../config/env-config";
import { authHeader } from "./authService";

const promiseWithErrorHandling = (promise) => {
  return promise.catch((err) => {
    if (err.response && err.response.status === 500) {
      // noinspection JSCheckFunctionSignatures
      window.location.assign("/error");
    } else {
      throw err;
    }
  });
};

export default {
  post: async (path, payload) => {
    return promiseWithErrorHandling(
      axios.post(`${urls.service}/${path}`, payload, authHeader())
    );
  },

  get: async (path) => {
    console.log("Api Service");
    console.log(authHeader());
    console.log(path);
    return promiseWithErrorHandling(
      axios.get(`${urls.service}/${path}`, authHeader())
    );
  },

  getWithParameter: async (path, parameter) => {
    console.log("Api Service");
    console.log(authHeader());
    return promiseWithErrorHandling(
      axios.get(`${urls.service}/${path}`, parameter, authHeader())
    );
  },

  postWithoutErrorHandling: async (path, payload) => {
    return axios.post(`${urls.service}/${path}`, payload, authHeader());
  },

  postSignup: async (path, payload) => {
    return promiseWithErrorHandling(
      axios.post(`${urls.service}/${path}`, payload)
    );
  },

  put: async (path, payload) => {
    return promiseWithErrorHandling(
      axios.put(`${urls.service}/${path}`, payload, authHeader())
    );
  },
};
