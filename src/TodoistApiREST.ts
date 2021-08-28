import Axios = require("axios");
import { default as axios } from "axios";
import { v4 as uuid4 } from "uuid";

import { TodoistProjects } from "./Partials/TodoistProjects";
import { TodoistTasks } from "./Partials/TodoistTasks";
import { TodoistComments } from "./Partials/TodoistComments";
import { TodoistLabels } from "./Partials/TodoistLabels";
import {
  GetTaskParameters,
  PostTaskParameters,
  StrInt,
  TodoistProject,
  TodoistTask,
  TodoistComment,
  Attachment,
  TodoistLabel
} from "./types";

export default class TodoistApiREST {
  private axiosInstance: Axios.AxiosInstance;

  constructor(token: StrInt) {
    this.axiosInstance = axios.create({
      baseURL: "https://api.todoist.com/rest/v1/",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Request-Id": uuid4()
      }
    });
  }

  /* ------------- Projects -------------------- */

  /** Returns a JSON-encoded array containing all user projects. */
  public getAllProjects(): Promise<TodoistProject[]> {
    return TodoistProjects.getAllProjects(this.axiosInstance);
  }

  /** Creates a new project and returns its value in a JSON format. */
  public createProject(projectName: string): Promise<TodoistProject> {
    return TodoistProjects.createProject(this.axiosInstance, projectName);
  }

  /** Returns a JSON object containing a project object related to the given id. */
  public getProjectById(id: StrInt): Promise<TodoistProject> {
    return TodoistProjects.getProjectById(this.axiosInstance, id);
  }

  /** Updates the project for the given id and returns HTTP status code 204 with an empty body. */
  public updateProjectNameById(
    id: StrInt,
    newName: string
  ): Promise<Axios.AxiosResponse> {
    return TodoistProjects.updateProjectNameById(
      this.axiosInstance,
      id,
      newName
    );
  }

  /** Deletes a project and returns an empty response. */
  public deleteProjectById(id: StrInt): Promise<Axios.AxiosResponse> {
    return TodoistProjects.deleteProjectById(this.axiosInstance, id);
  }

  // Tasks

  /** Returns a JSON-encoded array containing all user tasks. */
  public getAllTasks(): Promise<TodoistTask[]> {
    return TodoistTasks.getAllTasks(this.axiosInstance);
  }

  /** Returns a JSON-encoded array containing all filtered tasks. */
  public getTasksFiltered(params: GetTaskParameters): Promise<TodoistTask[]> {
    return TodoistTasks.getTasksFiltered(this.axiosInstance, params);
  }

  /** Creates a new task and returns its value in a JSON format. */
  public createNewTask(params: PostTaskParameters): Promise<TodoistTask> {
    return TodoistTasks.createNewTask(this.axiosInstance, params);
  }

  /** Returns a task by id. */
  public getTaskById(id: StrInt): Promise<TodoistTask> {
    return TodoistTasks.getTaskById(this.axiosInstance, id);
  }

  /** Updates a task and returns an empty body with the HTTP status code 204. */
  public updateTaskById(
    id: StrInt,
    params: PostTaskParameters
  ): Promise<Axios.AxiosResponse> {
    return TodoistTasks.updateTaskById(this.axiosInstance, id, params);
  }

  /**
   * Closes a task and returns an empty body with a HTTP status code 204.
   *
   * The command does exactly what official clients do when you
   * close a task. Regular tasks are completed and moved to
   * history, subtasks are checked (marked as done, but not moved
   * to history), recurring task is moved forward (due date is
   * updated).
   */
  public closeTaskById(id: StrInt): Promise<Axios.AxiosResponse> {
    return TodoistTasks.closeTaskById(this.axiosInstance, id);
  }

  /**
   * Reopens a task and returns an empty body with a HTTP status code 204.
   *
   * This command reopens a previously closed task. Works both with checked tasks in user’s
   * workspace and tasks moved to history.
   * The behaviour varies for different types of tasks
   * (the command follows the behaviour of official clients when tasks are uncompleted or extracted
   * from the history)
   *
   * Regular tasks are extracted from the history and added back to the user workspace as normal
   * unchecked tasks (without their subtasks though).
   * Completed subtasks of a non-completed task are simply marked as uncompleted.
   * Subtasks that were moved to history are added back to the workspace as first-level tasks.
   * Non-completed recurring tasks are ignored. */
  public reopenTaskById(id: StrInt): Promise<Axios.AxiosResponse> {
    return TodoistTasks.reopenTaskById(this.axiosInstance, id);
  }

  /** Deletes a task and returns an empty body with a HTTP status 204. */
  public deleteTaskById(id: StrInt): Promise<Axios.AxiosResponse> {
    return TodoistTasks.deleteTaskById(this.axiosInstance, id);
  }

  // Comments

  /** Returns a JSON-encoded array of all comments for a given task_id or project_id.
   * Note that one of task_id or project_id arguments is required.
   */
  public getAllComments(
    projectId?: StrInt,
    taskId?: StrInt
  ): Promise<TodoistComment[]> {
    return TodoistComments.getAllComments(
      this.axiosInstance,
      projectId,
      taskId
    );
  }

  /** Creates a new comment on a project or task and returns its object. */
  public createComment(
    content: string,
    projectId: undefined,
    taskId: StrInt,
    attachment?: Attachment
  ): Promise<TodoistTask>;
  /** Creates a new comment on a project or task and returns its object. */
  public createComment(
    content: string,
    projectId: StrInt,
    taskId?: StrInt,
    attachment?: Attachment
  ): Promise<TodoistProject>;
  /** Creates a new comment on a project or task and returns its object. */
  public createComment(
    content: string,
    projectId: StrInt,
    taskId: StrInt,
    attachment?: Attachment
  ): Promise<TodoistProject>;
  public createComment(
    content: string,
    projectId?: StrInt,
    taskId?: StrInt,
    attachment?: Attachment
  ): Promise<TodoistProject | TodoistTask> {
    return TodoistComments.createComment(
      this.axiosInstance,
      content,
      taskId,
      projectId,
      attachment
    );
  }

  /** Returns a comment by id. */
  public getCommentById(id: StrInt): Promise<TodoistComment> {
    return TodoistComments.getCommentById(this.axiosInstance, id);
  }

  /** Updates a comment and returns an empty body with a HTTP status code 204. */
  public updateComment(
    id: StrInt,
    newContent: string
  ): Promise<Axios.AxiosResponse> {
    return TodoistComments.updateComment(this.axiosInstance, id, newContent);
  }

  /** Deletes a comment and returns an empty body with a HTTP status code 204. */
  public deleteComment(id: StrInt): Promise<Axios.AxiosResponse> {
    return TodoistComments.deleteComment(this.axiosInstance, id);
  }

  // Labels

  /** Returns a JSON-encoded array containing all user labels. */
  public getAllLabels(): Promise<TodoistLabel[]> {
    return TodoistLabels.getAllLabels(this.axiosInstance);
  }

  /** Creates a new label and returns its object as JSON. */
  public createLabel(name: string, order?: number): Promise<TodoistLabel> {
    return TodoistLabels.createLabel(this.axiosInstance, name, order);
  }

  /** Returns a label by id. */
  public getLabelById(id: StrInt): Promise<TodoistLabel> {
    return TodoistLabels.getLabelById(this.axiosInstance, id);
  }

  /** Updates a label and returns an empty body with a HTTP status code 204. */
  public updateLabelById(
    id: StrInt,
    name?: string,
    order?: number
  ): Promise<Axios.AxiosResponse> {
    return TodoistLabels.updateLabelById(this.axiosInstance, id, name, order);
  }

  /** Deletes a label and returns an empty body with a HTTP status code 204. */
  public deleteLabel(id: StrInt): Promise<Axios.AxiosResponse> {
    return TodoistLabels.deleteLabel(this.axiosInstance, id);
  }
}
