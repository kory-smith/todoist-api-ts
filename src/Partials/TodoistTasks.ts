import { maxOneArgExists } from "../utils/helpers";
import Axios = require("axios");

import {
  StrInt,
  TodoistTask,
  PostTaskParameters,
  GetTaskParameters
} from "../types";

export namespace TodoistTasks {
  export const getAllTasks = (
    axiosInstance: Axios.AxiosInstance
  ): Promise<TodoistTask[]> => {
    return new Promise((resolve, reject) =>
      axiosInstance
        .get("tasks")
        .then(data => resolve(data.data))
        .catch(err => reject(err))
    );
  };

  export const getTasksFiltered = (
    axiosInstance: Axios.AxiosInstance,
    parameters: GetTaskParameters
  ): Promise<TodoistTask[]> => {
    return new Promise((resolve, reject) =>
      axiosInstance
        .get("tasks", { params: parameters })
        .then(data => resolve(data.data))
        .catch(err => reject(err))
    );
  };

  export const createNewTask = (
    axiosInstance: Axios.AxiosInstance,
    parameters: PostTaskParameters
  ): Promise<TodoistTask> => {
    const { due_string, due_date, due_datetime } = parameters;
    if (maxOneArgExists(due_string, due_date, due_datetime)) {
      return new Promise((resolve, reject) =>
        axiosInstance
          .post("tasks", parameters, {
            headers: { "Content-Type": "application/json" }
          })
          .then(data => resolve(data.data))
          .catch(err => reject(err))
      );
    }
    throw new TypeError('only one of the "due_*" parameters can be used');
  };

  export const getTaskById = (
    axiosInstance: Axios.AxiosInstance,
    id: StrInt
  ): Promise<TodoistTask> => {
    return new Promise((resolve, reject) =>
      axiosInstance
        .get(`tasks/${id}`)
        .then(data => resolve(data.data))
        .catch(err => reject(err))
    );
  };

  export const updateTaskById = (
    axiosInstance: Axios.AxiosInstance,
    id: StrInt,
    parameters: PostTaskParameters
  ): Promise<Axios.AxiosResponse> => {
    const { due_string, due_date, due_datetime } = parameters;
    if (maxOneArgExists(due_string, due_date, due_datetime)) {
      return new Promise((resolve, reject) =>
        axiosInstance
          .post(`tasks/${id}`, parameters, {
            headers: { "Content-Type": "application/json" }
          })
          .then(res => resolve(res))
          .catch(err => reject(err))
      );
    }
    throw new TypeError('only one of the "due_*" parameters can be used');
  };

  export const closeTaskById = (
    axiosInstance: Axios.AxiosInstance,
    id: StrInt
  ): Promise<Axios.AxiosResponse> => {
    return new Promise((resolve, reject) =>
      axiosInstance
        .post(`tasks/${id}/close`)
        .then(res => resolve(res))
        .catch(err => reject(err))
    );
  };

  export const reopenTaskById = (
    axiosInstance: Axios.AxiosInstance,
    id: StrInt
  ): Promise<Axios.AxiosResponse> => {
    return new Promise((resolve, reject) =>
      axiosInstance
        .post(`tasks/${id}/reopen`)
        .then(res => resolve(res))
        .catch(err => reject(err))
    );
  };

  export const deleteTaskById = (
    axiosInstance: Axios.AxiosInstance,
    id: StrInt
  ): Promise<Axios.AxiosResponse> => {
    return new Promise((resolve, reject) =>
      axiosInstance
        .delete(`tasks/${id}`)
        .then(res => resolve(res))
        .catch(err => reject(err))
    );
  };
}
