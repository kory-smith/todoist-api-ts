import Axios = require("axios");

import { StrInt, TodoistLabel, CreateLabelParameters, UpdateLabelParameters } from "../types";

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
    parameters: CreateLabelParameters,
  ): Promise<TodoistLabel> => {
    return new Promise((resolve, reject) =>
      axiosInstance
        .post("labels", parameters, {
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
    parameters: UpdateLabelParameters = {}
  ): Promise<Axios.AxiosResponse> => {
      return new Promise((resolve, reject) =>
        axiosInstance
          .post(`labels/${id}`, parameters, {
            headers: { "Content-Type": "application/json" },
          })
          .then((res) => resolve(res))
          .catch((err) => reject(err))
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
