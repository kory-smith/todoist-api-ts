import { atLeastOneArgExists } from "./../utils/helpers";
import {
  StrInt,
  TodoistProject,
  TodoistTask,
  TodoistComment,
  Attachment
} from "../types";

import Axios = require("axios");

/* tslint:disable: no-string-literal */
export namespace TodoistComments {
  export const getAllComments = (
    axiosInstance: Axios.AxiosInstance,
    projectId?: StrInt,
    taskId?: StrInt
  ): Promise<TodoistComment[]> => {
    if (atLeastOneArgExists(projectId, taskId)) {
      const params: { id?: StrInt; task_id?: StrInt } = {};
      if (projectId) {
        params.id = projectId;
      }
      if (taskId) {
        params.task_id = taskId;
      }

      return new Promise((resolve, reject) =>
        axiosInstance
          .get("comments", { params })
          .then(data => resolve(data.data))
          .catch(err => reject(err))
      );
    }
    throw new TypeError("projectId or taskId have to be passed");
  };

  export const getAllCommentsForProject = (
    axiosInstance: Axios.AxiosInstance,
    projectId: StrInt
  ): Promise<TodoistComment[]> => {
    if (!projectId) {
      throw new TypeError("projectId must be passed");
    }
    return new Promise((resolve, reject) =>
      axiosInstance
        .get("comments", { params: { project_id: projectId } })
        .then((data) => resolve(data.data))
        .catch((err) => reject(err))
    );
  };
  export const createComment = (
    axiosInstance: Axios.AxiosInstance,
    content: string,
    projectId?: StrInt,
    taskId?: StrInt,
    attachment?: Attachment
  ): Promise<TodoistProject | TodoistTask> => {
    if (atLeastOneArgExists(projectId, taskId)) {
      const params: {
        content: string;
        task_id?: StrInt;
        id?: StrInt;
        attachment?: Attachment;
      } = {
        content
      };

      if (projectId) {
        params.id = projectId;
      }
      if (taskId) {
        params.task_id = taskId;
      }
      if (attachment) {
        params.attachment = attachment;
      }

      return new Promise((resolve, reject) =>
        axiosInstance
          .post("comments", params, {
            headers: { "Content-Type": "application/json" }
          })
          .then(data => resolve(data.data))
          .catch(err => reject(err))
      );
    }
    throw new TypeError("projectId or taskId have to be passed");
  };

  export const getCommentById = (
    axiosInstance: Axios.AxiosInstance,
    id: StrInt
  ): Promise<TodoistComment> => {
    return new Promise((resolve, reject) =>
      axiosInstance
        .get(`comments/${id}`)
        .then(data => resolve(data.data))
        .catch(err => reject(err))
    );
  };

  export const updateComment = (
    axiosInstance: Axios.AxiosInstance,
    id: StrInt,
    newContent: string
  ): Promise<Axios.AxiosResponse> => {
    return new Promise((resolve, reject) =>
      axiosInstance
        .post(
          `comments/${id}`,
          { content: newContent },
          { headers: { "Content-Type": "application/json" } }
        )
        .then(res => resolve(res))
        .catch(err => reject(err))
    );
  };

  export const deleteComment = (
    axiosInstance: Axios.AxiosInstance,
    id: StrInt
  ): Promise<Axios.AxiosResponse> => {
    return new Promise((resolve, reject) =>
      axiosInstance
        .delete(`comments/${id}`)
        .then(res => resolve(res))
        .catch(err => reject(err))
    );
  };
}
