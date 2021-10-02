import Axios = require("axios");
import { StrInt, TodoistProject, CreateProjectParameters } from "../types";

export namespace TodoistProjects {
  export const getAllProjects = (
    axiosInstance: Axios.AxiosInstance
  ): Promise<TodoistProject[]> => {
    return new Promise((resolve, reject) =>
      axiosInstance
        .get("projects")
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    );
  };

  export const getProjectById = (
    axiosInstance: Axios.AxiosInstance,
    id: StrInt
  ): Promise<TodoistProject> => {
    return new Promise((resolve, reject) =>
      axiosInstance
        .get(`projects/${id}`)
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    );
  };

  export const createProject = (
    axiosInstance: Axios.AxiosInstance,
    parameters: CreateProjectParameters
  ): Promise<TodoistProject> => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(
          "projects",
          parameters,
          { headers: { "Content-Type": "application/json" } }
        )
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    });
  };

  export const updateProjectNameById = (
    axiosInstance: Axios.AxiosInstance,
    id: StrInt,
    newName: string
  ): Promise<Axios.AxiosResponse> => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(
          `projects/${id}`,
          { name: newName },
          { headers: { "Content-Type": "application/json" } }
        )
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  };

  export const deleteProjectById = (
    axiosInstance: Axios.AxiosInstance,
    id: StrInt
  ): Promise<Axios.AxiosResponse> => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .delete(`projects/${id}`)
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  };
}

// const test = new TodoistProjects('753c3eaf9c250c6e114757fee3e376f2233c4e48');
