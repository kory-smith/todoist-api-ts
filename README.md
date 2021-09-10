# todoist-api-ts

This project is a wrapper for the official [Todoist REST API](https://developer.todoist.com/rest/v8/) written in typescript.  
Typings are included in the package.

## Installing / Getting started

First of all install the npm package, either with npm:

```shell
npm install todoist-api-ts
```

or with yarn:

```shell
yarn add todoist-api-ts
```

## Usage

The default export is a class:

```javascript
import TodoistApiREST from "todoist-api-ts";
```

&nbsp;

To get started, create an instance by providing your API token.  
The API token can be created/found in your Todoist settings under the Integrations tab:

```javascript
const api = new TodoistApiREST(123456789);
```

## Features

### Promise-based

As todoist-api-ts uses [axios](https://github.com/axios/axios) under the hood, every API call will return a promise:

```javascript
import TodoistApiREST, { TodoistProject } from "todoist-api-ts";

const api = new TodoistApiREST(123456789);  

  // using promise
  api
    .getAllProjects()
    .then(res => console.log(res))
    .catch(err => console.error(err));

  // using async/await
  const response: TodoistProject[] = await api.getAllProjects();
```

### Error handler

A suitable error handler is provided [here](https://github.com/kory-smith/todoist-api-ts/blob/master/src/utils/errorhandler.ts)

## Methods

Copied from the typings:

```javascript
    /** Returns a JSON-encoded array containing all user projects. */
    getAllProjects(): Promise<TodoistProject[]>;

    /** Creates a new project and returns its value in a JSON format. */
    createProject(projectName: string): Promise<TodoistProject>;

    /** Returns a JSON object containing a project object related to the given id. */
    getProjectById(id: StrInt): Promise<TodoistProject>;

    /** Updates the project for the given id and returns HTTP status code 204 with an empty body. */
    updateProjectNameById(id: StrInt, newName: string): Promise<Axios.AxiosResponse>;

    /** Deletes a project and returns an empty response. */
    deleteProjectById(id: StrInt): Promise<Axios.AxiosResponse>;

    /** Returns a JSON-encoded array containing all user tasks. */
    getAllTasks(): Promise<TodoistTask[]>;

    /** Returns a JSON-encoded array containing all filtered tasks. */
    getTasksFiltered(params: GetTaskParameters): Promise<TodoistTask[]>;

    /** Creates a new task and returns its value in a JSON format. */
    createNewTask(params: PostTaskParameters): Promise<TodoistTask>;

    /** Returns a task by id. */
    getTaskById(id: StrInt): Promise<TodoistTask>;

    /** Updates a task and returns an empty body with the HTTP status code 204. */
    updateTaskById(id: StrInt, params: PostTaskParameters): Promise<Axios.AxiosResponse>;

    /**
     * Closes a task and returns an empty body with a HTTP status code 204.
     *
     * The command does exactly what official clients do when you
     * close a task. Regular tasks are completed and moved to
     * history, subtasks are checked (marked as done, but not moved
     * to history), recurring task is moved forward (due date is
     * updated).
     */
    closeTaskById(id: StrInt): Promise<Axios.AxiosResponse>;

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
    reopenTaskById(id: StrInt): Promise<Axios.AxiosResponse>;

    /** Deletes a task and returns an empty body with a HTTP status 204. */
    deleteTaskById(id: StrInt): Promise<Axios.AxiosResponse>;

    /** Returns a JSON-encoded array of all comments for a given task_id or project_id.
     * Note that one of task_id or project_id arguments is required.
     */
    getAllComments(projectId?: StrInt, taskId?: StrInt): Promise<TodoistComment[]>;

    /** Creates a new comment on a project or task and returns its object. */
    createComment(content: string, projectId: undefined, taskId: StrInt, attachment?: Attachment): Promise<TodoistTask>;

    /** Creates a new comment on a project or task and returns its object. */
    createComment(content: string, projectId: StrInt, taskId?: StrInt, attachment?: Attachment): Promise<TodoistProject>;

    /** Creates a new comment on a project or task and returns its object. */
    createComment(content: string, projectId: StrInt, taskId: StrInt, attachment?: Attachment): Promise<TodoistProject>;

    /** Returns a comment by id. */
    getCommentById(id: StrInt): Promise<TodoistComment>;

    /** Updates a comment and returns an empty body with a HTTP status code 204. */
    updateComment(id: StrInt, newContent: string): Promise<Axios.AxiosResponse>;

    /** Deletes a comment and returns an empty body with a HTTP status code 204. */
    deleteComment(id: StrInt): Promise<Axios.AxiosResponse>;

    /** Returns a JSON-encoded array containing all user labels. */
    getAllLabels(): Promise<TodoistLabel[]>;

    /** Creates a new label and returns its object as JSON. */
    createLabel(name: string, order?: number): Promise<TodoistLabel>;

    /** Returns a label by id. */
    getLabelById(id: StrInt): Promise<TodoistLabel>;

    /** Updates a label and returns an empty body with a HTTP status code 204. */
    updateLabelById(id: StrInt, name?: string, order?: number): Promise<Axios.AxiosResponse>;

    /** Deletes a label and returns an empty body with a HTTP status code 204. */
    deleteLabel(id: StrInt): Promise<Axios.AxiosResponse>;
```

## Contributing

If you'd like to contribute, please fork the repository and use a feature branch.  
Pull requests are always welcome.

## Licensing

The code in this project is licensed under MIT license.
