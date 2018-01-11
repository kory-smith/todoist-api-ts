import Axios = require("axios");

import { StrInt, TodoistLabel } from "../types";

/* tslint:disable: no-string-literal */

export namespace TodoistLabels {
  export const getAllLabels = (
    axiosInstance: Axios.AxiosInstance
  ): Promise<TodoistLabel[]> => {
    return new Promise((resolve, reject) =>
      axiosInstance
        .get("labels")
        .then(data => resolve(data.data))
        .catch(err => reject(err))
    );
  };

  export const createLabel = (
    axiosInstance: Axios.AxiosInstance,
    name: string,
    order?: number
  ): Promise<TodoistLabel> => {
    const params: { name: string; order?: number } = { name };
    if (order) {
      params["order"] = order;
    }
    return new Promise((resolve, reject) =>
      axiosInstance
        .post("labels", params, {
          headers: { "Content-Type": "application/json" }
        })
        .then(data => resolve(data.data))
        .catch(err => reject(err))
    );
  };

  export const getLabelById = (
    axiosInstance: Axios.AxiosInstance,
    id: StrInt
  ): Promise<TodoistLabel> => {
    return new Promise((resolve, reject) =>
      axiosInstance
        .get(`labels/${id}`)
        .then(data => resolve(data.data))
        .catch(err => reject(err))
    );
  };

  export const updateLabelById = (
    axiosInstance: Axios.AxiosInstance,
    id: StrInt,
    name?: string,
    order?: number
  ): Promise<Axios.AxiosResponse> => {
    const params: { name?: string; order?: number } = {};
    if (name) {
      params.name = name;
    }
    if (order) {
      params.order = order;
    }
    return new Promise((resolve, reject) =>
      axiosInstance
        .post(`labels/${id}`, params, {
          headers: { "Content-Type": "application/json" }
        })
        .then(res => resolve(res))
        .catch(err => reject(err))
    );
  };

  export const deleteLabel = (
    axiosInstance: Axios.AxiosInstance,
    id: StrInt
  ): Promise<Axios.AxiosResponse> => {
    return new Promise((resolve, reject) =>
      axiosInstance
        .delete(`labels/${id}`)
        .then(res => resolve(res))
        .catch(err => reject(err))
    );
  };
}
